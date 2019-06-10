const Koa = require('koa')
const app = new Koa()
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
app.use( async(ctx) => {
    ctx.body = "hello world"
})
//监听3000接口
app.listen(3000)
console.log("demo in run")
