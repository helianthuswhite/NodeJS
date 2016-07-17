
// buf.slice([start[, end]])
// 产生一个新的buffer，指向与之前一样的内存地址（所以改变buf2内容会同样改变buf1内容）但是内容由start到end

const buf1 = Buffer.allocUnsafe(26);

for (var i = 0 ; i < 26 ; i++) {
  buf1[i] = i + 97; // 97 is ASCII a
}

const buf2 = buf1.slice(0, 3);
buf2.toString('ascii', 0, buf2.length);
  // Returns: 'abc'
buf1[0] = 33;
buf2.toString('ascii', 0, buf2.length);
  // Returns : '!bc'

// 传入负的参数相当于从字符串后面开始截取

const buf = Buffer.from('buffer');

buf.slice(-6, -1).toString();
  // Returns 'buffe', equivalent to buf.slice(0, 5)
buf.slice(-6, -2).toString();
  // Returns 'buff', equivalent to buf.slice(0, 4)
buf.slice(-5, -2).toString();
  // Returns 'uff', equivalent to buf.slice(1, 4)