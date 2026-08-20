/* ═══════════════════════════════════════════════════════════
   ReviewApp · quiz.js
   Quiz engine (5 modes) + Exam simulation
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;
  var el = utils.el;

  function inlineHtml(value) {
    return App.markdown.renderInline(value == null ? '' : String(value));
  }

  // Choice text often contains literal shell symbols such as `*`, `?`, or
  // `~`. Those are answer content, not Markdown, so render symbol-only
  // choices as escaped text instead of sending them through the inline parser.
  // This also gives a safe text fallback if a malformed renderer returns no
  // visible content for a non-empty value.
  function renderChoiceHtml(value) {
    var raw = value == null ? '' : String(value);
    if (!raw) return '';
    if (!/[A-Za-z0-9]/.test(raw)) return utils.escapeHtml(raw);
    var rendered = App.markdown && App.markdown.renderInline
      ? App.markdown.renderInline(raw)
      : utils.escapeHtml(raw);
    return rendered || utils.escapeHtml(raw);
  }

  function currentContentVersion() {
    var manifest = App.content && App.content.getManifest ? App.content.getManifest() : null;
    return manifest && manifest.contentVersion ? String(manifest.contentVersion) : null;
  }

  function sessionMatchesCurrentContent(saved) {
    var version = currentContentVersion();
    return !version || saved.contentVersion === version;
  }

  function isSavedChoiceQuestionValid(q) {
    if (!q || q._invalid) return false;
    if (q.type !== 'mcq' && q.type !== 'multi') return true;
    if (q.type === 'mcq' ? !isValidMcqAnswer(q) : !isValidMultiAnswer(q)) return false;
    if (!Array.isArray(q._shuffledOptions) || q._shuffledOptions.length !== 5) return false;
    var seen = {};
    return q._shuffledOptions.every(function (option) {
      if (!option || typeof option.text !== 'string' || !Number.isInteger(option.origIdx) || option.origIdx < 0 || option.origIdx >= q.options.length || seen[option.origIdx]) return false;
      if (option.text !== q.options[option.origIdx]) return false;
      seen[option.origIdx] = true;
      return true;
    });
  }

  function sanitizeSavedQuestionList(questions) {
    var kept = [];
    var indexMap = {};
    var changed = false;
    (Array.isArray(questions) ? questions : []).forEach(function (q, index) {
      if (!isSavedChoiceQuestionValid(q)) {
        changed = true;
        return;
      }
      indexMap[index] = kept.length;
      kept.push(q);
    });
    return { questions: kept, indexMap: indexMap, changed: changed };
  }

  function sanitizeQuizSession(saved) {
    if (!saved || !Array.isArray(saved.questions) || !sessionMatchesCurrentContent(saved)) return null;
    var oldQuestions = saved.questions;
    var oldOriginalTotal = Number.isInteger(saved.originalTotal) ? saved.originalTotal : oldQuestions.length;
    var list = sanitizeSavedQuestionList(oldQuestions);
    if (!list.questions.length) return null;
    var oldIndex = Number.isInteger(saved.index) ? saved.index : 0;
    var newIndex = list.indexMap[oldIndex];
    if (newIndex == null) {
      for (var i = Math.max(0, oldIndex); i < saved.questions.length; i++) {
        if (list.indexMap[i] != null) { newIndex = list.indexMap[i]; break; }
      }
      if (newIndex == null) newIndex = list.questions.length - 1;
      list.changed = true;
    }
    if (saved.index !== newIndex) list.changed = true;
    saved.questions = list.questions;
    saved.index = Math.max(0, Math.min(newIndex, saved.questions.length - 1));
    // Recompute the first-pass boundary. Sanitization can drop malformed
    // questions, so count the surviving original questions so appended retries
    // stay in the retry region instead of silently counting as first attempts.
    var firstPassCount = 0;
    for (var i = 0; i < oldOriginalTotal && i < oldQuestions.length; i++) {
      if (list.indexMap[i] != null) firstPassCount++;
    }
    if (firstPassCount !== oldOriginalTotal) list.changed = true;
    saved.originalTotal = firstPassCount;
    var validIds = {};
    saved.questions.forEach(function (q) { if (q._id) validIds[q._id] = true; });
    if (!Array.isArray(saved.answers)) {
      saved.answers = [];
      list.changed = true;
    } else {
      var answers = saved.answers.filter(function (answer) { return answer && validIds[answer.qId]; });
      if (answers.length !== saved.answers.length) list.changed = true;
      saved.answers = answers;
    }
    return { state: saved, changed: list.changed };
  }

  function sanitizeExamSession(saved) {
    if (!saved || !Array.isArray(saved.questions) || !sessionMatchesCurrentContent(saved)) return null;
    var list = sanitizeSavedQuestionList(saved.questions);
    if (!list.questions.length) return null;
    var oldIndex = Number.isInteger(saved.index) ? saved.index : 0;
    var newIndex = list.indexMap[oldIndex];
    if (newIndex == null) {
      for (var i = Math.max(0, oldIndex); i < saved.questions.length; i++) {
        if (list.indexMap[i] != null) { newIndex = list.indexMap[i]; break; }
      }
      if (newIndex == null) newIndex = list.questions.length - 1;
      list.changed = true;
    }
    if (saved.index !== newIndex) list.changed = true;
    var answers = {};
    var flagged = {};
    Object.keys(saved.answers && typeof saved.answers === 'object' ? saved.answers : {}).forEach(function (index) {
      if (list.indexMap[index] != null) answers[list.indexMap[index]] = saved.answers[index];
      else list.changed = true;
    });
    Object.keys(saved.flagged && typeof saved.flagged === 'object' ? saved.flagged : {}).forEach(function (index) {
      if (list.indexMap[index] != null) flagged[list.indexMap[index]] = saved.flagged[index];
      else list.changed = true;
    });
    saved.questions = list.questions;
    saved.index = Math.max(0, Math.min(newIndex, saved.questions.length - 1));
    saved.answers = answers;
    saved.flagged = flagged;
    return { state: saved, changed: list.changed };
  }

  /* ── Helpers ────────────────────────────────────────────── */
  // `match` is the generic authoring type. `command_match` remains a legacy
  // alias so existing content and saved sessions continue to work.
  function isMatchQuestion(q) {
    return !!q && (q.type === 'match' || q.type === 'command_match');
  }

  function pairItem(pair) {
    return pair && pair.item != null ? pair.item : (pair && pair.option != null ? pair.option : '');
  }

  // Validate/normalize a generic item-to-counterpart question's pairs.
  // Canonical pairs use { item, match }; option/description is accepted for
  // legacy command_match content. Returns null when the question is malformed.
  function sanitizeMatch(q) {
    if (!q || typeof q !== 'object') return null;
    var legacy = q.type === 'command_match';
    var command = String(q.command == null ? '' : q.command).trim();
    if (legacy && !command) return null;
    var pairs = Array.isArray(q.pairs) ? q.pairs : [];
    var seenItems = Object.create(null);
    var seenMatches = Object.create(null);
    var clean = [];
    pairs.forEach(function (p) {
      if (!p || typeof p !== 'object') return;
      var itemValue = p.item != null ? p.item : (p.left != null ? p.left : p.option);
      var matchValue = p.match != null ? p.match : (p.right != null ? p.right : p.description);
      var item = String(itemValue == null ? '' : itemValue).trim();
      var match = String(matchValue == null ? '' : matchValue).trim();
      if (!item || !match) return; // drop pairs missing a side
      // Matching items may be case-sensitive Linux syntax (for example,
      // `-i` and `-I`), so preserve case when detecting exact duplicates.
      var itemKey = item;
      var matchKey = match;
      if (seenItems[itemKey] || seenMatches[matchKey]) return; // drop duplicates
      seenItems[itemKey] = true;
      seenMatches[matchKey] = true;
      clean.push({ item: item, match: match });
    });
    if (clean.length < 2) return null; // nothing meaningful to match
    return clean;
  }

  // Public compatibility name retained for callers that used the old helper.
  // Keep its old return shape while the generic engine uses { item, match }.
  function sanitizeCommandMatch(q) {
    var clean = sanitizeMatch(q);
    return clean && clean.map(function (pair) {
      return { option: pair.item, description: pair.match };
    });
  }

  // Multi questions are authored with a variable number of correct choices,
  // but every question must have exactly five options and leave at least one
  // distractor. Reject malformed content instead of silently treating
  // duplicate, out-of-range, or all-options answers as valid. This keeps a
  // bad generated question from teaching the learner that selecting everything
  // is a safe strategy.
  function hasValidChoiceOptions(options) {
    if (!Array.isArray(options) || options.length !== 5) return false;
    var seen = {};
    return options.every(function (option) {
      if (typeof option !== 'string' || !option.trim()) return false;
      // Linux command options are case-sensitive (`-i` and `-I` are
      // different choices), so only exact duplicates are malformed.
      var key = option.trim();
      if (seen[key]) return false;
      seen[key] = true;
      return true;
    });
  }

  function isValidMcqAnswer(q) {
    var options = Array.isArray(q && q.options) ? q.options : [];
    return hasValidChoiceOptions(options) && Number.isInteger(q && q.answer) && q.answer >= 0 && q.answer < options.length;
  }

  function isValidMultiAnswer(q) {
    var options = Array.isArray(q && q.options) ? q.options : [];
    var answer = Array.isArray(q && q.answer) ? q.answer : [];
    if (!hasValidChoiceOptions(options) || answer.length < 1 || answer.length > 4 || answer.length >= options.length) return false;
    var seen = {};
    return answer.every(function (index) {
      if (!Number.isInteger(index) || index < 0 || index >= options.length || seen[index]) return false;
      seen[index] = true;
      return true;
    });
  }

  // The answer count belongs to the authored question; changing it at runtime
  // would change the facts being tested. Instead, randomize the order of
  // multi questions by their authored count so consecutive questions do not
  // expose a fixed 2/3/4 pattern, while option positions are independently
  // shuffled by prepareQuestion.
  function randomizeQuestionOrder(questions) {
    var remaining = utils.shuffle(questions);
    var multiBuckets = {};
    var other = [];
    remaining.forEach(function (q) {
      if (q.type === 'multi') {
        var count = q.answer && q.answer.length;
        if (!multiBuckets[count]) multiBuckets[count] = [];
        multiBuckets[count].push(q);
      } else {
        other.push(q);
      }
    });
    other = utils.shuffle(other);

    var ordered = [];
    var lastCount = null;
    while (other.length || Object.keys(multiBuckets).some(function (key) { return multiBuckets[key].length; })) {
      var availableCounts = Object.keys(multiBuckets).filter(function (key) {
        return multiBuckets[key].length && String(key) !== String(lastCount);
      });
      var useMulti = availableCounts.length && (!other.length || Math.random() < 0.65);
      if (useMulti) {
        var countKey = availableCounts[Math.floor(Math.random() * availableCounts.length)];
        var bucket = multiBuckets[countKey];
        ordered.push(bucket.splice(Math.floor(Math.random() * bucket.length), 1)[0]);
        lastCount = Number(countKey);
      } else if (other.length) {
        ordered.push(other.pop());
        lastCount = null;
      } else {
        // Only one answer-count bucket remains, so use it rather than loop.
        var fallbackKey = Object.keys(multiBuckets).find(function (key) { return multiBuckets[key].length; });
        var fallback = multiBuckets[fallbackKey];
        ordered.push(fallback.splice(Math.floor(Math.random() * fallback.length), 1)[0]);
        lastCount = Number(fallbackKey);
      }
    }
    return ordered;
  }

  function prepareQuestion(raw) {
    var q = Object.assign({}, raw);
    q._origAnswer = q.answer;
    if (isMatchQuestion(q)) {
      var pairs = sanitizeMatch(q);
      if (!pairs) {
        q._invalid = true;
      } else {
        q._pairs = pairs;
        q._shuffledPairs = utils.shuffle(pairs);
        var matches = utils.shuffle(pairs.map(function (p) { return p.match; }));
        q._shuffledMatches = matches;
        q._correctMatchIdx = q._shuffledPairs.map(function (p) { return matches.indexOf(p.match); });
        // Retain the old field names for persisted sessions and callers that
        // still inspect command_match questions directly.
        q._shuffledDescs = matches;
        q._correctDescIdx = q._correctMatchIdx;
        q._matchContext = String(q.context == null ? (q.command == null ? '' : q.command) : q.context).trim();
        q._matchLabel = q.command ? 'COMMAND' : String(q.contextLabel || 'MATCHING').trim();
      }
    } else if (q.type === 'mcq' || q.type === 'multi') {
      var opts = (q.options || []).map(function (o, i) { return { text: o, origIdx: i }; });
      opts = utils.shuffle(opts);
      q._shuffledOptions = opts;
      if (q.type === 'mcq') {
        if (!isValidMcqAnswer(q)) {
          q._invalid = true;
          q._invalidReason = 'Multiple-choice questions need exactly five options and one valid correct answer.';
          q._correctShuffled = -1;
          return q;
        }
        q._correctShuffled = opts.findIndex(function (o) { return o.origIdx === q.answer; });
      } else {
        if (!isValidMultiAnswer(q)) {
          q._invalid = true;
          q._invalidReason = 'Multi questions need 1–4 distinct correct choices and at least one distractor.';
          q._correctShuffled = [];
          return q;
        }
        var ansSet = {};
        q.answer.forEach(function (i) { ansSet[i] = true; });
        q._correctShuffled = opts.reduce(function (acc, o, i) {
          if (ansSet[o.origIdx]) acc.push(i);
          return acc;
        }, []);
      }
    }
    return q;
  }

  function checkAnswer(q, userAnswer) {
    if (!q || q._invalid) return false;
    if (q.type === 'mcq') {
      return userAnswer === q._correctShuffled;
    }
    if (q.type === 'multi') {
      var correct = (q._correctShuffled || []).slice().sort().join(',');
      var given = (userAnswer || []).slice().sort().join(',');
      return correct === given;
    }
    if (q.type === 'tf') {
      return userAnswer === q.answer;
    }
    if (q.type === 'fill') {
      return acceptedAnswerForms(q).indexOf(normalizeAnswer(userAnswer)) >= 0;
    }
    if (isMatchQuestion(q)) {
      if (q._invalid || !Array.isArray(userAnswer)) return false;
      var correct = q._correctMatchIdx || q._correctDescIdx || [];
      if (userAnswer.length !== correct.length) return false;
      // One wrong match makes the whole question wrong (consistent with multi)
      return correct.every(function (c, i) {
        return Number(userAnswer[i]) === c;
      });
    }
    return false;
  }

  /* ── Fill-answer matching ──────────────────────────────── */
  // Central normalization + accepted-form resolution for free-text answers.
  // Matching is deliberately permissive for legitimate equivalents but never
  // substring- or fuzzy-based: an answer only passes when it equals one of
  // the accepted forms after normalization. Accepted forms come from:
  //   1. the canonical `answer` itself;
  //   2. an acronym written as "Full Name (ACR)" — both the full name alone
  //      and the acronym alone are accepted;
  //   3. the optional `accepts` array on the question (acronyms, synonyms,
  //      alternate spellings declared explicitly by the content).
  // All forms are compared case-insensitively with inner whitespace collapsed.

  // Lowercase, trim, and collapse runs of whitespace (spaces/tabs/newlines)
  // to single spaces, so "  Certificate   Authority\n" == "certificate authority".
  function normalizeAnswer(s) {
    return String(s == null ? '' : s).trim().replace(/\s+/g, ' ').toLowerCase();
  }

  // "Certificate Authority (CA)" -> { full: "Certificate Authority", acronym: "ca" }.
  // Only a trailing parenthetical of all-caps letters/digits (2+) counts as an
  // acronym; prose parentheticals like "(in most cases)" do not.
  function splitAnswerAcronym(answer) {
    var m = String(answer == null ? '' : answer).match(/^(.*?)\s*\(([A-Z0-9]{2,})\)\s*$/);
    return m ? { full: m[1], acronym: m[2].toLowerCase() } : null;
  }

  // Every normalized string the engine will accept for a fill question.
  function acceptedAnswerForms(q) {
    var forms = [String(q.answer == null ? '' : q.answer)];
    var parts = splitAnswerAcronym(q.answer);
    if (parts) {
      forms.push(parts.full);
      forms.push(parts.acronym);
    }
    (q.accepts || []).forEach(function (a) { forms.push(a); });
    return forms.map(normalizeAnswer).filter(function (f) { return f !== ''; });
  }

  /* ── Quiz session state ─────────────────────────────────── */
  var session = null;

  function startQuiz(config) {
    // config: { mode, cert, certs, chapter, tags, count, questions }
    var questions = config.questions || [];
    if (!questions.length) {
      App.toast('No questions match your criteria', 'error');
      return null;
    }
    questions = randomizeQuestionOrder(questions).map(prepareQuestion).filter(function (q) { return !q._invalid; });
    if (!questions.length) {
      App.toast('No valid questions match your criteria', 'error');
      return null;
    }
    if (config.count && config.count < questions.length) {
      questions = questions.slice(0, config.count);
    }
    session = {
      mode: config.mode || 'random',
      cert: config.cert || (questions[0] && questions[0]._cert) || null,
      contentVersion: currentContentVersion(),
      questions: questions,
      originalTotal: questions.length,
      index: 0,
      answers: [], // { qId, correct, userAnswer, retry }
      startTime: Date.now(),
      speedLimit: config.speedLimit || null, // seconds per Q for speed run
      speedTimer: null,
      speedRemaining: null
    };
    App.store.setLastStudy({ type: 'quiz', mode: session.mode, cert: session.cert, ts: Date.now() });
    App.store.saveQuizSession(session);
    return session;
  }

  function currentQ() {
    if (!session) return null;
    return session.questions[session.index];
  }

  // Retried questions are appended after the original first pass, so an index
  // at or beyond originalTotal is a practice-only re-show of a missed question.
  function currentIsRetry() {
    return !!(session && Number.isInteger(session.originalTotal) && session.index >= session.originalTotal);
  }

  function submitAnswer(userAnswer) {
    if (!session) return null;
    var q = currentQ();
    var correct = checkAnswer(q, userAnswer);
    var retry = currentIsRetry();
    session.answers.push({
      qId: q._id,
      correct: correct,
      userAnswer: userAnswer,
      question: q,
      retry: retry
    });
    // Queue a first-pass miss to be shown again at the end, mirroring the
    // flashcard retry queue. The re-show is practice only: retried answers are
    // never counted toward the score or written to the stats log.
    if (!correct && !retry) {
      session.questions.push(q);
    }
    // Answers are recorded in the session only. They are written to the stats
    // log when the quiz finishes (see endQuiz), so an abandoned quiz never
    // counts toward statistics.
    if (session.speedTimer) {
      clearInterval(session.speedTimer);
      session.speedTimer = null;
    }
    App.store.saveQuizSession(session);
    return { correct: correct, q: q };
  }

  function nextQuestion() {
    if (!session) return false;
    if (session.index < session.questions.length - 1) {
      session.index++;
      App.store.saveQuizSession(session);
      return true;
    }
    return false;
  }

  function skipQuestion() {
    if (!session) return;
    var q = currentQ();
    session.answers.push({ qId: q._id, correct: false, userAnswer: null, skipped: true, retry: currentIsRetry(), question: q });
    App.store.saveQuizSession(session);
    return nextQuestion();
  }

  function endQuiz() {
    if (!session) return null;
    var total = Number.isInteger(session.originalTotal) ? session.originalTotal : session.questions.length;
    var firstAttempts = session.answers.filter(function (a) { return !a.retry; });
    var result = {
      mode: session.mode,
      total: total,
      answered: firstAttempts.length,
      correct: firstAttempts.filter(function (a) { return a.correct; }).length,
      timeMs: Date.now() - session.startTime,
      answers: firstAttempts,
      questions: session.questions.slice(0, total)
    };
    result.score = result.total ? Math.round((result.correct / result.total) * 100) : 0;
    // per-tag (first attempts only — retries are practice and never re-score)
    var tagMap = {};
    firstAttempts.forEach(function (a) {
      (a.question.tags || []).forEach(function (t) {
        if (!tagMap[t]) tagMap[t] = { correct: 0, total: 0 };
        tagMap[t].total++;
        if (a.correct) tagMap[t].correct++;
      });
    });
    result.tagBreakdown = Object.keys(tagMap).map(function (t) {
      return { tag: t, correct: tagMap[t].correct, total: tagMap[t].total, pct: Math.round((tagMap[t].correct / tagMap[t].total) * 100) };
    });

    // Commit the completed quiz's answers to the stats log. Only the first
    // attempt per question is logged, so retries never double-count toward
    // statistics. Answers are held back while the quiz is in progress, so only
    // finished quizzes count.
    firstAttempts.forEach(function (a) {
      var q = a.question || {};
      App.store.logAnswer({
        qId: a.qId,
        cert: q._cert,
        chapter: q._chapter,
        tags: q.tags || [],
        correct: a.correct,
        type: q.type,
        mode: session.mode + (a.skipped ? ':skip' : '')
      });
    });

    App.store.addTimeOnTask(result.timeMs);
    App.store.clearQuizSession();
    session = null;
    return result;
  }

  /* ── Build question pool by mode ────────────────────────── */
  // Every mode operates inside the active certification (opts.cert). The
  // historical multi-cert 'random' picker is retired: pools are scoped first.
  function buildPool(mode, opts) {
    opts = opts || {};
    var all = App.content.getAll('questions');
    if (opts.cert) {
      all = all.filter(function (q) { return q._cert === opts.cert; });
    }
    if (mode === 'chapter') {
      return all.filter(function (q) {
        return (!opts.chapter || q._chapter === opts.chapter);
      });
    }
    if (mode === 'theme') {
      var tags = opts.tags || [];
      if (!tags.length) return all;
      return all.filter(function (q) {
        return (q.tags || []).some(function (t) { return tags.indexOf(t) >= 0; });
      });
    }
    if (mode === 'weak') {
      var weak = App.store.weakQuestions(60, opts.cert);
      var weakIds = {};
      weak.forEach(function (w) { weakIds[w.qId] = true; });
      var seen = {};
      (opts.cert ? App.store.getAnswers({ cert: opts.cert }) : App.store.getAnswers()).forEach(function (a) { seen[a.qId] = true; });
      return all.filter(function (q) {
        return weakIds[q._id] || !seen[q._id];
      });
    }
    if (mode === 'speed') {
      return utils.shuffle(all).slice(0, 10);
    }
    return all;
  }

  /* ── Generic matching UI builder ────────────────────────── */
  // Shared by the quiz player, exam player and single-question modal.
  // Renders an optional context banner plus one row per item. Each row's
  // counterpart picker is a custom select-only combobox (button + listbox
  // popover) instead of a native <select>, so the interaction carries the
  // app's visual language (selected / used / feedback states, fast motion)
  // without touching the underlying answer model. Returns { lock, read }.
  //
  // The answer data is untouched: read() still returns one index into
  // q._shuffledMatches per row (or null when unanswered), exactly like the
  // old <select> version, so scoring, validation and saved sessions keep
  // working. Because a correct matching is always a permutation, a
  // counterpart already used by another row is shown as "used" and picking
  // it simply moves the match (the previous row falls back to unanswered) —
  // the answer space never loses a correct solution.
  var matchUid = 0;
  var openMatchMenus = []; // row-state objects whose popover is open
  var matchDocListenersAttached = false;

  // One shared pair of document listeners for every matching picker: outside
  // clicks and Escape close whatever popover is open, without leaking a
  // listener per rendered question. Listeners are only active while a menu
  // is open.
  function attachMatchDocListeners() {
    if (matchDocListenersAttached) return;
    matchDocListenersAttached = true;
    document.addEventListener('mousedown', function (e) {
      openMatchMenus.slice().forEach(function (st) {
        if (!st.control.contains(e.target)) closeMatchMenu(st);
      });
    }, true);
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      openMatchMenus.slice().forEach(function (st) { closeMatchMenu(st); });
    }, true);
  }

  function closeMatchMenu(st) {
    if (!st.open) return;
    st.open = false;
    st.row.classList.remove('active');
    st.trigger.setAttribute('aria-expanded', 'false');
    st.trigger.removeAttribute('aria-activedescendant');
    st.menu.hidden = true;
    var idx = openMatchMenus.indexOf(st);
    if (idx >= 0) openMatchMenus.splice(idx, 1);
  }

  function renderMatchUI(container, q, opts) {
    opts = opts || {};
    var context = q._matchContext || q.context || q.command || '';
    var label = q._matchLabel || (q.command ? 'COMMAND' : 'MATCHING');
    var banner = el('div', { className: 'match-context' }, [
      el('span', { className: 'match-context-label', text: label }),
      el('span', { className: 'match-context-name', html: inlineHtml(context || 'Related items') })
    ]);
    container.appendChild(banner);

    var rows = el('div', { className: 'match-pairs' });
    var matches = q._shuffledMatches || q._shuffledDescs || [];
    var initial = Array.isArray(opts.initial) ? opts.initial : [];
    var values = q._shuffledPairs.map(function (_, i) {
      var v = initial[i];
      return Number.isInteger(v) && v >= 0 && v < matches.length ? v : null;
    });
    var rowState = [];

    q._shuffledPairs.forEach(function (pair, i) {
      var item = pairItem(pair);
      var row = el('div', { className: 'match-row' });
      row.appendChild(el('span', { className: 'match-item', html: renderChoiceHtml(item) }));

      var menuId = 'match-menu-' + (++matchUid);
      var control = el('div', { className: 'match-control' });
      var trigger = el('button', {
        type: 'button',
        className: 'match-trigger is-empty',
        role: 'combobox',
        'aria-haspopup': 'listbox',
        'aria-expanded': 'false',
        'aria-controls': menuId,
        'aria-label': 'Match ' + item + ' with its counterpart',
        onClick: function () { toggleMatchMenu(i); }
      });
      var valueEl = el('span', { className: 'match-trigger-value', text: 'Choose counterpart' });
      var checkEl = el('span', { className: 'match-trigger-check', 'aria-hidden': 'true', html: '&#10003;' });
      var chevron = el('span', {
        className: 'match-trigger-chevron',
        'aria-hidden': 'true',
        html: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      });
      trigger.appendChild(valueEl);
      trigger.appendChild(checkEl);
      trigger.appendChild(chevron);

      var menu = el('div', {
        className: 'match-menu',
        role: 'listbox',
        id: menuId,
        'aria-label': 'Choose a counterpart for ' + item,
        hidden: 'true'
      });
      var options = matches.map(function (m, j) {
        var opt = el('div', {
          className: 'match-option',
          role: 'option',
          id: menuId + '-opt-' + j,
          'aria-selected': 'false',
          onClick: function () { chooseMatch(i, j); }
        }, [
          el('span', { className: 'match-option-text', html: renderChoiceHtml(m) }),
          el('span', { className: 'match-option-check', 'aria-hidden': 'true', html: '&#10003;' }),
          el('span', { className: 'match-option-used', 'aria-hidden': 'true', text: 'used' })
        ]);
        menu.appendChild(opt);
        return opt;
      });
      control.appendChild(trigger);
      control.appendChild(menu);
      row.appendChild(control);
      rows.appendChild(row);

      var st = {
        i: i,
        row: row,
        control: control,
        trigger: trigger,
        valueEl: valueEl,
        menu: menu,
        options: options,
        activeIdx: -1,
        open: false
      };
      rowState.push(st);
      trigger.addEventListener('keydown', function (e) { onTriggerKey(st, e); });
    });
    container.appendChild(rows);
    attachMatchDocListeners();
    // Paint any restored answers (exam player re-renders from the saved
    // session) into the triggers and used/selected markers.
    rowState.forEach(function (st) { refreshRow(st); });

    function read() {
      return values.slice();
    }

    function toggleMatchMenu(i) {
      var st = rowState[i];
      if (st.open) { closeMatchMenu(st); return; }
      openMatchMenu(st);
    }

    function openMatchMenu(st) {
      if (!st.options.length) return;
      // Only one row's popover is open at a time.
      openMatchMenus.slice().forEach(function (other) {
        if (other !== st) closeMatchMenu(other);
      });
      st.open = true;
      st.row.classList.add('active');
      st.trigger.setAttribute('aria-expanded', 'true');
      st.menu.hidden = false;
      st.activeIdx = values[st.i] != null ? values[st.i] : 0;
      setActiveOption(st, st.activeIdx);
      // Flip the popover above the row when it would run off the viewport.
      var rect = st.control.getBoundingClientRect();
      var menuHeight = st.menu.offsetHeight;
      st.menu.classList.toggle('up', rect.bottom + menuHeight > window.innerHeight - 12);
      openMatchMenus.push(st);
    }

    function setActiveOption(st, j) {
      var count = st.options.length;
      st.activeIdx = ((j % count) + count) % count;
      st.options.forEach(function (opt, k) {
        opt.classList.toggle('active', k === st.activeIdx);
      });
      st.trigger.setAttribute('aria-activedescendant', st.options[st.activeIdx].id);
      // Keep the highlighted option visible inside a scrollable popover
      // without scrolling the page.
      var menuRect = st.menu.getBoundingClientRect();
      var optRect = st.options[st.activeIdx].getBoundingClientRect();
      if (optRect.top < menuRect.top) st.menu.scrollTop -= (menuRect.top - optRect.top);
      else if (optRect.bottom > menuRect.bottom) st.menu.scrollTop += (optRect.bottom - menuRect.bottom);
    }

    // Assign counterpart index j to row i. A counterpart can only be used
    // once: picking one another row already holds moves it here and frees
    // that row (it returns to "Choose counterpart").
    function chooseMatch(i, j) {
      if (rowState[i].trigger.disabled) return;
      values[i] = j;
      values.forEach(function (v, k) {
        if (k !== i && v === j) values[k] = null;
      });
      rowState.forEach(function (st) { refreshRow(st); });
      closeMatchMenu(rowState[i]);
      if (opts.onChange) opts.onChange(read());
    }

    function refreshRow(st) {
      var v = values[st.i];
      var hasValue = v != null;
      var item = pairItem(q._shuffledPairs[st.i]);
      st.valueEl.textContent = hasValue ? matches[v] : 'Choose counterpart';
      st.trigger.classList.toggle('has-value', hasValue);
      st.trigger.classList.toggle('is-empty', !hasValue);
      st.trigger.setAttribute('aria-label', hasValue
        ? 'Matched ' + item + ' with ' + matches[v] + '. Press Enter to change.'
        : 'Match ' + item + ' with its counterpart');
      st.options.forEach(function (opt, j) {
        var used = values.some(function (w, k) { return k !== st.i && w === j; });
        opt.setAttribute('aria-selected', v === j ? 'true' : 'false');
        opt.classList.toggle('selected', v === j);
        opt.classList.toggle('used', used);
      });
    }

    function onTriggerKey(st, e) {
      var key = e.key;
      var handled = true;
      if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ' || key === 'Spacebar') {
        if (!st.open) {
          openMatchMenu(st);
        } else if (key === 'ArrowDown' || key === 'ArrowUp') {
          setActiveOption(st, key === 'ArrowDown' ? st.activeIdx + 1 : st.activeIdx - 1);
        } else {
          chooseMatch(st.i, st.activeIdx);
        }
      } else if (key === 'Home') {
        if (!st.open) return;
        setActiveOption(st, 0);
      } else if (key === 'End') {
        if (!st.open) return;
        setActiveOption(st, st.options.length - 1);
      } else if (key === 'Escape') {
        if (!st.open) return;
        closeMatchMenu(st);
      } else {
        handled = false;
      }
      if (handled) {
        // Keep the quiz/exam players' document-level shortcuts (Enter
        // submits, Space advances) from firing while the picker owns the key.
        e.preventDefault();
        e.stopPropagation();
      }
    }

    var submitBtn = null;

    function lock() {
      openMatchMenus.slice().forEach(function (st) { closeMatchMenu(st); });
      rowState.forEach(function (st) { st.trigger.disabled = true; });
      if (submitBtn) submitBtn.disabled = true;
      q._shuffledPairs.forEach(function (pair, i) {
        var st = rowState[i];
        var chosen = values[i];
        var correctIdx = (q._correctMatchIdx || q._correctDescIdx || [])[i];
        if (correctIdx === chosen) {
          st.row.classList.add('correct');
        } else {
          st.row.classList.add('wrong');
          st.row.appendChild(el('span', {
            className: 'match-correct',
            html: inlineHtml('→ ' + matches[correctIdx])
          }));
        }
      });
    }

    if (opts.submitLabel) {
      submitBtn = el('button', {
        className: 'btn btn-primary mt-1',
        text: opts.submitLabel,
        onClick: function () {
          if (opts.locked) return;
          var arr = read();
          if (arr.some(function (v) { return v == null; })) {
            App.toast('Match every item before submitting', 'error');
            return;
          }
          opts.onSubmit(arr);
        }
      });
      container.appendChild(submitBtn);
    }

    return { lock: lock, read: read };
  }

  // Public compatibility alias for callers that used the command-specific name.
  var renderCommandMatchUI = renderMatchUI;

  /* ── Render single question (for search modal) ──────────── */
  function renderSingle(container, rawQ) {
    var q = prepareQuestion(rawQ);
    var answered = false;
    container.appendChild(el('div', { className: 'question-text', html: App.markdown.renderInline(q.q || '') }));
    var optsWrap = el('div', { className: 'options-list' });

    function finish(correct, explain) {
      answered = true;
      optsWrap.querySelectorAll('.option-btn').forEach(function (b) { b.disabled = true; });
      var exp = el('div', { className: 'explain-panel' }, [
        el('strong', { text: correct ? 'Correct. ' : 'Incorrect. ' }),
        el('span', { html: App.markdown.renderInline(explain || q.explain || '') })
      ]);
      container.appendChild(exp);
      App.store.logAnswer({
        qId: q._id,
        cert: q._cert,
        chapter: q._chapter,
        tags: q.tags || [],
        correct: correct,
        type: q.type,
        mode: 'practice'
      });
    }

    if (q._invalid) {
      optsWrap.appendChild(el('div', { className: 'empty-state', style: { padding: '1rem' } }, [
        el('h3', { text: 'Question unavailable' }),
        el('p', { text: q._invalidReason || 'This question has invalid answer data and was not shown.' })
      ]));
    } else if (q.type === 'mcq' || q.type === 'tf') {
      var options = q.type === 'tf'
        ? [{ text: 'True', origIdx: true }, { text: 'False', origIdx: false }]
        : q._shuffledOptions;
      options.forEach(function (opt, i) {
        var key = String.fromCharCode(65 + i);
        var btn = el('button', {
          className: 'option-btn',
          onClick: function () {
            if (answered) return;
            var correct = q.type === 'tf' ? (opt.origIdx === q.answer) : (i === q._correctShuffled);
            btn.classList.add(correct ? 'correct' : 'wrong');
            if (!correct && q.type === 'mcq') {
              var correctBtn = optsWrap.children[q._correctShuffled];
              if (correctBtn) correctBtn.classList.add('correct');
            }
            finish(correct, q.explain);
          }
        }, [
          el('span', { className: 'option-key', text: key }),
          el('span', { html: renderChoiceHtml(opt.text) })
        ]);
        optsWrap.appendChild(btn);
      });
    } else if (q.type === 'fill') {
      var input = el('input', { className: 'form-control', type: 'text', placeholder: 'Type your answer…' });
      var submit = el('button', {
        className: 'btn btn-primary mt-1',
        text: 'Check',
        onClick: function () {
          if (answered) return;
          var correct = checkAnswer(q, input.value);
          finish(correct, q.explain);
        }
      });
      optsWrap.appendChild(input);
      optsWrap.appendChild(submit);
    } else if (q.type === 'multi') {
      var selected = {};
      q._shuffledOptions.forEach(function (opt, i) {
        var key = String.fromCharCode(65 + i);
        var btn = el('button', {
          className: 'option-btn',
          onClick: function () {
            if (answered) return;
            selected[i] = !selected[i];
            btn.style.borderColor = selected[i] ? 'var(--accent-cyan)' : '';
          }
        }, [
          el('span', { className: 'option-key', text: key }),
          el('span', { html: renderChoiceHtml(opt.text) })
        ]);
        optsWrap.appendChild(btn);
      });
      optsWrap.appendChild(el('button', {
        className: 'btn btn-primary mt-1',
        text: 'Submit',
        onClick: function () {
          if (answered) return;
          var ua = Object.keys(selected).filter(function (k) { return selected[k]; }).map(Number);
          var correct = checkAnswer(q, ua);
          optsWrap.querySelectorAll('.option-btn').forEach(function (b, i) {
            if ((q._correctShuffled || []).indexOf(i) >= 0) b.classList.add('correct');
            else if (selected[i]) b.classList.add('wrong');
          });
          finish(correct, q.explain);
        }
      }));
    } else if (isMatchQuestion(q)) {
      if (q._invalid) {
        optsWrap.appendChild(el('div', { className: 'empty-state', style: { padding: '1rem' } }, [
          el('h3', { text: 'Question unavailable' }),
          el('p', { text: 'This matching question is missing required data (pairs or a valid counterpart on each side).' })
        ]));
      } else {
        var ui = renderMatchUI(optsWrap, q, {
          submitLabel: 'Check',
          onSubmit: function (arr) {
            if (answered) return;
            ui.lock();
            finish(checkAnswer(q, arr), q.explain);
          }
        });
      }
    }
    container.appendChild(optsWrap);
  }

  /* ── Exam simulation ────────────────────────────────────── */
  var examSession = null;

  function startExam(config) {
    var pool = App.content.getByCert('questions', config.cert);
    if (!pool.length) {
      App.toast('No questions for this cert', 'error');
      return null;
    }
    var questions = randomizeQuestionOrder(pool).map(prepareQuestion).filter(function (q) { return !q._invalid; });
    var count = Math.min(config.count || 50, questions.length);
    questions = questions.slice(0, count);
    if (!questions.length) {
      App.toast('No valid questions for this certification', 'error');
      return null;
    }
    var timeLimit = config.timeLimit || (count * 75); // seconds
    examSession = {
      cert: config.cert,
      contentVersion: currentContentVersion(),
      questions: questions,
      answers: {}, // index -> userAnswer
      flagged: {},
      index: 0,
      startTime: Date.now(),
      timeLimit: timeLimit,
      remaining: timeLimit,
      timer: null,
      submitted: false
    };
    App.store.saveExamSession(examSession);
    return examSession;
  }

  function examAnswer(idx, answer) {
    if (!examSession || examSession.submitted) return;
    examSession.answers[idx] = answer;
    App.store.saveExamSession(examSession);
  }

  function examFlag(idx) {
    if (!examSession) return;
    examSession.flagged[idx] = !examSession.flagged[idx];
    App.store.saveExamSession(examSession);
  }

  function submitExam() {
    if (!examSession || examSession.submitted) return null;
    examSession.submitted = true;
    if (examSession.timer) clearInterval(examSession.timer);

    var results = [];
    var correctCount = 0;
    examSession.questions.forEach(function (q, i) {
      var ua = examSession.answers[i];
      var ok = ua !== undefined && checkAnswer(q, ua);
      if (ok) correctCount++;
      results.push({ question: q, userAnswer: ua, correct: ok });
    });
    var score = Math.round((correctCount / examSession.questions.length) * 100);
    var settings = App.store.getSettings();
    var threshold = (settings.passThreshold && settings.passThreshold[examSession.cert]) || 70;
    var passed = score >= threshold;

    var attempt = {
      cert: examSession.cert,
      score: score,
      passed: passed,
      correct: correctCount,
      total: examSession.questions.length,
      timeMs: Date.now() - examSession.startTime,
      threshold: threshold
    };
    App.store.saveExamAttempt(attempt);

    // Log each answer
    results.forEach(function (r) {
      App.store.logAnswer({
        qId: r.question._id,
        cert: r.question._cert,
        chapter: r.question._chapter,
        tags: r.question.tags || [],
        correct: r.correct,
        type: r.question.type,
        mode: 'exam'
      });
    });

    App.store.addTimeOnTask(attempt.timeMs);
    App.store.clearExamSession();

    var tagMap = {};
    results.forEach(function (r) {
      (r.question.tags || []).forEach(function (t) {
        if (!tagMap[t]) tagMap[t] = { correct: 0, total: 0 };
        tagMap[t].total++;
        if (r.correct) tagMap[t].correct++;
      });
    });

    var full = {
      attempt: attempt,
      results: results,
      tagBreakdown: Object.keys(tagMap).map(function (t) {
        return { tag: t, correct: tagMap[t].correct, total: tagMap[t].total, pct: Math.round((tagMap[t].correct / tagMap[t].total) * 100) };
      })
    };
    examSession = null;
    return full;
  }

  // Discard an in-progress quiz without counting it: nothing was written to
  // the stats log yet (answers commit only in endQuiz), so clearing the
  // in-memory session leaves statistics untouched.
  function discardQuiz() {
    if (session && session.speedTimer) clearInterval(session.speedTimer);
    App.store.clearQuizSession();
    session = null;
  }

  function discardExam() {
    if (examSession && examSession.timer) clearInterval(examSession.timer);
    App.store.clearExamSession();
    examSession = null;
  }

  function getExamSession() {
    if (!examSession && App.store.getExamSession) {
      var saved = App.store.getExamSession();
      var checked = sanitizeExamSession(saved);
      if (!checked) {
        if (saved && App.store.clearExamSession) App.store.clearExamSession();
        return null;
      }
      examSession = checked.state;
      if (checked.changed && App.store.saveExamSession) App.store.saveExamSession(examSession);
    }
    return examSession;
  }
  function getQuizSession() {
    if (!session && App.store.getQuizSession) {
      var saved = App.store.getQuizSession();
      var checked = sanitizeQuizSession(saved);
      if (!checked) {
        if (saved && App.store.clearQuizSession) App.store.clearQuizSession();
        return null;
      }
      session = checked.state;
      if (checked.changed && App.store.saveQuizSession) App.store.saveQuizSession(session);
    }
    return session;
  }

  App.quiz = {
    startQuiz: startQuiz,
    currentQ: currentQ,
    submitAnswer: submitAnswer,
    nextQuestion: nextQuestion,
    skipQuestion: skipQuestion,
    endQuiz: endQuiz,
    buildPool: buildPool,
    randomizeQuestionOrder: randomizeQuestionOrder,
    prepareQuestion: prepareQuestion,
    isValidMcqAnswer: isValidMcqAnswer,
    isValidMultiAnswer: isValidMultiAnswer,
    checkAnswer: checkAnswer,
    normalizeAnswer: normalizeAnswer,
    splitAnswerAcronym: splitAnswerAcronym,
    acceptedAnswerForms: acceptedAnswerForms,
    isMatchQuestion: isMatchQuestion,
    sanitizeMatch: sanitizeMatch,
    sanitizeCommandMatch: sanitizeCommandMatch,
    renderMatchUI: renderMatchUI,
    renderCommandMatchUI: renderCommandMatchUI,
    renderSingle: renderSingle,
    startExam: startExam,
    examAnswer: examAnswer,
    examFlag: examFlag,
    submitExam: submitExam,
    discardQuiz: discardQuiz,
    discardExam: discardExam,
    getExamSession: getExamSession,
    getQuizSession: getQuizSession,
    renderChoiceHtml: renderChoiceHtml,
    sanitizeQuizSession: sanitizeQuizSession,
    sanitizeExamSession: sanitizeExamSession
  };
})();
