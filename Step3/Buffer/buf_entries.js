
// buf.entries()
// 返回遍历一个buffer的标号和字节数

const buf = Buffer.from('buffer');
for (var pair of buf.entries()) {
  console.log(pair);
}
// prints:
//   [0, 98]
//   [1, 117]
//   [2, 102]
//   [3, 102]
//   [4, 101]
//   [5, 114]