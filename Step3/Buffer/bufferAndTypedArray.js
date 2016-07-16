
// Buffer And TypedArray
// Buffer对象可以通过一个数组的.buffer属性来与数组共享内存

const arr = new Uint16Array(2);
arr[0] = 5000;
arr[1] = 4000;

const buf1 = Buffer.from(arr); // copies the buffer
const buf2 = Buffer.from(arr.buffer); // shares the memory with arr;

console.log(buf1);
  // Prints: <Buffer 88 a0>, copied buffer has only two elements
console.log(buf2);
  // Prints: <Buffer 88 13 a0 0f>

arr[1] = 6000;
console.log(buf1);
  // Prints: <Buffer 88 a0>
console.log(buf2);
  // Prints: <Buffer 88 13 70 17>