//引入express框架
var express = require('express');
var app = express();

var path = require('path');
//加载静态文件
app.use(express.static(path.join(__dirname,'/public')));

app.get('/index.html',function (req,res) {
	res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(2333,function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为http://%s:%s',host,port);
});