/* ═══════════════════════════════════════════════════════════
   ReviewApp · perms-exercise.js
   Procedural Linux permissions exercise engine.

   Generates an unlimited variety of permission exercises from the
   Unix permission domain model in tools.js (permsFromMode / parseMode /
   permsFromSymbolic / applyChmodExpr) using a seeded PRNG, validates
   answers against normalized permission states, and produces structured,
   educational feedback.

   Pure logic — no DOM access — so it can be exercised in isolation
   (Node test runner or a browser harness).

   Architecture:
     Permission domain (tools.js)
            ↓
     Exercise generator (seeded, per-type)
            ↓
     Exercise definition { type, prompt, expectedText, answer, accepts, detail }
            ↓
     Validator / normalizer
            ↓
     Feedback builder (structured + flat text)
            ↓
     UI
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
    SYMBOLIC_CHMOD: 'symbolic_chmod',
    DECODE_MODE: 'decode_mode',
    PERMISSION_MATRIX: 'permission_matrix',
    SPECIAL_BITS: 'special_bits',
    DIRECTORY_SEMANTICS: 'directory_semantics',
    PATH_TRAVERSAL: 'path_traversal'
  };

  var TYPE_META = {
    octal_to_symbolic: { label: 'Octal to symbolic', difficulty: 'easy', hint: 'Convert an octal mode like 754 into rwxr-xr--.' },
    symbolic_to_octal: { label: 'Symbolic to octal', difficulty: 'easy', hint: 'Convert rwxr-xr-- into an octal mode like 754.' },
    build_permission: { label: 'Build a permission', difficulty: 'medium', hint: 'Read the requirements and produce the matching octal mode.' },
    chmod_command: { label: 'chmod command', difficulty: 'medium', hint: 'Write the chmod command that sets the required mode.' },
    symbolic_chmod: { label: 'Symbolic chmod', difficulty: 'medium', hint: 'Use symbolic syntax (u+x, g-w) to change a mode.' },
    decode_mode: { label: 'Decode a mode', difficulty: 'medium', hint: 'Pick the statement that correctly describes a mode.' },
    permission_matrix: { label: 'Permission matrix', difficulty: 'medium', hint: 'Toggle the permission matrix to match the requirements.' },
    special_bits: { label: 'Special bits', difficulty: 'hard', hint: 'Reason about setuid, setgid, and sticky bits.' },
    directory_semantics: { label: 'Directory semantics', difficulty: 'hard', hint: 'Which permission does a directory or file need?' },
    path_traversal: { label: 'Path traversal', difficulty: 'hard', hint: 'Decide whether a class can read a file along a path.' }
  };

  var SPECIAL_NAMES = { suid: 'setuid', sgid: 'setgid', sticky: 'sticky' };

  var DIFFICULTY_IDS = ['all', 'easy', 'medium', 'hard'];

  var DIFFICULTY_DESC = {
    all: 'All levels — exercises across every difficulty.',
    easy: 'Basic conversions with common modes.',
    medium: 'Mixed conversions, chmod commands, and matrices.',
    hard: 'Special bits and directory/traversal scenarios.'
  };

  // Common, recognizable modes used for easy exercises (no special bits).
  var EASY_MODES = ['644', '755', '700', '600', '666', '777', '640', '750', '754', '664', '711', '775'];

  // Curated 3-digit modes with more varied bit patterns than the fully random
  // profile (never includes special bits — those only come from the random
  // profile when explicitly enabled).
  var CURATED_MODES = ['400', '200', '100', '040', '004', '601', '710', '550', '445', '465', '451', '730', '751', '612', '570', '740', '524', '624', '415', '642'];

  // Plain modes used as the starting point for symbolic chmod (delta) exercises.
  var CHMOD_BASE_MODES = ['644', '755', '700', '600', '640', '750', '754', '664', '711', '775', '741', '652', '660', '740'];

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

  // Weighted pick: entries with a higher weight in `weights` are more likely.
  function weightedPick(rng, arr, weights) {
    if (!weights) return pick(rng, arr);
    var pool = [];
    arr.forEach(function (item) {
      var w = 1 + (weights[item] || 0);
      for (var i = 0; i < w; i++) pool.push(item);
    });
    return pick(rng, pool);
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

  function classWord(key) {
    return key === 'user' ? 'the owner' : key === 'group' ? 'the group' : 'others';
  }

  function bitName(bit) {
    return bit === 'r' ? 'read' : bit === 'w' ? 'write' : 'execute';
  }

  function hasSpecialBit(state) {
    return !!(state.special && (state.special.suid || state.special.sgid || state.special.sticky));
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

  // Sparse profile: fewer bits, more varied read/write/execute mixes.
  function generateSparseBits(rng) {
    return { r: rng() < 0.5, w: rng() < 0.28, x: rng() < 0.32 };
  }

  // Generates a permission state. Options:
  //   easy        — curated common modes, never special bits
  //   includeSet* — allow the corresponding special bit (random profile only)
  //   allowEmpty  — permit the all-off 000 state
  //   varied      — reject states where all three class digits are identical
  //   biasBits    — [['group','x'], ...] exercise those bits (adaptive focus):
  //                 each biased bit is re-rolled so it appears meaningfully
  //   noCurated   — skip the curated-mode profile
  function generatePermState(rng, opts) {
    opts = opts || {};
    if (opts.easy) {
      // Easy exercises use common, recognizable modes and never include
      // special bits (the easy types are pure octal <-> symbolic conversion).
      return tools.parseMode(pick(rng, EASY_MODES));
    }
    var profile = rng();
    for (var t = 0; t < 60; t++) {
      var state;
      if (profile < 0.32 && !opts.noCurated) {
        state = tools.parseMode(pick(rng, CURATED_MODES));
      } else if (profile < 0.52) {
        state = {
          special: { suid: false, sgid: false, sticky: false },
          user: generateSparseBits(rng),
          group: generateSparseBits(rng),
          other: generateSparseBits(rng)
        };
      } else {
        state = {
          special: {
            suid: !!opts.includeSetuid && rng() < 0.45,
            sgid: !!opts.includeSetgid && rng() < 0.45,
            sticky: !!opts.includeSticky && rng() < 0.45
          },
          user: generateClassBits(rng),
          group: generateClassBits(rng),
          other: generateClassBits(rng)
        };
      }
      // Adaptive focus: re-roll bits the learner has struggled with so they
      // keep appearing (both set and unset outcomes stay possible).
      if (opts.biasBits && opts.biasBits.length) {
        opts.biasBits.forEach(function (b) {
          if (rng() < 0.6 && state[b[0]] && state[b[0]][b[1]] !== undefined) {
            state[b[0]][b[1]] = rng() < 0.5;
          }
        });
      }
      if (opts.allowEmpty || stateToOctal(state) !== '000') {
        if (!opts.varied) return state;
        var digits = stateToOctal(state);
        var u = digits.charAt(digits.length - 3);
        var g = digits.charAt(digits.length - 2);
        var o = digits.charAt(digits.length - 1);
        if (!(u === g && g === o)) return state;
      }
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
      detail: { octal: stateToOctal(state) }
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
      detail: { symbolic: stateToSymbolic(state) }
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
      detail: { requirements: requirementsFromState(state), octal: stateToOctal(state) }
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

  // who letters for chmod symbolic syntax: user -> u, group -> g, other -> o
  var CHMOD_WHO = { user: 'u', group: 'g', other: 'o' };

  function genSymbolicChmod(rng, opts) {
    var cls = pick(rng, ['user', 'group', 'other']);
    var who = CHMOD_WHO[cls];
    var bit = pick(rng, ['r', 'w', 'x']);
    var op = rng() < 0.5 ? '+' : '-';
    var initial = null;
    var target = null;
    var guard = 0;
    while (guard < 40) {
      guard++;
      initial = tools.parseMode(pick(rng, CHMOD_BASE_MODES));
      // The change must actually alter the mode: '+' needs the bit unset,
      // '-' needs it set. Swap the operator if the base mode already has
      // (or lacks) the bit.
      if ((op === '+' && initial[cls][bit]) || (op === '-' && !initial[cls][bit])) {
        op = op === '+' ? '-' : '+';
      }
      target = tools.applyChmodExpr(initial, who + op + bit);
      if (target && stateToOctal(target) !== stateToOctal(initial)) break;
    }
    if (!target) target = initial;
    var filename = pick(rng, FILENAMES);
    var verb = op === '+' ? 'add' : 'remove';
    var prompt = 'A file currently has permissions ' + stateToSymbolic(initial) + '. You need to ' + verb + ' ' + bitName(bit) + ' for ' + classWord(cls) + '. What chmod command does this?';
    return {
      type: TYPE.SYMBOLIC_CHMOD,
      prompt: prompt,
      expectedText: 'chmod ' + who + op + bit + ' ' + filename,
      answer: target,
      accepts: 'chmod-delta',
      detail: { initial: initial, target: target, delta: who + op + bit, filename: filename, initialSymbolic: stateToSymbolic(initial), targetSymbolic: stateToSymbolic(target) }
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
      detail: { requirements: requirementsFromState(state), octal: stateToOctal(state), symbolic: stateToSymbolic(state) }
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
    { q: 'To enter or traverse a directory (cd into it), which permission is needed on that directory?', a: 'execute (x)', wrong: ['read (r)', 'write (w)', 'no permission needed'], explain: 'Traversing a directory requires execute (x) on that directory — you need x on every directory in the path.' },
    { q: 'To list the names of the entries in a directory (ls), which permission is needed on that directory?', a: 'read (r)', wrong: ['execute (x)', 'write (w)', 'no permission needed'], explain: 'Listing a directory\u2019s contents requires read (r) on that directory.' },
    { q: 'To create a new file inside a directory, which permissions are needed on that directory?', a: 'write (w) and execute (x)', wrong: ['read (r) only', 'execute (x) only', 'write (w) only'], explain: 'Creating a file needs write (w) to add the entry and execute (x) to reach the directory.' },
    { q: 'To delete a file that lives inside a directory, which permission is needed on the directory itself?', a: 'write (w)', wrong: ['read (r) on the file', 'execute (x) on the file', 'write (w) on the file'], explain: 'Deleting an entry is a change to the directory, so write (w) on the directory is what matters — not the file\u2019s own permissions.' },
    { q: 'To modify the contents of a file, which permission is needed on the file itself?', a: 'write (w)', wrong: ['read (r)', 'execute (x)', 'write (w) on the directory'], explain: 'Changing a file\u2019s contents requires write (w) on the file itself.' },
    { q: 'To read a file, which permission is needed on the file itself?', a: 'read (r)', wrong: ['execute (x)', 'write (w)', 'read (r) on the directory'], explain: 'Reading a file requires read (r) on the file (plus execute on every directory in its path).' },
    { q: 'Which permission on a file controls whether it can be run as a program?', a: 'execute (x)', wrong: ['read (r)', 'write (w)', 'no permission needed'], explain: 'Running a file as a program requires execute (x) on that file.' }
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
      detail: { options: options, answerIndex: options.indexOf(c.a), explain: c.explain }
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
    var classWord_ = cls === 'user' ? 'the owner' : cls === 'group' ? 'a group member' : 'another user (others)';
    var dirDesc = parts.map(function (n, idx) { return n + ' (' + stateToOctal(dirStates[idx]) + ')'; }).join(', ');
    var prompt = 'Path: ' + path + ' — dirs: ' + dirDesc + ' — file mode: ' + stateToOctal(fileState) + '. Can ' + classWord_ + ' read the file?';
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
  GENERATORS[TYPE.SYMBOLIC_CHMOD] = genSymbolicChmod;
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
    var type = weightedPick(rng, types, cfg.typeWeights);
    var opts = {
      includeSetuid: !!cfg.includeSetuid && !easy,
      includeSetgid: !!cfg.includeSetgid && !easy,
      includeSticky: !!cfg.includeSticky && !easy,
      easy: easy,
      varied: !easy,
      biasBits: cfg.biasBits
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

  // Validates a symbolic-chmod (delta) answer. The user may respond with an
  // absolute mode (octal or full u=rwx,g=rx,o=r form) that matches the target,
  // or with a delta expression (u+x, g-w, ...) applied to the initial state.
  function validateChmodDelta(exercise, answer) {
    var s = String(answer == null ? '' : answer).trim().replace(/\s+/g, ' ');
    var m = /^chmod\s+(.*)$/i.exec(s);
    var rest = (m ? m[1] : s).trim();
    if (!rest) return false;
    var pieces = rest.split(/[\s,]+/).filter(Boolean);
    var modeState = null;
    var deltas = [];
    for (var i = 0; i < pieces.length; i++) {
      var oct = tools.normalizeMode(pieces[i]);
      if (oct != null) { modeState = tools.parseMode(oct); break; }
      var full = tools.permsFromSymbolic(pieces[i]);
      if (full) { modeState = full; break; }
      if (/^[augo]*[+=-][rwxXstST]+$/.test(pieces[i])) deltas.push(pieces[i]);
    }
    if (modeState) return statesEqual(modeState, exercise.answer);
    if (deltas.length) {
      var applied = tools.applyChmodExpr(exercise.detail.initial, deltas.join(','));
      return applied != null && statesEqual(applied, exercise.answer);
    }
    return false;
  }

  // Per-bit difference between two states: [{ cls, bit, expected }] plus
  // special-bit entries with cls 'special'.
  function diffStates(userState, target) {
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

  var matrixDiff = diffStates;

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
      diff: null,
      detail: null
    };
    if (!exercise || exercise.error) {
      result.feedback = 'No exercise to validate.';
      result.detail = { title: 'Not quite', comparison: null, points: [{ tone: 'warn', text: 'No exercise to validate.' }], perClass: null, remember: [] };
      return result;
    }
    result.actualText = formatActual(exercise, answer);
    var kind = exercise.accepts;
    var correct = false;
    if (kind === 'octal' || kind === 'symbolic' || kind === 'chmod') {
      var ansState = parseAnswerState(kind, answer);
      correct = ansState != null && statesEqual(ansState, exercise.answer);
      if (!correct && ansState) {
        result.diff = diffStates(ansState, exercise.answer);
      }
    } else if (kind === 'chmod-delta') {
      correct = validateChmodDelta(exercise, answer);
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
        result.diff = diffStates(userState, exercise.answer);
        result.detail = result.detail || {};
        result.detail.perClass = buildMatrixPerClass(exercise, userState, result.diff);
      }
    }
    result.correct = correct;
    result.detail = buildFeedbackDetail(exercise, answer, result);
    result.feedback = renderFeedbackText(result.detail);
    return result;
  }

  /* ── Feedback ──────────────────────────────────────────── */

  // Per-class matrix comparison: one row per class with the expected/actual
  // symbolic triples plus the bits that differ.
  function buildMatrixPerClass(exercise, userState, diff) {
    var rows = [];
    function sym3(bits) { return (bits.r ? 'r' : '-') + (bits.w ? 'w' : '-') + (bits.x ? 'x' : '-'); }
    ['user', 'group', 'other'].forEach(function (cls) {
      var issues = [];
      ['r', 'w', 'x'].forEach(function (bit) {
        if (!!userState[cls][bit] !== !!exercise.answer[cls][bit]) {
          issues.push({ bit: bit, expected: !!exercise.answer[cls][bit] });
        }
      });
      rows.push({
        cls: cls,
        label: classLabel(cls),
        expected: sym3(exercise.answer[cls]),
        actual: sym3(userState[cls]),
        ok: !issues.length,
        issues: issues
      });
    });
    var specialMatters = hasSpecialBit(exercise.answer) || hasSpecialBit(userState);
    if (specialMatters) {
      var issues = [];
      ['suid', 'sgid', 'sticky'].forEach(function (sb) {
        if (!!userState.special[sb] !== !!exercise.answer.special[sb]) {
          issues.push({ bit: sb, expected: !!exercise.answer.special[sb] });
        }
      });
      rows.push({
        cls: 'special',
        label: 'Special',
        expected: (exercise.answer.special.suid ? 's' : '-') + (exercise.answer.special.sgid ? 's' : '-') + (exercise.answer.special.sticky ? 't' : '-'),
        actual: (userState.special.suid ? 's' : '-') + (userState.special.sgid ? 's' : '-') + (userState.special.sticky ? 't' : '-'),
        ok: !issues.length,
        issues: issues
      });
    }
    return rows;
  }

  // Per-class digit breakdown: [{ cls, label, digit, symbolic }].
  function octalBreakdown(state) {
    var digits = stateToOctal(state);
    var specialDigit = digits.length === 4 ? digits.charAt(0) : null;
    var rows = [];
    [['user', 'Owner'], ['group', 'Group'], ['other', 'Other']].forEach(function (t, i) {
      var d = digits.charAt(digits.length - 3 + i);
      rows.push({ cls: t[0], label: t[1], digit: d, symbolic: stateToSymbolic(state).slice(i * 3, i * 3 + 3) });
    });
    return { specialDigit: specialDigit, rows: rows, octal: digits };
  }

  var REMEMBER = {
    octal_to_symbolic: 'Each octal digit maps to three bits: read = 4, write = 2, execute = 1.',
    symbolic_to_octal: 'Convert each class triple to a digit: read = 4, write = 2, execute = 1.',
    build_permission: 'Class digits appear in order owner, group, other — a special bit adds a leading digit: 4 = setuid, 2 = setgid, 1 = sticky.',
    chmod_command: 'The command form is chmod <mode> <file> — only the mode is graded, any filename is accepted.',
    symbolic_chmod: 'u+x adds execute for the owner, g-w removes write for the group, o+r adds read for others; a-x affects all three classes.',
    permission_matrix: 'Each class digit is read (4) + write (2) + execute (1), in order owner, group, other.',
    special_bits: '4 = setuid, 2 = setgid, 1 = sticky — shown as s/S (setuid/setgid) and t/T (sticky) in the symbolic form; uppercase when the execute bit is absent.',
    directory_semantics: 'Directories: r lists entries, w adds/removes entries, x traverses. Files: r reads, w modifies, x runs.',
    path_traversal: 'Reading a file needs x on every directory in the path and r on the file itself for that class.',
    decode_mode: 'Read the mode one digit at a time: user, then group, then other.'
  };

  // Builds the structured feedback detail. The flat string is derived from it
  // in renderFeedbackText for backward compatibility and console use.
  function buildFeedbackDetail(exercise, answer, result) {
    var correct = result.correct;
    var detail = {
      title: correct ? 'Correct' : 'Not quite',
      comparison: null,
      points: [],
      perClass: result.detail && result.detail.perClass ? result.detail.perClass : null,
      remember: []
    };
    if (!correct && result.actualText && result.actualText !== result.expectedText) {
      detail.comparison = { expected: result.expectedText, actual: result.actualText };
    }
    var type = exercise.type;

    // Per-type explanation points (shown when they add value).
    if (type === TYPE.PERMISSION_MATRIX && result.diff) {
      result.diff.forEach(function (d) {
        if (d.cls === 'special') {
          detail.points.push({ tone: 'warn', text: SPECIAL_NAMES[d.bit] + ' should be ' + (d.expected ? 'set' : 'unset') + ' — you ' + (d.expected ? 'left it off.' : 'set it.') });
        } else {
          detail.points.push({ tone: 'warn', text: classLabel(d.cls) + ' · ' + bitName(d.bit) + ' should be ' + (d.expected ? 'enabled' : 'disabled') + ' — you ' + (d.expected ? 'left it off.' : 'set it.') });
        }
      });
    }
    if (type === TYPE.OCTAL_TO_SYMBOLIC && !correct) {
      detail.points.push({ tone: 'info', text: 'Each octal digit maps to three bits: read = 4, write = 2, execute = 1.' });
    }
    if (type === TYPE.SYMBOLIC_TO_OCTAL && !correct) {
      detail.points.push({ tone: 'info', text: 'Convert each triple (user, group, other) to a digit: read = 4, write = 2, execute = 1.' });
    }
    if ((type === TYPE.OCTAL_TO_SYMBOLIC || type === TYPE.SYMBOLIC_TO_OCTAL) && !correct && exercise.detail) {
      var mode = exercise.detail.octal || (type === TYPE.SYMBOLIC_TO_OCTAL ? result.expectedText : null);
      if (mode && /^[0-7]{3,4}$/.test(mode)) {
        var bd = octalBreakdown(tools.parseMode(tools.normalizeMode(mode)));
        detail.points.push({ tone: 'info', text: bd.octal + ' = ' + bd.rows.map(function (r) { return r.digit + ' (' + r.symbolic + ')'; }).join(' · ') + (bd.specialDigit ? ' · leading ' + bd.specialDigit + ' = special bits' : '') });
      }
    }
    if (type === TYPE.CHMOD_COMMAND && !correct) {
      detail.points.push({ tone: 'info', text: 'The command form is chmod <mode> <file> — e.g. chmod ' + (exercise.detail && exercise.detail.octal ? exercise.detail.octal : '755') + ' ' + (exercise.detail && exercise.detail.filename ? exercise.detail.filename : 'file') + '. Only the mode is graded; any filename is accepted.' });
    }
    if (type === TYPE.SYMBOLIC_CHMOD) {
      if (correct) {
        detail.points.push({ tone: 'ok', text: 'chmod ' + exercise.detail.delta + ' changes ' + exercise.detail.initialSymbolic + ' → ' + exercise.detail.targetSymbolic + '.' });
      } else {
        detail.points.push({ tone: 'info', text: 'chmod ' + exercise.detail.delta + ' ' + exercise.detail.filename + ' changes ' + exercise.detail.initialSymbolic + ' → ' + exercise.detail.targetSymbolic + '. The delta (' + exercise.detail.delta + ') is what is being asked for.' });
      }
    }
    if (type === TYPE.SPECIAL_BITS) {
      var mode = exercise.detail && exercise.detail.mode ? exercise.detail.mode : (result.expectedText && /^[0-7]{3,4}$/.test(result.expectedText) ? result.expectedText : null);
      if (mode && mode.length === 4) {
        var d = Number(mode.charAt(0));
        var names = [];
        if (d & 4) names.push('setuid (4)');
        if (d & 2) names.push('setgid (2)');
        if (d & 1) names.push('sticky (1)');
        detail.points.push({ tone: 'info', text: 'The leading digit ' + mode.charAt(0) + ' = ' + (names.length ? names.join(' + ') : 'no special bits') + '.' });
      }
    }
    if (type === TYPE.DIRECTORY_SEMANTICS) {
      if (!correct && exercise.detail && exercise.detail.explain) {
        detail.points.push({ tone: 'info', text: exercise.detail.explain });
      }
    }
    if (type === TYPE.PATH_TRAVERSAL) {
      if (!correct) {
        if (exercise.detail && exercise.detail.explanation) detail.points.push({ tone: 'info', text: exercise.detail.explanation });
        detail.points.push({ tone: 'info', text: 'To read a file you need execute (x) on every directory in its path and read (r) on the file itself for the relevant class.' });
      } else if (exercise.detail && exercise.detail.explanation) {
        detail.points.push({ tone: 'ok', text: exercise.detail.explanation });
      }
    }
    if (type === TYPE.DECODE_MODE && !correct) {
      detail.points.push({ tone: 'info', text: 'Read the mode one digit at a time: user, then group, then other. Each digit is the sum of read (4), write (2), execute (1).' });
    }
    if (type === TYPE.BUILD_PERMISSION && !correct) {
      detail.points.push({ tone: 'info', text: 'Combine the three class digits in order owner/group/other; a required special bit adds a leading digit: 4 = setuid, 2 = setgid, 1 = sticky.' });
    }

    if (REMEMBER[type]) detail.remember.push(REMEMBER[type]);
    return detail;
  }

  // Flat text rendering of the structured detail (kept for backward
  // compatibility, tests, and console output).
  function renderFeedbackText(detail) {
    var lines = [detail.title + (detail.title === 'Correct' ? '!' : '.')];
    if (detail.comparison) {
      lines.push('Expected: ' + detail.comparison.expected);
      lines.push('You entered: ' + detail.comparison.actual);
    }
    detail.points.forEach(function (p) { lines.push(p.text); });
    detail.remember.forEach(function (r) { lines.push(r); });
    return lines.join('\n');
  }

  function generateFeedback(exercise, answer) {
    return validateExerciseAnswer(exercise, answer).feedback;
  }

  App.permExercise = {
    TYPE: TYPE,
    TYPE_META: TYPE_META,
    DIFFICULTY_IDS: DIFFICULTY_IDS.slice(),
    DIFFICULTY_DESC: DIFFICULTY_DESC,
    makeRng: makeRng,
    randomInt: randomInt,
    pick: pick,
    shuffle: shuffle,
    weightedPick: weightedPick,
    generatePermState: generatePermState,
    stateToOctal: stateToOctal,
    stateToSymbolic: stateToSymbolic,
    requirementsFromState: requirementsFromState,
    generateExercise: generateExercise,
    validateExerciseAnswer: validateExerciseAnswer,
    generateFeedback: generateFeedback,
    diffStates: diffStates,
    matrixDiff: matrixDiff,
    octalBreakdown: octalBreakdown
  };
})();
