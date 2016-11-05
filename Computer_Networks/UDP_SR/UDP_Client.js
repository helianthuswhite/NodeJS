var dgram= require('dgram');
var socket = dgram.createSocket('udp4');
var Window = require('./window');

var winSize = 5;
var seqSize = 2*winSize + 1;

// 储存发送窗口的信息
var swindow = Window(winSize, seqSize);
var data = '这是我的测试数据';
var HOST = '127.0.0.1';
var PORT = '12345';
var TIMEOUT = 'timeout';
// 超时时间
var outtime = 1000 * 3;
// 丢失概率
var probability = 0;
var index = 0;

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
    // 随机丢弃
    if (Math.random() < probability) {
        console.log(`==X seq: ${seq}, do not send ${chunk}\n`)
    } else {
        console.log(`==> seq: ${seq}, send out ${chunk}\n`)
        var buf = Buffer.alloc(1)
        buf.writeInt8(seq)
        // 填入序号
        chunk = Buffer.concat([buf, Buffer.from(chunk)])
        socket.send(chunk, 0, chunk.length, PORT, HOST, (err) => {
            if (err) socket.close()
        })
    }
}

function sendWindow () {
    var windata = swindow.getData();
    for (var item of windata) {
        if (!swindow.isAck(item.seq)) {
            sendOne(item.seq, item.chunk);
        }
    }
}

// 定时重传
function getTimer () {
    return setInterval(function () {
        console.log('== resend\n')
        sendWindow();
    }, outtime);
}

socket.on('message', function (msg, info) {
    if (timer) {
        clearInterval(timer);
        timer = getTimer();
    }
    var ack = msg.readInt8();
    msg = msg.slice(1);
    console.log(`<== ${msg.toString()}, ack: ${ack}\n`);

    if (swindow.ackLegal(ack)) {
        swindow.saveAck(ack);
        if(swindow.isAllAck()) {
            var length = swindow.minus(swindow.getCurr()) + 1;
            swindow.go(length);
            swindow.resetAcks();
            fillWindow();
            if (swindow.isEmpty()) {
                socket.close();
                console.log(`finish!, time cost: ${Math.floor((new Date() - startTime) / 1000)}s`);
                process.exit();
            }
            sendWindow();
        }
    }
});

socket.bind();

var startTime = new Date();
var timer = getTimer();

fillWindow();
sendWindow();
