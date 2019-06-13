// 路由相关
const Router = require('koa-router')
// 日志相关
const config = require('config')
const log = require('tracer').colorConsole({level: config.log.level})
// 初始化路由
const router = new Router()
// 网络请求
const axios = require('axios')
// const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
/**
 * 认证登录
 */
router.get('/login', async function (ctx, next) {
    try {
        // 获取xbatis设置在全局对象中的数据库连接
        const nodebatis = global.nodebatis;
        //token已经存在验证token正确性，则不需要登录
        if (ctx.header.token) {
            const user = await jwt.verify(ctx.header.token, config.auth.secret)
            log.info('已登录:' + JSON.stringify(user))
            user.password="已加密"
            ctx.body = {token: ctx.header.token, user: user}
        } else {
            //调用nodebatis验证用户信息
            await nodebatis.execute("user.findByUsername", {"username": ctx.header.username}).then((res) => {
                if (res[0].password === ctx.header.password) {
                    let user = res[0]
                    user.role = 'admin';
                    const token = jwt.sign({
                        ...user,
                        iat: Date.now(),
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                    }, config.auth.secret)
                    // ctx.tokenSign = token
                    user.password = "已加密";
                    ctx.body = {token: token, user: user}
                } else {
                    ctx.body = "密码错误"
                }
            }).catch(e => {
                ctx.body = {e}
            })
        }
    } catch (error) {
        log.error(error)
        ctx.body = '登录服务故障'
    }
})

module.exports = router
