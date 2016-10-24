
var dgram = require("dgram");
var socket = dgram.createSocket("udp4");

var count = 1;

socket.on("error", function (err) {
  	console.log("server error:\n" + err.stack);
  	socket.close();
});

socket.on("message", function (msg, rinfo) {
  	console.log("server got: " + msg + " from " +
    	rinfo.address + ":" + rinfo.port);
  	var message = new Buffer('OK!');
  	if (count < 10) {
	  	socket.send(message, 0, message.length, 54321, '127.0.0.1', function(err, bytes) {
		  	if(err) socket.close();
		});
  	}
  	count++;
});

socket.on("listening", function () {
  	var address = socket.address();
  	console.log("server listening " +
      	address.address + ":" + address.port);
});

socket.bind(12345,'127.0.0.1');