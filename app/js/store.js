/* ═══════════════════════════════════════════════════════════
   ReviewApp · store.js
   IndexedDB-backed user persistence & stats engine.
   The public API stays synchronous after store.init() has completed so the
   existing views can keep their current rendering architecture.
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var PREFIX = 'reviewapp.v1.';
  var MIGRATION_VERSION = 1;
  var initialized = false;
  var available = false;
  var initPromise = null;
  var writeQueue = Promise.resolve();
  var startupNotice = null;
  var lastWriteError = null;

  var DEFAULT_SETTINGS = {
    theme: 'monokai',
    textSize: 'medium',
    animations: true,
    passThreshold: { 'linux-plus': 70, 'network-plus': 70 },
    lastStudy: null,
    sidebarCollapsed: false
  };

  var memory = {
    currentCert: null,
    answers: [],
    streak: { last: null, count: 0, best: 0 },
    exams: [],
    labsDone: {},
    labStepsDone: {},
    leitner: {},
    cardReviews: [],
    flashSessions: [],
    activeSessions: {},
    personalNotes: [],
    settings: clone(DEFAULT_SETTINGS),
    timeOnTask: 0,
    contentSnapshot: null
  };

  function uid() {
    return 'id_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function clone(value) {
    if (value == null) return value;
    try { return JSON.parse(JSON.stringify(value)); } catch (e) { return value; }
  }

  function isObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value);
  }

  function key(k) { return PREFIX + k; }

  function resetMemory() {
    memory.currentCert = null;
    memory.answers = [];
    memory.streak = { last: null, count: 0, best: 0 };
    memory.exams = [];
    memory.labsDone = {};
    memory.labStepsDone = {};
    memory.leitner = {};
    memory.cardReviews = [];
    memory.flashSessions = [];
    memory.activeSessions = {};
    memory.personalNotes = [];
    memory.settings = clone(DEFAULT_SETTINGS);
    memory.timeOnTask = 0;
    memory.contentSnapshot = null;
  }

  /* ── Legacy localStorage migration ──────────────────────── */
  // This is the only remaining application reference to localStorage. Legacy
  // keys are intentionally left in place after a successful migration so an
  // interrupted or manually recovered profile is never destroyed.
  function readLegacyJson(name, fallback, warnings) {
    var raw;
    try {
      raw = window.localStorage.getItem(key(name));
    } catch (err) {
      warnings.push('Could not read legacy local data (' + name + ').');
      return { present: false, value: fallback };
    }
    if (raw == null) return { present: false, value: fallback };
    try {
      return { present: true, value: JSON.parse(raw) };
    } catch (err) {
      warnings.push('Legacy data for ' + name + ' was malformed and was skipped.');
      return { present: true, value: fallback };
    }
  }

  function readLegacyRaw(name, fallback, warnings) {
    try {
      var value = window.localStorage.getItem(key(name));
      return { present: value != null, value: value == null ? fallback : value };
    } catch (err) {
      warnings.push('Could not read legacy local data (' + name + ').');
      return { present: false, value: fallback };
    }
  }

  function objectMap(value, name, warnings) {
    if (value == null) return {};
    if (!isObject(value)) {
      warnings.push('Legacy data for ' + name + ' had an unexpected shape and was skipped.');
      return {};
    }
    return value;
  }

  function objectArray(value, name, limit, warnings, newestFirst) {
    if (value == null) return [];
    if (!Array.isArray(value)) {
      warnings.push('Legacy data for ' + name + ' had an unexpected shape and was skipped.');
      return [];
    }
    var list = value.filter(isObject).map(function (item, index) {
      var copy = clone(item);
      if (!copy.id) copy.id = 'legacy_' + name + '_' + index + '_' + uid();
      return copy;
    });
    if (value.length !== list.length) warnings.push('Some malformed entries in ' + name + ' were skipped.');
    if (!limit || list.length <= limit) return list;
    return newestFirst ? list.slice(0, limit) : list.slice(-limit);
  }

  function certFromKey(value) {
    var text = String(value || '');
    var colon = text.indexOf(':');
    return colon > 0 ? text.slice(0, colon) : null;
  }

  function labIdAndStep(value) {
    var text = String(value || '');
    var colon = text.lastIndexOf(':');
    if (colon <= 0) return null;
    var index = Number(text.slice(colon + 1));
    if (!isFinite(index) || index < 0) return null;
    return { labId: text.slice(0, colon), stepIndex: index };
  }

  function normalizeSettings(value, directTheme, directSidebar, warnings) {
    var settings = clone(DEFAULT_SETTINGS);
    if (isObject(value)) {
      Object.keys(value).forEach(function (name) { settings[name] = clone(value[name]); });
    } else if (value != null) {
      warnings.push('Legacy settings had an unexpected shape; defaults were used where necessary.');
    }
    if (directTheme) settings.theme = directTheme;
    if (directSidebar != null) settings.sidebarCollapsed = directSidebar === '1';
    if (!isObject(settings.passThreshold)) settings.passThreshold = clone(DEFAULT_SETTINGS.passThreshold);
    return settings;
  }

  function migrationRecords(warnings) {
    var currentCert = readLegacyJson('currentCert', null, warnings).value;
    if (typeof currentCert !== 'string') currentCert = null;

    var answers = objectArray(readLegacyJson('answers', [], warnings).value, 'answers', 5000, warnings, false);
    var exams = objectArray(readLegacyJson('exams', [], warnings).value, 'exams', 100, warnings, true);
    var cardReviews = objectArray(readLegacyJson('cardReviews', [], warnings).value, 'cardReviews', 20000, warnings, false);
    var flashSessions = objectArray(readLegacyJson('flashSessions', [], warnings).value, 'flashSessions', 200, warnings, true);
    var personalNotes = objectArray(readLegacyJson('personalNotes', [], warnings).value, 'personalNotes', 5000, warnings, false);

    var labsDone = objectMap(readLegacyJson('labsDone', {}, warnings).value, 'labsDone', warnings);
    var labStepsDone = objectMap(readLegacyJson('labStepsDone', {}, warnings).value, 'labStepsDone', warnings);
    var leitner = objectMap(readLegacyJson('leitner', {}, warnings).value, 'leitner', warnings);
    var labProgress = [];

    Object.keys(labsDone).forEach(function (labId) {
      var ts = Number(labsDone[labId]);
      if (!isFinite(ts) || ts <= 0) return;
      labProgress.push({
        key: labId,
        kind: 'lab',
        labId: labId,
        cert: certFromKey(labId),
        completedAt: ts
      });
    });
    Object.keys(labStepsDone).forEach(function (stepKey) {
      var parsed = labIdAndStep(stepKey);
      var ts = Number(labStepsDone[stepKey]);
      if (!parsed || !isFinite(ts) || ts <= 0) return;
      labProgress.push({
        key: stepKey,
        kind: 'step',
        labId: parsed.labId,
        stepIndex: parsed.stepIndex,
        cert: certFromKey(parsed.labId),
        completedAt: ts
      });
    });

    var leitnerRecords = [];
    Object.keys(leitner).forEach(function (cardKey) {
      if (!isObject(leitner[cardKey])) return;
      var state = clone(leitner[cardKey]);
      leitnerRecords.push({
        cardKey: cardKey,
        cert: certFromKey(cardKey),
        box: Number(state.box) || 1,
        lastSeen: Number(state.lastSeen) || 0,
        nextDue: Number(state.nextDue) || 0
      });
    });

    var streak = readLegacyJson('streak', { last: null, count: 0, best: 0 }, warnings).value;
    if (!isObject(streak)) streak = { last: null, count: 0, best: 0 };
    var timeOnTask = Number(readLegacyJson('timeOnTask', 0, warnings).value);
    if (!isFinite(timeOnTask) || timeOnTask < 0) timeOnTask = 0;
    var directTheme = readLegacyRaw('theme', null, warnings);
    var directSidebar = readLegacyRaw('sidebar', null, warnings);
    var settings = normalizeSettings(
      readLegacyJson('settings', {}, warnings).value,
      directTheme.present ? directTheme.value : null,
      directSidebar.present ? directSidebar.value : null,
      warnings
    );

    var flashSession = readLegacyJson('flashSession', null, warnings).value;
    if (!isObject(flashSession)) flashSession = null;
    var contentSnapshot = readLegacyJson('contentSnapshot', null, warnings).value;
    if (!isObject(contentSnapshot) || !contentSnapshot.registry) contentSnapshot = null;

    var activeSessions = [];
    if (flashSession) activeSessions.push({
      type: 'flashcards',
      state: flashSession,
      updatedAt: Date.now()
    });

    var meta = [
      { key: 'currentCert', value: currentCert, updatedAt: Date.now() },
      { key: 'streak', value: streak, updatedAt: Date.now() },
      { key: 'timeOnTask', value: timeOnTask, updatedAt: Date.now() },
      {
        key: 'migration',
        value: {
          version: MIGRATION_VERSION,
          status: 'complete',
          completedAt: Date.now(),
          warnings: warnings.slice()
        },
        updatedAt: Date.now()
      }
    ];

    var records = {
      meta: meta,
      settings: [{ key: 'settings', value: settings, updatedAt: Date.now() }],
      answers: answers,
      exams: exams,
      labProgress: labProgress,
      leitner: leitnerRecords,
      cardReviews: cardReviews,
      flashSessions: flashSessions,
      activeSessions: activeSessions,
      personalNotes: personalNotes,
      contentCache: contentSnapshot ? [{ key: 'active', registry: contentSnapshot.registry, manifest: contentSnapshot.manifest || null, ts: contentSnapshot.ts || Date.now() }] : []
    };
    return records;
  }

  function migrateLegacy() {
    return App.persistence.get('meta', 'migration').then(function (record) {
      var previous = record && record.value;
      if (previous && previous.version >= MIGRATION_VERSION && previous.status === 'complete') {
        if (previous.warnings && previous.warnings.length) startupNotice = previous.warnings.join(' ');
        return false;
      }
      var warnings = [];
      var records = migrationRecords(warnings);
      return App.persistence.putMany(records).then(function () {
        if (warnings.length) startupNotice = warnings.join(' ');
        return true;
      });
    });
  }

  /* ── IndexedDB cache loading ───────────────────────────── */
  function loadFromDatabase() {
    return Promise.all([
      App.persistence.getAll('meta'),
      App.persistence.get('settings', 'settings'),
      App.persistence.getAll('answers'),
      App.persistence.getAll('exams'),
      App.persistence.getAll('labProgress'),
      App.persistence.getAll('leitner'),
      App.persistence.getAll('cardReviews'),
      App.persistence.getAll('flashSessions'),
      App.persistence.getAll('activeSessions'),
      App.persistence.getAll('personalNotes'),
      App.persistence.get('contentCache', 'active')
    ]).then(function (all) {
      var meta = {};
      all[0].forEach(function (record) { if (record && record.key) meta[record.key] = record.value; });
      memory.currentCert = typeof meta.currentCert === 'string' ? meta.currentCert : null;
      memory.streak = isObject(meta.streak) ? meta.streak : { last: null, count: 0, best: 0 };
      memory.timeOnTask = Number(meta.timeOnTask) >= 0 ? Number(meta.timeOnTask) : 0;
      memory.settings = normalizeSettings(all[1] && all[1].value, null, null, []);
      memory.answers = all[2].filter(isObject);
      memory.exams = all[3].filter(isObject);
      memory.labsDone = {};
      memory.labStepsDone = {};
      all[4].forEach(function (record) {
        if (!record || !record.key || !record.completedAt) return;
        if (record.kind === 'lab') memory.labsDone[record.labId || record.key] = record.completedAt;
        if (record.kind === 'step') memory.labStepsDone[record.key] = record.completedAt;
      });
      memory.leitner = {};
      all[5].forEach(function (record) {
        if (record && record.cardKey) memory.leitner[record.cardKey] = {
          box: Number(record.box) || 1,
          lastSeen: Number(record.lastSeen) || 0,
          nextDue: Number(record.nextDue) || 0
        };
      });
      memory.cardReviews = all[6].filter(isObject);
      memory.flashSessions = all[7].filter(isObject);
      memory.activeSessions = {};
      all[8].forEach(function (record) {
        if (record && record.type && record.state) memory.activeSessions[record.type] = record.state;
      });
      memory.personalNotes = all[9].filter(isObject);
      memory.contentSnapshot = all[10] && all[10].registry ? {
        registry: all[10].registry,
        manifest: all[10].manifest || null,
        ts: all[10].ts || 0
      } : null;
    });
  }

  function storageErrorMessage(err) {
    if (!err) return 'Local study data could not be opened.';
    if (err.name === 'QuotaExceededError') return 'Browser storage is full. Export a backup and free some space.';
    return err.message || 'Local study data could not be opened.';
  }

  function init() {
    if (initPromise) return initPromise;
    resetMemory();
    initPromise = App.persistence.open()
      .then(function () {
        return migrateLegacy().catch(function (err) {
          startupNotice = 'Legacy data migration could not finish: ' + storageErrorMessage(err) + ' The existing database data remains intact; migration will retry on the next launch.';
          return false;
        });
      })
      .then(function () { return loadFromDatabase(); })
      .then(function () {
        initialized = true;
        available = true;
        return { available: true, notice: startupNotice };
      })
      .catch(function (err) {
        initialized = true;
        available = false;
        startupNotice = 'Local persistence is unavailable: ' + storageErrorMessage(err) + ' Progress will remain in memory until storage is repaired.';
        resetMemory();
        return { available: false, notice: startupNotice, error: err };
      });
    return initPromise;
  }

  function enqueue(task) {
    if (!available) return;
    writeQueue = writeQueue.then(function () { return task(); }).catch(function (err) {
      lastWriteError = err;
      startupNotice = 'Some local study data could not be saved: ' + storageErrorMessage(err);
      if (App.toast && document.getElementById('toast-root')) App.toast('Study data could not be saved locally. Export a backup and try again.', 'error', 5000);
    });
  }

  function flush() {
    return (initPromise || Promise.resolve()).then(function () { return writeQueue; });
  }

  function metaRecord(name, value) {
    return { key: name, value: clone(value), updatedAt: Date.now() };
  }

  function settingsRecord() {
    return { key: 'settings', value: clone(memory.settings), updatedAt: Date.now() };
  }

  function labRecords() {
    var records = [];
    Object.keys(memory.labsDone).forEach(function (labId) {
      records.push({ key: labId, kind: 'lab', labId: labId, cert: certFromKey(labId), completedAt: memory.labsDone[labId] });
    });
    Object.keys(memory.labStepsDone).forEach(function (stepKey) {
      var parsed = labIdAndStep(stepKey);
      if (!parsed) return;
      records.push({ key: stepKey, kind: 'step', labId: parsed.labId, stepIndex: parsed.stepIndex, cert: certFromKey(parsed.labId), completedAt: memory.labStepsDone[stepKey] });
    });
    return records;
  }

  function leitnerRecords() {
    return Object.keys(memory.leitner).map(function (cardKey) {
      var state = memory.leitner[cardKey] || {};
      return { cardKey: cardKey, cert: certFromKey(cardKey), box: Number(state.box) || 1, lastSeen: Number(state.lastSeen) || 0, nextDue: Number(state.nextDue) || 0 };
    });
  }

  function activeSessionRecord(type, state) {
    if (!state) return null;
    var copy = Object.assign({}, state);
    if (Object.prototype.hasOwnProperty.call(copy, 'timer')) copy.timer = null;
    if (Object.prototype.hasOwnProperty.call(copy, 'speedTimer')) copy.speedTimer = null;
    return { type: type, cert: copy.cert || null, state: copy, updatedAt: Date.now() };
  }

  function persistKey(name) {
    if (name === 'currentCert') return App.persistence.put('meta', metaRecord(name, memory.currentCert));
    if (name === 'streak' || name === 'timeOnTask') return App.persistence.put('meta', metaRecord(name, memory[name]));
    if (name === 'settings') return App.persistence.put('settings', settingsRecord());
    if (name === 'answers') return App.persistence.replace('answers', memory.answers);
    if (name === 'exams') return App.persistence.replace('exams', memory.exams);
    if (name === 'labsDone' || name === 'labStepsDone') return App.persistence.replace('labProgress', labRecords());
    if (name === 'leitner') return App.persistence.replace('leitner', leitnerRecords());
    if (name === 'cardReviews') return App.persistence.replace('cardReviews', memory.cardReviews);
    if (name === 'flashSessions') return App.persistence.replace('flashSessions', memory.flashSessions);
    if (name === 'personalNotes') return App.persistence.replace('personalNotes', memory.personalNotes);
    if (name === 'flashSession' || name === 'quizSession' || name === 'examSession') {
      var type = name.slice(0, -7);
      if (name === 'flashSession') type = 'flashcards';
      if (name === 'quizSession') type = 'quiz';
      if (name === 'examSession') type = 'exam';
      var state = memory.activeSessions[type];
      return state ? App.persistence.put('activeSessions', activeSessionRecord(type, state)) : App.persistence.remove('activeSessions', type);
    }
    if (name === 'contentSnapshot') {
      if (!memory.contentSnapshot) return App.persistence.remove('contentCache', 'active');
      return App.persistence.put('contentCache', {
        key: 'active', registry: memory.contentSnapshot.registry,
        manifest: memory.contentSnapshot.manifest || null, ts: memory.contentSnapshot.ts || Date.now()
      });
    }
    return App.persistence.put('meta', metaRecord(name, memory[name]));
  }

  function applyMemory(name, value) {
    if (name === 'currentCert') memory.currentCert = typeof value === 'string' ? value : null;
    else if (name === 'settings') memory.settings = normalizeSettings(value, null, null, []);
    else if (name === 'streak') memory.streak = isObject(value) ? value : { last: null, count: 0, best: 0 };
    else if (name === 'timeOnTask') memory.timeOnTask = Number(value) >= 0 ? Number(value) : 0;
    else if (name === 'answers') memory.answers = Array.isArray(value) ? value : [];
    else if (name === 'exams') memory.exams = Array.isArray(value) ? value : [];
    else if (name === 'labsDone') memory.labsDone = isObject(value) ? value : {};
    else if (name === 'labStepsDone') memory.labStepsDone = isObject(value) ? value : {};
    else if (name === 'leitner') memory.leitner = isObject(value) ? value : {};
    else if (name === 'cardReviews') memory.cardReviews = Array.isArray(value) ? value : [];
    else if (name === 'flashSessions') memory.flashSessions = Array.isArray(value) ? value : [];
    else if (name === 'personalNotes') memory.personalNotes = Array.isArray(value) ? value : [];
    else if (name === 'flashSession') { if (value) memory.activeSessions.flashcards = value; else delete memory.activeSessions.flashcards; }
    else if (name === 'quizSession') { if (value) memory.activeSessions.quiz = value; else delete memory.activeSessions.quiz; }
    else if (name === 'examSession') { if (value) memory.activeSessions.exam = value; else delete memory.activeSessions.exam; }
    else if (name === 'contentSnapshot') memory.contentSnapshot = value && value.registry ? value : null;
  }

  function get(name, fallback) {
    var value;
    if (name === 'currentCert') value = memory.currentCert;
    else if (name === 'settings') value = memory.settings;
    else if (name === 'streak') value = memory.streak;
    else if (name === 'timeOnTask') value = memory.timeOnTask;
    else if (name === 'answers') value = memory.answers;
    else if (name === 'exams') value = memory.exams;
    else if (name === 'labsDone') value = memory.labsDone;
    else if (name === 'labStepsDone') value = memory.labStepsDone;
    else if (name === 'leitner') value = memory.leitner;
    else if (name === 'cardReviews') value = memory.cardReviews;
    else if (name === 'flashSessions') value = memory.flashSessions;
    else if (name === 'personalNotes') value = memory.personalNotes;
    else if (name === 'flashSession') value = memory.activeSessions.flashcards || null;
    else if (name === 'quizSession') value = memory.activeSessions.quiz || null;
    else if (name === 'examSession') value = memory.activeSessions.exam || null;
    else if (name === 'contentSnapshot') value = memory.contentSnapshot;
    else value = undefined;
    return value == null && fallback !== undefined ? fallback : value;
  }

  function set(name, value) {
    applyMemory(name, value);
    enqueue(function () { return persistKey(name); });
    return true;
  }

  function remove(name) {
    applyMemory(name, null);
    enqueue(function () { return persistKey(name); });
  }

  /* ── Current certification ──────────────────────────────── */
  function getCurrentCert() { return memory.currentCert; }
  function setCurrentCert(id) { return set('currentCert', id); }

  /* ── Answer log ─────────────────────────────────────────── */
  // { id, qId, cert, chapter, tags, correct, type, ts, mode }
  function logAnswer(entry) {
    var log = memory.answers;
    entry = entry || {};
    entry.id = entry.id || uid();
    entry.ts = entry.ts || Date.now();
    log.push(entry);
    var removed = [];
    if (log.length > 5000) removed = log.splice(0, log.length - 5000);
    enqueue(function () {
      var task = Promise.resolve();
      removed.forEach(function (old) { task = task.then(function () { return App.persistence.remove('answers', old.id); }); });
      return task.then(function () { return App.persistence.put('answers', entry); });
    });
    updateStreak();
    return entry;
  }

  function getAnswers(filter) {
    var log = memory.answers;
    if (!filter) return log;
    return log.filter(function (a) {
      if (filter.cert && a.cert !== filter.cert) return false;
      if (filter.chapter && a.chapter !== filter.chapter) return false;
      if (filter.since && a.ts < filter.since) return false;
      return true;
    });
  }

  /* ── Accuracy helpers ───────────────────────────────────── */
  function accuracyFor(filter) {
    var ans = getAnswers(filter);
    if (!ans.length) return null;
    var correct = ans.filter(function (a) { return a.correct; }).length;
    return Math.round((correct / ans.length) * 100);
  }

  function questionStats(qId) {
    var ans = getAnswers().filter(function (a) { return a.qId === qId; });
    if (!ans.length) return { seen: 0, correct: 0, accuracy: null };
    var correct = ans.filter(function (a) { return a.correct; }).length;
    return { seen: ans.length, correct: correct, accuracy: Math.round((correct / ans.length) * 100) };
  }

  function weakQuestions(threshold, cert) {
    threshold = threshold == null ? 60 : threshold;
    var byQ = {};
    (cert ? getAnswers({ cert: cert }) : getAnswers()).forEach(function (a) {
      if (!byQ[a.qId]) byQ[a.qId] = { correct: 0, total: 0, tags: a.tags, cert: a.cert, chapter: a.chapter };
      byQ[a.qId].total++;
      if (a.correct) byQ[a.qId].correct++;
    });
    var weak = [];
    Object.keys(byQ).forEach(function (id) {
      var s = byQ[id];
      var acc = Math.round((s.correct / s.total) * 100);
      if (acc < threshold) weak.push({ qId: id, accuracy: acc, total: s.total, tags: s.tags, cert: s.cert, chapter: s.chapter });
    });
    return weak.sort(function (a, b) { return a.accuracy - b.accuracy; });
  }

  /* ── Streak ─────────────────────────────────────────────── */
  function updateStreak() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var todayTs = today.getTime();
    var data = memory.streak;
    if (data.last === todayTs) return data;
    var yesterday = todayTs - 86400000;
    if (data.last === yesterday) data.count += 1;
    else data.count = 1;
    data.last = todayTs;
    if (data.count > data.best) data.best = data.count;
    enqueue(function () { return App.persistence.put('meta', metaRecord('streak', data)); });
    return data;
  }

  function getStreak() { return memory.streak; }

  /* ── Activity (14-day) ──────────────────────────────────── */
  function getActivity(days, cert) {
    days = days || 14;
    var ans = cert ? getAnswers({ cert: cert }) : getAnswers();
    var map = {};
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    for (var i = days - 1; i >= 0; i--) {
      var d = new Date(now.getTime() - i * 86400000);
      map[d.getTime()] = { count: 0, correct: 0 };
    }
    ans.forEach(function (a) {
      var d = new Date(a.ts);
      d.setHours(0, 0, 0, 0);
      var k = d.getTime();
      if (map[k]) { map[k].count++; if (a.correct) map[k].correct++; }
    });
    return Object.keys(map).sort().map(function (k) { return { date: Number(k), count: map[k].count, correct: map[k].correct }; });
  }

  /* ── Exam history ───────────────────────────────────────── */
  function saveExamAttempt(attempt) {
    var hist = memory.exams;
    attempt = attempt || {};
    attempt.id = attempt.id || uid();
    attempt.ts = attempt.ts || Date.now();
    hist.unshift(attempt);
    var removed = [];
    if (hist.length > 100) removed = hist.splice(100);
    enqueue(function () {
      var task = Promise.resolve();
      removed.forEach(function (old) { task = task.then(function () { return App.persistence.remove('exams', old.id); }); });
      return task.then(function () { return App.persistence.put('exams', attempt); });
    });
    return attempt;
  }

  function getExams(cert) { return cert ? memory.exams.filter(function (e) { return e.cert === cert; }) : memory.exams; }

  /* ── Labs completed ─────────────────────────────────────── */
  function labProgressRecord(keyName, kind, labId, stepIndex, ts) {
    return { key: keyName, kind: kind, labId: labId, stepIndex: stepIndex, cert: certFromKey(labId), completedAt: ts };
  }

  function markLabComplete(labId) {
    memory.labsDone[labId] = Date.now();
    var ts = memory.labsDone[labId];
    enqueue(function () { return App.persistence.put('labProgress', labProgressRecord(labId, 'lab', labId, null, ts)); });
  }

  function isLabDone(labId) { return !!memory.labsDone[labId]; }

  function stepKey(labId, stepIndex) { return labId + ':' + stepIndex; }

  function markStepDone(labId, stepIndex) {
    var keyName = stepKey(labId, stepIndex);
    memory.labStepsDone[keyName] = Date.now();
    var parsed = labIdAndStep(keyName);
    var ts = memory.labStepsDone[keyName];
    enqueue(function () { return App.persistence.put('labProgress', labProgressRecord(keyName, 'step', parsed ? parsed.labId : labId, parsed ? parsed.stepIndex : stepIndex, ts)); });
  }

  function isStepDone(labId, stepIndex) { return !!memory.labStepsDone[stepKey(labId, stepIndex)]; }

  function unmarkStepDone(labId, stepIndex) {
    var k = stepKey(labId, stepIndex);
    if (!memory.labStepsDone[k]) return;
    delete memory.labStepsDone[k];
    enqueue(function () { return App.persistence.remove('labProgress', k); });
  }

  function labsCompletedCount(cert) {
    var keys = Object.keys(memory.labsDone);
    if (!cert) return keys.length;
    return keys.filter(function (k) { return k.indexOf(cert + ':') === 0; }).length;
  }

  /* ── Flashcard Leitner state ────────────────────────────── */
  function getCardState(cardKey) { return memory.leitner[cardKey] || { box: 1, lastSeen: 0, nextDue: 0 }; }

  function setCardState(cardKey, state) {
    memory.leitner[cardKey] = state;
    enqueue(function () {
      return App.persistence.put('leitner', {
        cardKey: cardKey,
        cert: certFromKey(cardKey),
        box: Number(state.box) || 1,
        lastSeen: Number(state.lastSeen) || 0,
        nextDue: Number(state.nextDue) || 0
      });
    });
  }

  var BOX_INTERVALS = [0, 1, 3, 7, 14, 30];

  function gradeCard(cardKey, grade) {
    var st = Object.assign({}, getCardState(cardKey));
    var now = Date.now();
    if (grade === 'again') { st.box = 1; st.nextDue = now; }
    else if (grade === 'good') { st.box = Math.min(5, (st.box || 1) + 1); st.nextDue = now + BOX_INTERVALS[st.box] * 86400000; }
    else if (grade === 'easy') { st.box = Math.min(5, (st.box || 1) + 2); st.nextDue = now + BOX_INTERVALS[st.box] * 86400000; }
    st.lastSeen = now;
    setCardState(cardKey, st);
    return st;
  }

  function cardsDue(keys) {
    var now = Date.now();
    return (keys || []).filter(function (k) { var st = getCardState(k); return !st.nextDue || st.nextDue <= now; });
  }

  function cardsDueCount(cert) {
    if (!App.content) return 0;
    var cards = cert ? App.content.getByCert('flashcards', cert) : App.content.getAll('flashcards');
    return cardsDue(cards.map(function (c) { return c._key; })).length;
  }

  /* ── Flashcard review log ───────────────────────────────── */
  function logCardReview(entry) {
    var log = memory.cardReviews;
    entry = entry || {};
    entry.id = entry.id || uid();
    entry.ts = entry.ts || Date.now();
    log.push(entry);
    var removed = [];
    if (log.length > 20000) removed = log.splice(0, log.length - 20000);
    enqueue(function () {
      var task = Promise.resolve();
      removed.forEach(function (old) { task = task.then(function () { return App.persistence.remove('cardReviews', old.id); }); });
      return task.then(function () { return App.persistence.put('cardReviews', entry); });
    });
    return entry;
  }

  function getCardReviews(filter) {
    var log = memory.cardReviews;
    if (!filter) return log;
    return log.filter(function (r) {
      if (filter.cert && r.cert !== filter.cert) return false;
      if (filter.chapter && r.chapter !== filter.chapter) return false;
      if (filter.since && r.ts < filter.since) return false;
      if (filter.until && r.ts > filter.until) return false;
      if (filter.sessionId && r.sessionId !== filter.sessionId) return false;
      return true;
    });
  }

  // Resolve chapter identity by number when content files use slightly
  // different labels (for example, "Ch 01" versus "Chapter 1"). This keeps
  // every stats surface on the same canonical chapter key.
  function chapterNumber(value) {
    var match = String(value || '').match(/(?:ch(?:apter)?|chapter)\s*0*(\d+)/i);
    return match ? Number(match[1]) : null;
  }

  function sameChapter(left, right) {
    if (!left || !right) return false;
    if (left === right) return true;
    var leftNumber = chapterNumber(left);
    var rightNumber = chapterNumber(right);
    return leftNumber != null && rightNumber != null && leftNumber === rightNumber;
  }

  function chapterPerformance(cert) {
    var questions = App.content.getChapters(cert, 'questions');
    var flashcards = App.content.getChapters(cert, 'flashcards');
    var labs = App.content.getChapters(cert, 'labs');
    var keys = [];

    function addKeys(map) {
      Object.keys(map).forEach(function (chapter) {
        if (!keys.some(function (existing) { return sameChapter(existing, chapter); })) keys.push(chapter);
      });
    }
    addKeys(questions); addKeys(flashcards); addKeys(labs);

    var answers = getAnswers({ cert: cert });
    var reviews = getCardReviews({ cert: cert });
    function chapterMatches(value, key, fallback) {
      if (!value) return false;
      if (value === key || value === fallback) return true;
      var valueNumber = chapterNumber(value);
      var keyNumber = chapterNumber(key || fallback);
      return valueNumber != null && keyNumber != null && valueNumber === keyNumber;
    }
    return keys.map(function (chapter) {
      var qKey = Object.keys(questions).find(function (key) { return sameChapter(key, chapter); });
      var fKey = Object.keys(flashcards).find(function (key) { return sameChapter(key, chapter); });
      var lKey = Object.keys(labs).find(function (key) { return sameChapter(key, chapter); });
      var qItems = qKey ? questions[qKey] : [];
      var fItems = fKey ? flashcards[fKey] : [];
      var lItems = lKey ? labs[lKey] : [];
      var qAnswers = answers.filter(function (answer) { return chapterMatches(answer.chapter, qKey, chapter); });
      var fReviews = reviews.filter(function (review) { return chapterMatches(review.chapter, fKey, chapter); });
      var seenQuestions = {};
      qAnswers.forEach(function (answer) { if (answer.qId) seenQuestions[answer.qId] = true; });
      var reviewedCards = {};
      fReviews.forEach(function (review) { if (review.cardId) reviewedCards[review.cardId] = true; });
      var components = [];
      if (qItems.length) components.push(Object.keys(seenQuestions).length / qItems.length);
      if (fItems.length) components.push(Object.keys(reviewedCards).length / fItems.length);
      if (lItems.length) components.push(lItems.filter(function (lab) { return isLabDone(lab._id); }).length / lItems.length);
      return {
        chapter: chapter,
        questions: qItems.length,
        questionsSeen: Object.keys(seenQuestions).length,
        questionAnswers: qAnswers.length,
        questionAccuracy: qAnswers.length ? Math.round(qAnswers.filter(function (answer) { return answer.correct; }).length / qAnswers.length * 100) : null,
        flashcards: fItems.length,
        flashcardsReviewed: Object.keys(reviewedCards).length,
        flashcardReviews: fReviews.length,
        labs: lItems.length,
        labsDone: lItems.filter(function (lab) { return isLabDone(lab._id); }).length,
        coverage: components.length ? Math.round(components.reduce(function (sum, value) { return sum + value; }, 0) / components.length * 100) : 0
      };
    });
  }

  /* ── Active sessions ────────────────────────────────────── */
  function saveActiveSession(type, state) {
    if (state) memory.activeSessions[type] = state;
    else delete memory.activeSessions[type];
    enqueue(function () {
      return state ? App.persistence.put('activeSessions', activeSessionRecord(type, state)) : App.persistence.remove('activeSessions', type);
    });
  }

  function getActiveSession(type) { return memory.activeSessions[type] || null; }

  function saveFlashSession(state) { saveActiveSession('flashcards', state); }
  function getFlashSession() { return getActiveSession('flashcards'); }
  function clearFlashSession() { saveActiveSession('flashcards', null); }
  function saveQuizSession(state) { saveActiveSession('quiz', state); }
  function getQuizSession() { return getActiveSession('quiz'); }
  function clearQuizSession() { saveActiveSession('quiz', null); }
  function saveExamSession(state) { saveActiveSession('exam', state); }
  function getExamSession() { return getActiveSession('exam'); }
  function clearExamSession() { saveActiveSession('exam', null); }

  /* ── Flashcard session history ──────────────────────────── */
  function saveFlashSessionSummary(summary) {
    var hist = memory.flashSessions;
    summary = summary || {};
    if (!summary.id) summary.id = uid();
    if (!summary.ts) summary.ts = Date.now();
    hist.unshift(summary);
    var removed = [];
    if (hist.length > 200) removed = hist.splice(200);
    enqueue(function () {
      var task = Promise.resolve();
      removed.forEach(function (old) { task = task.then(function () { return App.persistence.remove('flashSessions', old.id); }); });
      return task.then(function () { return App.persistence.put('flashSessions', summary); });
    });
    return summary;
  }

  function getFlashSessions() { return memory.flashSessions; }

  /* ── Flashcard weak-area analytics ──────────────────────── */
  function aggregateCardReviews(reviews) {
    var topics = {};
    reviews.forEach(function (r) {
      var tags = (r.tags && r.tags.length) ? r.tags : ['(untagged)'];
      tags.forEach(function (tag) {
        var topicKey = (r.cert || '') + '\u0000' + (r.chapter || '') + '\u0000' + tag;
        var g = topics[topicKey] || (topics[topicKey] = {
          cert: r.cert || null, chapter: r.chapter || null, tag: tag, attempts: 0, agains: 0,
          cards: {}, sessions: {}, firstTs: Infinity, lastTs: 0
        });
        g.attempts++;
        if (r.outcome === 'again') g.agains++;
        if (r.cardId) g.cards[r.cardId] = true;
        if (r.sessionId) g.sessions[r.sessionId] = true;
        if (r.ts < g.firstTs) g.firstTs = r.ts;
        if (r.ts > g.lastTs) g.lastTs = r.ts;
      });
    });
    return topics;
  }

  function flashcardWeakAreas(opts) {
    opts = opts || {};
    var days = opts.days || 7;
    var now = Date.now();
    var recentSince = now - days * 86400000;
    var olderSince = recentSince - days * 86400000;
    var recent = aggregateCardReviews(getCardReviews({ since: recentSince }));
    var older = aggregateCardReviews(getCardReviews({ since: olderSince, until: recentSince }));
    var list = [];
    Object.keys(recent).forEach(function (topicKey) {
      var g = recent[topicKey];
      if (opts.cert && g.cert !== opts.cert) return;
      if (!g.agains) return;
      var ratio = g.attempts ? g.agains / g.attempts : 0;
      var cards = Object.keys(g.cards).length;
      var sessions = Object.keys(g.sessions).length;
      var daysSince = Math.max(0, (now - g.lastTs) / 86400000);
      var recency = 1 / (1 + daysSince * 0.35);
      var old = older[topicKey];
      var improving = !!(old && old.attempts && ratio < (old.agains / old.attempts));
      var difficulty = g.agains * 2 + cards * 3 + sessions * 2;
      var score = difficulty * (1 + ratio) * recency * (improving ? 0.6 : 1);
      list.push({ cert: g.cert, chapter: g.chapter, tag: g.tag, agains: g.agains, attempts: g.attempts,
        ratio: Math.round(ratio * 100), cards: cards, sessions: sessions, daysSince: Math.round(daysSince), improving: improving, score: score });
    });
    return list.sort(function (a, b) { return b.score - a.score; });
  }

  function weeklyReviewRecommendations(limit, cert) { return flashcardWeakAreas({ days: 7, cert: cert || undefined }).slice(0, limit || 5); }

  /* ── Personal notes ─────────────────────────────────────── */
  function getPersonalNotes() { return memory.personalNotes; }

  function savePersonalNote(note) {
    var notes = memory.personalNotes;
    note = note || {};
    if (note.id) {
      var idx = notes.findIndex(function (n) { return n.id === note.id; });
      if (idx >= 0) notes[idx] = note; else notes.push(note);
    } else {
      note.id = uid();
      note.created = Date.now();
      notes.push(note);
    }
    note.updated = Date.now();
    enqueue(function () { return App.persistence.put('personalNotes', note); });
    return note;
  }

  function deletePersonalNote(id) {
    memory.personalNotes = memory.personalNotes.filter(function (n) { return n.id !== id; });
    enqueue(function () { return App.persistence.remove('personalNotes', id); });
  }

  /* ── Settings ───────────────────────────────────────────── */
  function getSettings() { return memory.settings; }
  function saveSettings(settings) {
    memory.settings = normalizeSettings(settings, null, null, []);
    enqueue(function () { return App.persistence.put('settings', settingsRecord()); });
  }
  function setLastStudy(info) {
    memory.settings.lastStudy = info;
    enqueue(function () { return App.persistence.put('settings', settingsRecord()); });
  }

  /* ── Time on task and content cache ─────────────────────── */
  function addTimeOnTask(ms) {
    memory.timeOnTask += Number(ms) || 0;
    enqueue(function () { return App.persistence.put('meta', metaRecord('timeOnTask', memory.timeOnTask)); });
  }
  function getTimeOnTask() { return memory.timeOnTask; }

  function saveContentSnapshot(data) {
    memory.contentSnapshot = data;
    enqueue(function () { return persistKey('contentSnapshot'); });
  }
  function getContentSnapshot() { return memory.contentSnapshot; }

  /* ── Export / Import / Wipe ─────────────────────────────── */
  function exportFullBackup() {
    return {
      version: 2,
      exported: Date.now(),
      currentCert: memory.currentCert,
      answers: clone(memory.answers),
      streak: clone(memory.streak),
      exams: clone(memory.exams),
      labsDone: clone(memory.labsDone),
      labStepsDone: clone(memory.labStepsDone),
      leitner: clone(memory.leitner),
      cardReviews: clone(memory.cardReviews),
      flashSessions: clone(memory.flashSessions),
      flashSession: clone(memory.activeSessions.flashcards || null),
      quizSession: clone(memory.activeSessions.quiz || null),
      examSession: clone(memory.activeSessions.exam || null),
      personalNotes: clone(memory.personalNotes),
      settings: clone(memory.settings),
      timeOnTask: memory.timeOnTask
    };
  }

  function importFullBackup(data) {
    if (!data || (data.version !== 1 && data.version !== 2)) throw new Error('Invalid backup format');
    ['currentCert', 'answers', 'streak', 'exams', 'labsDone', 'labStepsDone', 'leitner', 'cardReviews', 'flashSessions', 'personalNotes', 'settings', 'timeOnTask'].forEach(function (name) {
      if (data[name] !== undefined) set(name, clone(data[name]));
    });
    if (data.flashSession !== undefined) set('flashSession', clone(data.flashSession));
    if (data.quizSession !== undefined) set('quizSession', clone(data.quizSession));
    if (data.examSession !== undefined) set('examSession', clone(data.examSession));
    return flush();
  }

  function wipeProgress() {
    // Clear in-memory engines as well as their IndexedDB records so a reset
    // cannot be undone by a currently rendered session on the next route.
    if (App.quiz) {
      if (App.quiz.discardQuiz) App.quiz.discardQuiz();
      if (App.quiz.discardExam) App.quiz.discardExam();
    }
    if (App.flashcards && App.flashcards.cancelSession) App.flashcards.cancelSession();
    memory.answers = [];
    memory.streak = { last: null, count: 0, best: 0 };
    memory.exams = [];
    memory.labsDone = {};
    memory.labStepsDone = {};
    memory.leitner = {};
    memory.cardReviews = [];
    memory.flashSessions = [];
    memory.activeSessions = {};
    memory.timeOnTask = 0;
    enqueue(function () {
      return Promise.all([
        App.persistence.clear('answers'),
        App.persistence.clear('exams'),
        App.persistence.clear('labProgress'),
        App.persistence.clear('leitner'),
        App.persistence.clear('cardReviews'),
        App.persistence.clear('flashSessions'),
        App.persistence.clear('activeSessions'),
        App.persistence.put('meta', metaRecord('streak', memory.streak)),
        App.persistence.put('meta', metaRecord('timeOnTask', 0))
      ]);
    });
  }

  function exportAnswersCSV(cert) {
    var ans = cert ? getAnswers({ cert: cert }) : getAnswers();
    var header = 'id,qId,cert,chapter,tags,correct,type,ts,mode\n';
    var rows = ans.map(function (a) {
      return [a.id, a.qId, a.cert, JSON.stringify(a.chapter || ''), JSON.stringify((a.tags || []).join(';')), a.correct ? 1 : 0, a.type || '', a.ts, a.mode || ''].join(',');
    });
    return header + rows.join('\n');
  }

  /* ── Aggregate stats for dashboard ──────────────────────── */
  function getDashboardStats(cert) {
    var ans = cert ? getAnswers({ cert: cert }) : getAnswers();
    var total = ans.length;
    var correct = ans.filter(function (a) { return a.correct; }).length;
    var accuracy = total ? Math.round((correct / total) * 100) : 0;
    return {
      totalAnswered: total,
      accuracy: accuracy,
      streakDays: memory.streak.count || 0,
      cardsDue: cardsDueCount(cert),
      labsDone: labsCompletedCount(cert),
      timeOnTask: memory.timeOnTask
    };
  }

  App.store = {
    init: init,
    flush: flush,
    isReady: function () { return initialized; },
    isPersistent: function () { return available; },
    getStartupNotice: function () { var n = startupNotice; startupNotice = null; return n; },
    getLastWriteError: function () { return lastWriteError; },
    get: get,
    set: set,
    remove: remove,
    getCurrentCert: getCurrentCert,
    setCurrentCert: setCurrentCert,
    logAnswer: logAnswer,
    getAnswers: getAnswers,
    accuracyFor: accuracyFor,
    questionStats: questionStats,
    weakQuestions: weakQuestions,
    updateStreak: updateStreak,
    getStreak: getStreak,
    getActivity: getActivity,
    saveExamAttempt: saveExamAttempt,
    getExams: getExams,
    markLabComplete: markLabComplete,
    isLabDone: isLabDone,
    labsCompletedCount: labsCompletedCount,
    markStepDone: markStepDone,
    isStepDone: isStepDone,
    unmarkStepDone: unmarkStepDone,
    getCardState: getCardState,
    setCardState: setCardState,
    gradeCard: gradeCard,
    cardsDue: cardsDue,
    cardsDueCount: cardsDueCount,
    logCardReview: logCardReview,
    getCardReviews: getCardReviews,
    chapterPerformance: chapterPerformance,
    saveFlashSession: saveFlashSession,
    getFlashSession: getFlashSession,
    clearFlashSession: clearFlashSession,
    saveQuizSession: saveQuizSession,
    getQuizSession: getQuizSession,
    clearQuizSession: clearQuizSession,
    saveExamSession: saveExamSession,
    getExamSession: getExamSession,
    clearExamSession: clearExamSession,
    saveFlashSessionSummary: saveFlashSessionSummary,
    getFlashSessions: getFlashSessions,
    flashcardWeakAreas: flashcardWeakAreas,
    weeklyReviewRecommendations: weeklyReviewRecommendations,
    getPersonalNotes: getPersonalNotes,
    savePersonalNote: savePersonalNote,
    deletePersonalNote: deletePersonalNote,
    getSettings: getSettings,
    saveSettings: saveSettings,
    setLastStudy: setLastStudy,
    addTimeOnTask: addTimeOnTask,
    getTimeOnTask: getTimeOnTask,
    saveContentSnapshot: saveContentSnapshot,
    getContentSnapshot: getContentSnapshot,
    exportFullBackup: exportFullBackup,
    importFullBackup: importFullBackup,
    wipeProgress: wipeProgress,
    exportAnswersCSV: exportAnswersCSV,
    getDashboardStats: getDashboardStats
  };
})();
