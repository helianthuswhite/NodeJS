
// Buffer.alloc(size[, fill[, encoding]])
// 分配内存，并填充数据.默认fill为undefined，则填充00，最后为字符编码
// 使用alloc方法会比allocUnsafe方法慢很多，但是不会产生敏感数据

const buf = Buffer.alloc(5);
console.log(buf);
  // <Buffer 00 00 00 00 00>


// 如果具体的填入fill参数了，那么函数会以Buffer.fill(fill)方法来初始化

const buf = Buffer.alloc(5, 'a');
console.log(buf);
  // <Buffer 61 61 61 61 61>

// 如果具体的填入fill和encoding参数了，那么函数会以Buffer.fill(fill,enconding)方法来初始化

const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
console.log(buf);
  // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
