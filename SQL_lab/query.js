//引入express框架
var express = require('express');
var app = express();
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

app.get('/query',function (req,res) {

	//输出JSON格式
	response = {
		customerNo:req.query.customerNo,
		customerName:req.query.customerName,
		telephone:req.query.telephone,
		address:req.query.address
	};

	console.log('response的值为：'+response);
	var results = query(response);
	// res.end(JSON.stringify(results));
	console.log('query函数返回的results为：'+results);
	return response;
});

var server = app.listen(2333,function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('应用实例，访问地址为http://%s:%s',host,port);
});


function query (args) {
	// console.log(args);
	client.query("use " + DATABASE);
  	client.query(  
  	"SELECT * FROM "+TABLE+" WHERE customerNo LIKE '%"+args.customerNo+"%'",  
  	function selectCb(err, results, fields) {  
    	if (err) {  
      		throw err;  
    	}  
      	if(results)
      	{
          	return results;
      	}    
    client.end();  
  }); 
}

