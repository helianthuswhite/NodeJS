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

var QueryOrder = {
	post:function(req,res) {
		query(res);
	}
}

function query (res) {
	var SQL = 'SELECT OM.orderNo,C.customerName,E.employeeName,OM.orderDate,OM.orderSum FROM ' 
		+ 'OrderMaster OM,Customer C,Employee E WHERE OM.customerNo = C.customerNo AND '
		+ 'OM.employeeNo = E.employeeNo ORDER BY OM.orderNo DESC';
	client.query("use " + DATABASE);
  	client.query(SQL,function selectCb(err, results, fields) {  
    	if (err) {  
      		throw err;  
    	}  
      	if(results)
      	{
          	res.send(results);
      	}     
  	}); 
}

module.exports = QueryOrder;
