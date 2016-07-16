
// Buffer 是NodeJs中的一个全局变量，不需要使用require来引入


const buf1 = Buffer.alloc(10);
  // Creates a zero-filled Buffer of length 10.

const buf2 = Buffer.alloc(10, 1);
  // Creates a Buffer of length 10, filled with 0x01.

const buf3 = Buffer.allocUnsafe(10);
  // Creates an uninitialized buffer of length 10.
  // This is faster than calling Buffer.alloc() but the returned
  // Buffer instance might contain old data that needs to be
  // overwritten using either fill() or write().

const buf4 = Buffer.from([1,2,3]);
  // Creates a Buffer containing [01, 02, 03].

const buf5 = Buffer.from('test');
  // Creates a Buffer containing ASCII bytes [74, 65, 73, 74].

const buf6 = Buffer.from('tést', 'utf8');
  // Creates a Buffer containing UTF8 bytes [74, c3, a9, 73, 74].