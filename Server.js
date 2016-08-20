/*
	This is a server to load my front-end htmls.
	So that I can open my project in any other devices.
*/

var http = require('http');
var fs = require('fs');
var url = require('url');

//创建服务器
http.createServer(function (request,response) {
	// 解析请求
	var pathname = url.parse(request.url).pathname;

	//输出请求的文件名
	console.log('Request for '+ pathname + ' received.');

	var route = pathname.substr(1);

	if (route == ''||route == null) {
		route = 'index.html';
	}
	var URL = __dirname + '/' + route;

	//从文件系统中读取请求的文件内容
	fs.readFile(URL,function (err,data) {
		if(err) {
			console.log(err);
			response.writeHead(404,{'Content-Type':'text/html'});
		}else {
			response.writeHead(200,{'Content-Type':'text/html'});
			//响应文件内容
			response.write(data.toString());
		}
		//发送响应数据
		response.end();
	});
}).listen(2333);

//控制台输出信息
console.log('Server running at http://127.0.0.1:2333');


