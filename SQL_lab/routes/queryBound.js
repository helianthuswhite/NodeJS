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

var QueryBound = {
	post:function(req,res) {
		//输出JSON格式
		response = {
			customerName:req.body.customerName,
			employeeName:req.body.employeeName,
			productName:req.body.productName,
			orderNo:req.body.orderNo
		};
		query(response,res);
	}
}

function query (args,res) {
	var SQL_BEGIN = 'SELECT OM.orderNo,P.productName,C.customerName,E.employeeName,OM.orderDate,OM.orderSum FROM ' 
		+ 'OrderMaster OM,Product P,Customer C,OrderDetail OD,Employee E WHERE OM.customerNo = '
		+ 'C.customerNo AND OM.orderNo = OD.orderNo AND OD.productNo = P.productNo '
		+ ' AND OM.employeeNo = E.employeeNo';
	var WHERE = '';
	var SQL_END = ' ORDER BY OM.orderNo DESC';
	if(args.customerName!=''&&args.customerName!=null) {
		WHERE = WHERE + ' AND C.customerName LIKE "%' + args.customerName + '%"';
	}
	if(args.productName!=''&&args.productName!=null) {	
		WHERE = WHERE + ' AND P.productName LIKE "%' + args.productName + '%"';
	}
	if(args.orderNo!=''&&args.orderNo!=null) {
		WHERE = WHERE + ' AND OM.orderNo LIKE "%' + args.orderNo + '%"';	
	}
	if(args.employeeName!=''&&args.employeeName!=null) {
		WHERE = WHERE + ' AND E.employeeName LIKE "%' + args.employeeName + '%"'; 
	}
	// console.log(SQL_BEGIN+WHERE+SQL_END);
	client.query("use " + DATABASE);
  	client.query(SQL_BEGIN+WHERE+SQL_END,function selectCb(err, results, fields) {  
    	if (err) {  
      		throw err;  
    	}  
      	if(results)
      	{
          	res.send(results);
      	}     
  	}); 
}

module.exports = QueryBound;
