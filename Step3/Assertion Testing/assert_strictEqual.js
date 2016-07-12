
// assert.strictEqual(actual, expected[, message])
// 相当于’===‘

const assert = require('assert');

assert.strictEqual(1, 2);
  // AssertionError: 1 === 2

assert.strictEqual(1, 1);
  // OK

assert.strictEqual(1, '1');
  // AssertionError: 1 === '1'
