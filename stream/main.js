
var fs = require('fs');
var data = '';

/****从流中读取数据******/
//创建可读流
var readerStream = fs.createReadStream('input.txt');

//设置编码为 utf8
readerStream.setEncoding('UTF8');

//处理流事件 --> data,end,error
readerStream.on('data',function (chunk) {
	data += chunk;
});

readerStream.on('end',function () {
	console.log(data);
});

readerStream.on('error',function (err) {
	console.log(err.stack);
})

console.log('程序执行完毕!');

/********写入流********/
data = '这是将要写入output.txt中的内容！';

//创建一个可以写入的流
var writerStream = fs.createWriteStream('stream/output.txt');

//使用utf8写入数据
writerStream.write(data,'UTF8');

//标记文件末尾
writerStream.end();

//处理流事件
writerStream.on('finish',function () {
	console.log('写入完成');
})

writerStream.on('error',function (err) {
	console.log(err.stack);
})

console.log('程序执行完毕');

/********管道流读写操作********/





