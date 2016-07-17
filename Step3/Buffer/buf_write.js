
// buf.write(string[, offset[, length]][, encoding])
// 将一个字符串写入Buffer

const buf = Buffer.allocUnsafe(256);
const len = buf.write('\u00bd + \u00bc = \u00be', 0);
console.log(`${len} bytes: ${buf.toString('utf8', 0, len)}`);
  // Prints: 12 bytes: ½ + ¼ = ¾