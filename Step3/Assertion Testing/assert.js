
// assert(value[, message])
// assert模块提供了一系列检验异常的方法，但是它通常是在NodeJS内部使用
// 它不是一个检验框架，也不是为了一般性的检验二设计的

const assert = require('assert');

assert(true);  // OK
assert(1);     // OK
assert(false);
  // throws "AssertionError: false == true"
assert(0);
  // throws "AssertionError: 0 == true"
assert(false, 'it\'s false');
  // throws "AssertionError: it's false"