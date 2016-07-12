

// assert.equal(actual, expected[, message])
// 验证实际值和期待值是否相等，相当于’==‘

const assert = require('assert');

assert.equal(1, 1);
  // OK, 1 == 1
assert.equal(1, '1');
  // OK, 1 == '1'

assert.equal(1, 2);
  // AssertionError: 1 == 2
assert.equal({a: {b: 1}}, {a: {b: 1}});
  //AssertionError: { a: { b: 1 } } == { a: { b: 1 } }