//引入express框架
var express = require('express');
var app = express();

//解析json
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var path = require('path');
//加载静态文件
app.use(express.static(path.join(__dirname,'/public')));

//引入查询模块query.js
var queryCustomer = require('./routes/queryCustomer');

//引入修改模块update.js
var update = require('./routes/update');

//引入订单查询模块
var queryBound = require('./routes/queryBound');

//删除订单时的订单查询模块
var queryOrder = require('./routes/queryOrder');
var deleteOrder = require('./routes/deleteOrder');

app.get('/',function (req,res) {
	res.sendFile(__dirname + '/public/index.html');
});

//处理query请求
app.post('/query',urlencodedParser,function (req,res){
	queryCustomer.post(req,res);
});

//处理update请求
app.post('/update',urlencodedParser,function(req,res){
	update.post(req,res);
});

//处理订单查询请求
app.post('/queryBound',urlencodedParser,function(req,res){
	queryBound.post(req,res);
});

//处理删除订单中的订单查询请求
app.post('/queryOrder',urlencodedParser,function(req,res){
	queryOrder.post(req,res);
});
app.post('/deleteOrder',urlencodedParser,function(req,res){
	deleteOrder.post(req,res);
});


//服务器启动
var server = app.listen(2333,function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为http://%s:%s',host,port);
});