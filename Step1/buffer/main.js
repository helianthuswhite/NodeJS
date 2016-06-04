//创建Buffer类
var buffer1 = new Buffer(10); //10字节长度

var buffer2 = new Buffer([1,2,3]); //初始化Buffer内容

var buffer3 = new Buffer('abcsd','utf-8'); //指定编码方式为utf-8

//Buffer的写入
var bufferwrite1 = new Buffer(128);
len = bufferwrite1.write('www.helianthuswhite.cn'); //返回写入的字节数
console.log('写入的字节数为：'+ len);

//从缓存区读取数据
var bufferwrite2 = new Buffer(256);
for (var i = 0; i < 26; i++) {
	bufferwrite2[i] = i + 97;
};
console.log(bufferwrite2.toString('ascii')); //abcdefghijklmnopqrstuvwxyz
console.log(bufferwrite2.toString('ascii',0,5)); //abcde
console.log(bufferwrite2.toString('utf-8',0,5)); //abcde
console.log(bufferwrite2.toString(undefined,0,5)); //abcde

//转换为JSON对象
bufferwrite2.toJSON();

//缓存区合并
var bufferwrite3 = Buffer.concat([bufferwrite1,bufferwrite2]);

//缓存区的比较
bufferwrite1.compare(bufferwrite2);

//缓存区的拷贝
bufferwrite1.copy(bufferwrite2);

//缓存区的裁剪
bufferwrite1.slice(0,bufferwrite1.length-1);