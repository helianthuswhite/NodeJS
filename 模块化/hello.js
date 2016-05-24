function Hello () {
	var name;
	this.setName = function (thyName) {
		name = thyName;
	};
	this.sayHello = function () {
		console.log('Hello ' + name);
	};
}

//封装模块
module.exports = Hello;