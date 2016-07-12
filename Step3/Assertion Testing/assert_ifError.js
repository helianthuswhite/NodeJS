
// assert.ifError(value)
// 如果value为true，则抛出；通常用来检验回调函数中的参数错误

const assert = require('assert');

assert.ifError(0); // OK
assert.ifError(1); // Throws 1
assert.ifError('error') // Throws 'error'
assert.ifError(new Error()); // Throws Error