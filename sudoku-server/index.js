// 系统配置参数,用于读取配置文件中的参数
const config = require('config');									        // 配置文件
const port = config.server.port;											// 系统端口
const staticRoot = config.server.staticRoot;								// 静态根目录
// 应用服务相关
const Koa = require('koa');								                    // KOA应用框架
const cors = require('@koa/cors');                                          // 跨域中间件
const koaBody = require('koa-body');							            // 入参JSON解析中间件
const staticServer = require('koa-static');								    // 静态资源服务中间件
const mount = require('koa-mount');								            // 挂载点中间件

const websockify = require('koa-websocket');
// 应用xkoa中间件
const xcontroller = require('koa-xcontroller');							    // koa-xcontroller，自动路由中间件
const xmodel = require('koa-xmodel');								        // koa-xmodel，自动实体中间件
const xbatis = require('koa-xbatis');										// koa-xbatis，自动SQL中间件
const xnosql = require('koa-xnosql');										// koa-xnosql，自动NOSQL中间件
const redisClient = require(__dirname + '/src/noderedis/index.js');									// koa-xnosql，自动NOSQL中间件
const xerror = require('koa-xerror');                                       // koa-xerror，自动异常捕获中间件
const xauth = require('./src/auth/index.js');                                         // koa-xauth，自动身份认证中间件
const xauth_plugs = require('./src/auth/plugs.js');                                         // koa-xauth，自动身份认证中间件
const xlog = require('koa-xlog');                                           // koa-xlog，自动日志中间件

//引入返回模板
const respBean = require(__dirname + '/src/model/respBean.js');
// 持久层相关
const nodebatis = require(__dirname + '/src/nodebatis/nodebatis.js');       // SQL应用框架
const sequelize = require(__dirname + '/src/sequelize/sequelize.js');
const jwt = require("jsonwebtoken");		// ORM应用框架

// 日志相关
const log = require('tracer').colorConsole({level: config.log.level});     // 日志服务
// 初始化应用服务
const app = new Koa();
// websockify(app,config.ws,config.https);
// app.ws.listen(8888);
// 启用静态资源服务
app.use(mount(staticRoot, staticServer(__dirname + config.server.staticDir)));
//配入xkoa服务相关中间件
app.use(mount('/', cors()));             // 跨域中间件
app.use(xerror(config.error));           // 全局错误捕获中间件，必须第一位使用，参数1：错误配置
app.use(koaBody())                      // 入参JSON解析中间件
app.use(xlog(config.log, (ctx) => {
    log.info('异步日志处理', ctx.request.body)
}))    //日志中间件，参数1：日志配置，参数2：额外日志处理
app.use(xauth(config.auth, (v) => v))   // TOKEN身份认证中间件，，参数1：认证配置，参数2：额外自定义TOKEN解析规则
app.use(xauth_plugs())
// 1,加载koa-xcontroller中间件
xcontroller.init(app, config.server)            // 应用实例，可选配置：访问根路径，控制器目录路径

// 2,加载koa-xmodel中间件
xmodel.init(app, sequelize, config.server)      // 初始化mysql连接

// 3,加载koa-xbatis中间件
xbatis.init(app, nodebatis, config.server)      // 初始化mysql连接

// 4,加载koa-xnosql中间件
// xnosql.init(app, config.server)                 // 初始化mongodb连接
global.nodebatis = nodebatis;                   //方便其他模块调用
global.redisClient = redisClient;
global.userList = {};
// 启动应用服务
app.listen(port)
log.info(`服务已开启，地址：http://localhost:${port}`)
