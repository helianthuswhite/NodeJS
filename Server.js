/*
	This is a server to load my front-end htmls.
	So that I can open my project in any other devices.
*/

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');

//创建服务器
http.createServer(function (req,res) {
	// 解析请求
	var pathname = url.parse(req.url).pathname;

	var route = pathname.substr(1);

	if (route == ''||route == null) {
		route = 'index.html';
	}
	var URL = __dirname + '/'+ route;

	fs.exists(URL,function(err){
        if(!err){
            send404(res);
        }else{
            fs.readFile(URL,function(err,data){
                if(err){
                    console.log(err);
					response.writeHead(404,{'Content-Type':'text/html'});
                }else{
                    res.writeHead(200,{'content-type':mime.lookup(URL)});
                    console.log(mime.lookup(URL));
                    res.end(data.toString());
                }
            });//fs.readfile
        }
    })//path.exists
	
}).listen(2333);

//控制台输出信息
console.log('Server running at http://127.0.0.1:2333');


