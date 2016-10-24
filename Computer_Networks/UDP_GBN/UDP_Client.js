
var dgram = require("dgram");
var socket = dgram.createSocket("udp4");

var options = {
	address:'127.0.0.1',
	port:54321,
	exclusice:false
};

socket.bind(options,function () {
  	socket.setBroadcast(true);
});

var message = new Buffer("Hi");
socket.send(message, 0, message.length, 12345, '127.0.0.1', function(err, bytes) {
  	if(err) socket.close();
});

socket.on("message", function (msg, rinfo) {
	if (msg != ''&&msg != undefined) {
		console.log('收到回复：' + msg);
		var t = setInterval(function() {
			var message = new Buffer('Current Time:' + (new Date()).getHours() + ':' 
		  		+ (new Date()).getMinutes() + ':' + (new Date()).getSeconds());
		  	socket.send(message, 0, message.length, 12345, '127.0.0.1', function(err, bytes) {
			  	if (err) socket.close();
			});
			clearInterval(t);
		},1000);
	}
});