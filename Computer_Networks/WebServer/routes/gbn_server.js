var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var PORT = 12345;
var seqSize,response;
// 丢失概率
var probability = 0.3;
var want = 0,gotFirst = 0;

var resData = [],blankCount = 0;

function write (seq, msg, address, port) {
    var buf = Buffer.alloc(1);
    buf.writeInt8(seq);
    msg = Buffer.concat([buf, Buffer.from(msg)]);
    socket.send(msg, 0, msg.length, port, address,function (err) {
        if (err) socket.close();
    });
}

function accept(seq){
    if (seq === want) {
        if (!gotFirst) gotFirst = 1;
        want++;
        want = want % seqSize;
        return seq;
    } else {
        // 返回已接收的序号
        if (gotFirst) {
            for (var i = 0; i < blankCount; i++) {
                resData.push({
                    operate:'----------',
                    ack:'----------',
                    data:'----------'
                });
            }
            blankCount = 0;
            return (want + seqSize - 1) % seqSize;
        }
        // 返回-1表示还未接收任何正确的序号
        else return -1;
    }
}

socket.on('message', function (msg, rinfo) {
    var [address, port] = [rinfo.address, rinfo.port];

    var seq = msg.readInt8();
    msg = msg.slice(1).toString();
    
    var ack = accept(seq);
    if (Math.random() < probability) {
        resData.push({
            operate:'丢弃',
            ack:seq,
            data:msg
        });
        blankCount++;
    } else {
        resData.push({
            operate:'收到',
            ack:seq,
            data:msg
        });
        write(ack, msg, address, port);
    }
});

var gbn_server = {
    start:function (req,res) {
        seqSize = parseInt(req.body.winSize) + 1;
        socket.bind(PORT);
    },
    send:function (req,res) {
        res.send(resData);
    }
}

module.exports = gbn_server;