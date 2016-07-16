
// Buffer And ES6 Iteration
// buffer可以使用ES6中的var of 方式来进行遍历

const buf = Buffer.from([1, 2, 3]);

for (var b of buf)
  console.log(b)

// Prints:
//   1
//   2
//   3