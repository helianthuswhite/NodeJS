//阻塞的情况

var fs = require('fs');

var data = fs.readFileSync('callback/input.txt');

console.log(data.toString());
console.log('阻塞情况下执行的程序代码！\n');


//非阻塞的情况
fs.readFile('callback/input.txt',function (err,data) {
	if(err) return console.error(err);
	return console.log(data.toString());
});
console.log('非阻塞情况下后面执行的程序代码！');