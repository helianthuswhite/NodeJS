
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index_get.html',function (req,res) {
	res.sendFile(__dirname + '/public/' + 'index_get.html');
});

app.get('/process_get',function (req,res) {

	//输出JSON格式
	response = {
		firstName:req.query.firstName,
		lastName:req.query.lastName
	};

	console.log(response);
	res.end(JSON.stringify(response));
});

var server = app.listen(2333,function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为http://%s:%s',host,port);
});
