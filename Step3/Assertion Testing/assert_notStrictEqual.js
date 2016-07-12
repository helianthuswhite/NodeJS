
// assert.notStrictEqual(actual, expected[, message])
// 相当于！==

const assert = require('assert');

assert.notStrictEqual(1, 2);
  // OK

assert.notStrictEqual(1, 1);
  // AssertionError: 1 != 1

assert.notStrictEqual(1, '1');
  // OK