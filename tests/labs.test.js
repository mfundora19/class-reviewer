/* ReviewApp · labs.test.js
 *
 * Regression checks for optional lab mock-data rendering.
 * Run with: node tests/labs.test.js
 */
'use strict';

var assert = require('assert');

global.window = {
  ReviewApp: {
    core: {
      utils: {},
      registerRoute: function () {}
    }
  }
};

global.document = {};
require('../app/js/views.js');
var labMockItems = global.window.ReviewApp.views.labMockItems;

assert.deepStrictEqual(
  labMockItems({}),
  [],
  'missing mockData should produce no resources'
);
assert.deepStrictEqual(
  labMockItems({ mockData: [] }),
  [],
  'an empty mockData array should produce no resources'
);
assert.deepStrictEqual(
  labMockItems({ mockData: [null, {}, { name: 'Metadata only', content: '   ' }, ''] }),
  [],
  'blank and metadata-only entries should not create a Mock Data section'
);
assert.deepStrictEqual(
  labMockItems({ mockData: ['Network observations'] }),
  [{ content: 'Network observations' }],
  'string mock-data snippets should remain renderable'
);
assert.deepStrictEqual(
  labMockItems({ mockData: [{ name: 'events.log', content: 'INFO ready\n' }] }),
  [{ content: 'INFO ready\n', name: 'events.log' }],
  'object mock-data resources should remain renderable'
);

console.log('PASS: lab mock-data sections only contain usable resources');
