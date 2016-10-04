
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
				buf = buf+ch
                currentState = 'B'
                return
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
		else if (currentState == 'B') {
			if (ch == '_'||__letterSet__.indexOf(ch) > -1||__digitSet__.indexOf(ch) > -1) {
				buf = buf+ch
                currentState = 'B'
                return
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
	}
}