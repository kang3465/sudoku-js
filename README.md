# sudoku-js
用于完成课程作业
##sudoku-cli
数独游戏客户端，游戏逻辑的判断
##sudoku-server
数独游戏服务器端实现用户的登录注册，记录分数和历史记录

###遇到的问题
 - 创建好index.js文件之后，使用node运行index.js
  <br/>
报错：
Error: Cannot find module 'is-generator-function'
<br/>
原因：
直观原因是缺少依赖的包
<br/>
解决办法：安装对应的插件即可   
cnpm i is-generator-function -save
<br/>
 - 虽然之前安装了koa但还是提示找不到koa
<br/>
报错：
Error: Cannot find module 'koa'
<br/>
原因：
直观原因是缺少依赖的包，尝试安装了几次之后都是同样的错误，后来应该是因为一边开着webstorm，一边开始vscode，当我在webstorm中安装koa的时候vscode中又与github中同步，所以安装之后koa插件又消失。
<br/>
解决办法：删掉koa重新安装即启动成功
cnpm i koa -save
<br/>