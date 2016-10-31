//引入express框架
var express = require('express');
var app = express();

//解析json
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var path = require('path');

var lexer = require('./routes/lexer');
//加载静态文件
app.use(express.static(path.join(__dirname,'/public')));

app.get('/',function (req,res) {
	res.sendFile(__dirname + '/public/index.html');
});


//处理query请求
app.post('/lexer',urlencodedParser,function (req,res){
	lexer.start(req,res);
});


//服务器启动
var server = app.listen(3000,function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('应用实例，访问地址为http://'+ host + ':' + port);
});
