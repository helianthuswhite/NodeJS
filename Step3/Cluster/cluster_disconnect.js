
// cluster.disconnect([callback])
// 调用群中的每一个worker的disconnect()方法
// 当它们断开连接后，内部的方法都会被关闭，如果没有其它事件发生，会允许主进程自己死掉