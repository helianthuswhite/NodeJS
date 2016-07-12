
// assert.notDeepEqual(actual, expected[, message])
// 与assert.DeepEqual()相反

const assert = require('assert');

const obj1 = {
  a : {
    b : 1
  }
};
const obj2 = {
  a : {
    b : 2
  }
};
const obj3 = {
  a : {
    b : 1
  }
}
const obj4 = Object.create(obj1);

assert.notDeepEqual(obj1, obj1);
  // AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj2);
  // OK, obj1 and obj2 are not deeply equal

assert.notDeepEqual(obj1, obj3);
  // AssertionError: { a: { b: 1 } } notDeepEqual { a: { b: 1 } }

assert.notDeepEqual(obj1, obj4);
  // OK, obj1 and obj2 are not deeply equal