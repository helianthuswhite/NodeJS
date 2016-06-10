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

var Update = {
	post:function(req,res) {
		//输出JSON格式
		response = {
			customerNo:req.body.customerNo,
			customerName:req.body.customerName,
			telephone:req.body.telephone,
			address:req.body.address,
			zip:req.body.zip
		};
		update(response,res);
	}
}

function update (args,res) {
	var SQL = 'UPDATE '+ TABLE +' SET customerName = "' + args.customerName 
		+ '",telephone = "' + args.telephone + '",address = "'
		+ args.address + '",zip = "' + args.zip + '"';
	var WHERE = ' WHERE customerNo ="' + args.customerNo +'"';
	client.query("use " + DATABASE);
	// console.log(SQL + WHERE);
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

module.exports = Update;
