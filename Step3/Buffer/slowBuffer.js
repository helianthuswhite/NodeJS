
// Class: SlowBuffer#不推荐使用，使用Buffer.allocUnsafeSlow(size) 代替
// 为了以防万一，当需要维持一块内存数据一段时间的时候，尽量先在非缓冲池开辟内存然后把buffer中内容复制过去

// need to keep around a few small chunks of memory
const store = [];

socket.on('readable', () => {
  var data = socket.read();
  // allocate for retained data
  var sb = SlowBuffer(10);
  // copy the data into the new allocation
  data.copy(sb, 0, 0, 10);
  store.push(sb);
});