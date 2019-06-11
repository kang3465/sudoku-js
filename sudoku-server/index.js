const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');
const fs = require('fs');
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

// 首页路由
let router = new Router();
router.get('/', ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
});
app.use(router.routes());

//监听3000接口
app.listen(3000)
/*io.on('connection', socket => {
    console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
    socket.on('send', data => {
        console.log('客户端发送的内容：', data);
        socket.emit('getMsg', '我是返回的消息... ...');
    })

    setTimeout( () => {
        socket.emit('getMsg', '我是初始化3s后的返回消息... ...')
    }, 3001)
})*/
// socket连接
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: '+msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
console.log("demo in run")
