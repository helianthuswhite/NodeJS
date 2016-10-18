
var net = require('net');
var fs = require('fs');
var parseHosts = require('./parseHost');
var TipInfo = require('./tips');
var parseIp = require('./parseIp');
  
function createServer(HOST,PORT) {
    net.createServer(function(sock) {  
  
        // 我们获得一个连接 - 该连接自动关联一个socket对象  
        console.log('CONNECTED: ' +  
            sock.remoteAddress + ':' + sock.remotePort);  

        // 为这个socket实例添加一个"data"事件处理函数  
        sock.on('data', function(data) { 
            var dataStr = data.toString(); 
            var remoteInfo;
            // 判断是否是HTTP请求
            if(dataStr.match(/(GET|POST) (.*) HTTP/)) {
                // 获取HOST和PORT
                remoteInfo = getRemoteInfo(dataStr);
                //IP过滤
                if(parseIp.Info.indexOf(sock.remoteAddress) >= 0) {
                    sock.write(TipInfo.TipInfo[1]);
                    sock.end();
                }
                //网站过滤
                else if(parseHosts.Info.indexOf(remoteInfo.HOST) >= 0) {
                    sock.write(TipInfo.TipInfo[0]);
                    sock.end();
                }
                // 钓鱼网站部分
                // else {
                //     sock.write(TipInfo.TipInfo[2]);
                //     sock.end();
                // }
                else {
                    cacheProcess(remoteInfo,data);
                    sendRemote(remoteInfo.HOST,remoteInfo.PORT,data,function (data) {
                        sock.write(data);
                    });
                }
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

function getRemoteInfo(dataStr) {
    var remoteInfo = {
        HOST:'',
        PORT:'',
        URL:''
    };
    var hostArr = dataStr.split('\r\n')[1].split(':');
    remoteInfo.HOST = hostArr[1].replace(/\s+/g,'');
    var urlArr = dataStr.split('\r\n')[0].split(' ');
    remoteInfo.URL = urlArr[1];
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

function cacheProcess(remoteInfo,rawData) {
    fs.readFile(__dirname + '/cache.txt',function (err,data) {
        if(err) {
            console.log(err);
        }
        var cacheUrls = data.toString().split('\n');
        if(cacheUrls.indexOf(remoteInfo.URL) >= 0 && rawData.toString().indexOf('If-Modified-Since') == -1) {
            var tempArr = rawData.toString().split('\r\n\r\n');
            var newHeader = tempArr[0] + '\r\nIf-Modified-Since: ' + (new Date()).toGMTString() + '\r\n\r\n';
            sendRemote(remoteInfo.HOST,remoteInfo.PORT,newHeader,function (data) {
                var patt = /Last-Modified: (.*)\r\n/;
                var arr = data.toString().match(patt);
                if(arr) {
                    console.log(arr[1]);
                }
            });
        }
    });
}

createServer('127.0.0.1',3000);

  
