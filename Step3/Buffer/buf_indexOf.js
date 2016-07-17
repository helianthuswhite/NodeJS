
// buf.indexOf(value[, byteOffset][, encoding])
// 相当于array.indexOf，返回buffer中出现value的序号

const buf = Buffer.from('this is a buffer');

buf.indexOf('this');
  // returns 0
buf.indexOf('is');
  // returns 2
buf.indexOf(Buffer.from('a buffer'));
  // returns 8
buf.indexOf(97); // ascii for 'a'
  // returns 8
buf.indexOf(Buffer.from('a buffer example'));
  // returns -1
buf.indexOf(Buffer.from('a buffer example').slice(0,8));
  // returns 8

const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'ucs2');

utf16Buffer.indexOf('\u03a3',  0, 'ucs2');
  // returns 4
utf16Buffer.indexOf('\u03a3', -4, 'ucs2');
  // returns 6