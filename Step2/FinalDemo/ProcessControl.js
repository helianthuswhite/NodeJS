// 添加进程管理包
var cp = require('child_process');

var worker;

// 创建子进程
function spawn(server, config) {
    worker = cp.spawn('node', [ server, config ]);
    // 意外退出，重启
    worker.on('exit', function (code) {
        if (code !== 0) {
            spawn(server, config);
        }
    });
}

// 主函数
function main(argv) {
    // 开始进程
    spawn('Demo_3.0.js', argv[0]);
    // 退出程序信号
    process.on('SIGTERM', function () {
        worker.kill();
        process.exit(0);
    });
}

// 启动
main(process.argv.slice(2));