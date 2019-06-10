const Koa = require('C:/Users/pc/AppData/Roaming/npm/node_modules/koa')
const app = new Koa()

app.use( async(ctx) => {
    ctx.body = "hello world"
})
//监听3000接口
app.listen(3000)
console.log("demo in run")
