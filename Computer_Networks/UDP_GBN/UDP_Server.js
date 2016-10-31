var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var PORT = 12345;
var seqSize = 6;
// 丢失概率
var probability = 0.3;
var want = 0,gotFirst = 0;

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
        if (gotFirst) return (want + seqSize - 1) % seqSize;
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
        console.log(`==X drop : ${msg}, seq: ${seq}, ack: ${ack}`);
    } else {
        console.log(`==> accept : ${msg}, seq: ${seq}, ack: ${ack}`);
        write(ack, msg, address, port);
    }
});

socket.bind(PORT);