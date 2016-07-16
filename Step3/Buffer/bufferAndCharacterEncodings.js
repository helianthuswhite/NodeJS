
// Buffer and Character Encodings
// 现在可以直接用buffer来将一个序列的字符编码进行转换
// Node现在支持的字符编码有：ASCII、UTF8、UTF16LE、UCS2、BASE64、BINARY、HEX

const buf = Buffer.from('hello world', 'ascii');
console.log(buf.toString('hex'));
  // prints: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
  // prints: aGVsbG8gd29ybGQ=