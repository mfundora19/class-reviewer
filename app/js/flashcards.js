/* ═══════════════════════════════════════════════════════════
   ReviewApp · flashcards.js
   Flashcard review engine: Again / Next + retry queue + shuffle
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var utils = App.core.utils;

  var session = null;
  var pendingStartCard = null;
  var PEEK_HISTORY_MAX = 200;

  function cardKey(card) {
    return card._key || card._id;
  }

  function buildDeck(opts) {
    opts = opts || {};
    var all = App.content.getAll('flashcards');
    if (opts.cert) {
      all = all.filter(function (c) { return c._cert === opts.cert; });
    }
    if (opts.chapter) {
      all = all.filter(function (c) { return c._chapter === opts.chapter; });
    }
    if (opts.tags && opts.tags.length) {
      all = all.filter(function (c) {
        return (c.tags || []).some(function (t) { return opts.tags.indexOf(t) >= 0; });
      });
    }
    return all;
  }

  function newSessionId() {
    return 'fc_' + utils.uid();
  }

  function startSession(deck, opts) {
    opts = opts || {};
    if (!deck || !deck.length) {
      App.toast('No cards in this deck', 'error');
      return null;
    }
    var keys = deck.map(cardKey);
    var dueKeys = App.store.cardsDue(keys);
    var dueSet = {};
    dueKeys.forEach(function (k) { dueSet[k] = true; });

    // Due first, then rest shuffled
    var due = [];
    var rest = [];
    deck.forEach(function (c) {
      if (dueSet[cardKey(c)]) due.push(c);
      else rest.push(c);
    });
    rest = utils.shuffle(rest);
    var order = due.concat(rest);

    if (opts.startCard) {
      var idx = order.findIndex(function (c) { return cardKey(c) === cardKey(opts.startCard); });
      if (idx > 0) {
        var item = order.splice(idx, 1)[0];
        order.unshift(item);
      }
    }

    var cardsById = {};
    order.forEach(function (c) { cardsById[cardKey(c)] = c; });

    var cert = opts.cert || null;
    var chapter = opts.chapter || null;
    if (!cert || !chapter) {
      var first = order[0];
      if (first) {
        if (!cert) cert = first._cert || null;
        if (!chapter) chapter = first._chapter || null;
      }
    }

    session = {
      id: newSessionId(),
      ts: Date.now(),
      cert: cert,
      chapter: chapter,
      scope: opts.chapter ? 'chapter' : 'all',
      defaultFace: opts.defaultFace === 'back' ? 'back' : 'front',
      cardsById: cardsById,
      totalCards: order.length,
      queue: order.map(cardKey),
      index: 0,
      retry: [],                 // card keys marked Again in the current pass
      done: {},                  // cardKey -> true once answered Next
      stats: {},                 // cardKey -> { attempts, agains }
      flipped: opts.defaultFace === 'back',
      // The preferred starting face is not an intentional flip. Grading
      // controls should only appear after the learner flips the card.
      intentionallyFlipped: false,
      finished: false,
      completed: 0,              // cards answered Next
      agains: 0,                 // total Again marks
      attempts: 0,               // total grades
      reviews: [],               // per-attempt records, committed only on completion
      history: [],               // cards shown so far, for the view-only Previous peek
      peekStep: 0                // how many history steps back the learner is viewing
    };
    App.store.setLastStudy({ type: 'flashcards', cert: session.cert, ts: Date.now() });
    persistSession();
    return session;
  }

  function getSession() {
    if (!session) session = App.store.getFlashSession();
    if (session) {
      if (!session.defaultFace) session.defaultFace = session.flipped ? 'back' : 'front';
      // Before `intentionallyFlipped` was persisted, a saved back-facing card
      // could only have reached that state through a manual flip.
      if (typeof session.intentionallyFlipped !== 'boolean') session.intentionallyFlipped = !!session.flipped;
      // Sessions saved before the Previous peek existed have no history; older
      // snapshots may also carry a peekStep that no longer fits the queue.
      if (!Array.isArray(session.history)) session.history = [];
      if (!(session.peekStep > 0)) session.peekStep = 0;
      if (session.peekStep > session.history.length) session.peekStep = session.history.length;
    }
    return session;
  }

  function persistSession() {
    if (session) App.store.saveFlashSession(session);
  }

  function currentKey() {
    if (!session || session.finished) return null;
    return session.queue[session.index] || null;
  }

  function currentCard() {
    var k = currentKey();
    if (!k) return null;
    return session.cardsById[k] || null;
  }

  function flip() {
    if (!session) return;
    session.flipped = !session.flipped;
    session.intentionallyFlipped = true;
    persistSession();
  }

  /* ── Previous-card peek (view-only) ────────────────────────
     The learner can look back at cards already shown without affecting the
     Leitner schedule, the retry queue, or any recorded attempt: peeking never
     calls grade(), logCardReview, or gradeCard, and grading controls are
     hidden while a previous card is on screen. */
  function pushHistory(key) {
    if (!key) return;
    var h = session.history || (session.history = []);
    if (h[h.length - 1] === key) return;
    h.push(key);
    if (h.length > PEEK_HISTORY_MAX) h.shift();
    // A peek cursor deeper than the history is meaningless after a change.
    if (session.peekStep > h.length) session.peekStep = h.length;
  }

  function peeking() {
    return !!(session && session.peekStep > 0 && session.history.length);
  }

  function canGoPrevious() {
    return !!(session && !session.finished && (session.peekStep || 0) < session.history.length);
  }

  /* The card currently being viewed while peeking, or null for the live one. */
  function peekCard() {
    if (!session || !(session.peekStep > 0)) return null;
    var key = session.history[session.history.length - session.peekStep];
    return (key && session.cardsById[key]) || null;
  }

  /* Step one card further back. Purely visual: no scheduling state changes. */
  function peekBack() {
    if (!canGoPrevious()) return false;
    session.peekStep = (session.peekStep || 0) + 1;
    persistSession();
    return true;
  }

  /* Return from the peek to the live session card. */
  function peekReturn() {
    if (!session || !(session.peekStep > 0)) return false;
    session.peekStep = 0;
    persistSession();
    return true;
  }

  function canGrade() {
    return !!(session && !session.finished && session.intentionallyFlipped);
  }

  // Change the preferred face without altering the current card or its queue.
  function setDefaultFace(face) {
    var active = getSession();
    if (!active || active.finished) return null;
    active.defaultFace = face === 'back' ? 'back' : 'front';
    active.flipped = active.defaultFace === 'back';
    active.intentionallyFlipped = false;
    persistSession();
    return active.defaultFace;
  }

  /* Move forward; promote the retry queue when the current pass ends.
     The card being left is recorded in the peek history so Previous can show
     it again later without re-grading it. */
  function advance() {
    if (session.index + 1 < session.queue.length) {
      pushHistory(session.queue[session.index]);
      session.index++;
      return true;
    }
    if (session.retry.length) {
      pushHistory(session.queue[session.index]);
      session.queue = session.retry;
      session.retry = [];
      session.index = 0;
      return true;
    }
    return false; // session complete
  }

  function grade(gradeName) {
    if (!session) return null;
    var k = currentKey();
    if (!k) return null;
    var card = session.cardsById[k];
    var st = session.stats[k] || (session.stats[k] = { attempts: 0, agains: 0 });
    st.attempts++;
    session.attempts++;

    // Record the attempt locally. Nothing reaches the stats log or the Leitner
    // scheduler until the whole deck is completed, so an abandoned session
    // never counts toward statistics (see commitSession).
    session.reviews.push({
      cardId: k,
      cert: card._cert || session.cert || null,
      chapter: card._chapter || session.chapter || null,
      tags: card.tags || [],
      outcome: gradeName,       // 'again' | 'next'
      attempt: st.attempts,
      ts: Date.now()
    });

    if (gradeName === 'again') {
      st.agains++;
      session.agains++;
      session.retry.push(k);    // retry later, never immediately
    } else {
      session.completed++;
      session.done[k] = true;
    }
    session.flipped = session.defaultFace === 'back';
    session.intentionallyFlipped = false;
    var more = advance();
    if (!more) session.finished = true;
    persistSession();
    return more; // true = more cards remain, false = complete
  }

  /* Shuffle remaining (ungraded) active cards + the retry queue.
     Never drops, duplicates, resets progress, or replaces the current card. */
  function shuffleList(list) {
    if (list.length < 2) return list.slice();
    var original = list.slice();
    var shuffled = utils.shuffle(list);
    var unchanged = shuffled.every(function (item, index) { return item === original[index]; });
    // A random shuffle can coincidentally produce the same order. Make the
    // control visibly meaningful whenever there are at least two cards.
    if (unchanged) {
      var swap = shuffled[0];
      shuffled[0] = shuffled[1];
      shuffled[1] = swap;
    }
    return shuffled;
  }

  function shuffle() {
    if (!session || session.finished) return false;

    // Keep cards already answered Next behind us, but put every unresolved
    // card — including the current card and retry cards — into one new deck.
    // Moving the index to the new deck head makes the shuffled card appear
    // immediately instead of leaving the old card on screen.
    var completedHead = session.queue.slice(0, session.index).filter(function (key) {
      return !!session.done[key];
    });
    var currentKey = session.queue[session.index] || null;
    var unresolved = session.queue.slice(session.index).concat(session.retry);
    if (unresolved.length < 2) {
      persistSession();
      return false;
    }

    var shuffled = shuffleList(unresolved);
    // Do not leave the same card visible after pressing Shuffle when another
    // unresolved card is available.
    if (shuffled[0] === currentKey) {
      var swapIndex = shuffled.findIndex(function (key) { return key !== currentKey; });
      if (swapIndex > 0) {
        var swap = shuffled[0];
        shuffled[0] = shuffled[swapIndex];
        shuffled[swapIndex] = swap;
      }
    }

    session.queue = completedHead.concat(shuffled);
    session.index = completedHead.length;
    // Retry cards merge into the new deck; an empty retry list here is the
    // documented pre-existing behavior of shuffle, not a peek side effect.
    session.retry = [];
    pushHistory(currentKey);
    session.flipped = session.defaultFace === 'back';
    session.intentionallyFlipped = false;
    persistSession();
    return true;
  }

  function buildSummary() {
    var neededReview = 0;
    var withoutRetry = 0;
    var tagCount = {};
    Object.keys(session.stats).forEach(function (k) {
      var s = session.stats[k];
      var card = session.cardsById[k] || {};
      if (s.agains > 0) {
        neededReview++;
        (card.tags || []).forEach(function (t) { tagCount[t] = (tagCount[t] || 0) + 1; });
      } else {
        withoutRetry++;
      }
    });
    var focus = Object.keys(tagCount).sort(function (a, b) { return tagCount[b] - tagCount[a]; });
    return {
      id: session.id,
      ts: session.ts,
      cert: session.cert,
      chapter: session.chapter,
      totalCards: session.totalCards,
      completed: session.completed,
      neededReview: neededReview,
      withoutRetry: withoutRetry,
      repeatAttempts: session.agains,
      focusAreas: focus.slice(0, 3)
    };
  }

  /* Apply a completed session's deferred effects: write every recorded attempt
     to the stats log and advance the Leitner scheduler. Called only when the
     whole deck is finished, so incomplete sessions never count toward stats.
     Sessions saved before this change carry no `reviews` list (their attempts
     were already logged live), so they simply keep their legacy behavior. */
  function commitSession() {
    if (!session) return;
    (session.reviews || []).forEach(function (r) {
      App.store.logCardReview({
        cardId: r.cardId,
        cert: r.cert,
        chapter: r.chapter,
        tags: r.tags || [],
        outcome: r.outcome,
        sessionId: session.id,
        sessionTs: session.ts,
        attempt: r.attempt,
        ts: r.ts
      });
      // Spaced-repetition scheduling (existing Leitner boxes)
      App.store.gradeCard(r.cardId, r.outcome === 'again' ? 'again' : 'good');
    });
  }

  function endSession() {
    var summary = null;
    if (session) {
      commitSession();
      summary = buildSummary();
      App.store.saveFlashSessionSummary(summary);
      App.store.clearFlashSession();
    }
    session = null;
    return summary;
  }

  /* Discard the in-progress session without counting it toward statistics. */
  function cancelSession() {
    if (session) App.store.clearFlashSession();
    session = null;
  }

  function startWithCard(card) {
    pendingStartCard = card;
  }

  function consumePendingCard() {
    var c = pendingStartCard;
    pendingStartCard = null;
    return c;
  }

  App.flashcards = {
    buildDeck: buildDeck,
    startSession: startSession,
    currentCard: currentCard,
    flip: flip,
    canGrade: canGrade,
    setDefaultFace: setDefaultFace,
    grade: grade,
    shuffle: shuffle,
    endSession: endSession,
    cancelSession: cancelSession,
    getSession: getSession,
    startWithCard: startWithCard,
    consumePendingCard: consumePendingCard,
    cardKey: cardKey,
    peeking: peeking,
    canGoPrevious: canGoPrevious,
    peekCard: peekCard,
    peekBack: peekBack,
    peekReturn: peekReturn
  };
})();
