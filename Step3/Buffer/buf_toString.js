
// buf.toString([encoding[, start[, end]]])
// 设置字符编码并将buf以字符串的形式显示出来，默认字符编码为utf8

const buf = Buffer.allocUnsafe(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97; // 97 is ASCII a
}
buf.toString('ascii');
  // Returns: 'abcdefghijklmnopqrstuvwxyz'
buf.toString('ascii',0,5);
  // Returns: 'abcde'
buf.toString('utf8',0,5);
  // Returns: 'abcde'
buf.toString(undefined,0,5);
  // Returns: 'abcde', encoding defaults to 'utf8'