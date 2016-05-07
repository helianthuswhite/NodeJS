//引入事件模块
var events = require('events');

//创建eventEmitter对象
var eventEmitter = new events.EventEmitter();

//创建事件处理程序
var eventHandler = function connected () {
	console.log('连接成功！');

	//触发data_received事件
	eventEmitter.emit('data_received');
}

//绑定事件处理程序
eventEmitter.on('connection',eventHandler);

//绑定data_received事件处理
eventEmitter.on('data_received',function () {
	console.log('事件处理中！');
})

//触发connection事件
eventEmitter.emit('connection');

console.log('事件处理结束！');