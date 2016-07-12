

// assert.throws(block[, error][, message])
// 异常抛出方法，异常可以是构造器、正则表达式或者验证函数，但是不能是字符串

assert.throws(
  () => {
    throw new Error('Wrong value');
  },
  Error
);

assert.throws(
  () => {
    throw new Error('Wrong value');
  },
  /value/
);

assert.throws(
  () => {
    throw new Error('Wrong value');
  },
  function(err) {
    if ( (err instanceof Error) && /value/.test(err) ) {
      return true;
    }
  },
  'unexpected error'
);