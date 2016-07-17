
// buf.equals(otherBuffer)
// 判断两个Buffer之间是否有相同的字节数

const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('414243', 'hex');
const buf3 = Buffer.from('ABCD');

console.log(buf1.equals(buf2));
  // Prints: true
console.log(buf1.equals(buf3));
  // Prints: false