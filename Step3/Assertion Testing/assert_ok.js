
// assert.ok(value[, message])
// 判断value的值是否为真，相当于assert.equal(!!value, true, message).

const assert = require('assert');

assert.ok(true);  // OK
assert.ok(1);     // OK
assert.ok(false);
  // throws "AssertionError: false == true"
assert.ok(0);
  // throws "AssertionError: 0 == true"
assert.ok(false, 'it\'s false');
  // throws "AssertionError: it's false"