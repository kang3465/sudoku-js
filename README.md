# sudoku-js

用于完成课程作业

## 项目说明

 sudoku-js 是独立开发

 - 实现Xx 功能
 - 实现yy功能

## 解决技术要点说明

nodejs同步连接数据库

node中连接数据库是异步操作，但是程序执行的时候是需要获得数据库中的数据之后才进行下一步，这个时候就需要将数据库的操作同步执行，可以使用回调函数的方法同步数据库操作

封装数据库操作

```js
db.queryplug = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err)
                resolve( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })
};
```
应用的时候

```js
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
            //返回到页面的json格式数据
            ctx.body = JSON.stringify(result);
        }
    )
```
使用koa框架的时候，没有映射的路径是访问不了的，所以需要一些静态资源的时候就需要，配置koa的静态资源加载中间件

```js
var Koa = require('koa');
var app = new Koa();
const koaStatic = require('koa-static')

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './public')
))
```




### sudoku-cli
数独游戏客户端，游戏逻辑的判断
### sudoku-server
数独游戏服务器端实现用户的登录注册，记录分数和历史记录

#### 遇到的问题
 - 创建好index.js文件之后，使用node运行index.js
  <br/>
##### 报错：
Error: Cannot find module 'is-generator-function'
<br/>
##### 原因：
直观原因是缺少依赖的包
<br/>
##### 解决办法：

安装对应的插件即可   
`
cnpm i is-generator-function -save
`
<br/>

 - 虽然之前安装了koa但还是提示找不到koa
<br/>
##### 报错：
Error: Cannot find module 'koa'
<br/>
##### 原因：
直观原因是缺少依赖的包，尝试安装了几次之后都是同样的错误，后来应该是因为一边开着webstorm，一边开始vscode，当我在webstorm中安装koa的时候vscode中又与github中同步，所以安装之后koa插件又消失。
<br/>
##### 解决办法：

删掉koa重新安装即启动成功

`
cnpm i koa -save
`
<br/>

 - 调用接口的时候总是获取不到数据库的数据
<br/>

##### 报错：

控制台没有报错，返回数据错误

##### 原因：

需要nodejs连接mysql，还没查出结果，nodejs就已经渲染结束发送到前端

##### 解决办法：

可以使用回调函数方式是程序在查询数据库结束之后再返回结果



