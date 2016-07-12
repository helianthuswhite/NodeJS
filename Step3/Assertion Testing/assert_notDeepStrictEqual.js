
// assert.notDeepStrictEqual(actual, expected[, message])
// 与assert.DeepStrictEqual()相反

const assert = require('assert');

assert.notDeepEqual({a:1}, {a:'1'});
  // AssertionError: { a: 1 } notDeepEqual { a: '1' }

assert.notDeepStrictEqual({a:1}, {a:'1'});
  // OK