
var net = require('net');
var fs = require('fs');
var parseHosts = require('./parseHost');
var TipInfo = require('./tips');
var parseIp = require('./parseIp');

const cacheType = [
    '.css',
    '.js',
    '.svg',
    '.png',
    '.jpg',
    '.jpeg'
];

// 创建服务器
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

// 获得远程请求的信息
function getRemoteInfo(dataStr) {
    var remoteInfo = {
        HOST:'',
        PORT:'',
        URL:''
    };
    // 获得主机信息
    var hostArr = dataStr.split('\r\n')[1].split(':');
    remoteInfo.HOST = hostArr[1].replace(/\s+/g,'');
    // 获得URL信息
    var urlArr = dataStr.split('\r\n')[0].split(' ');
    remoteInfo.URL = urlArr[1];
    // 如果有端口变化则改变，否则默认为80
    if (hostArr[2]) {
        remoteInfo.PORT = hostArr[2];
    }else {
        remoteInfo.PORT = 80;
    }
    return remoteInfo;
}

// socket客户端发送请求
function sendRemote(HOST,PORT,data,callback) {

    var client = new net.Socket(); 
    var dataArr = [];
    // 建立连接并且发送数据
    client.connect(PORT, HOST, function() {  
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);    
        client.end(data);
    });  
    // 将连续的数据存入内容最后合并
    client.on('data', function(data) {  
        dataArr.push(data);
    });  
    // 请求完成之后执行回调函数
    client.on('end', function() {  
        callback(Buffer.concat(dataArr)); 
    });  
}

// 缓存处理函数
function cacheProcess(remoteInfo,rawData) {
    // 读取缓存url的文件
    fs.readFile(__dirname + '/cache.txt',function (err,data) {
        if(err) {
            console.log(err);
        }
        var cacheRow = data.toString().split('\n');
        var cacheUrls = [];
        var cacheDate = [];
        // 将cache.txt中的内容存入数组
        for (var i = 0; i < cacheRow.length; i++) {
            cacheUrls.push(cacheRow[i].split('Last-Modified:')[0]);
            cacheDate.push(cacheRow[i].split('Last-Modified:')[1]);
        }
        // 有缓存的情况下
        if(cacheUrls.indexOf(remoteInfo.URL) >= 0 && rawData.toString().indexOf('If-Modified-Since') == -1) {
            var tempArr = rawData.toString().split('\r\n\r\n');
            // 添加If-Modified-Since请求头
            var newHeader = tempArr[0] + '\r\nIf-Modified-Since: ' + cacheDate[cacheUrls.indexOf(remoteInfo.URL)] + '\r\n\r\n';
            // 发送请求，判断缓存是否最新
            sendRemote(remoteInfo.HOST,remoteInfo.PORT,newHeader,function (data) {
                // 获取到远程返回的Last-Modified值
                var patt = /Last-Modified: (.*)\r\n/;
                var arr = data.toString().match(patt);
                // 如果发现缓存更新则需要执行缓存操作
                if(arr[1] > cacheDate[cacheUrls.indexOf(remoteInfo.URL)]) {
                    cacheStart(remoteInfo,newHeader);
                }else {
                    console.log('本地缓存已是最新的。');
                }
            });
        // 完全没有缓存的情况
        }else {
            // 循环缓存不同类型文件
            for (var i = 0; i < cacheType.length; i++) {
                // 如果是需要缓存的类型则进行缓存
                if(remoteInfo.URL.indexOf(cacheType[i]) > 0) {
                    cacheStart(remoteInfo,rawData);
                }
            }
        }
    });
}

// 缓存执行函数
function cacheStart(remoteInfo,rawData) {
    // 获取文件名称
    var name = remoteInfo.URL.split('/');
    // 发送远程请求
    sendRemote(remoteInfo.HOST,remoteInfo.PORT,rawData,function (data) {
        var deHeader = data.toString().split('\r\n\r\n');
        // 获得Last-Modified的值
        var patt = /Last-Modified: (.*)\r\n/;
        var arr = data.toString().match(patt);
        // 创建新的buffer来存返回的消息体
        var buf = Buffer.alloc(data.length - deHeader[0].length - 4);
        // 如果消息体有数据并且需要缓存则执行
        if (data.toString().indexOf('Content-Length') > 0 && deHeader[0].indexOf('Last-Modified') > 0) {
            // 将文件的内容缓存到本地对应文件中
            data.copy(buf,0,deHeader[0].length + 4);
            fs.writeFileSync(__dirname + '/caches/' + name[name.length - 1],buf);
            fs.writeFileSync(__dirname + '/cache.txt',remoteInfo.URL + 'Last-Modified:' + arr[1] +'\n',{flag:'a'});
        }
    });
}

createServer('127.0.0.1',3000);

  
