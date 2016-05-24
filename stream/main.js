
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

//创建一个可读流
var readerStream = fs.createReadStream('input.txt');

//创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

//管道读写操作
//读取input.txt文件内容，并将内容写入到output.txt文件中
readerStream.pipe(writerStream);

console.log('程序执行完毕！');

/**********链式流***********/
var zlib = require('zlib');

//压缩input.txt文件
fs.createReadStream('input.txt').pipe(zlib.createGzip())
.pipe(fs.createWriteStream('input.txt.gz'));

console.log('文件压缩完成.');

//解压缩文件
fs.createReadStream('input.txt.gz').pipe(zlib.createGunzip())
.pipe(fs.createWriteStream('input.txt'));

console.log('文件解压完成。');




