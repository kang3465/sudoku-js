// 路由相关
const Router = require('koa-router');
// 日志相关
const config = require('config');
const log = require('tracer').colorConsole({level: config.log.level});
// 初始化路由
const router = new Router();
// 网络请求
const axios = require('axios');
// const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const _ = require('lodash');
/**
 * 认证登录
 */
router.post('/login', async function (ctx, next) {
    try {
        // 获取xbatis设置在全局对象中的数据库连接
        const nodebatis = global.nodebatis;
        //token已经存在验证token正确性，则不需要登录
        if (ctx.header.token) {
            const user = await jwt.verify(ctx.header.token, config.auth.secret)
            log.info('已登录:' + JSON.stringify(user))
            user.password="已加密"
            user.name="已加密"
            ctx.body = {obj:{token: ctx.header.token, user: user}}
        } else {
            //调用nodebatis验证用户信息
            await nodebatis.execute("user.findByUsername", {"username": ctx.request.body.username}).then((res) => {
                if (res[0].password === ctx.request.body.password) {
                    let user = res[0]
                    user.role = 'admin';
                    const token = jwt.sign({
                        ...user,
                        iat: Date.now(),
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                    }, config.auth.secret)
                    // ctx.tokenSign = token
                    user.password = "已加密";
                    user.name="已加密"
                    ctx.body = {obj:{token: token, user: user}}
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
/**
 * 认证登录
 */
router.post('/reg', async function (ctx, next) {
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
            await nodebatis.execute("user.add", {"username": ctx.request.body.username,"password":ctx.request.body.password}).then((res) => {
                console.log(res)
               /* if (res[0].password === ctx.request.body.password) {
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
                }*/
            }).catch(e => {
                ctx.body = {e}
            })
        }
    } catch (error) {
        log.error(error)
        ctx.body = '登录服务故障'
    }
})
/**
 * 获取排行榜
 */
router.get('/scote', async function (ctx, next) {
    try {
        // 获取xbatis设置在全局对象中的数据库连接
        const nodebatis = global.nodebatis;
        let userId = ctx.query.userId

        await nodebatis.execute("scote.findAll", {"order": "order by scote"}).then((res) => {
            console.log(res)
            if (res.length) {
                ctx.body = res
            } else {
                ctx.body = "无数据"
            }
        }).catch(e => {
            ctx.body = {e}
        })
    } catch (error) {
        log.error(error)
        ctx.body = '登录服务故障'
    }
})
/**
 * 上传成绩
 */
router.post('/scoteadd', async function (ctx, next) {
    try {
        // 获取xbatis设置在全局对象中的数据库连接
        const nodebatis = global.nodebatis;
        let scote =ctx.request.body.scote
        let user = await jwt.verify(ctx.header.token, config.auth.secret);
        let userId = user.id;

        await nodebatis.execute("scote.add", {"userId": userId,"scote":scote}).then((res) => {
            console.log(res)
                ctx.body = res
        }).catch(e => {
            ctx.body = {e}
        })
    } catch (error) {
        log.error(error)
        ctx.body = '登录服务故障'
    }
})

module.exports = router
