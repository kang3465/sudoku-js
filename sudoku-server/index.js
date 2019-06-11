const Koa = require('koa');
const app = new Koa();
const path=require('path')
const Router = require('koa-router');
const koaStatic = require('koa-static')
const fs = require('fs');
const YAML = require('yamljs');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const mysql = require('mysql')
const db = require('./mysql.js');
const pool = mysql.createPool({
    host: '101.200.56.109',   // 数据库地址
    user: 'root',    // 数据库用户
    password: 'zucc',   // 数据库密码
    database: 'js'  // 选中数据库
})

// 配置静态资源加载中间件，public目录下的资源浏览器中访问"/"下即可
app.use(koaStatic(
    path.join(__dirname , './public')
))

// 首页路由
let routerHome = new Router();
routerHome.get('/', ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
});
// Jsonp路由
let routerJsonp = new Router();
routerJsonp.get('/data1', async (ctx) => {
    let cb = ctx.request.query.callback;
    ctx.type = 'text';
    ctx.body = cb + '(' + JSON.stringify(YAML.parse(fs.readFileSync('./jsonp.data1.yaml').toString())) + ')';
}).post('/data1', async (ctx) => {
    let cb = ctx.request.query.callback;
    ctx.type = 'text';
    ctx.body = cb + '(' + JSON.stringify(YAML.parse(fs.readFileSync('./jsonp.data1.yaml').toString())) + ')';
})
// 子路由3：restful api
let routerRest = new Router();
routerRest.get('/data1', async (ctx) => {
    let cb = ctx.request.query.callback;
    ctx.body = YAML.parse(fs.readFileSync('./restful.data1.yaml').toString());
}).post('/data1', async (ctx) => {
    ctx.body = YAML.parse(fs.readFileSync('./restful.data1.yaml').toString());
}).get('/login', async (ctx) => {
    let result = {};
    let username = ctx.request.query.username;
    let pwd = ctx.request.query.pwd;
    let mysqlDate = null;

    let sql = mysql.format("select * from user where username = ?", [username]);
    await db.queryplug(sql, [username]).then(results => {
        mysqlDate = results;
            if (mysqlDate == null) {
                result.status = 500;
                result.msg = "error";
                result.obj = null;
            } else {
                if (pwd == mysqlDate[0].pwd) {
                    result.status = 200;
                    result.msg = "success";
                    result.obj = mysqlDate[0];
                }
            }
            ctx.body = JSON.stringify(result);
        }
    )


})
// 总路由
let router = new Router();
router.use('/', routerHome.routes(), routerHome.allowedMethods());
router.use('/jsonp', routerJsonp.routes(), routerJsonp.allowedMethods());
router.use('/restful', routerRest.routes(), routerRest.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

// socket连接
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// 监听端口
server.listen(3000, () => {
    console.log('listening on *:3000');
});

function getMysql(sql) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, (error, results, fields) => {
            // 如果有错误就抛出
            if (error) throw error;

            // connected!
            console.log(results)
            // console.log(fields)
            // 结束会话
            connection.release();
            return results;
        })
    });
    return null;

}
