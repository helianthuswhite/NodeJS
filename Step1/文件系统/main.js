//****************写入文件内容************/
var fs = require('fs');

console.log('开始写入.');
fs.writeFile('input.txt','我是通过写入的文件内容！',function (err) {
	if (err) {
		return console.error(err);
	}
	console.log('数据写入成功!');
})

//*************异步和同步获取文件************/
fs.readFile('input.txt',function(err,data) {
	if(err) {
		return console.error(err);
	}
	console.log('异步读取：' + data.toString());
});

var data = fs.readFileSync('input.txt');

console.log('同步读取：' + data.toString());

console.log('文件读取完成！');

//****************异步打开文件 *************/
console.log('准备打开文件！');

fs.open('input.txt','r+',function (err,fd) {
	if (err) {
		return console.error(err);
	}
	console.log('文件打开成功!');
});

//************获取文件信息*************/
console.log('准备打开文件！');
fs.stat('input.txt',function (err,stats) {
	if (err) {
		return console.log(err);
	}
	console.log(stats);
	console.log('读取文件信息成功!');

	//检测文件类型
	console.log('是否为文件?' + stats.isFile());
	console.log('是否为目录?' + stats.isDirectory());
});

//*************异步读取文件*************/
var buf = new Buffer(1024);

console.log('准备打开已经存在的文件.');
fs.open('input.txt','r+',function (err,fd) {
	if (err) {
		return console.error(err);
	}
	console.log('文件打开成功!');
	console.log('准备读取文件.');
	fs.read(fd,buf,0,buf.length,0,function (err,bytes) {
		if(err) {
			console.log(err);
		}
		console.log(bytes + '字节被读取.');

		//仅输出读取的字节
		if (bytes > 0) {
			console.log(buf.slice(0,bytes).toString());
		}

		//关闭文件
		fs.close(fd,function (err) {
			if (err) {
				console.log(err);
			}
			console.log('文件关闭成功！');
		});
	});
});

//。。。。。。。。。。。




