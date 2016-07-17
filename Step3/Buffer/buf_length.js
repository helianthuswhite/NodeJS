
// buf.length
// 返回buffer分配的内存长度

const buf = Buffer.alloc(1234);

console.log(buf.length);
  // Prints: 1234

buf.write('some string', 0, 'ascii');
console.log(buf.length);
  // Prints: 1234

// buf对想要修改buf长度的应用来说是只读的，所以用buf.slice方法来创建一个新的buffer

var buf = Buffer.allocUnsafe(10);
buf.write('abcdefghj', 0, 'ascii');
console.log(buf.length);
  // Prints: 10
buf = buf.slice(0,5);
console.log(buf.length);
  // Prints: 5