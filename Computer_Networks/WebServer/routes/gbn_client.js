var dgram= require('dgram');
var socket = dgram.createSocket('udp4');
var Window = require('./window');

// 储存发送窗口的信息
var swindow,data = '',timer,response;
var HOST = '127.0.0.1';
var PORT = '12345';
var TIMEOUT = 'timeout';
// 超时时间
var outtime = 1000 * 1;

var index = 0;

var resData = [];

function fillWindow () {
    while (index < data.length) {
        if (swindow.push(data[index])) {
            index++;
        } else {
            break;
    	}
    }
}

function sendOne (seq, chunk) {
    var buf = Buffer.alloc(1);
    buf.writeInt8(seq);
    // 填入序号
    chunk = Buffer.concat([buf, Buffer.from(chunk)]);
    // console.log(`发送 seq: ${seq}, send out ${chunk}\n`);
    socket.send(chunk, 0, chunk.length, PORT, HOST, function (err) {
        if (err) socket.close();
        resData.push({
            table:0,
            operate:'发送',
            ack:seq,
            data:chunk.toString()
        });
    });
}

function sendWindow () {
    var windata = swindow.getData();
    for (var item of windata) {
        sendOne(item.seq, item.chunk);
    }
}

// 定时重传
function getTimer () {
    return setInterval(function () {
        sendWindow();
        // console.log('重发 resend\n')
    }, outtime);
}

socket.on('message', function (msg, info) {
    if (timer) {
        clearInterval(timer);
        timer = getTimer();
    }
    var ack = msg.readInt8();
    msg = msg.slice(1);
    // console.log(` 返回 ${msg.toString()}, ack: ${ack}\n`);
    if (swindow.ackLegal(ack)) {;
        resData.push({
            table:0,
            operate:'返回',
            ack:ack,
            data:msg.toString()
        });
        resData.push({
            table:1,
            operate:'--------',
            ack:'--------',
            data:'--------'
        });
        var length = swindow.minus(ack) + 1;
        swindow.go(length);
        if (ack === swindow.getCurr()) {
            fillWindow();
            if (swindow.isEmpty()) {
                response.send('1');
                socket.close();
            }
            sendWindow();
        }
    }
});

var gbn_client = {
    start:function (res,req,end) {
        swindow = Window(parseInt(req.body.winSize), parseInt(req.body.winSize) + 1);
        data = data + req.body.data;
        resData = res;
        response = end;

        socket.bind();
        timer = getTimer();

        fillWindow();
        sendWindow();
    }
};

module.exports = gbn_client;