
// assert.notEqual(actual, expected[, message])
// 相当于’！=‘


const assert = require('assert');

assert.notEqual(1, 2);
  // OK

assert.notEqual(1, 1);
  // AssertionError: 1 != 1

assert.notEqual(1, '1');
  // AssertionError: 1 != '1'