
// buf.includes(value[, byteOffset][, encoding])#
// 判断一个buffer中是否含有value，如果有返回true

const buf = Buffer.from('this is a buffer');

buf.includes('this');
  // returns true
buf.includes('is');
  // returns true
buf.includes(Buffer.from('a buffer'));
  // returns true
buf.includes(97); // ascii for 'a'
  // returns true
buf.includes(Buffer.from('a buffer example'));
  // returns false
buf.includes(Buffer.from('a buffer example').slice(0,8));
  // returns true
buf.includes('this', 4);
  // returns false