
// Buffer.byteLength(string[, encoding])
// 返回字符串的实际字节长，String.length只是返回字母的个数

const str = '\u00bd + \u00bc = \u00be';

console.log(`${str}: ${str.length} characters, ` +
            `${Buffer.byteLength(str, 'utf8')} bytes`);

// ½ + ¼ = ¾: 9 characters, 12 bytes