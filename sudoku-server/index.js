const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const mount = require('koa-mount')
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
const session = require("koa-session2")
const passport = require('./passport.js');
const xauth = require('./xauth.js')
const pool = mysql.createPool({
    host: '101.200.56.109',   // 数据库地址
    user: 'root',    // 数据库用户
    password: 'zucc',   // 数据库密码
    database: 'js'  // 选中数据库
})


// 配置跨域
app.use(async (ctx, next) => {
     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
     ctx.set('Access-Control-Allow-Origin', 'http://localhost:9000');//这里是前端项目的地址，备用
     ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
     ctx.set('Access-Control-Allow-Credentials', true);
     ctx.set('Access-Control-Max-Age', 3600 * 24);
     await next();
   });

// 配置静态资源加载中间件，public目录下的资源浏览器中访问"/"下即可
app.use(koaStatic(
    path.join(__dirname , './public')
))

// 首页路由
let routerHome = new Router();
routerHome.get('/', ctx => {
    if (ctx.isAuthenticated()) {
        console.log(ctx.state.user)
        ctx.body={}
        ctx.login(user)
    }else {
        ctx.redirect('/login')
    }
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
    ctx.login({"username":username,"password": pwd});
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
}).get('/logintest', async (ctx) => {
    let username = ctx.query.username;
    let password = ctx.query.password;
    ctx.login({"username":username,"password": password}).then(results=>{
        ctx.body = results;
    })
})
// 总路由
let router = new Router();
router.use('/', routerHome.routes(), routerHome.allowedMethods());
router.use('/jsonp', routerJsonp.routes(), routerJsonp.allowedMethods());
router.use('/restful', routerRest.routes(), routerRest.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());
app.proxy = true
app.use(session({key: "SESSIONID"}))
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(mount('/',xauth.routes()))
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
