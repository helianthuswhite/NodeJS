var mysql = require('mysql');  
      
var TEST_DATABASE = 'OrderDB';  
var TEST_TABLE = 'Customer';

//创建连接  
var client = mysql.createConnection({  
  user: 'root',  
  password: 'hyz123',  
});  

client.connect();
client.query("use " + TEST_DATABASE);

function query (args) {
  client.query(  
  'SELECT * FROM '+TEST_TABLE,  
  function selectCb(err, results, fields) {  
    if (err) {  
      throw err;  
    }  
      
      if(results)
      {
          for(var i = 0; i < results.length; i++)
          {
              console.log("%s\t%s", results[i].customerNo, results[i].customerName);
          }
      }    
    client.end();  
  }); 
}

//封装模块
module.exports = query;

