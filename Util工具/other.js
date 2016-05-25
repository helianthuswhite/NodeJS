//如果给定参数是一个错误对象返回true，否则返回false
var util = require('util');

util.isError(new Error());
//true
util.isError(new TypeError());
//true
util.isError({name:'Error',message:'an error occurred'});
//false

//如果给定的参数是一个日期返回true，否则返回false

util.isDate(new Date());
//true
util.isDate(Date());
//false
util.isDate({});
//false

//如果给定的参数是一个正则表达式返回true,否则返回false

util.isRegExp(/some regexp/);
//true
util.isRegExp(new RegExp('another regexp'));
//true
util.isRegExp({});
//false

//如果给定的参数是一个数组返回true,否则返回false

util.isArray([]);
//true
util.isArray(new Array());
//true
util.isArray({});
//false
