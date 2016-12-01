
// worker.process#
// 所有的workers都会通过child_process.fork()方法来创建，该方法返回的对象以.process的形式存在
// 在一个worker中，process存储为全局变量
