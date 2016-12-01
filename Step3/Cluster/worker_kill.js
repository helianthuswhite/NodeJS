
// worker.kill([signal='SIGTERM'])
// 这个方法会杀死当前worker。在master中，通过断开worker.process的连接来完成同样的事情
// 一旦断开之后，会给一个杀死的信号
// 在worker中，它通过断开通道来完成，并返回0