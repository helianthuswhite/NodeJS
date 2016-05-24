/*
 *创建node服务器
 */
 var http = require('http');
 http.createServer(function(request,response){
 	//发送HTTP头部
 	//状态响应码：200
 	//发送内容类型：text/plain
 	response.writeHead(200,{'Content-Type':'text/plain'});

 	//发送响应数据
 	response.end('Hello World\n');
 }).listen(2333);

 console.log('http://127.0.0.1:2333/');
