//引入express框架
var express = require('express');
var app = express();

//加载异步回调函数处理
var async = require('async');

//解析json
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var path = require('path');
//加载静态文件
app.use(express.static(path.join(__dirname,'/public')));
//引入mysql连接包
var mysql = require('mysql');

var DATABASE = 'OrderDB';  
var TABLE = 'Customer';

//创建连接  
var client = mysql.createConnection({  
  user: 'root',  
  password: 'hyz123',  
});  
client.connect();


app.get('/query.html',function (req,res) {
	res.sendFile(__dirname + '/public/query.html');
});

app.post('/query',urlencodedParser,function (req,res) {

	//输出JSON格式
	response = {
		customerNo:req.body.customerNo,
		customerName:req.body.customerName,
		telephone:req.body.telephone,
		address:req.body.address
	};

	// console.log('response的值为：'+JSON.stringify(response));
	query(response,res);
	// res.send(JSON.stringify(results));
});

var server = app.listen(2333,function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为http://%s:%s',host,port);
});


function query (args,res) {
	console.log(args);
	var SQL = 'SELECT * FROM ' + TABLE;
	var WHERE = '';
	if(args.customerNo!=''&&args.customerNo!=null) {
		if(WHERE == ''||WHERE == null)
			WHERE = WHERE + ' WHERE customerNo LIKE "%' + args.customerNo +'%"';
		else
			WHERE = WHERE + ' AND customerNo LIKE "%' + args.customerNo + '%"';
	}
	if(args.customerName!=''&&args.customerName!=null) {
		if(WHERE == ''||WHERE == null)
			WHERE = WHERE + ' WHERE customerName LIKE "%' + args.customerName +'%"';
		else
			WHERE = WHERE + ' AND customerName LIKE "%' + args.customerName + '%"';
	}
	if(args.telephone!=''&&args.telephone!=null) {
		if(WHERE == ''||WHERE == null)
			WHERE = WHERE + ' WHERE telephone LIKE "%' + args.telephone +'%"';
		else
			WHERE = WHERE + ' AND telephone LIKE "%' + args.telephone + '%"';	
	}
	if(args.address!=''&&args.address!=null) {
		if(WHERE == ''||WHERE == null)
			WHERE = WHERE + ' WHERE address LIKE "%' + args.address +'%"';
		else
			WHERE = WHERE + ' AND address LIKE "%' + args.address + '%"';
	}
	console.log(SQL+WHERE);
	client.query("use " + DATABASE);
  	client.query(SQL+WHERE,function selectCb(err, results, fields) {  
    	if (err) {  
      		throw err;  
    	}  
      	if(results)
      	{
          	res.send(results);
      	}    
    	// client.end();  
  }); 
}

