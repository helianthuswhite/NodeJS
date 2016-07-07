/*
 *
 *1.0为解析和拼接url中的文件内容
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

// 拼接文件
function combineFiles(pathnames, callback) {
    var output = [];
    // 异步处理
    (function next(i, len) {
        if (i < len) {
            // 将读取的数据写入内存
            fs.readFile(pathnames[i], function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    output.push(data);
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, Buffer.concat(output));
        }
    }(0, pathnames.length));
}

// 主程序入口
function main(argv) {
    // 读取配置文件
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || '.',
        port = config.port || 80;
    // 创建服务器
    http.createServer(function (request, response) {
        // 解析URL
        var urlInfo = parseURL(root, request.url);
        // 执行拼接函数
        combineFiles(urlInfo.pathnames, function (err, data) {
            // 错误处理
            if (err) {
                response.writeHead(404);
                response.end(err.message);
            } else {
                // 返回结果
                response.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                response.end(data.toString('utf-8'));
            }
        });
    }).listen(port);
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

// 启动程序
main(process.argv.slice(2));
