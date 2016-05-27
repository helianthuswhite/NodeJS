
var express = require('express');
var app = express();

app.get('/',function (req,res) {
	res.send('Hello Express!');
});

var server = app.listen(2333,function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为http://%s:%s',host,port);
});