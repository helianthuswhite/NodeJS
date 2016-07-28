
// child.kill([signal])
// 发送一个SIGNAL到子进程，默认为SIGTERM

const spawn = require('child_process').spawn;
const grep = spawn('grep', ['ssh']);

grep.on('close', (code, signal) => {
  console.log(
    `child process terminated due to receipt of signal ${signal}`);
});

// Send SIGHUP to process
grep.kill('SIGHUP');


// 在linux下，杀死父进程并不会终止子进程

'use strict';
const spawn = require('child_process').spawn;

let child = spawn('sh', ['-c',
  `node -e "setInterval(() => {
      console.log(process.pid + 'is alive')
    }, 500);"`
  ], {
    stdio: ['inherit', 'inherit', 'inherit']
  });

setTimeout(() => {
  child.kill(); // does not terminate the node process in the shell
}, 2000);