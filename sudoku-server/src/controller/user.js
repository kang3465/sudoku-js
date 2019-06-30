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
const respBean = require('../model/respBean.js');

router.post('/userList', async function (ctx, next) {
/*    await nodebatis.execute("user.findAll",{},).then(res=>{
        ctx.body= new respBean(200,"获取用户列表成功",res);
    })*/

    let user=[]
    let count = 0;
    for (let item in global.userList) {
        user[count] = global.userList[item];
        count++;
    }
    ctx.body= new respBean(200,"获取用户列表成功",user);

});
/**
 * 管理员强制下线
 * */
router.post('/adminlogout', async function (ctx, next) {
    delete global.userList[ctx.request.body.username];
        ctx.body= new respBean(200,"下线成功");
});/**
 * 更新头像
 * */
router.post('/updataFace', async function (ctx, next) {
    try {
            //调用nodebatis验证用户信息
        let userface = "http://localhost:3636/xserver/static/img/"+ctx.request.body.userface
            await nodebatis.execute("user.updataFace", {"username": ctx.request.body.username,"userface":userface}).then((res) => {
                ctx.body = new respBean(200,"用户头像更换成功");
            }).catch(e => {
                ctx.body = {e}
            })

    } catch (error) {
        log.error(error)
        ctx.body = '登录服务故障'
    }
});
/**
 * 认证登录
 */
router.post('/login', async function (ctx, next) {
    try {
        // 获取xbatis设置在全局对象中的数据库连接
      /*  const nodebatis = global.nodebatis;
        const redisClient = global.redisClient;
        //token已经存在验证token正确性，则不需要登录
        await redisClient.get(ctx.request.body.username,(err,v)=>{
            if (v!=null) {
                let user = jwt.verify(v, config.auth.secret);
                ctx.body = {obj:{token: v, user: user}}
            }else {
                redisClient.set(ctx.request.body.username,jwt.sign({
                    ...user,
                    iat: Date.now(),
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                }, config.auth.secret))
            }
        });*/
        if (false) {
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
                    let token = jwt.sign({
                        ...user,
                        iat: Date.now(),
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
                    }, config.auth.secret)
                    // ctx.tokenSign = token
                    user.password = "已加密";
                    user.token=token
                    global.userList[user.username] = user;
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
});
/**
 * 认证登录
 */
router.post('/getlogin', async function (ctx, next) {
    try {

        if (ctx.header.token) {
            let user = await jwt.verify(ctx.header.token, config.auth.secret)
            log.info('已登录:' + JSON.stringify(user))
            //调用nodebatis验证用户信息
            await nodebatis.execute("user.findByUsername", {"username": user.username}).then((res) => {
                    let usern = res[0]
                console.log(usern)
                    // ctx.tokenSign = token
                    usern.password = "已加密";
                    ctx.body = {obj:{token: ctx.header.token, user: usern}}
            }).catch(e => {
                ctx.body = new respBean(200,"更新用户信息失败，请重新尝试。")
            })

            ctx.body = {obj:{token: ctx.header.token, user: user}}
        } else {
            ctx.body = new respBean(200,"更新用户信息失败，请重新尝试。")
        }
    } catch (error) {
        log.error(error)
        ctx.body = '登录服务故障'
    }
});
/**
 * 认证登录
 */
router.post('/reg', async function (ctx, next) {
    try {
        // 获取xbatis设置在全局对象中的数据库连接
        const nodebatis = global.nodebatis;
        let obj = {}
        //token已经存在验证token正确性，则不需要登录
        /*if (ctx.header.token) {
            const user = await jwt.verify(ctx.header.token, config.auth.secret)
            log.info('已登录:' + JSON.stringify(user))
            user.password="已加密"
            ctx.body = {token: ctx.header.token, user: user}
        } else {*/
            //调用nodebatis验证用户信息
        await nodebatis.execute("user.findByUsername", {"username": ctx.request.body.username}).then(async (res) => {
            if (res&&res.length>=1){
                ctx.body = new respBean(500,"用户名已存在");
            }else {
                await nodebatis.execute("user.add", {"username": ctx.request.body.username,"password":ctx.request.body.password,"role":"normal"}).then((res) => {
                    console.log(res)
                    obj=res;
                }).catch(e => {
                    ctx.body = {e}
                })
                await nodebatis.execute("user.editName", {"username": ctx.request.body.username ,"name":"用户_"+obj.insertId}).then((res) => {
                    console.log(res)
                    obj=res;
                }).catch(e => {
                    ctx.body = {e}
                })
                ctx.body = new respBean(200,"success",obj)
                // }
            }
        }).catch(e => {
            ctx.body = {e}
        })

    } catch (error) {
        log.error(error);
        ctx.body = '登录服务故障'
    }
});
/**
 * 获取排行榜
 */
router.get('/scote', async function (ctx, next) {
    try {
        // 获取xbatis设置在全局对象中的数据库连接
        const nodebatis = global.nodebatis;
        let userId = ctx.query.userId;

        await nodebatis.execute("scote.findAll", {"order": "order by scote"}).then((res) => {
            console.log(res);
            if (res.length) {
                ctx.body = new respBean(200,"成功",res,ctx.header.token);
            } else {
                ctx.body = "无数据"
            }
        }).catch(e => {
            ctx.body = {e}
        })
    } catch (error) {
        log.error(error);
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
        let scote =ctx.request.body.scote;
        let holeNumber =ctx.request.body.holeNumber;
        let user = await jwt.verify(ctx.header.token, config.auth.secret);
        let userId = user.id;

        await nodebatis.execute("scote.add", {"userId": userId,"scote":scote,"holeNumber":holeNumber}).then((res) => {
            console.log(res);
                ctx.body = res
        }).catch(e => {
            ctx.body = {e}
        })
    } catch (error) {
        log.error(error);
        ctx.body = '登录服务故障'
    }
})
/**
 * 删除成绩
 */
router.post('/scotedelete', async function (ctx, next) {
    try {
        // 获取xbatis设置在全局对象中的数据库连接
        const nodebatis = global.nodebatis;
        let id =ctx.request.body.id;
        let user = await jwt.verify(ctx.header.token, config.auth.secret);

        await nodebatis.execute("scote.remove", {"id": id}).then((res) => {
            console.log(res);
                ctx.body = res
        }).catch(e => {
            ctx.body = {e}
        })
    } catch (error) {
        log.error(error);
        ctx.body = '登录服务故障'
    }
})

module.exports = router;
