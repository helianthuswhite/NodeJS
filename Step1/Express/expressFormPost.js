var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/index_post.html', function (req, res) {
   res.sendFile( __dirname + "/public/" + "index_post.html" );
})


app.post('/process_post',urlencodedParser,function (req,res) {
	//console.log('进入post');

	//输出JSON格式
	response = {
		firstName:req.body.firstName,
		lastName:req.body.lastName
	};

	console.log(response);
	res.end(JSON.stringify(response));
});

var server = app.listen(2333,function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为http://%s:%s',host,port);
});
