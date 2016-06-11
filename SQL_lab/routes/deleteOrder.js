//引入express包
var express = require('express');
var app = express();

//加载静态文件
var path = require('path');
app.use(express.static(path.join(__dirname,'/public')));

//引入mysql连接包
var mysql = require('mysql');

var DATABASE = 'OrderDB';  

//创建连接  
var client = mysql.createConnection({  
  user: 'root',  
  password: 'hyz123',  
});  
client.connect();

var Delete = {
	post:function(req,res) {
		//输出JSON格式
		response = {
			orderNo:req.body.orderNo,
		};
		deleteOrder(response,res);
	}
}

function deleteOrder (args,res) {
	var SQL_1 = 'DELETE FROM OrderDetail WHERE orderNo = "' + args.orderNo +'"';
	var SQL_2 = 'DELETE FROM OrderMaster WHERE orderNo = "' + args.orderNo +'"';
	client.query("use " + DATABASE);
	// console.log(SQL + WHERE);
  	client.query(SQL_1,function selectCb(err, results, fields) {  
    	if (err) {  
      		throw err;  
    	}  
      	if(results)
      	{
          	client.query(SQL_2,function selectCb(err, results, fields) {  
		    	if (err) {  
		      		throw err;  
		    	}  
		      	if(results)
		      	{
		          	res.send(results);
		      	}     
		  	}); 
      	}     
  	}); 
}

module.exports = Delete;
