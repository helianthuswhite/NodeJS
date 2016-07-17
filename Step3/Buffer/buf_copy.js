
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
// 把一个buffer中的数据复制到另一个buffer中，即使那块内存已被占用

const buf1 = Buffer.allocUnsafe(26);
const buf2 = Buffer.allocUnsafe(26).fill('!');

for (let i = 0 ; i < 26 ; i++) {
  buf1[i] = i + 97; // 97 is ASCII a
}

buf1.copy(buf2, 8, 16, 20);
console.log(buf2.toString('ascii', 0, 25));
  // Prints: !!!!!!!!qrst!!!!!!!!!!!!!