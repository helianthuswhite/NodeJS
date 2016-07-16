
// Buffer.compare(buf1, buf2)
// 该方法通常用来对buffer进行排序，相当于buf1.compare(buf2)

const arr = [Buffer.from('1234'), Buffer.from('0123')];
arr.sort(Buffer.compare);