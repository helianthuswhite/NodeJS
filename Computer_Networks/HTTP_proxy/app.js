
var net = require('net');
  
function createServer(HOST,PORT) {
    net.createServer(function(sock) {  
  
        // 我们获得一个连接 - 该连接自动关联一个socket对象  
        console.log('CONNECTED: ' +  
            sock.remoteAddress + ':' + sock.remotePort);  

        // 为这个socket实例添加一个"data"事件处理函数  
        sock.on('data', function(data) { 
            var dataStr = data.toString(); 
            var remoteInfo;
            if(dataStr.match(/(GET|POST) (.*) HTTP/)) {
                remoteInfo = getHostPort(dataStr);
                sendRemote(remoteInfo.HOST,remoteInfo.PORT,data,function (data) {
                    sock.write(data);
                });
            }else {
                console.log('This not a HTTP request.');
            }
        });
      
        // 为这个socket实例添加一个"close"事件处理函数  
        sock.on('close', function(data) {  
            console.log('CLOSED: ' +  
                sock.remoteAddress + ' ' + sock.remotePort);  
        }); 
      
    }).listen(PORT, HOST);  

    console.log('Socket listen on ' + HOST + ':' + PORT);

}

function getHostPort(dataStr) {
    var remoteInfo = {
        HOST:'',
        PORT:''
    };
    var hostArr = dataStr.split('\r\n')[1].split(':');
    remoteInfo.HOST = hostArr[1].replace(/\s+/g,'');
    if (hostArr[2]) {
        remoteInfo.PORT = hostArr[2];
    }else {
        remoteInfo.PORT = 80;
    }
    return remoteInfo;
}

function sendRemote(HOST,PORT,data,callback) {

    var client = new net.Socket();  
    client.connect(PORT, HOST, function() {  
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);    
        client.write(data);
    });  
       
    client.on('data', function(data) {  
        callback(data);
    });  
      
    client.on('close', function() {  
        console.log('Connection closed');  
    });  
}

createServer('127.0.0.1',3000);
  
