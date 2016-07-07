/*
 *
 *3.0主要对2.0改进，加入进程守护，防止程序崩溃
 *
 */

// 引入需要的包
var fs = require('fs'),
    path = require('path'),
    http = require('http');

// 定义响应文件类型
var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

// 主程序入口
function main(argv) {
    // 读取配置文件
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || '.',
        port = config.port || 80;
    // 创建服务器
    http.createServer(function (request, response) {
        var urlInfo = parseURL(root, request.url);
        // 验证文件
        validateFiles(urlInfo.pathnames, function (err, pathnames) {
            if (err) {
                // 错误处理
                response.writeHead(404);
                response.end(err.message);
            } else {
                // 成功返回结果
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                outputFiles(pathnames, response);
            }
        });
    }).listen(port);

    // 添加退出进程信号
     process.on('SIGTERM', function () {
        server.close(function () {
            process.exit(0);
        });
    });
}

// 解析URL函数
function parseURL(root, url) {
    var base, pathnames, parts;
    // 如果url中不含??则替换，统一方便后续处理
    if (url.indexOf('??') === -1) {
        url = url.replace('/', '/??');
    }
    // 将路径由??分割
    parts = url.split('??');
    // 获取基础url
    base = parts[0];
    // 分割解析路径
    pathnames = parts[1].split(',').map(function (value) {
        return path.join(root, base, value);
    });
    // 返回参数
    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    };
}

// 输出结果函数
function outputFiles(pathnames, writer) {
    // 异步处理
    (function next(i, len) {
        if (i < len) {
            // 通过数据流输出，减少内存压力
            var reader = fs.createReadStream(pathnames[i]);
            //TODO字符编码问题
            reader.pipe(writer, { end: false });
            reader.on('end', function() {
                next(i + 1, len);
            });
        } else {
            writer.end();
        }
    }(0, pathnames.length));
}

// 验证文件是否存在函数
function validateFiles(pathnames, callback) {
    // 异步处理
    (function next(i, len) {
        if (i < len) {
            fs.stat(pathnames[i], function (err, stats) {
                if (err) {
                    callback(err);
                } else if (!stats.isFile()) {
                    callback(new Error());
                } else {
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, pathnames);
        }
    }(0, pathnames.length));
}

main(process.argv.slice(2));
