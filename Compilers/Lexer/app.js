
var fs = require('fs');

var buf,
	mLine = 1,
	mRow = 0,
	currentState = 'A',
	__letterSet__  = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
                'n','o','p','q','r','s','t','u','v','w','x','y','z',
                'A','B','C','D','E','F','G','H','I','J','K','L','M',
                'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',],
	__digitSet__ = ['0','1','2','3','4','5','6','7','8','9'],
	__blankCharSet__ = [' ', '\n', '\t'],
	__switchCharSet__ = ['b', 'n', 't', '\'', '\"','\\'],
//  由ANSI标准定义的C语言关键字共32个：
	__keywordSet__ = ['auto','double','int','struct','break','else','long','switch','case','enum',
                'register','typedef','char','extern','return','union','const','float','short','unsigned',
                'continue','for','signed','void','default','goto','sizeof','volatile','do','if',
                'while','static'
                ],
	__boardSet__ = [';',',', '(', ')', '.', '{', '}','[',']'],
	console_msg,
	result,
	__TOKENIZE_SUCCESS__ = 0,
	__TOKEN_ERROR__ = 1;

fs.readFile(__dirname + '/test.c',function(err,data) {
	if(err) {
		return console.error(err);
	}
	scanner(data.toString());
	console.log(console_msg);
	// console.log(result);
});

function scanner(data) {
	for (var i in data) {
		mLine++;
		tokenizer(data[i]);
		if (data[i] == '\n') {
			mRow += 1;
			mLine = 0;
		}
	}
	tokenizer('$');
}

function tokenizer(ch) {
	while(1) {
		if (currentState == 'A') {
			if (ch == ' '||ch == '\n'||ch == '\t') {
				currentState = 'A';
				return;
			}
			else if (__letterSet__.indexOf(ch) > -1||ch == '_') {
				buf = buf + ch;
				currentState = 'B';
				return;
			}
			else if (__digitSet__.indexOf(ch) > -1) {
				buf = buf + ch;
				currentState = 'C';
				return;
			}
			else if (ch == '\'') {
				buf = buf + ch;
				currentState = 'D';
				return;
			}
			else if (ch == '\"') {
				buf = buf + ch;
				currentState = 'G';
				return;
			}
			else if (ch == '/') {
				buf = buf + ch;
				currentState = 'K';
				return;
			}
			else if (ch == '+') {
				buf = buf + ch;
				currentState = 'A+';
				return;
			}
			else if (ch == '-') {
				buf = buf + ch;
				currentState = 'A-';
				return;
			}
			else if (ch == '*') {
				buf = buf + ch;
				currentState = 'A*';
				return;
			}
			else if (ch == '&') {
				buf = buf + ch;
				currentState = 'A&';
				return;
			}
			else if (ch == '^') {
				buf = buf + ch;
				currentState = 'A^';
				return;
			}
			else if (ch == '|') {
				buf = buf + ch;
				currentState = 'A|';
				return;
			}
			else if (ch == '=') {
				buf = buf + ch;
				currentState = 'A=';
				return;
			}
			else if (ch == '!') {
				buf = buf + ch;
				currentState = 'A!';
				return;
			}
			else if (ch == '>') {
				buf = buf + ch;
				currentState = 'A>';
				return;
			}
			else if (ch == '<') {
				buf = buf + ch;
				currentState = 'A<';
				return;
			}
			else if (__boardSet__.indexOf(ch) > -1) {
				buf = '';
				console_msg = console_msg + '(' + ch + ' , 界符)\n';
				// result.append(ch);
				currentState = 'A';
				return;
			}
			else if (ch == '$') {
				buf = buf + ch;
				currentState = '$';
			}
			else {
				compilerFail('不可识别的字符');
				return;
			}
		}
		else if (currentState == 'B') {
			if (ch == '_'||__letterSet__.indexOf(ch) > -1||__digitSet__.indexOf(ch) > -1) {
				buf = buf+ch;
                currentState = 'B';
                return;
			}   
            else {
            	if (__keywordSet__.indexOf(buf) > -1) {
            		console_msg = console_msg + '('+buf+' , 关键字)\n';
                    // result.append(buf);
            	}  
                else {
                	console_msg = console_msg + '('+buf+' , 标识符)\n';
                    result.append('IDN');
                } 
                buf = '';
                currentState = 'A';
                continue;
            }
		}
		else if (currentState == 'C') {
			if (__digitSet__.indexOf(ch) > -1) {
				buf = buf+ch;
                currentState = 'C';
                return;
			}   
            else if (ch == '.'){
            	buf = buf + ch;
                currentState = 'P';
                return;
            }
            else {
            	console_msg = console_msg + '(' + buf + ' , 整数常量)\n';
            	// result.append('INUM');
            	buf = '';
            	currentState = 'A';
            	continue;
            }
        }
        else if (currentState = 'D') {
        	if (ch != '\''&&ch != '\\') {
        		buf = buf + ch;
        		currentState = 'E';
        		return;
        	}
        	else if (ch != '\''&&ch == '\\') {
        		buf = buf + ch;
        		currentState = 'F';
        		return;
        	}
        	else {
        		compilerFail('空白或无效的字符');
        		return;
        	}
        }
        else if (currentState == 'E') {
        	if(ch == '\'') {
        		buf = buf +ch;
        		currentState = 'H';
        		continue;
        	}
        	else {
        		compilerFail('字符常量长度大于一');
        		return;
        	}
        }
        else if (currentState == 'H') {
        	console_msg = console_msg + '(' + buf + ' , 字符常量)\n';
        	// result.append('CH');
        	buf = '';
        	currentState = 'A';
        	return;
        }
        else if (currentState == 'F') {
        	if(__switchCharSet__.indexOf(ch) > -1) {
        		buf = buf + ch;
        		currentState = 'E';
        		return;
        	}
      		else {
      			compilerFail('无效的转义字符');
      			return;
      		}
        }
        else if (currentState == 'G') {
        	if(ch != '\"'&&ch != '\\') {
        		buf = buf + ch;
        		currentState = 'G';
        		return;
        	}
        	else if (ch != '\''&&ch == '\\') {
        		buf = buf + ch;
        		currentState = 'I';
        		return;
        	}
        	else if (ch == '\"') {
        		buf = buf + ch;
        		currentState = 'J';
        	}
        }
        else if (currentState == 'I') {
        	if (__switchCharSet__.indexOf(ch) > -1) {
        		buf = buf + ch;
        		currentState = 'G';
        		return;
        	}
        	else {
        		compilerFail('无效的转义字符');
        		return;
        	}
        }
        else if (currentState == 'J') {
        	console_msg = console_msg + '(' + buf + ' , 字符串常量)\n';
        	// result.append('STR');
        	buf = '';
        	currentState = 'A';
        	return;
        }
        else if (currentState == 'K') {
        	if (ch == '*') {
        		buf = buf[buf.length - 1];
        		currentState = 'L';
        		return;
        	}
        	else if (ch == '/') {
        		buf = buf[buf.length - 1];
        		currentState = 'O';
        		return;
        	}
        	else if (ch == '=') {
        		buf = buf + ch;
        		currentState = 'B=';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 运算符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'L') {
        	if (ch != '*') {
        		currentState = 'L';
        		return;
        	}
        	else if (ch == '*') {
        		currentState = 'M';
        		return;
        	}
        }
        else if (currentState == 'M') {
        	if (ch == '/') {
        		currentState = 'N';
        		return;
        	}
        	else {
        		currentState = 'L';
        	}
        }
        else if (currentState == 'N') {
        	currentState = 'A';
        	return;
        }
        else if (currentState == 'O') {
        	if (ch == '\n') {
        		currentState = 'A';
        		return;
        	}
        	else {
        		currentState = 'O';
        		return;
        	}
        }
        else if (currentState == 'P') {
        	if (__digitSet__.indexOf(ch) > -1) {
        		buf = buf + ch;
        		currentState = 'Q';
        		return;
        	}
        	else {
        		compilerFail('无效的转义字符');
        		return;
        	}
        }
        else if (currentState == 'Q') {
        	if (__digitSet__.indexOf(ch)) {
        		buf = buf + ch;
        		currentState = 'Q';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 浮点数常量)\n';
        		// result.append('FNUM');
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'A+') {
        	if (ch == '+'||ch == '=') {
        		buf = buf + ch;
        		currentState = 'B+';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'B+') {
        	console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	continue;
        }
        else if (currentState == 'A-') {
        	if (ch == '-'||ch == '=') {
        		buf = buf + ch;
        		currentState = 'B-';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'B-') {
        	console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	continue;
        }
        else if (currentState == 'A*') {
        	if (ch == '*'||ch == '=') {
        		buf = buf + ch;
        		currentState = 'B*';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'B*') {
        	console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	continue;
        }
        else if (currentState == 'A&') {
        	if (ch == '&'||ch == '=') {
        		buf = buf + ch;
        		currentState = 'B&';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'B&') {
        	console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	continue;
        }
        else if (currentState == 'A^') {
        	if (ch == '^'||ch == '=') {
        		buf = buf + ch;
        		currentState = 'B^';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'B^') {
        	console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	continue;
        }
        else if (currentState == 'A|') {
        	if (ch == '|'||ch == '=') {
        		buf = buf + ch;
        		currentState = 'B|';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'B|') {
        	console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	continue;
        }
        else if (currentState == 'A=') {
        	if (ch == '=') {
        		buf = buf + ch;
        		currentState = 'B=';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'B=') {
        	console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	continue;
        }
        else if (currentState == 'A!') {
        	if (ch == '!') {
        		buf = buf + ch;
        		currentState = 'B!';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'B!') {
        	console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	continue;
        }
        else if (currentState == 'A>') {
        	if (ch == '>') {
        		buf = buf + ch;
        		currentState = 'B>';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'B>') {
        	console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	continue;
        }
        else if (currentState == 'A<') {
        	if (ch == '<') {
        		buf = buf + ch;
        		currentState = 'B<';
        		return;
        	}
        	else {
        		console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        		// result.append(buf);
        		buf = '';
        		currentState = 'A';
        		continue;
        	}
        }
        else if (currentState == 'B<') {
        	console_msg = console_msg + '(' + buf + ' , 操作符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	continue;
        }
        else if (currentState == '$') {
        	console_msg = console_msg + '(' + buf + ' , 终结符)\n';
        	// result.append(buf);
        	buf = '';
        	currentState = 'A';
        	return;
        }
	}
}

function compilerFail(status) {
	console_msg = console_msg + '编译于第' + mRow.toString() + '行，第'
		 + mLine.toString() + '列失败，是因为：' + status + '\n';
	currentState = 'A';
	buf = '';
}