# sudoku-js

用于完成课程作业

## 项目说明

 sudoku-js 是独立开发

 - 实现登录注册功能功能
 - 实现生成难度不同的数独游戏功能
 - 实现分数记录，历史记录功能
 - 实现分数排行榜功能 
 - 实现踢人下线功能 
 - 实现上传文件设置头像功能 

###实现登录注册功能功能

登录注册的时候使用jwt根据系统的公钥生成token，之后每次发送到后台系统的请求头中都会带有token，后台在解析token，获取用户信息以及是否拥有调用该接口的权限

###实现生成难度不同的数独游戏功能

利用9*9的二维数组来记录生成的数独，判断每行每列以及各自存在的小九宫格里是否有重复，来随机生成，然后将生成好的二维数组渲染成图像

###实现分数记录，历史记录功能

数独难度的分级是根据挖洞的多少来分等级的，每次游戏结束之后都会向后台系统发送请求，携带者熟读难度和所用时间来记录成绩

###实现分数排行榜功能

用户可以通过查看排行榜来查看自己之前的成绩

###实现踢人下线功能

每次用户登录的时候系统后台都会将该用户的token记录到全局变量的一个数组中，管理员查看的时候，遍历该数组，解析token将数据以数组的形式发送到前台，管理员进行下线操作时，从数组中查找到token，并删除掉，用户再次登录的时候发现数组中没有了该token，就会返回未登录字样，前台再将存储的临时token清除掉，这样前端路由获取不到token，就会返回登录界面。

###实现上传文件设置头像功能
利用的是koa框架的koa-body组件，读取文件到临时文件夹，然后根据规则重命名该文件，将文件名存储到用户头像字段，前端获取到文件名之后根绝文件名请求文件，就可以实现头像上传

## sudoku-cli
数独游戏客户端，游戏逻辑的判断

### 解决技术要点说明

####想在客户端使用jQuery的选择器进行画面的初始化，发现在vue组件中无法直接使用。

首先是安装jquery
`
npm i jquery
`

然后在需要使用的地方引入

`
import $ from 'jquery'
`

### 遇到的问题
####在调用数组的时候，提示无法从undefined中读取“0”属性

  <br/>
  报错：

 TypeError: Cannot read property '7' of undefined

<br/>
 原因：

在实现生成数独的时候会有除法，而js是弱类型语言，所以做除法之后会出现小数，如果这是用小数做索引查询数组数据会出现取不到值
<br/>
 解决办法：

对做除法候的变量进行取整  
`
this.test\[(Math.floor(D_X + count / 3))][(Math.floor(D_Y + count % 3))]
`
<br/>

## sudoku-server
数独游戏服务器端实现用户的登录注册，记录分数和历史记录

### 解决技术要点说明

####nodejs同步连接数据库

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
####使用koa框架的时候，没有映射的路径是访问不了的，所以需要一些静态资源的时候就需要，配置koa的静态资源加载中间件

```js
var Koa = require('koa');
var app = new Koa();
const koaStatic = require('koa-static')

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname , './public')
))
```

####配置跨域

```js
app.use(async (ctx, next) => {
     ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
     ctx.set('Access-Control-Allow-Origin', 'http://localhost:9000');//这里是前端项目的地址，备用
     ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
     ctx.set('Access-Control-Allow-Credentials', true);
     ctx.set('Access-Control-Max-Age', 3600 * 24);
     await next();
   });
```



### 遇到的问题
 - 创建好index.js文件之后，使用node运行index.js
  <br/>
#### 报错：
Error: Cannot find module 'is-generator-function'
<br/>
#### 原因：
直观原因是缺少依赖的包
<br/>
#### 解决办法：

安装对应的插件即可   
`
cnpm i is-generator-function -save
`
<br/>

 - 虽然之前安装了koa但还是提示找不到koa
<br/>
#### 报错：
Error: Cannot find module 'koa'
<br/>
#### 原因：
直观原因是缺少依赖的包，尝试安装了几次之后都是同样的错误，后来应该是因为一边开着webstorm，一边开始vscode，当我在webstorm中安装koa的时候vscode中又与github中同步，所以安装之后koa插件又消失。
<br/>
#### 解决办法：

删掉koa重新安装即启动成功

`
cnpm i koa -save
`
<br/>

 - 调用接口的时候总是获取不到数据库的数据
<br/>

#### 报错：

控制台没有报错，返回数据错误

#### 原因：

需要nodejs连接mysql，还没查出结果，nodejs就已经渲染结束发送到前端

#### 解决办法：

可以使用回调函数方式是程序在查询数据库结束之后再返回结果



