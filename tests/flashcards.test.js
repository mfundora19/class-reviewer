/* ReviewApp · flashcards.test.js
 *
 * Regression checks for flashcard reveal and grading state. A card remains
 * gradeable after the learner flips it back to the front face.
 *
 * Run with: node tests/flashcards.test.js
 */
'use strict';

var assert = require('assert');

var savedSessions = [];
global.window = {
  ReviewApp: {
    core: {
      utils: {
        uid: function () { return 'test-session'; },
        shuffle: function (items) { return items.slice(); }
      }
    },
    store: {
      cardsDue: function (keys) { return keys.slice(); },
      setLastStudy: function () {},
      saveFlashSession: function (state) { savedSessions.push(state); },
      getFlashSession: function () { return null; }
    },
    toast: function () {}
  }
};

require('../app/js/flashcards.js');
var flashcards = global.window.ReviewApp.flashcards;
var card = {
  _id: 'card-1',
  _cert: 'CERT',
  _chapter: 'CH',
  front: 'Front',
  back: 'Back'
};

flashcards.startSession([card], { cert: 'CERT', chapter: 'CH' });
assert.strictEqual(flashcards.canGrade(), false,
  'a card should not be gradeable before its first manual flip');

flashcards.flip();
assert.strictEqual(flashcards.canGrade(), true,
  'a card should be gradeable after its first manual flip');

flashcards.flip();
assert.strictEqual(flashcards.currentCard(), card,
  'flipping back should keep the same card active');
assert.strictEqual(flashcards.canGrade(), true,
  'a card should remain gradeable when showing the front again');

assert.strictEqual(flashcards.grade('next'), false,
  'grading the final card should complete the session');
assert.strictEqual(flashcards.getSession().finished, true,
  'grading after flipping back should advance the card normally');
assert.ok(savedSessions.length >= 3, 'flip and grade state should remain persisted');

console.log('PASS: flashcard grading works after returning to the front face');
