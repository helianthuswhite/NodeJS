
// child_process.execFile(file[, args][, options][, callback])
// 这个方法和上个方法很相似，但是它不会产生一个shell而是直接产生一个进程，因此更加高效

const execFile = require('child_process').execFile;
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});