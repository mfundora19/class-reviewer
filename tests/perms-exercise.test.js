/* ═══════════════════════════════════════════════════════════
   ReviewApp · perms-exercise.test.js
   Tests for the permissions domain model (tools.js) and the
   procedural exercise engine (perms-exercise.js).

   Covers: octal/symbolic round trips, symbolic parsing (incl.
   special bits s/S/t/T and the u=rwx,g=rx,o=rx form), seeded
   deterministic generation, the invariant that every generated
   exercise validates against its own canonical answer, special-bit
   configuration, answer normalization (leading zeros, chmod
   spacing, alternative symbolic forms), matrix diffs, and
   educational feedback.

   Run with:  node tests/perms-exercise.test.js
   ═══════════════════════════════════════════════════════════ */
'use strict';

// Both modules expect the ReviewApp namespace; stub enough to load them.
global.window = { ReviewApp: { core: { utils: {} } } };
require('../app/js/tools.js');
require('../app/js/perms-exercise.js');

var T = global.window.ReviewApp.tools;
var E = global.window.ReviewApp.permExercise;
var passed = 0;
var failed = 0;

function expect(label, actual, expected) {
  if (actual === expected) { passed++; return; }
  failed++;
  console.error('FAIL: ' + label + ' — expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual));
}

function check(label, ok, extra) {
  if (ok) { passed++; return; }
  failed++;
  console.error('FAIL: ' + label + (extra !== undefined ? ' — ' + extra : ''));
}

function canonicalAnswer(ex) {
  if (ex.accepts === 'octal') return E.stateToOctal(ex.answer);
  if (ex.accepts === 'symbolic') return E.stateToSymbolic(ex.answer);
  if (ex.accepts === 'chmod') return ex.expectedText;
  if (ex.accepts === 'mcq') return ex.detail.answerIndex;
  if (ex.accepts === 'matrix') return ex.answer;
  return null;
}

/* ── 1. Domain: parseMode / permsFromMode / normalizeMode ── */
var modes = ['000', '111', '222', '333', '444', '555', '666', '777', '640', '754', '644', '755', '700', '600', '4755', '2755', '1777', '6755', '7777', '4070', '001'];
modes.forEach(function (m) {
  var p = T.parseMode(m);
  check('parseMode(' + m + ') valid', !!p);
  if (p) {
    var enc = T.permsFromMode(p.special, p.user, p.group, p.other);
    expect('roundtrip ' + m + ' -> ' + enc.octal, enc.octal, T.normalizeMode(m));
  }
});
expect('parseMode invalid "999"', T.parseMode('999'), null);
expect('parseMode invalid "abc"', T.parseMode('abc'), null);
expect('normalizeMode 0755', T.normalizeMode('0755'), '755');
expect('normalizeMode 0644', T.normalizeMode('0644'), '644');
expect('normalizeMode 000', T.normalizeMode('000'), '000');
expect('normalizeMode 4755', T.normalizeMode('4755'), '4755');
expect('normalizeMode spaced', T.normalizeMode(' 755 '), '755');
expect('normalizeMode invalid 12', T.normalizeMode('12'), null);
expect('normalizeMode invalid 12345', T.normalizeMode('12345'), null);

/* ── 2. Domain: permsFromSymbolic ────────────────────────── */
var symCases = [
  ['rwxr-xr--', '754'],
  ['-rwxr-xr-x', '755'],
  ['drwxr-xr-x', '755'],
  ['rw-r-----', '640'],
  ['rwsr-xr-x', '4755'],
  ['rwSr-xr-x', '4655'],
  ['rwxr-sr-x', '2755'],
  ['rwxr-xr-t', '1755'],
  ['rwxr-xr-T', '1754'],
  ['u=rwx,g=rx,o=r', '754'],
  ['u=rwx,g=rx,o=r,u=s', '4754'],
  ['u=rwx,g=rx,o=r,o=t', '1754'],
  ['u=rwx,g=rx,o=rx,u=rwx', '755']
];
symCases.forEach(function (c) {
  var s = T.permsFromSymbolic(c[0]);
  check('permsFromSymbolic ' + c[0], !!s && E.stateToOctal(s) === c[1], s ? E.stateToOctal(s) : 'null');
});
['rwx', '777', '', 'u=rwx', 'x=rwx', 'u=rwx,g=rx', 'rwsrwsrws'].forEach(function (bad) {
  check('permsFromSymbolic invalid "' + bad + '"', T.permsFromSymbolic(bad) === null);
});
var suParsed = T.permsFromSymbolic('rwSr-xr-x');
check('S = setuid without execute', suParsed && suParsed.special.suid === true && suParsed.user.x === false);
var stickyParsed = T.permsFromSymbolic('rwxr-xr-T');
check('T = sticky without execute', stickyParsed && stickyParsed.special.sticky === true && stickyParsed.other.x === false);

/* ── 3. Engine: seeded determinism & generation invariant ── */
var cfg = { includeSetuid: true, includeSetgid: true, includeSticky: true, types: Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }) };
var e1 = E.generateExercise(cfg, 42);
var e2 = E.generateExercise(cfg, 42);
check('same seed -> same exercise', e1.prompt === e2.prompt && e1.type === e2.type && e1.expectedText === e2.expectedText);
var prompts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (s) { return E.generateExercise(cfg, s).prompt; });
check('different seeds -> variety', new Set(prompts).size >= 5, 'distinct=' + new Set(prompts).size);

var bad = [];
for (var seed = 0; seed < 250; seed++) {
  var ex = E.generateExercise(cfg, seed);
  if (ex.error) { bad.push('seed ' + seed + ': ' + ex.error); continue; }
  var res = E.validateExerciseAnswer(ex, canonicalAnswer(ex));
  if (!res.correct) bad.push('seed ' + seed + ' type ' + ex.type + ' -> ' + res.feedback.split('\n')[0]);
}
check('250 seeded exercises all self-validate', bad.length === 0, bad.slice(0, 3).join(' | '));

/* ── 4. Engine: special-bit configuration ────────────────── */
var off = { includeSetuid: false, includeSetgid: false, includeSticky: false, types: Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }) };
var sawSpecialType = false, sawSpecialState = false;
for (var s2 = 0; s2 < 300; s2++) {
  var x = E.generateExercise(off, s2 + 1000);
  if (x.type === E.TYPE.SPECIAL_BITS) sawSpecialType = true;
  if (x.accepts === 'octal' || x.accepts === 'symbolic' || x.accepts === 'chmod' || x.accepts === 'matrix') {
    if (E.stateToOctal(x.answer).length === 4) sawSpecialState = true;
    if (x.answer.special && (x.answer.special.suid || x.answer.special.sgid || x.answer.special.sticky)) sawSpecialState = true;
  }
}
check('no SPECIAL_BITS type when disabled', !sawSpecialType);
check('no special bits in generated states when disabled', !sawSpecialState);

var on = { includeSetuid: true, includeSetgid: true, includeSticky: true, types: Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }) };
var seenType = 0, seenSpecial = 0;
for (var s3 = 0; s3 < 400; s3++) {
  var y = E.generateExercise(on, s3 + 5000);
  if (y.type === E.TYPE.SPECIAL_BITS) seenType++;
  if (y.accepts === 'octal' || y.accepts === 'symbolic' || y.accepts === 'chmod' || y.accepts === 'matrix') {
    if (E.stateToOctal(y.answer).length === 4) seenSpecial++;
  }
}
check('SPECIAL_BITS type appears when enabled', seenType > 0, 'count=' + seenType);
check('special-bit states appear when enabled', seenSpecial > 0, 'count=' + seenSpecial);

/* ── 5. Answer validation & normalization ────────────────── */
var oct2sym = E.generateExercise({ types: [E.TYPE.OCTAL_TO_SYMBOLIC] }, 7);
check('octal->symbolic correct', E.validateExerciseAnswer(oct2sym, oct2sym.expectedText).correct === true);
var st8 = oct2sym.answer;
var commaForm = 'u=' + (st8.user.r ? 'r' : '') + (st8.user.w ? 'w' : '') + (st8.user.x ? 'x' : '') + ',g=' + (st8.group.r ? 'r' : '') + (st8.group.w ? 'w' : '') + (st8.group.x ? 'x' : '') + ',o=' + (st8.other.r ? 'r' : '') + (st8.other.w ? 'w' : '') + (st8.other.x ? 'x' : '');
check('octal->symbolic accepts comma form', E.validateExerciseAnswer(oct2sym, commaForm).correct === true, commaForm);
check('octal->symbolic wrong rejected', E.validateExerciseAnswer(oct2sym, '----------').correct === false);

var sym2oct = E.generateExercise({ types: [E.TYPE.SYMBOLIC_TO_OCTAL] }, 9);
var expectedOct = E.stateToOctal(sym2oct.answer);
check('symbolic->octal exact', E.validateExerciseAnswer(sym2oct, expectedOct).correct === true);
check('symbolic->octal leading zero accepted', E.validateExerciseAnswer(sym2oct, '0' + expectedOct).correct === true);
check('symbolic->octal wrong rejected', E.validateExerciseAnswer(sym2oct, '999').correct === false);

var chmodEx = E.generateExercise({ types: [E.TYPE.CHMOD_COMMAND] }, 11);
var cMode = E.stateToOctal(chmodEx.answer);
check('chmod exact', E.validateExerciseAnswer(chmodEx, 'chmod ' + cMode + ' ' + chmodEx.detail.filename).correct === true);
check('chmod other filename ok', E.validateExerciseAnswer(chmodEx, 'CHMOD  0' + cMode + '  whatever.sh').correct === true);
check('chmod symbolic mode ok', E.validateExerciseAnswer(chmodEx, 'chmod ' + E.stateToSymbolic(chmodEx.answer) + ' f').correct === true);
check('chmod wrong mode rejected', E.validateExerciseAnswer(chmodEx, 'chmod 777 f').correct === false);

var buildEx = E.generateExercise({ types: [E.TYPE.BUILD_PERMISSION] }, 13);
check('build correct', E.validateExerciseAnswer(buildEx, E.stateToOctal(buildEx.answer)).correct === true);
check('build leading-zero ok', E.validateExerciseAnswer(buildEx, '0' + E.stateToOctal(buildEx.answer)).correct === true);
check('build wrong rejected', E.validateExerciseAnswer(buildEx, '000').correct === false);

var matEx = E.generateExercise({ types: [E.TYPE.PERMISSION_MATRIX] }, 15);
check('matrix correct state', E.validateExerciseAnswer(matEx, matEx.answer).correct === true);
var wrongState = JSON.parse(JSON.stringify(matEx.answer));
wrongState.group.w = !wrongState.group.w;
var mres = E.validateExerciseAnswer(matEx, wrongState);
check('matrix wrong state rejected', mres.correct === false);
check('matrix diff pinpoints bit', mres.diff && mres.diff.some(function (d) { return d.cls === 'group' && d.bit === 'w'; }));
check('matrix feedback explains', mres.feedback.indexOf('Group') >= 0 && mres.feedback.indexOf('write') >= 0);

var decEx = E.generateExercise({ types: [E.TYPE.DECODE_MODE] }, 17);
check('decode mcq correct index', E.validateExerciseAnswer(decEx, decEx.detail.answerIndex).correct === true);
check('decode mcq wrong index', E.validateExerciseAnswer(decEx, (decEx.detail.answerIndex + 1) % 4).correct === false);
check('decode feedback shows expected', E.validateExerciseAnswer(decEx, (decEx.detail.answerIndex + 1) % 4).feedback.indexOf('Expected: ' + decEx.expectedText) >= 0);

var spEx = E.generateExercise({ types: [E.TYPE.SPECIAL_BITS], includeSetuid: true, includeSetgid: true, includeSticky: true }, 19);
if (spEx.detail.variant === 'meaning') {
  check('special meaning mcq correct', E.validateExerciseAnswer(spEx, spEx.detail.answerIndex).correct === true);
  check('special meaning leading digit valid', [4, 2, 1].indexOf(Number(spEx.detail.mode.charAt(0))) >= 0, spEx.detail.mode);
  var fb = E.validateExerciseAnswer(spEx, (spEx.detail.answerIndex + 1) % 4).feedback;
  check('special meaning feedback mentions digit', fb.indexOf(spEx.detail.mode.charAt(0)) >= 0);
} else {
  check('special octal correct', E.validateExerciseAnswer(spEx, spEx.expectedText).correct === true);
  check('special octal mode 4-digit', spEx.expectedText.length === 4);
  var fb2 = E.validateExerciseAnswer(spEx, '755').feedback;
  check('special octal feedback mentions special bit', fb2.indexOf('setuid') >= 0 || fb2.indexOf('setgid') >= 0 || fb2.indexOf('sticky') >= 0);
}

/* ── 6. Config edge cases ────────────────────────────────── */
check('no types -> error', !!E.generateExercise({ types: [] }, 1).error);
check('special type only, bits off -> error', !!E.generateExercise({ types: [E.TYPE.SPECIAL_BITS], includeSetuid: false, includeSetgid: false, includeSticky: false }, 1).error);
check('single type works', E.generateExercise({ types: [E.TYPE.OCTAL_TO_SYMBOLIC] }, 1).type === E.TYPE.OCTAL_TO_SYMBOLIC);

/* ── 7. Every type reachable ─────────────────────────────── */
var reached = {};
for (var s4 = 0; s4 < 600; s4++) {
  var z = E.generateExercise({ types: Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }), includeSetuid: true, includeSetgid: true, includeSticky: true }, s4 + 9000);
  if (!z.error) reached[z.type] = true;
}
Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }).forEach(function (t) {
  check('type reachable: ' + t, !!reached[t]);
});

/* ── 8. Path traversal correctness ───────────────────────── */
var ptBad = 0;
for (var s5 = 0; s5 < 200; s5++) {
  var pt = E.generateExercise({ types: [E.TYPE.PATH_TRAVERSAL] }, s5 + 20000);
  if (!E.validateExerciseAnswer(pt, pt.detail.answerIndex).correct) ptBad++;
}
check('path traversal 200 self-validations', ptBad === 0, 'bad=' + ptBad);


/* ── 9. Difficulty levels ────────────────────────────────── */
// Easy: only easy types, no special bits even when enabled
var easyBad = 0;
var easyTypes = {};
for (var d1 = 0; d1 < 300; d1++) {
  var exEasy = E.generateExercise({ types: Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }), includeSetuid: true, includeSetgid: true, includeSticky: true, difficulty: 'easy' }, d1 + 30000);
  if (exEasy.error) { easyBad++; continue; }
  easyTypes[exEasy.type] = true;
  var octEasy = E.stateToOctal(exEasy.answer);
  if (octEasy.length !== 3) easyBad++;
}
check('easy never yields 4-digit special modes', easyBad === 0, 'bad=' + easyBad);
Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }).forEach(function (t) {
  if (E.TYPE_META[t].difficulty === 'easy') {
    check('easy type reachable: ' + t, !!easyTypes[t]);
  } else {
    check('non-easy type excluded at easy: ' + t, !easyTypes[t]);
  }
});

// Medium: only medium types
var medBad = 0;
for (var d2 = 0; d2 < 300; d2++) {
  var exMed = E.generateExercise({ types: Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }), includeSetuid: true, includeSetgid: true, includeSticky: true, difficulty: 'medium' }, d2 + 40000);
  if (exMed.error || E.TYPE_META[exMed.type].difficulty !== 'medium') medBad++;
}
check('medium only yields medium types', medBad === 0, 'bad=' + medBad);

// Hard: only hard types
var hardBad = 0;
for (var d3 = 0; d3 < 300; d3++) {
  var exHard = E.generateExercise({ types: Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }), includeSetuid: true, includeSetgid: true, includeSticky: true, difficulty: 'hard' }, d3 + 50000);
  if (exHard.error || E.TYPE_META[exHard.type].difficulty !== 'hard') hardBad++;
}
check('hard only yields hard types', hardBad === 0, 'bad=' + hardBad);

// Easy with special bits disabled in config also works
var exEasy2 = E.generateExercise({ types: [E.TYPE.OCTAL_TO_SYMBOLIC, E.TYPE.SYMBOLIC_TO_OCTAL], difficulty: 'easy' }, 60001);
check('easy no-special config generates', !exEasy2.error && E.stateToOctal(exEasy2.answer).length === 3);

// Determinism holds with difficulty set
var a1 = E.generateExercise({ types: Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }), difficulty: 'medium', includeSetuid: true }, 70001);
var a2 = E.generateExercise({ types: Object.keys(E.TYPE).map(function (k) { return E.TYPE[k]; }), difficulty: 'medium', includeSetuid: true }, 70001);
check('difficulty generation is seeded-deterministic', JSON.stringify(a1) === JSON.stringify(a2));

// Invalid difficulty falls back to no filtering (treated as unknown -> all types allowed)
var exAll = E.generateExercise({ types: [E.TYPE.OCTAL_TO_SYMBOLIC, E.TYPE.SPECIAL_BITS], includeSetuid: true, difficulty: 'bogus' }, 80001);
check('unknown difficulty treated as all', !exAll.error && [E.TYPE.OCTAL_TO_SYMBOLIC, E.TYPE.SPECIAL_BITS].indexOf(exAll.type) >= 0);

/* ── Summary ─────────────────────────────────────────────── */
console.log(passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
