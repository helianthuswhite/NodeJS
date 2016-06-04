//将任意对象转换为字符串
var util = require('util');
function Person () {
	this.name = 'White';
	this.toString = function () {
		return this.name;
	};
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj,true))