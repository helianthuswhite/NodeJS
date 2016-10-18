
var header = 'HTTP/1.1 200 OK\r\n' 
	+ 'Access-Control-Allow-Origin: *\r\n'
	+ 'Content-Type: text/html; charset=utf-8\r\n'
	+ 'Connection: keep-alive\r\n';

var TipInfo = [
	header + '\n您被禁止访问该网站！',
	header + '\n您的ip被禁止访问外部网站！',
	header + '\n这是一个钓鱼网站！'
];

exports.TipInfo = TipInfo;

