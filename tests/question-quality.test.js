/* ReviewApp · question-quality.test.js
 *
 * The LLM prompt is the generator in this project, so its output cannot be
 * tested deterministically. These checks cover the prompt contract, the
 * schema of the checked-in question banks, and the runtime's answer remapping
 * when choices are shuffled.
 *
 * Run with: node tests/question-quality.test.js
 */
'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var promptPath = path.join(__dirname, '..', 'docs', 'prompt-generator.md');
var prompt = fs.readFileSync(promptPath, 'utf8');
var manifestPath = path.join(__dirname, '..', 'certifications', '_manifest.js');
var manifest = fs.readFileSync(manifestPath, 'utf8');

[
  'ANSWER-CHOICE QUALITY',
  'balanced set of answers',
  'type: "match"',
  'analyze the notes',
  'coherent group',
  'counterpart',
  'supported by the supplied notes',
  'do not force',
  'Balance the options, not the question stem',
  'short, direct questions',
  'QUESTION STEM STYLE',
  'Never refer to the source material in the question stem',
  'systematically be the longest or shortest',
  'not the longest',
  'not make it the shortest',
  'plausible',
  'literal shell syntax and punctuation-only choices',
  'blind clue review',
  'source order',
  'exactly 5 options for every mcq and multi question',
  'randomly/aleatorily select the correct-choice count from 1, 2, 3, or 4',
  'never use 0 or 5 correct choices',
  'independently randomize which A–E positions hold the correct choices',
  '45% mcq, 20% multi, 10% tf, 10% fill, and 15% match'
].forEach(function (requiredText) {
  assert.ok(prompt.toLowerCase().indexOf(requiredText.toLowerCase()) >= 0,
    'questions prompt should contain: ' + requiredText);
});

function loadQuestionPayloads() {
  var files = [
    'ch01-exploring-linux-questions.js',
    'ch02-servers-services-security-questions.js',
    'ch03-files-directories-search-questions.js'
  ];
  var payloads = [];
  files.forEach(function (file) {
    var source = fs.readFileSync(path.join(__dirname, '..', 'certifications', 'linux-plus', 'questions', file), 'utf8');
    var context = {
      window: {
        ReviewApp: {
          content: {
            register: function (payload) { payloads.push(payload); }
          }
        }
      }
    };
    vm.runInNewContext(source, context, { filename: file });
  });
  return payloads;
}

var payloads = loadQuestionPayloads();
assert.strictEqual(payloads.length, 3, 'all checked-in question banks should register');
[
  'linux-plus/questions/ch01-exploring-linux-questions.js',
  'linux-plus/questions/ch02-servers-services-security-questions.js',
  'linux-plus/questions/ch03-files-directories-search-questions.js'
].forEach(function (file) {
  assert.ok(manifest.indexOf('"' + file + '"') >= 0,
    'manifest should load the question bank: ' + file);
});
assert.ok(manifest.indexOf('contentVersion: "1.2.3"') >= 0,
  'manifest should version the content snapshot contract');
assert.deepStrictEqual(payloads.map(function (payload) { return payload.items.length; }), [19, 87, 166],
  'question banks should contain all expected chapter questions');

var questionCount = 0;
var multiAnswerCounts = {};
var multiAnswerPositions = {};
var sourceFraming = /\b(?:according to|based on|from|in|supported by)\s+(?:the\s+)?notes\b/i;
payloads.forEach(function (payload) {
  assert.strictEqual(payload.type, 'questions');
  assert.ok(Array.isArray(payload.items) && payload.items.length > 0);

  payload.items.forEach(function (question) {
    questionCount++;
    assert.ok(question.q && question.type, 'every question needs text and a type');
    assert.ok(!sourceFraming.test(question.q),
      'question stems should ask directly instead of referring to the notes: ' + question.q);

    if (question.type === 'mcq' || question.type === 'multi') {
      assert.ok(Array.isArray(question.options), 'choice question needs an options array');
      assert.strictEqual(question.options.length, 5,
        'choice questions must have exactly five options: ' + question.q);

      // Linux command options are case-sensitive (`-i` and `-I` are
      // different choices), so only exact duplicate choices are invalid.
      var normalized = question.options.map(function (option) {
        assert.strictEqual(typeof option, 'string');
        assert.ok(option.trim(), 'choices must not be blank');
        return option.trim();
      });
      assert.strictEqual(new Set(normalized).size, normalized.length,
        'choices must be distinct: ' + question.q);

      if (question.type === 'mcq') {
        assert.ok(Number.isInteger(question.answer));
        assert.ok(question.answer >= 0 && question.answer < question.options.length,
          'mcq answer index must point to an option: ' + question.q);
      } else {
        assert.ok(Array.isArray(question.answer));
        assert.ok(question.answer.length >= 1 && question.answer.length <= 4,
          'multi questions should have 1–4 correct choices: ' + question.q);
        multiAnswerCounts[question.answer.length] = (multiAnswerCounts[question.answer.length] || 0) + 1;
        var positionKey = question.answer.slice().sort(function (a, b) { return a - b; }).join(',');
        multiAnswerPositions[positionKey] = (multiAnswerPositions[positionKey] || 0) + 1;
        assert.strictEqual(new Set(question.answer).size, question.answer.length,
          'multi answer indices must be distinct: ' + question.q);
        question.answer.forEach(function (index) {
          assert.ok(Number.isInteger(index) && index >= 0 && index < question.options.length,
            'multi answer index must point to an option: ' + question.q);
        });
        assert.ok(question.answer.length < question.options.length,
          'multi questions need at least one distractor: ' + question.q);
      }
    }

    if (question.type === 'match' || question.type === 'command_match') {
      var legacyMatch = question.type === 'command_match';
      if (legacyMatch) assert.ok(question.command, 'legacy command matches need a command context');
      assert.ok(Array.isArray(question.pairs));
      assert.ok(question.pairs.length >= 2, 'matching questions need at least two pairs');
      // Matching items and counterparts can also be case-sensitive syntax,
      // so only exact duplicate values are invalid here.
      var items = question.pairs.map(function (pair) {
        return String(pair.item != null ? pair.item : pair.option).trim();
      });
      var counterparts = question.pairs.map(function (pair) {
        return String(pair.match != null ? pair.match : pair.description).trim();
      });
      assert.strictEqual(new Set(items).size, items.length);
      assert.strictEqual(new Set(counterparts).size, counterparts.length);
      question.pairs.forEach(function (pair) {
        assert.ok(String(pair.item != null ? pair.item : pair.option).trim());
        assert.ok(String(pair.match != null ? pair.match : pair.description).trim());
        if (!legacyMatch) {
          assert.ok(pair.item != null && pair.match != null, 'generic matches use item/match pairs');
        }
      });
    }
  });
});

assert.strictEqual(questionCount, 272,
  'all active Linux+ question banks should provide 272 questions to the registry');
var wildcardQuestion = null;
payloads.forEach(function (payload) {
  payload.items.forEach(function (question) {
    if (question.q === 'Which shell metacharacter is used for a range wildcard?') wildcardQuestion = question;
  });
});
assert.ok(wildcardQuestion, 'the range-wildcard question should remain in the checked-in bank');
assert.deepStrictEqual(wildcardQuestion.options, ['[ ]', '*', '?', '{ }', '~'],
  'range-wildcard choices should contain five visible literal symbols');
assert.strictEqual(multiAnswerCounts[5] || 0, 0,
  'multi questions must never mark all five options as correct');
assert.strictEqual([1, 2, 3, 4].filter(function (count) { return multiAnswerCounts[count]; }).length, 4,
  'checked-in multi questions should cover 1, 2, 3, and 4 correct choices');
assert.ok(Object.keys(multiAnswerPositions).length >= 8,
  'multi questions should vary correct-answer positions');

// Deterministic regression for the anti-length rule used by the prompt: a
// clearly outlying correct choice is detectable, while natural variation is
// accepted. This intentionally tests a quality criterion without requiring an
// arbitrary exact character count for every generated option.
function hasLengthClue(options, correctIndices) {
  var incorrect = options.filter(function (_, index) {
    return correctIndices.indexOf(index) < 0;
  });
  var correctLengths = correctIndices.map(function (index) { return options[index].length; });
  var incorrectLengths = incorrect.map(function (option) { return option.length; });
  var correctMax = Math.max.apply(Math, correctLengths);
  var correctMin = Math.min.apply(Math, correctLengths);
  var incorrectMax = Math.max.apply(Math, incorrectLengths);
  var incorrectMin = Math.min.apply(Math, incorrectLengths);
  return correctMax > incorrectMax * 1.35 || correctMin < incorrectMin * 0.65;
}

assert.strictEqual(hasLengthClue([
  'A short protocol.',
  'A related service.',
  'A network service that translates domain names into addresses used by clients.',
  'A type of cache.'
], [2]), true);
assert.strictEqual(hasLengthClue([
  'A service that maps names to addresses.',
  'A service that maps addresses to names.',
  'A service that routes traffic between hosts.',
  'A service that stores local host records.',
  'A service that discovers nearby systems.'
], [0]), false);

// The quiz engine must remap the correct answer after different option orders;
// this is what prevents authored A/B/C/D placement from becoming a learner-
// facing position clue. Use controlled shuffles so the test is not probabilistic.
var shuffleUtils = {
  el: function () {},
  shuffle: function (items) { return items.slice().reverse(); },
  escapeHtml: function (value) { return String(value); }
};
global.window = { ReviewApp: { core: { utils: shuffleUtils } } };
require('../app/js/quiz.js');
var quiz = global.window.ReviewApp.quiz;

// Shell metacharacters are literal answer text. They must never disappear
// because an inline-markdown renderer interprets them as formatting syntax.
['[ ]', '*', '?', '{ }', '~', '()', '|', '>>'].forEach(function (symbol) {
  assert.strictEqual(quiz.renderChoiceHtml(symbol), symbol,
    'literal symbol choice should remain visible: ' + symbol);
});

[
  {
    context: 'Command flags',
    pairs: [{ item: '-i', match: 'Ignore case' }, { item: '-n', match: 'Show line numbers' }]
  },
  {
    context: 'Shell symbols',
    pairs: [{ item: '*', match: 'Match multiple characters' }, { item: '?', match: 'Match one character' }]
  },
  {
    context: 'File extensions',
    pairs: [{ item: '.py', match: 'Python source file' }, { item: '.json', match: 'JSON data' }]
  },
  {
    context: 'Process concepts',
    pairs: [{ item: 'Process', match: 'Running instance of a program' }, { item: 'Thread', match: 'Execution unit within a process' }]
  },
  {
    context: 'Network protocols',
    pairs: [{ item: 'SSH', match: 'Secure remote shell access' }, { item: 'DNS', match: 'Resolves domain names' }]
  },
  {
    context: 'Redirection syntax',
    pairs: [{ item: '>', match: 'Redirect standard output' }, { item: '2>', match: 'Redirect standard error' }]
  }
].forEach(function (fixture) {
  var prepared = quiz.prepareQuestion({ q: 'Match the related items.', type: 'match', context: fixture.context, pairs: fixture.pairs });
  assert.strictEqual(prepared._invalid, undefined);
  assert.strictEqual(prepared._shuffledPairs.length, fixture.pairs.length);
  assert.strictEqual(prepared._matchContext, fixture.context);
  assert.strictEqual(quiz.checkAnswer(prepared, prepared._correctMatchIdx.slice()), true);
});

var legacyPrepared = quiz.prepareQuestion({
  q: 'Match flags.',
  type: 'command_match',
  command: 'grep',
  pairs: [{ option: '-i', description: 'Ignore case' }, { option: '-n', description: 'Show line numbers' }]
});
assert.strictEqual(legacyPrepared._invalid, undefined);
assert.strictEqual(quiz.checkAnswer(legacyPrepared, legacyPrepared._correctDescIdx.slice()), true);
assert.deepStrictEqual(quiz.sanitizeMatch({
  type: 'match',
  pairs: [{ item: 'A', match: 'Alpha' }, { item: 'B', match: 'Beta' }]
}), [
  { item: 'A', match: 'Alpha' },
  { item: 'B', match: 'Beta' }
]);
assert.strictEqual(quiz.sanitizeMatch({
  type: 'match',
  pairs: [{ item: 'A', match: 'Alpha' }, { item: 'A', match: 'Another meaning' }]
}), null);
assert.deepStrictEqual(quiz.sanitizeCommandMatch({
  type: 'command_match',
  command: 'grep',
  pairs: [{ option: '-i', description: 'Ignore case' }, { option: '-n', description: 'Show line numbers' }]
}), [
  { option: '-i', description: 'Ignore case' },
  { option: '-n', description: 'Show line numbers' }
]);

var raw = {
  _id: 'valid-choice',
  q: 'Which option is correct?',
  type: 'mcq',
  options: ['Correct', 'Distractor one', 'Distractor two', 'Distractor three', 'Distractor four'],
  answer: 0
};
var reversed = quiz.prepareQuestion(raw);
assert.strictEqual(quiz.isValidMcqAnswer(raw), true);
assert.strictEqual(reversed._correctShuffled, 4);
assert.strictEqual(quiz.checkAnswer(reversed, 4), true);

shuffleUtils.shuffle = function (items) {
  return [items[4], items[0], items[1], items[2], items[3]];
};
var rotated = quiz.prepareQuestion(raw);
assert.strictEqual(rotated._correctShuffled, 1);
assert.strictEqual(quiz.checkAnswer(rotated, 1), true);

var savedInvalidChoice = {
  _id: 'invalid-choice',
  q: 'Which shell metacharacter is used for a range wildcard?',
  type: 'mcq',
  options: ['[ ]', '*', '', '{ }', '~'],
  answer: 0,
  _shuffledOptions: [
    { text: '[ ]', origIdx: 0 },
    { text: '*', origIdx: 1 },
    { text: '', origIdx: 2 },
    { text: '{ }', origIdx: 3 },
    { text: '~', origIdx: 4 }
  ]
};
var cleanedQuizSession = quiz.sanitizeQuizSession({
  index: 0,
  questions: [savedInvalidChoice, reversed],
  answers: [{ qId: 'invalid-choice' }, { qId: 'valid-choice' }]
});
assert.ok(cleanedQuizSession);
assert.strictEqual(cleanedQuizSession.state.questions.length, 1,
  'saved quizzes should remove malformed choice questions before rendering');
assert.strictEqual(cleanedQuizSession.state.questions[0]._id, 'valid-choice');
assert.strictEqual(cleanedQuizSession.state.index, 0);
assert.deepStrictEqual(cleanedQuizSession.state.answers.map(function (answer) { return answer.qId; }), ['valid-choice']);

var cleanedExamSession = quiz.sanitizeExamSession({
  index: 0,
  questions: [savedInvalidChoice, reversed],
  answers: { 0: 1, 1: 2 },
  flagged: { 1: true }
});
assert.ok(cleanedExamSession);
assert.strictEqual(cleanedExamSession.state.questions.length, 1,
  'saved exams should remove malformed choice questions before rendering');
assert.deepStrictEqual(cleanedExamSession.state.answers, { 0: 2 });
assert.deepStrictEqual(cleanedExamSession.state.flagged, { 0: true });

var originalContent = global.window.ReviewApp.content;
global.window.ReviewApp.content = {
  getManifest: function () { return { contentVersion: '1.2.3' }; }
};
assert.strictEqual(quiz.sanitizeQuizSession({
  contentVersion: '1.0.9',
  index: 0,
  questions: [reversed],
  answers: []
}), null, 'saved quizzes from an older content version should not hide current questions');
global.window.ReviewApp.content = originalContent;

var multi = quiz.prepareQuestion({
  q: 'Which options are correct?',
  type: 'multi',
  options: ['Correct one', 'Distractor', 'Correct two', 'Distractor two', 'Distractor three'],
  answer: [0, 2]
});
assert.deepStrictEqual(multi._correctShuffled, [1, 3]);
assert.strictEqual(quiz.checkAnswer(multi, [3, 1]), true);

var orderFixtures = [1, 2, 3, 4].map(function (count) {
  return { type: 'multi', answer: [0, 1, 2, 3].slice(0, count) };
});
var randomizedOrder = quiz.randomizeQuestionOrder(orderFixtures);
assert.deepStrictEqual(randomizedOrder.map(function (q) { return q.answer.length; }).sort(function (a, b) { return a - b; }), [1, 2, 3, 4]);
for (var orderIndex = 1; orderIndex < randomizedOrder.length; orderIndex++) {
  assert.notStrictEqual(randomizedOrder[orderIndex - 1].answer.length, randomizedOrder[orderIndex].answer.length,
    'randomized multi-question order should not repeat adjacent answer counts');
}

var fourCorrect = quiz.prepareQuestion({
  q: 'Which four options are correct?',
  type: 'multi',
  options: ['Correct one', 'Correct two', 'Correct three', 'Correct four', 'Distractor'],
  answer: [0, 1, 2, 3]
});
assert.strictEqual(fourCorrect._invalid, undefined);
assert.strictEqual(quiz.isValidMultiAnswer(fourCorrect), true);
assert.strictEqual(fourCorrect._correctShuffled.length, 4);

var allFiveCorrect = quiz.prepareQuestion({
  q: 'Which options are correct?',
  type: 'multi',
  options: ['Correct one', 'Correct two', 'Correct three', 'Correct four', 'Correct five'],
  answer: [0, 1, 2, 3, 4]
});
assert.strictEqual(allFiveCorrect._invalid, true,
  'multi questions must reject an answer containing every option');
assert.strictEqual(quiz.isValidMultiAnswer(allFiveCorrect), false);
assert.strictEqual(quiz.checkAnswer(allFiveCorrect, [0, 1, 2, 3, 4]), false);

var zeroCorrect = quiz.prepareQuestion({
  q: 'Which options are correct?',
  type: 'multi',
  options: ['Distractor one', 'Distractor two', 'Distractor three', 'Distractor four', 'Distractor five'],
  answer: []
});
assert.strictEqual(zeroCorrect._invalid, true,
  'multi questions must reject an answer containing no options');

var invalidFourOptions = quiz.prepareQuestion({
  q: 'Which options are correct?',
  type: 'multi',
  options: ['Correct one', 'Correct two', 'Correct three', 'Distractor'],
  answer: [0]
});
assert.strictEqual(invalidFourOptions._invalid, true,
  'multi questions with fewer than five options must be rejected');

var invalidMcq = quiz.prepareQuestion({
  q: 'Which option is correct?',
  type: 'mcq',
  options: ['Correct', 'Distractor one', 'Distractor two', 'Distractor three'],
  answer: 0
});
assert.strictEqual(invalidMcq._invalid, true,
  'mcq questions with fewer than five options must be rejected');
assert.strictEqual(quiz.isValidMcqAnswer(invalidMcq), false);

var caseSensitiveFlags = quiz.prepareQuestion({
  q: 'Which Linux flags are distinct choices?',
  type: 'mcq',
  options: ['-d', '-D', '-i', '-I', '-r'],
  answer: 0
});
assert.strictEqual(caseSensitiveFlags._invalid, undefined,
  'case-sensitive Linux flags must remain valid distinct choices');
assert.strictEqual(quiz.isValidMcqAnswer(caseSensitiveFlags), true);

var caseSensitiveMatch = quiz.prepareQuestion({
  q: 'Match case-sensitive Linux flags.',
  type: 'command_match',
  command: 'rm',
  pairs: [
    { option: '-i', description: 'Ask before each deletion' },
    { option: '-I', description: 'Ask once before bulk deletion' }
  ]
});
assert.strictEqual(caseSensitiveMatch._invalid, undefined,
  'case-sensitive matching flags must remain valid distinct items');

console.log(questionCount + ' questions checked; prompt and choice-quality checks passed');
