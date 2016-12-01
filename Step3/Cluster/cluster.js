
// Event: 'disconnect'
// 当worker的IPC通道断开连接的时候执行，也会在worker正常结束的时候执行

cluster.on('disconnect', (worker) => {
  console.log(`The worker #${worker.id} has disconnected`);
});

// Event: 'exit'
// 当有任何一个worker进程死掉的时候会执行该方法，此方法通常用来重启worker

cluster.on('exit', (worker, code, signal) => {
  console.log('worker %d died (%s). restarting...',
    worker.process.pid, signal || code);
  cluster.fork();
});

// Event: 'fork'
// 当有一个新的worker被fork出来后执行该方法,此方法常用来打印worker活动或者实现自己的定时器

var timeouts = [];
function errorMsg() {
  console.error('Something must be wrong with the connection ...');
}

cluster.on('fork', (worker) => {
  timeouts[worker.id] = setTimeout(errorMsg, 2000);
});
cluster.on('listening', (worker, address) => {
  clearTimeout(timeouts[worker.id]);
});
cluster.on('exit', (worker, code, signal) => {
  clearTimeout(timeouts[worker.id]);
  errorMsg();
});

// Event: 'listening'
// 在一个worker执行listen()方法之后，服务器端会执行listening事件

cluster.on('listening', (worker, address) => {
  console.log(
    `A worker is now connected to ${address.address}:${address.port}`);
});

// Event: 'message'
// 任何worker收到消息时会执行该方法

cluster.on('message', function(worker, message, handle) {
  if (arguments.length === 2) {
    handle = message;
    message = worker;
    worker = undefined;
  }
  // ...
});

// Event: 'online'
// 在fork完一个新的worker后，该worker会发送一个online消息，在master接收到一个online消息的
// 时候会执行该方法
// 与fork不同的时，fork是在master fork一个worker时执行，而online是在worker运行的时候执行

cluster.on('online', (worker) => {
  console.log('Yay, the worker responded after it was forked');
});





