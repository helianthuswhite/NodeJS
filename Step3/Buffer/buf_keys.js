
// buf.keys()
// 创建和返回遍历一个buffer时的索引

const buf = Buffer.from('buffer');
for (var key of buf.keys()) {
  console.log(key);
}
// prints:
//   0
//   1
//   2
//   3
//   4
//   5