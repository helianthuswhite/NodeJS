
// 可以通过数组形式分配内存
//new Buffer(array)不推荐，推荐使用Buffer.from(array)
const buf = new Buffer([0x62,0x75,0x66,0x66,0x65,0x72]);
  // creates a new Buffer containing ASCII bytes
  // ['b','u','f','f','e','r']


// 可以把一个buffer数据复制到另一个Buffer里面
// new Buffer(buffer)不推荐，推荐使用Buffer.from(buffer)
const buf1 = new Buffer('buffer');
const buf2 = new Buffer(buf1);

buf1[0] = 0x61;
console.log(buf1.toString());
  // 'auffer'
console.log(buf2.toString());
  // 'buffer' (copy is not changed)


// 共享内存方法，后面两个可选参数规定了能够共享的数据位置
// new Buffer(arrayBuffer[, byteOffset [, length]])不推荐，
// 推荐使用Buffer.from(arrayBuffer[, byteOffset [, length]])
const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;

const buf = new Buffer(arr.buffer); // shares the memory with arr;

console.log(buf);
  // Prints: <Buffer 88 13 a0 0f>

// changing the TypdArray changes the Buffer also
arr[1] = 6000;

console.log(buf);
  // Prints: <Buffer 88 13 70 17>


// 规定buffer分配的字节数，必须小于require('buffer').kMaxLength，64位机器上一般是2^31-1
// new Buffer(size)不推荐，推荐使用Buffer.alloc(size[, fill[, encoding]])
// 或Buffer.allocUnsafe(size)
const buf = new Buffer(5);
console.log(buf);
  // <Buffer 78 e0 82 02 01>
  // (octets will be different, every time)
buf.fill(0);
console.log(buf);
  // <Buffer 00 00 00 00 00>


// 创建一个字符串，后面可选参数为设置字符编码
// new Buffer(str[, encoding])不推荐，推荐使用Buffer.from(str[, encoding]) 
const buf1 = new Buffer('this is a tést');
console.log(buf1.toString());
  // prints: this is a tést
console.log(buf1.toString('ascii'));
  // prints: this is a tC)st

const buf2 = new Buffer('7468697320697320612074c3a97374', 'hex');
console.log(buf2.toString());
  // prints: this is a tést

