
    var express = require('express'),
        bodyParser = require('body-parser'),
        hbs = require('hbs'); //hbs模板引擎
    var app = express();
     
    //全局配置
    app.set("views", __dirname + "/views"); //模板目录
    app.set('view engine', 'html'); //模板后缀为'.html'
    app.engine('html', hbs.__express); //使用hbs来解析模板
     
    //配置静态资源目录
    app.use(express.static(__dirname + '/public'));
     
    //加载中间件
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
     
    //添加路由处理（实际环境，路由往往单独放到一个router文件中）
    app.get('/', function (req, res) {
        res.render('login');
    });
     
    app.get('/login', function (req, res) {
        var pool = require('./server_mongodb').pool;
        pool.acquire(function (err, db) {
            if(err) {
                res.statusCode = 500;
                res.end(JSON.stringify(err, null, 2));
            } else {
                var uname = req.query.uname;
                db.collection('user').find({uname: uname}).toArray(function (err, data) {
                    //如果不存在，存储
                    if(data.length == 0) {
                        db.collection('user').save(req.query, function (err, result) {
                            if(err) {
                                res.send(err);
                                return;
                            }
                            res.send('<h2>注册成功，你的用户名：' + uname + '</h2>');
                            pool.release(db);
                        });
                    } else {
                        res.send('<h2>您注册的用户已经存在，请重新注册！<a href="/">《返回》</a></h2>');
                    }
                });
            }
        });
    });
     
    app.listen(process.env.VCAP_APP_PORT || 3000);
