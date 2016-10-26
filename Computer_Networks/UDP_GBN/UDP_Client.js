
var dgram = require("dgram");
var socket = dgram.createSocket("udp4");
var fs = require('fs');

var options = {
	address:'127.0.0.1',
	port:54321,
	exclusice:false
};

var count = 1;

// socket.bind(options,function () {
//   	socket.setBroadcast(true);
// });

// var message = new Buffer("Hi");
// socket.send(message, 0, message.length, 12345, '127.0.0.1', function(err, bytes) {
//   	if(err) socket.close();
// });

// socket.on("message", function (msg, rinfo) {
// 	if (msg != ''&&msg != undefined) {
// 		console.log('收到回复：' + msg);
// 		var t = setInterval(function() {
// 			if(count % 3 == 0) {
// 				count++;
// 				return;
// 			}
// 			var message_1 = new Buffer('Current Time:' + (new Date()).getHours() + ':' 
// 		  		+ (new Date()).getMinutes() + ':' + (new Date()).getSeconds());
// 		  	socket.send(message_1, 0, message_1.length, 12345, '127.0.0.1', function(err, bytes) {
// 			  	if (err) socket.close();
// 			});
// 			if (msg.message != ''&&msg.message != undefined) {
// 				var message_2 = new Buffer(msg.ack);
// 				socket.send(message_2, 0, message_2.length, 12345, '127.0.0.1', function(err, bytes) {
// 				  	if (err) socket.close();
// 				});
// 			}
// 			clearInterval(t);
// 			count++;
// 		},1000);
// 	}
// });

function sendMessage(message) {
	socket.send(message, 0, message.length, 12345, '127.0.0.1', function(err) {
		if(err) socket.close();
	});
}

function readFile() {
	fs.readFile(__dirname + '/bg4.jpg',function (err,data) {
		if(err) {
			console.log(err);
			return;
		}
		for (var i = 0; i < Buffer.byteLength(data)/1024; i++) {
			var buf = Buffer.from(data).slice(i*1024,(i+1)*1024);
			sendMessage(buf);
		}
	});
}

readFile();
