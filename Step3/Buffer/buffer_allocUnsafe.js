
// Buffer.allocUnsafe(size)
// 使用该方法创建buffer不会自动初始化，可能产生敏感数据
// 调用Buffer.allocUnsafe()生成的Buffer实例,如果小于4KB(默认),
// 会从一个单独的预分配的内存池里面分割出来.这避免了程序由于生成了很多单独分配的Buffer而建立过多的垃圾管理.
// 这能够通过减少跟踪和清理长期存在的对象来提升效能和内存利用率.

const buf = Buffer.allocUnsafe(5);
console.log(buf);
  // <Buffer 78 e0 82 02 01>
  // (octets will be different, every time)
buf.fill(0);
console.log(buf);
  // <Buffer 00 00 00 00 00>