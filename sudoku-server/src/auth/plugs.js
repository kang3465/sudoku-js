const jwt = require('jsonwebtoken')
const log = require('tracer').colorConsole()
const redisClient = require(__dirname + '../../noderedis/index.js');
const respBean = require(__dirname +'../../model/respBean.js');
const config = require('config');									        // 配置文件
module.exports = function (authConfig = {}) {
    return function  xauth(ctx, next) {
        authConfig.tokenname = authConfig.tokenname || 'token'
        authConfig.pass = authConfig.pass || []
        authConfig.errMsg = authConfig.errMsg || '未认证'
        authConfig.errStatus = authConfig.errStatus || 401

        // 从请求中获取TOKEN令牌
        let token = ctx.header[authConfig.tokenname] || ctx.header.token
        if (token&&ctx.originalUrl!="/xserver/user/login"&&ctx.originalUrl!="/xserver/user/reg"&&ctx.originalUrl!="/xserver/user/logout"&&ctx.originalUrl!="/xserver/img/upload"&&ctx.originalUrl!="/xserver/user/updataFace"){
            let user = jwt.verify(token, config.auth.secret);
            let flag = global.userList[user.username]
            if (flag!=null){
            let v = flag.token;
                if (v && token) {
                    if (v === token) {
                        console.log("token校验成功");
                        return next()
                    } else {
                        ctx.status = 200;
                        ctx.body = new respBean(410, "当前用户已在其他地方登陆", null, null);
                    }
                } else {
                    ctx.status = 200;
                    ctx.body = new respBean(410, "未登录", null, null);
                }
            }
            ctx.status = 200;
            ctx.body = new respBean(410, "未登录", null, null);
        }else {
            return next()
        }

    }
}
