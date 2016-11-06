var fs = require('fs');
var lexer = require('./lexer_grammar');

var GRAMMAR ={};

var NONTERMINAL=[];
var TERMINAL=[];

var FIRST={};
var FOLLOW={};
var PARSING_TABLE={};

var TOKEN_SEQUENCE=[];

var STACK_MAX_DEPTH=2000;

var SYNTAX_RESULT=[];
var counter = 0;

function grammar_scanner(){
	var data = fs.readFileSync(__dirname + '/grammar.ds');
	data = data.toString().split('\n');
	for (var i in data) {
		var tmp = '',
			bracket = '',
			last = '',
			terminals = [],
			nonterminals = [],
			sequence = [];
		for (var j in data[i]) {
			if (bracket === '') {
				if (last == ']'&&data[i][j] == ']') {
					terminals[terminals.length - 1] = terminals[terminals.length - 1] + ']';
					sequence[sequence.length - 1] = sequence[sequence.length - 1] + ']';
				}
				if (data[i][j] == '[') bracket = ']';
				else if (data[i][j] == '<') bracket = '>';
			}
			else {
				if (data[i][j] == bracket) {
					if (data[i][j] == ']') {
						terminals.push(tmp);
						sequence.push(tmp);
						tmp = '';
						bracket = '';
					}else {
						nonterminals.push(tmp);
						sequence.push(tmp);
						tmp = '';
						bracket = '';
					}
				}
				else tmp = tmp + data[i][j];
			}
			last = data[i][j];
		}

		if (sequence.length != 0) {
			if (!GRAMMAR[sequence[0]]) GRAMMAR[sequence[0]] = [];
			GRAMMAR[sequence[0]].push(sequence.slice(1,sequence.length));
		}
		
		for (var each of nonterminals) {
			if (NONTERMINAL.indexOf(each) === -1) NONTERMINAL.push(each); 
		}
		for (var each of terminals) {
			if (TERMINAL.indexOf(each) === -1) TERMINAL.push(each);
		}
		TERMINAL.push('$');		
	}
}

function getFirst() {
	for (var each of TERMINAL) {
		FIRST[each] = [each];
	}
	for (var each of NONTERMINAL) {
		FIRST[each] = [];
		for (var each_sequence of GRAMMAR[each]) {
			if (each_sequence == ['null']) FIRST[each] = ['null'];
		}
	}
	var stop = false;
	while(!stop) {
		stop = true;
		for (var each of NONTERMINAL) {
			if (each in GRAMMAR) {
				for (var each_sequence of GRAMMAR[each]) {
					var counter = 0;
					for (var each_mark of each_sequence) {
						for (var each_marks_first of FIRST[each_mark]) {
							if ((each_marks_first != 'null')
							 && (FIRST[each].indexOf(each_marks_first) === -1)) {
								FIRST[each].push(each_marks_first);
								stop = false;
							}
						}
						if (FIRST[each_mark].indexOf('null') === -1) break;
						else counter+=1;
					}
					if (counter == each_sequence.length
					 && FIRST[each].indexOf('null') === -1) {
						FIRST[each].push('null');
						stop = false;
					}
				}
			}
		}
	}
}

function getFollow () {
	for (var each of TERMINAL) {
		FOLLOW[each] = [];
	}
	for (var each of NONTERMINAL) {
		FOLLOW[each] = [];
	}
	FOLLOW['program'] = ['$'];
	for (var each of NONTERMINAL) {
		for (var each_sequence of GRAMMAR[each]) {
			for (var i = 0;i < each_sequence.length - 1;i++) {
				for (var each_next_marks_first of FIRST[each_sequence[i + 1]]) {
					if ((FOLLOW[each_sequence[i]].indexOf(each_next_marks_first) === -1)
						&&(each_next_marks_first != 'null'))
						FOLLOW[each_sequence[i]].push(each_next_marks_first);
				}
			}
		}
	}
	stop = false;
	while(!stop) {
		stop = true;
		for (var each of NONTERMINAL) {
			for (var each_sequence of GRAMMAR[each]) {
				for (var i = each_sequence.length-1;i > -1;i--) {
					for(var each_follow of FOLLOW[each]) {
						if (FOLLOW[each_sequence[i]].indexOf(each_follow) === -1) {
							FOLLOW[each_sequence[i]].push(each_follow);
							stop = false;
						}
					}
					if (FIRST[each_sequence[i]].indexOf('null') === -1) break;
				}
			}
		}
	}
}

function get_parsing_table () {
	for (var each of NONTERMINAL) {
		PARSING_TABLE[each] = {};
		for (var each_terminal of TERMINAL) {
			PARSING_TABLE[each][each_terminal] = -100;
		}
	}
	for (var each of NONTERMINAL) {
		for (var i in GRAMMAR[each]) {
			var counter = 0;
			for (var each_mark of GRAMMAR[each][i]) {
				for (var each_marks_first of FIRST[each_mark]) {
					if (PARSING_TABLE[each][each_marks_first] > 0) {
						console.log('语法不是LL1，问题出在：\n'+ 
							each + '->' + GRAMMAR[each][i] +
							'\n与:\n' +
							each + '->' + GRAMMAR[each][PARSING_TABLE[each][each_marks_first]] + 
							'\neach_marks_first:' + each_marks_first);
						process.exit(0);
					}
					else {
						PARSING_TABLE[each][each_marks_first] = i;
					}
				}
				if (FIRST[each_mark].indexOf('null') === -1) break;
				else counter+=1;
			}
			if (counter == GRAMMAR[each][i].length) {
				for (var each_follow of FOLLOW[each]) {
					if (TERMINAL.indexOf(each_follow) > -1) {
						if (PARSING_TABLE[each][each_follow] > 0) {
							console.log('语法不是LL1，问题出在：\n' + 
								each + '->' + GRAMMAR[each][i] +
								'\neach follow:' + each_follow);
							process.exit(0);
						}
						else {
							PARSING_TABLE[each][each_follow] = i;
						}
					}
				}
			}
		}
		for (var each of NONTERMINAL) {
			for (var each_follow of FOLLOW[each]) {
				if (PARSING_TABLE[each][each_follow] < 0) {
					PARSING_TABLE[each][each_follow] = -1;
				}
			}
		}
	}
}

function syntax_parse() {
	var stack = [];
	for (var i = 0;i < 2100;i++) {
		stack.push(i);
	}
	stack[0] = 'program';
	var stack_top = 0;
	var token_curse = 0;
	while (stack_top >= 0) {
		if (token_curse >= TOKEN_SEQUENCE.length) {
			SYNTAX_RESULT.push('错误:程序结构不完整，编译失败.');
			break;
		}
		if (stack_top > STACK_MAX_DEPTH) {
			console.log('警告：预测分析栈深度超过2000，程序安全退出。');
			process.exit(0);
		}
		if (TERMINAL.indexOf(stack[stack_top]) > -1) {
			if (stack[stack_top] == TOKEN_SEQUENCE[token_curse])
				SYNTAX_RESULT.push('终结符:[' + TOKEN_SEQUENCE[token_curse] + ']');
			else SYNTAX_RESULT.push('错误:不可接受的终结符：[' + TOKEN_SEQUENCE[token_curse] + ']');
			stack_top--;
			token_curse++;
		}
		else {
			if (PARSING_TABLE[stack[stack_top]][TOKEN_SEQUENCE[token_curse]] < 0) {
				var isTrue = false;
				for (var i in GRAMMAR[stack[stack_top]]) {
					if (GRAMMAR[stack[stack_top]][i].indexOf('Lambda') > -1) isTrue = true;
				}
				if (isTrue) {
					var tmp_str = '成功: [' + stack[stack_top] + ']\t->\t[Lambda]';
					SYNTAX_RESULT.push(tmp_str);
					stack_top--;
				}
				else {
					if (PARSING_TABLE[stack[stack_top]][TOKEN_SEQUENCE[token_curse]] == -1) {
						SYNTAX_RESULT.push('错误: [' + TOKEN_SEQUENCE[token_curse] + 
							']不可接受，进入同步恢复状态，栈顶元素为：' + stack[stack_top]);
						stack_top--;
					}
					else {
						SYNTAX_RESULT.push('错误: [' + TOKEN_SEQUENCE[token_curse] + 
							']不可接受，忽略该符号以恢复错误，栈顶元素为：' + stack[stack_top]);
						token_curse++;
					}
				}
			}
			else {
				var tmp_sequence = GRAMMAR[stack[stack_top]][PARSING_TABLE[stack[stack_top]][TOKEN_SEQUENCE[token_curse]]];
				var tmp_str = '成功: [' + stack[stack_top] + ']\t->\t';
				stack_top--;
				for (var x in tmp_sequence) {
					tmp_str = tmp_str + '[' + tmp_sequence[x] + ']';
					stack_top++;
					stack[stack_top] = tmp_sequence[tmp_sequence.length - 1 - x];
				}
				SYNTAX_RESULT.push(tmp_str);
			}
		}
	}
	if (token_curse < TOKEN_SEQUENCE.length - 1)
		SYNTAX_RESULT.push('错误:程序结构不完整，编译失败。');
}

function compiler_init() {
	grammar_scanner();
	getFirst();
	getFollow();
	get_parsing_table();
}

var grammar = {
    start:function(req,res) {
        var data = req.body.data;
       	compiler_init();
		TOKEN_SEQUENCE = lexer(data);
		syntax_parse();
		res.send(SYNTAX_RESULT);
    }
};

module.exports = grammar;