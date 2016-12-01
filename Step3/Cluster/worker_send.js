
// worker.send(message[, sendHandle][, callback])
// 发送一个消息给worker或者master，选择一个处理方法
// 在master中，会发送一个消息给一个特定的worker,通过child_process.send()来识别
// 在worker中，发送一个消息给master，通过process.send()来识别


// 返回所有从master发出的消息
if (cluster.isMaster) {
  var worker = cluster.fork();
  worker.send('hi there');

} else if (cluster.isWorker) {
  process.on('message', (msg) => {
    process.send(msg);
  });
}