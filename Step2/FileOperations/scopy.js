var fs = require('fs');

function copy(src,dst) {
	fs.writeFileSync(dst,fs.readFileSync(src));
}


function main(argv) {
	copy(argv[0],argv[1]);
}

//process.argv 是一个包含命令行参数的数组。第一参数是“节点”，第二个是js的文件名。
//接下来的就是我们要的命令行参数。
main(process.argv.slice(2));

