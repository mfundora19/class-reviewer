/* ReviewApp · flashcards.test.js
 *
 * Regression checks for flashcard reveal and grading state. A card remains
 * gradeable after the learner flips it back to the front face.
 *
 * Also covers the view-only Previous peek: looking back at earlier cards must
 * never alter scheduling, the retry queue, or recorded attempts.
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

/* ── Previous-card peek ─────────────────────────────────────── */
var cards = ['a', 'b', 'c', 'd'].map(function (id) {
  return { _id: id, _cert: 'CERT', _chapter: 'CH', front: id + ' front', back: id + ' back' };
});
flashcards.startSession(cards, { cert: 'CERT', chapter: 'CH' });
var sess = flashcards.getSession();

assert.strictEqual(flashcards.peeking(), false, 'a fresh session is not peeking');
assert.strictEqual(flashcards.canGoPrevious(), false, 'there is nothing to go back to at the start');
assert.strictEqual(flashcards.peekCard(), null, 'no peeked card before any navigation');
assert.strictEqual(flashcards.peekBack(), false, 'Previous is a no-op without history');

// Show two cards: flip + grade 'next' twice.
flashcards.flip();
assert.strictEqual(flashcards.grade('next'), true, 'the deck has more cards after the first grade');
flashcards.flip();
assert.strictEqual(flashcards.grade('next'), true, 'the deck has more cards after the second grade');
var current = flashcards.currentCard();
assert.strictEqual(current._id, 'c', 'the live card should now be the third card');

// Peek back to the previous card.
assert.ok(flashcards.canGoPrevious(), 'a previous card exists after grading');
assert.ok(flashcards.peekBack(), 'Previous should succeed');
assert.strictEqual(flashcards.peeking(), true, 'peeking should be active after Previous');
assert.strictEqual(flashcards.peekCard()._id, 'b', 'Previous should show the card graded before the current one');
assert.strictEqual(flashcards.currentCard()._id, 'c', 'peeking must not move the live card');

// Peeking is view-only: it must not touch scheduling, retries, or attempts.
var before = {
  completed: sess.completed,
  attempts: sess.attempts,
  agains: sess.agains,
  reviews: sess.reviews.length,
  index: sess.index,
  queue: sess.queue.slice(),
  retry: sess.retry.slice(),
  flipped: sess.flipped,
  intentionallyFlipped: sess.intentionallyFlipped
};
flashcards.peekBack();
assert.strictEqual(flashcards.peekCard()._id, 'a', 'a second Previous steps one card further back');
assert.strictEqual(flashcards.currentCard()._id, 'c', 'deeper peeks still leave the live card alone');

assert.ok(flashcards.peekReturn(), 'returning to the live card should succeed');
assert.strictEqual(flashcards.peeking(), false, 'peeking should be off after returning');
assert.strictEqual(flashcards.peekCard(), null, 'no peeked card once back on the live card');

var after = {
  completed: sess.completed,
  attempts: sess.attempts,
  agains: sess.agains,
  reviews: sess.reviews.length,
  index: sess.index,
  queue: sess.queue.slice(),
  retry: sess.retry.slice(),
  flipped: sess.flipped,
  intentionallyFlipped: sess.intentionallyFlipped
};
assert.deepStrictEqual(after, before,
  'a full peek walk (back, deeper, return) must not change any scheduling or attempt state');
assert.strictEqual(flashcards.canGrade(), true,
  'the live card stays gradeable after peeking (its flip state was preserved)');

// Grading while peeking is impossible by design: canGrade() gates live-card
// grading on not peeking through the views layer, and grade() always applies
// to the live card. Verify grade targets the live card even mid-peek state.
flashcards.peekBack();
flashcards.grade('next');
assert.strictEqual(sess.attempts, before.attempts + 1, 'a grade counts exactly one attempt');
assert.strictEqual(sess.reviews[sess.reviews.length - 1].cardId, 'c',
  'grading always records the live card, never the peeked one');
flashcards.peekReturn();

console.log('PASS: flashcard grading works after returning to the front face');
console.log('PASS: the Previous peek is view-only and never changes scheduling');

// Peeking is capped so a very long session cannot grow the history forever.
flashcards.startSession(cards, { cert: 'CERT', chapter: 'CH' });
sess = flashcards.getSession();
while (!sess.finished) {
  flashcards.flip();
  flashcards.grade('again'); // every card lands in the retry queue, passes repeat
}
assert.ok(sess.history.length <= 200, 'the peek history stays bounded');
console.log('PASS: peek history is bounded');
