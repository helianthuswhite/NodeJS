
// 异常捕获和处理，只能用于同步执行的代码
function sync(fn) {
    return fn();
}

try {
    sync(null);
    // Do something.
} catch (err) {
    console.log('Error: %s', err.message);
}

// 异步执行的代码，产生的异常会打断路径的正常冒泡，从而抛出全局异常
function async(fn, callback) {
    // Code execution path breaks here.
    setTimeout(function ()　{
        callback(fn());
    }, 0);
}

try {
    async(null, function (data) {
        // Do something.
    });
} catch (err) {
    console.log('Error: %s', err.message);
}

// 在异常冒泡到断点之前捕获异常
function async(fn, callback) {
    // Code execution path breaks here.
    setTimeout(function ()　{
        try {
            callback(null, fn());
        } catch (err) {
            callback(err);
        }
    }, 0);
}

async(null, function (err, data) {
    if (err) {
        console.log('Error: %s', err.message);
    } else {
        // Do something.
    }
});