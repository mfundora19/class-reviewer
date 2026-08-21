/* ═══════════════════════════════════════════════════════════
   ReviewApp · perms-exercise.js
   Procedural Linux permissions exercise engine.

   Generates an unlimited variety of permission exercises from the
   Unix permission domain model in tools.js (permsFromMode / parseMode /
   permsFromSymbolic) using a seeded PRNG, validates answers against
   normalized permission states, and produces educational feedback.

   Pure logic — no DOM access — so it can be exercised in isolation
   (Node test runner or a browser harness).
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var App = window.ReviewApp;
  var tools = App.tools;

  /* ── Exercise type ids ─────────────────────────────────── */
  var TYPE = {
    OCTAL_TO_SYMBOLIC: 'octal_to_symbolic',
    SYMBOLIC_TO_OCTAL: 'symbolic_to_octal',
    BUILD_PERMISSION: 'build_permission',
    CHMOD_COMMAND: 'chmod_command',
    DECODE_MODE: 'decode_mode',
    PERMISSION_MATRIX: 'permission_matrix',
    SPECIAL_BITS: 'special_bits',
    DIRECTORY_SEMANTICS: 'directory_semantics',
    PATH_TRAVERSAL: 'path_traversal'
  };

  var TYPE_META = {
    octal_to_symbolic: { label: 'Octal to symbolic', difficulty: 'easy' },
    symbolic_to_octal: { label: 'Symbolic to octal', difficulty: 'easy' },
    build_permission: { label: 'Build a permission', difficulty: 'medium' },
    chmod_command: { label: 'chmod command', difficulty: 'medium' },
    decode_mode: { label: 'Decode a mode', difficulty: 'medium' },
    permission_matrix: { label: 'Permission matrix', difficulty: 'medium' },
    special_bits: { label: 'Special bits', difficulty: 'hard' },
    directory_semantics: { label: 'Directory semantics', difficulty: 'hard' },
    path_traversal: { label: 'Path traversal', difficulty: 'hard' }
  };

  var SPECIAL_NAMES = { suid: 'setuid', sgid: 'setgid', sticky: 'sticky' };

  // Difficulty bands map straight onto the per-type difficulty tags. 'all'
  // (or omitting difficulty) keeps every selected type in play.
  var DIFFICULTY_IDS = ['all', 'easy', 'medium', 'hard'];

  // Common, recognizable modes used for easy exercises (no special bits).
  var EASY_MODES = ['644', '755', '700', '600', '666', '777', '640', '750', '754', '664', '711', '775'];

  /* ── Seeded PRNG (mulberry32) ──────────────────────────── */
  function makeRng(seed) {
    var s = (seed == null ? ((Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0) : seed) >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      var t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function randomInt(rng, min, max) {
    return min + Math.floor(rng() * (max - min + 1));
  }

  function pick(rng, arr) {
    return arr[randomInt(rng, 0, arr.length - 1)];
  }

  function shuffle(rng, arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = randomInt(rng, 0, i);
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  /* ── State helpers ─────────────────────────────────────── */
  function cloneState(state) {
    return {
      special: { suid: !!state.special.suid, sgid: !!state.special.sgid, sticky: !!state.special.sticky },
      user: { r: !!state.user.r, w: !!state.user.w, x: !!state.user.x },
      group: { r: !!state.group.r, w: !!state.group.w, x: !!state.group.x },
      other: { r: !!state.other.r, w: !!state.other.w, x: !!state.other.x }
    };
  }

  function stateToOctal(state) {
    return tools.permsFromMode(state.special, state.user, state.group, state.other).octal;
  }

  function stateToSymbolic(state) {
    return tools.permsFromMode(state.special, state.user, state.group, state.other).symbolic;
  }

  function statesEqual(a, b) {
    return stateToOctal(a) === stateToOctal(b);
  }

  function classLabel(key) {
    return key === 'user' ? 'Owner' : key === 'group' ? 'Group' : 'Other';
  }

  function bitName(bit) {
    return bit === 'r' ? 'read' : bit === 'w' ? 'write' : 'execute';
  }

  /* ── Requirement text ──────────────────────────────────── */
  function requirementsFromState(state) {
    var lines = [];
    [['user', 'owner'], ['group', 'group'], ['other', 'others']].forEach(function (t) {
      var bits = state[t[0]];
      var names = [];
      if (bits.r) names.push('read');
      if (bits.w) names.push('write');
      if (bits.x) names.push('execute');
      lines.push(t[1] + ': ' + (names.length ? names.join('/') : 'no permissions'));
    });
    if (state.special.suid) lines.push('setuid bit set');
    if (state.special.sgid) lines.push('setgid bit set');
    if (state.special.sticky) lines.push('sticky bit set');
    return lines;
  }

  /* ── State generation ──────────────────────────────────── */
  function generateClassBits(rng) {
    return { r: rng() < 0.8, w: rng() < 0.5, x: rng() < 0.55 };
  }

  function generatePermState(rng, opts) {
    opts = opts || {};
    if (opts.easy) {
      // Easy exercises use common, recognizable modes and never include
      // special bits (the easy types are pure octal <-> symbolic conversion).
      return tools.parseMode(pick(rng, EASY_MODES));
    }
    for (var t = 0; t < 50; t++) {
      var state = {
        special: {
          suid: !!opts.includeSetuid && rng() < 0.45,
          sgid: !!opts.includeSetgid && rng() < 0.45,
          sticky: !!opts.includeSticky && rng() < 0.45
        },
        user: generateClassBits(rng),
        group: generateClassBits(rng),
        other: generateClassBits(rng)
      };
      if (opts.allowEmpty || stateToOctal(state) !== '000') return state;
    }
    return { special: { suid: false, sgid: false, sticky: false }, user: { r: true, w: true, x: true }, group: { r: true, w: false, x: true }, other: { r: true, w: false, x: true } };
  }

  function forceOneSpecial(rng, opts) {
    var pool = [];
    if (opts.includeSetuid) pool.push('suid');
    if (opts.includeSetgid) pool.push('sgid');
    if (opts.includeSticky) pool.push('sticky');
    if (!pool.length) pool = ['suid'];
    var special = { suid: false, sgid: false, sticky: false };
    special[pick(rng, pool)] = true;
    return special;
  }

  /* ── Per-type generators ───────────────────────────────── */
  var FILENAMES = ['script.sh', 'deploy.sh', 'backup.sh', 'setup.sh', 'report.txt', 'config.conf', 'notes.md', 'index.html', 'data.bin', 'run.py', 'app.js', 'styles.css'];

  function genOctalToSymbolic(rng, opts) {
    var state = generatePermState(rng, opts);
    return {
      type: TYPE.OCTAL_TO_SYMBOLIC,
      prompt: 'What symbolic permissions correspond to ' + stateToOctal(state) + '?',
      expectedText: stateToSymbolic(state),
      answer: state,
      accepts: 'symbolic',
      detail: {}
    };
  }

  function genSymbolicToOctal(rng, opts) {
    var state = generatePermState(rng, opts);
    return {
      type: TYPE.SYMBOLIC_TO_OCTAL,
      prompt: 'Convert ' + stateToSymbolic(state) + ' to an octal mode.',
      expectedText: stateToOctal(state),
      answer: state,
      accepts: 'octal',
      detail: {}
    };
  }

  function genBuildPermission(rng, opts) {
    var state = generatePermState(rng, opts);
    return {
      type: TYPE.BUILD_PERMISSION,
      prompt: 'Set these permissions. What octal mode should you use?',
      expectedText: stateToOctal(state),
      answer: state,
      accepts: 'octal',
      detail: { requirements: requirementsFromState(state) }
    };
  }

  function genChmodCommand(rng, opts) {
    var state = generatePermState(rng, opts);
    var filename = pick(rng, FILENAMES);
    var octal = stateToOctal(state);
    return {
      type: TYPE.CHMOD_COMMAND,
      prompt: 'A file should have these permissions. What chmod command sets them?',
      expectedText: 'chmod ' + octal + ' ' + filename,
      answer: state,
      accepts: 'chmod',
      detail: { requirements: requirementsFromState(state), filename: filename, octal: octal }
    };
  }

  function decodeStatement(state) {
    var parts = [];
    [['user', 'Owner'], ['group', 'Group'], ['other', 'Others']].forEach(function (t) {
      var b = state[t[0]];
      var names = [];
      if (b.r) names.push('read');
      if (b.w) names.push('write');
      if (b.x) names.push('execute');
      parts.push(t[1] + ': ' + (names.length ? names.join('/') : 'no permissions'));
    });
    return parts.join(' / ');
  }

  function buildDecodeOptions(rng, state, trueStmt) {
    var opts = [trueStmt];
    var seen = {};
    seen[trueStmt] = true;
    var attempts = 0;
    while (opts.length < 4 && attempts < 40) {
      attempts++;
      var m = cloneState(state);
      var cls = pick(rng, ['user', 'group', 'other']);
      var bit = pick(rng, ['r', 'w', 'x']);
      m[cls][bit] = !m[cls][bit];
      var stmt = decodeStatement(m);
      if (!seen[stmt]) { seen[stmt] = true; opts.push(stmt); }
    }
    return shuffle(rng, opts);
  }

  function genDecodeMode(rng, opts) {
    var state = generatePermState(rng, opts);
    var trueStmt = decodeStatement(state);
    var options = buildDecodeOptions(rng, state, trueStmt);
    return {
      type: TYPE.DECODE_MODE,
      prompt: 'Which statement is true for ' + stateToOctal(state) + ' (' + stateToSymbolic(state) + ')?',
      expectedText: trueStmt,
      answer: { index: options.indexOf(trueStmt), state: state },
      accepts: 'mcq',
      detail: { options: options, answerIndex: options.indexOf(trueStmt) }
    };
  }

  function genPermissionMatrix(rng, opts) {
    var state = generatePermState(rng, opts);
    return {
      type: TYPE.PERMISSION_MATRIX,
      prompt: 'Configure the permission matrix to match these requirements.',
      expectedText: stateToSymbolic(state),
      answer: state,
      accepts: 'matrix',
      detail: { requirements: requirementsFromState(state) }
    };
  }

  function specialMeaning(n) {
    if (n === 4) return 'setuid';
    if (n === 2) return 'setgid';
    if (n === 1) return 'sticky';
    return null;
  }

  function buildSpecialOptions(rng, correct) {
    var pool = ['setuid', 'setgid', 'sticky', 'no special bit'];
    var opts = [correct];
    pool.forEach(function (p) { if (p !== correct && opts.length < 4) opts.push(p); });
    return shuffle(rng, opts);
  }

  function genSpecialBits(rng, opts) {
    var state = generatePermState(rng, opts);
    var variant = rng() < 0.5 ? 'meaning' : 'octal';
    if (variant === 'meaning') {
      state.special = forceOneSpecial(rng, opts);
      var mode = stateToOctal(state);
      var leading = mode.charAt(0);
      var meaning = specialMeaning(Number(leading));
      var options = buildSpecialOptions(rng, meaning);
      return {
        type: TYPE.SPECIAL_BITS,
        prompt: 'In ' + mode + ', what does the leading ' + leading + ' represent?',
        expectedText: meaning,
        answer: { index: options.indexOf(meaning), state: state },
        accepts: 'mcq',
        detail: { variant: 'meaning', mode: mode, options: options, answerIndex: options.indexOf(meaning) }
      };
    }
    if (!state.special.suid && !state.special.sgid && !state.special.sticky) {
      state.special = forceOneSpecial(rng, opts);
    }
    return {
      type: TYPE.SPECIAL_BITS,
      prompt: 'Set these permissions, including the special bit shown. What octal mode should you use?',
      expectedText: stateToOctal(state),
      answer: state,
      accepts: 'octal',
      detail: { variant: 'octal', requirements: requirementsFromState(state) }
    };
  }

  var DIR_CONCEPTS = [
    { q: 'To enter or traverse a directory (cd into it), which permission is needed on that directory?', a: 'execute (x)', wrong: ['read (r)', 'write (w)', 'no permission needed'] },
    { q: 'To list the names of the entries in a directory (ls), which permission is needed on that directory?', a: 'read (r)', wrong: ['execute (x)', 'write (w)', 'no permission needed'] },
    { q: 'To create a new file inside a directory, which permissions are needed on that directory?', a: 'write (w) and execute (x)', wrong: ['read (r) only', 'execute (x) only', 'write (w) only'] },
    { q: 'To delete a file that lives inside a directory, which permission is needed on the directory itself?', a: 'write (w)', wrong: ['read (r) on the file', 'execute (x) on the file', 'write (w) on the file'] },
    { q: 'To modify the contents of a file, which permission is needed on the file itself?', a: 'write (w)', wrong: ['read (r)', 'execute (x)', 'write (w) on the directory'] },
    { q: 'To read a file, which permission is needed on the file itself?', a: 'read (r)', wrong: ['execute (x)', 'write (w)', 'read (r) on the directory'] },
    { q: 'Which permission on a file controls whether it can be run as a program?', a: 'execute (x)', wrong: ['read (r)', 'write (w)', 'no permission needed'] }
  ];

  function genDirectorySemantics(rng) {
    var c = pick(rng, DIR_CONCEPTS);
    var options = shuffle(rng, [c.a].concat(c.wrong));
    return {
      type: TYPE.DIRECTORY_SEMANTICS,
      prompt: c.q,
      expectedText: c.a,
      answer: { index: options.indexOf(c.a) },
      accepts: 'mcq',
      detail: { options: options, answerIndex: options.indexOf(c.a) }
    };
  }

  var PATH_DIR_NAMES = ['home', 'usr', 'var', 'opt', 'srv', 'data', 'projects', 'docs', 'reports', 'shared', 'alex', 'dev', 'archive'];
  var PATH_FILE_NAMES = ['report', 'notes', 'config', 'data', 'summary', 'backup', 'draft', 'index'];

  function genPathTraversal(rng) {
    var levels = randomInt(rng, 1, 2);
    var used = {};
    function freshName(pool) {
      var n = pick(rng, pool);
      var guard = 0;
      while (used[n] && guard < 20) { n = pick(rng, pool); guard++; }
      used[n] = true;
      return n;
    }
    var parts = [];
    for (var i = 0; i < levels; i++) parts.push(freshName(PATH_DIR_NAMES));
    var file = freshName(PATH_FILE_NAMES) + '.txt';
    var cls = pick(rng, ['user', 'group', 'other']);
    var dirStates = [];
    for (var j = 0; j < levels; j++) dirStates.push(generatePermState(rng, {}));
    var fileState = generatePermState(rng, {});
    var path = '/' + parts.join('/') + '/' + file;
    var traversable = dirStates.every(function (d) { return d[cls].x; });
    var readable = traversable && fileState[cls].r;
    var classWord = cls === 'user' ? 'the owner' : cls === 'group' ? 'a group member' : 'another user (others)';
    var dirDesc = parts.map(function (n, idx) { return n + ' (' + stateToOctal(dirStates[idx]) + ')'; }).join(', ');
    var prompt = 'Path: ' + path + ' — dirs: ' + dirDesc + ' — file mode: ' + stateToOctal(fileState) + '. Can ' + classWord + ' read the file?';
    var options = ['Yes', 'No'];
    var answerIndex = readable ? 0 : 1;
    var explanation = 'To read a file you need execute (x) on every directory in the path and read (r) on the file itself for the ' + cls + ' class. ' +
      dirStates.map(function (d, idx) {
        return parts[idx] + ' has x=' + (d[cls].x ? 'yes' : 'no');
      }).join('; ') + '; file has r=' + (fileState[cls].r ? 'yes' : 'no') + '.';
    return {
      type: TYPE.PATH_TRAVERSAL,
      prompt: prompt,
      expectedText: readable ? 'Yes' : 'No',
      answer: { index: answerIndex },
      accepts: 'mcq',
      detail: { options: options, answerIndex: answerIndex, explanation: explanation, classKey: cls }
    };
  }

  /* ── Exercise dispatch ─────────────────────────────────── */
  var GENERATORS = {};
  GENERATORS[TYPE.OCTAL_TO_SYMBOLIC] = genOctalToSymbolic;
  GENERATORS[TYPE.SYMBOLIC_TO_OCTAL] = genSymbolicToOctal;
  GENERATORS[TYPE.BUILD_PERMISSION] = genBuildPermission;
  GENERATORS[TYPE.CHMOD_COMMAND] = genChmodCommand;
  GENERATORS[TYPE.DECODE_MODE] = genDecodeMode;
  GENERATORS[TYPE.PERMISSION_MATRIX] = genPermissionMatrix;
  GENERATORS[TYPE.SPECIAL_BITS] = genSpecialBits;
  GENERATORS[TYPE.DIRECTORY_SEMANTICS] = genDirectorySemantics;
  GENERATORS[TYPE.PATH_TRAVERSAL] = genPathTraversal;

  function generateExercise(config, seedOrRng) {
    var rng = typeof seedOrRng === 'function' ? seedOrRng : makeRng(seedOrRng);
    var cfg = config || {};
    var hasSpecial = !!(cfg.includeSetuid || cfg.includeSetgid || cfg.includeSticky);
    var allTypes = [];
    Object.keys(TYPE).forEach(function (k) { allTypes.push(TYPE[k]); });
    var types = (cfg.types && Array.isArray(cfg.types)) ? cfg.types.slice() : allTypes;
    // Difficulty narrows the pool to types tagged with that level. Easy also
    // forces special bits off — basic conversions never involve setuid etc.
    // Unknown values are treated as 'all' (no filtering).
    var easy = cfg.difficulty === 'easy';
    if (cfg.difficulty === 'easy' || cfg.difficulty === 'medium' || cfg.difficulty === 'hard') {
      types = types.filter(function (t) { return TYPE_META[t] && TYPE_META[t].difficulty === cfg.difficulty; });
    }
    if (!hasSpecial || easy) {
      types = types.filter(function (t) { return t !== TYPE.SPECIAL_BITS; });
    }
    if (!types.length) return { error: 'No exercise types selected.' };
    var type = pick(rng, types);
    var opts = {
      includeSetuid: !!cfg.includeSetuid && !easy,
      includeSetgid: !!cfg.includeSetgid && !easy,
      includeSticky: !!cfg.includeSticky && !easy,
      easy: easy
    };
    var gen = GENERATORS[type];
    if (!gen) return { error: 'Unknown exercise type: ' + type };
    return gen(rng, opts);
  }

  /* ── Answer validation & normalization ─────────────────── */
  function normalizeMcqAnswer(answer) {
    if (typeof answer === 'number') return answer;
    if (typeof answer === 'string') {
      var t = answer.trim();
      var n = parseInt(t, 10);
      if (!isNaN(n) && String(n) === t) return n;
    }
    return null;
  }

  function parseAnswerState(kind, answer) {
    if (kind === 'octal') {
      var norm = tools.normalizeMode(answer);
      return norm == null ? null : tools.parseMode(norm);
    }
    if (kind === 'symbolic') {
      return tools.permsFromSymbolic(answer);
    }
    if (kind === 'chmod') {
      var s = String(answer == null ? '' : answer).trim().replace(/\s+/g, ' ');
      var m = /^chmod\s+(.*)$/i.exec(s);
      var rest = (m ? m[1] : s).trim();
      if (!rest) return null;
      var tokens = rest.split(' ');
      for (var i = 0; i < tokens.length; i++) {
        if (!tokens[i]) continue;
        var octal = tools.normalizeMode(tokens[i]);
        if (octal != null) return tools.parseMode(octal);
        var sym = tools.permsFromSymbolic(tokens[i]);
        if (sym) return sym;
      }
      return tools.permsFromSymbolic(rest);
    }
    return null;
  }

  function matrixDiff(userState, target) {
    var diff = [];
    ['user', 'group', 'other'].forEach(function (cls) {
      ['r', 'w', 'x'].forEach(function (bit) {
        if (!!userState[cls][bit] !== !!target[cls][bit]) {
          diff.push({ cls: cls, bit: bit, expected: !!target[cls][bit] });
        }
      });
    });
    ['suid', 'sgid', 'sticky'].forEach(function (sb) {
      if (!!userState.special[sb] !== !!target.special[sb]) {
        diff.push({ cls: 'special', bit: sb, expected: !!target.special[sb] });
      }
    });
    return diff;
  }

  function formatActual(exercise, answer) {
    if (exercise.accepts === 'mcq') {
      var idx = normalizeMcqAnswer(answer);
      if (idx != null && exercise.detail && exercise.detail.options && exercise.detail.options[idx] != null) {
        return exercise.detail.options[idx];
      }
      return String(answer == null ? '' : answer);
    }
    if (exercise.accepts === 'matrix') {
      if (answer && answer.user) {
        return stateToSymbolic({
          special: answer.special || { suid: false, sgid: false, sticky: false },
          user: answer.user, group: answer.group, other: answer.other
        });
      }
      return '(no permissions set)';
    }
    return String(answer == null ? '' : answer).trim();
  }

  function validateExerciseAnswer(exercise, answer) {
    var result = {
      correct: false,
      expectedText: exercise && exercise.expectedText,
      actualText: '',
      diff: null
    };
    if (!exercise || exercise.error) {
      result.feedback = 'No exercise to validate.';
      return result;
    }
    result.actualText = formatActual(exercise, answer);
    var kind = exercise.accepts;
    var correct = false;
    if (kind === 'octal' || kind === 'symbolic' || kind === 'chmod') {
      var ansState = parseAnswerState(kind, answer);
      correct = ansState != null && statesEqual(ansState, exercise.answer);
    } else if (kind === 'mcq') {
      correct = normalizeMcqAnswer(answer) === exercise.detail.answerIndex;
    } else if (kind === 'matrix') {
      var userState = {
        special: (answer && answer.special) || { suid: false, sgid: false, sticky: false },
        user: answer && answer.user,
        group: answer && answer.group,
        other: answer && answer.other
      };
      correct = !!(userState.user && userState.group && userState.other) && statesEqual(userState, exercise.answer);
      if (!correct && userState.user && userState.group && userState.other) {
        result.diff = matrixDiff(userState, exercise.answer);
      }
    }
    result.correct = correct;
    result.feedback = buildFeedback(exercise, answer, result);
    return result;
  }

  /* ── Feedback ──────────────────────────────────────────── */
  function buildFeedback(exercise, answer, result) {
    var lines = [];
    lines.push(result.correct ? 'Correct!' : 'Not quite.');
    if (!result.correct) {
      lines.push('Expected: ' + result.expectedText);
      if (result.actualText && result.actualText !== result.expectedText) {
        lines.push('You entered: ' + result.actualText);
      }
    }
    if (exercise.type === TYPE.PERMISSION_MATRIX && result.diff) {
      result.diff.forEach(function (d) {
        if (d.cls === 'special') {
          lines.push('Special bit ' + d.bit + ' (' + SPECIAL_NAMES[d.bit] + ') should be ' + (d.expected ? 'set' : 'unset') + '.');
        } else {
          lines.push(classLabel(d.cls) + ' — ' + bitName(d.bit) + ' should be ' + (d.expected ? 'enabled (you left it off)' : 'disabled (you set it)') + '.');
        }
      });
    }
    if (exercise.type === TYPE.SPECIAL_BITS) {
      var mode = exercise.detail && exercise.detail.mode ? exercise.detail.mode : (result.expectedText && /^[0-7]{3,4}$/.test(result.expectedText) ? result.expectedText : null);
      if (mode && mode.length === 4) {
        var d = Number(mode.charAt(0));
        var names = [];
        if (d & 4) names.push('setuid (4)');
        if (d & 2) names.push('setgid (2)');
        if (d & 1) names.push('sticky (1)');
        lines.push('The leading digit ' + mode.charAt(0) + ' = ' + (names.length ? names.join(' + ') : 'no special bits') + '.');
        lines.push('4 = setuid, 2 = setgid, 1 = sticky — shown as s/S (setuid/setgid) and t/T (sticky); uppercase when the execute bit is absent.');
      }
    }
    if (exercise.type === TYPE.OCTAL_TO_SYMBOLIC && !result.correct) {
      lines.push('Each octal digit maps to three bits: read = 4, write = 2, execute = 1.');
    }
    if (exercise.type === TYPE.SYMBOLIC_TO_OCTAL && !result.correct) {
      lines.push('Convert each triple (user, group, other) to a digit: read = 4, write = 2, execute = 1.');
    }
    if (exercise.type === TYPE.CHMOD_COMMAND && !result.correct) {
      lines.push('The command form is chmod <mode> <file> — e.g. chmod ' + (exercise.detail && exercise.detail.octal ? exercise.detail.octal : '755') + ' ' + (exercise.detail && exercise.detail.filename ? exercise.detail.filename : 'file') + '. Only the mode is graded; any filename is accepted.');
    }
    if (exercise.type === TYPE.PATH_TRAVERSAL && !result.correct) {
      if (exercise.detail && exercise.detail.explanation) lines.push(exercise.detail.explanation);
      lines.push('To read a file you need execute (x) on every directory in its path and read (r) on the file itself for the relevant class.');
    }

    if (exercise.type === TYPE.DIRECTORY_SEMANTICS && !result.correct) {

    }
    if (exercise.type === TYPE.DECODE_MODE && !result.correct) {
      lines.push('Read the mode one digit at a time: user, then group, then other. Each digit is the sum of read (4), write (2), execute (1).');
    }
    if (exercise.type === TYPE.BUILD_PERMISSION && !result.correct) {
      lines.push('Combine the three class digits in order owner/group/other; a required special bit adds a leading digit: 4 = setuid, 2 = setgid, 1 = sticky.');
    }
    return lines.join('\n');
  }

  function generateFeedback(exercise, answer) {
    return validateExerciseAnswer(exercise, answer).feedback;
  }

  App.permExercise = {
    TYPE: TYPE,
    TYPE_META: TYPE_META,
    DIFFICULTY_IDS: DIFFICULTY_IDS.slice(),
    makeRng: makeRng,
    randomInt: randomInt,
    pick: pick,
    shuffle: shuffle,
    generatePermState: generatePermState,
    stateToOctal: stateToOctal,
    stateToSymbolic: stateToSymbolic,
    requirementsFromState: requirementsFromState,
    generateExercise: generateExercise,
    validateExerciseAnswer: validateExerciseAnswer,
    generateFeedback: generateFeedback
  };
})();
