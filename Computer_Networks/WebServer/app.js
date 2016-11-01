//引入express框架
var express = require('express');
var app = express();

//解析json
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var path = require('path');
var gbn_server = require('./routes/gbn_server');
var gbn_client = require('./routes/gbn_client');

//加载静态文件
app.use(express.static(path.join(__dirname,'/public')));

app.get('/',function (req,res) {
	res.sendFile(__dirname + '/public/index.html');
});

var resData = [];

//处理query请求
app.post('/gbnclient_protocol',urlencodedParser,function (req,res){
	gbn_server.start(req,res);
	gbn_client.start(req,res);
});

app.get('/gbnserver_protocol',function (req,res){
	gbn_server.send(req,res);
});


//服务器启动
var server = app.listen(3000,function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('应用实例，访问地址为http://'+ host + ':' + port);
});
