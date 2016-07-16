
// Buffer.allocUnsafeSlow(size)
// 创建不被初始化并且不使用Buffer缓存池

// need to keep around a few small chunks of memory
const store = [];

socket.on('readable', () => {
  const data = socket.read();
  // allocate for retained data
  const sb = Buffer.allocUnsafeSlow(10);
  // copy the data into the new allocation
  data.copy(sb, 0, 0, 10);
  store.push(sb);
});