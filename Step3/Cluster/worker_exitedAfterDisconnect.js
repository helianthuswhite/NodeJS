
// worker.exitedAfterDisconnect
// 有kill()和disconnect()方法确定值，否则为undefined
// 该方法可以用来知道worker是自己退出的还是意外退出的

cluster.on('exit', (worker, code, signal) => {
  if (worker.exitedAfterDisconnect === true) {
    console.log('Oh, it was just voluntary – no need to worry');
  }
});

// kill worker
worker.kill();