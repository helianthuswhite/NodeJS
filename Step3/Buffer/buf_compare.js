
// buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
// 用来比较buffer的顺序，如果相同返回0，如果target应该位于buf之前则返回1，否则返回-1

const buf1 = Buffer.from('ABC');
const buf2 = Buffer.from('BCD');
const buf3 = Buffer.from('ABCD');

console.log(buf1.compare(buf1));
  // Prints: 0
console.log(buf1.compare(buf2));
  // Prints: -1
console.log(buf1.compare(buf3));
  // Prints: 1
console.log(buf2.compare(buf1));
  // Prints: 1
console.log(buf2.compare(buf3));
  // Prints: 1

[buf1, buf2, buf3].sort(Buffer.compare);
  // produces sort order [buf1, buf3, buf2]

// 可以通过输入参数来控制比较的范围

const buf1 = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const buf2 = Buffer.from([5, 6, 7, 8, 9, 1, 2, 3, 4]);

console.log(buf1.compare(buf2, 5, 9, 0, 4));
  // Prints: 0
console.log(buf1.compare(buf2, 0, 6, 4));
  // Prints: -1
console.log(buf1.compare(buf2, 5, 6, 5));
  // Prints: 1