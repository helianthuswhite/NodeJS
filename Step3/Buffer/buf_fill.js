
// buf.fill(value[, offset[, end]][, encoding])
// 为buffer中填充数据，只有数据为字符串的时候encoding默认为utf-8

const b = Buffer.allocUnsafe(50).fill('h');
console.log(b.toString());
  // Prints: hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh