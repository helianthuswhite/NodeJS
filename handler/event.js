//加载events模块
var events = require('events');

//获得eventEmitter对象
var eventEmitter = new events.EventEmitter();

//监听器1
var listener1 = function () {
	console.log('监听器1被激活');
}

//监听器2
var listener2 = function () {
	console.log('监听器2被激活');
}

//分别绑定两个监听器的事件
eventEmitter.addListener('connection',listener1);
eventEmitter.on('connection',listener2);

//当前连接的数量
var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log('当前连接的数量为：'+eventListeners);

//处理当前连接的事件
eventEmitter.emit('connection');

//移除监听器1
eventEmitter.removeListener('connection',listener1);
console.log('监听器1已被移除');

//处理当前连接的事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log('当前连接的数量为：'+eventListeners);

console.log('程序执行完毕。');