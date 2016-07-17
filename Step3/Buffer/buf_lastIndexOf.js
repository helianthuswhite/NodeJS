
// buf.lastIndexOf(value[, byteOffset][, encoding])#
// 与buf.indexOf相似，只不过此方法是从后往前搜索，返回搜索到的元素距离开头的位置

const buf = new Buffer('this buffer is a buffer');

buf.lastIndexOf('this');
  // returns 0
buf.lastIndexOf('buffer');
  // returns 17
buf.lastIndexOf(new Buffer('buffer'));
  // returns 17
buf.lastIndexOf(97); // ascii for 'a'
  // returns 15
buf.lastIndexOf(new Buffer('yolo'));
  // returns -1
buf.lastIndexOf('buffer', 5)
  // returns 5
buf.lastIndexOf('buffer', 4)
  // returns -1

const utf16Buffer = new Buffer('\u039a\u0391\u03a3\u03a3\u0395', 'ucs2');

utf16Buffer.lastIndexOf('\u03a3', null, 'ucs2');
  // returns 6
utf16Buffer.lastIndexOf('\u03a3', -5, 'ucs2');
  // returns 4