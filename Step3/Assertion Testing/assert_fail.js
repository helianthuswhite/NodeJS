
// assert.fail(actual, expected, message, operator)
// 如果message为true，则错误信息为message，否则为actual+operator+expected

const assert = require('assert');

assert.fail(1, 2, undefined, '>');
  // AssertionError: 1 > 2

assert.fail(1, 2, 'whoops', '>');
  // AssertionError: whoops