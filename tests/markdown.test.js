/* ReviewApp · markdown.test.js
 *
 * Regression checks for the inline Markdown renderer used by quiz and other
 * study-content surfaces. Run with: node tests/markdown.test.js
 */
'use strict';

var assert = require('assert');

global.window = {
  ReviewApp: {
    core: {
      utils: {
        escapeHtml: function (value) {
          return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        }
      }
    }
  }
};

require('../app/js/markdown.js');
var markdown = global.window.ReviewApp.markdown;

var question = 'Which `ls` option lists hidden files?';
var rendered = markdown.renderInline(question);
assert.strictEqual(rendered, 'Which <code>ls</code> option lists hidden files?');
assert.strictEqual(rendered.indexOf('`'), -1, 'inline code delimiters should not be shown');

var explanation = 'Use `pwd` to print the current working directory.';
var renderedExplanation = markdown.renderInline(explanation);
assert.strictEqual(renderedExplanation, 'Use <code>pwd</code> to print the current working directory.');
assert.strictEqual(renderedExplanation.indexOf('`'), -1, 'explanation code delimiters should not be shown');

[
  ['option', 'Choose `-a` for hidden files.'],
  ['flashcard', 'The `chmod` command changes permissions.'],
  ['lab step', 'Run `systemctl status ssh` and verify the service.'],
  ['search result', 'Find questions about `grep`.']
].forEach(function (sample) {
  var sampleHtml = markdown.renderInline(sample[1]);
  assert.strictEqual(sampleHtml.indexOf('`'), -1, sample[0] + ' code delimiters should not be shown');
  assert.ok(sampleHtml.indexOf('<code>') >= 0, sample[0] + ' code should use an inline code element');
});
assert.strictEqual(
  markdown.renderInline('\uE000 literal \uE001'),
  '\uE000 literal \uE001',
  'marker-like literal text should remain visible'
);

assert.strictEqual(
  markdown.renderInline('Use `<script>alert(1)</script>` safely.'),
  'Use <code>&lt;script&gt;alert(1)&lt;/script&gt;</code> safely.'
);
assert.strictEqual(
  markdown.renderInline('A <b>literal</b> command.'),
  'A &lt;b&gt;literal&lt;/b&gt; command.'
);
assert.strictEqual(
  markdown.renderInline('Use **bold** and *italic*.'),
  'Use <strong>bold</strong> and <em>italic</em>.'
);
assert.strictEqual(
  markdown.render('##### Detail heading'),
  '<h5>Detail heading</h5>',
  'level-five Markdown headings should render as h5 elements'
);

console.log('PASS: inline Markdown rendering checks');
