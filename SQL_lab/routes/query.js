//引入express包
var express = require('express');
var app = express();

//加载静态文件
var path = require('path');
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

var Query = {
	post:function(req,res) {
		//输出JSON格式
		response = {
			customerNo:req.body.customerNo,
			customerName:req.body.customerName,
			telephone:req.body.telephone,
			address:req.body.address,
			zip:req.body.zip
		};
		query(response,res);
	}
}

function query (args,res) {
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
	if(args.zip!=''&&args.zip!=null) {
		if(WHERE == ''||WHERE == null)
			WHERE = WHERE + ' WHERE zip LIKE "%' + args.zip +'%"';
		else
			WHERE = WHERE + ' AND zip LIKE "%' + args.zip + '%"';
	}
	// console.log(SQL+WHERE);
	client.query("use " + DATABASE);
  	client.query(SQL+WHERE,function selectCb(err, results, fields) {  
    	if (err) {  
      		throw err;  
    	}  
      	if(results)
      	{
          	res.send(results);
      	}     
  	}); 
}

module.exports = Query;
