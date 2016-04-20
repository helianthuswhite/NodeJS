
    var http = require('http'),
        mongodb = require('mongodb'),
        poolModule = require('generic-pool');
     
    //自动调整连接池数
    var pool = poolModule.Pool({
        name: 'mongodb',
        create: function (callback) {
            mongodb.MongoClient.connect('mongodb://localhost/node', {
                server: {poolSize: 1}
            }, function (err, db) {
                callback(err, db);
            });
        },
        destroy: function (db) {
            db.close();
        },
        max: 10,//根据应用的可能最高并发数设置
        idleTimeoutMillis: 3000,
        log: false
    });
    exports.pool = pool;
