const passport = require('koa-passport')
const User = require('./src/models/UserModel')
// const User = require('./src/models/user.js')
const log4js = require('koa-log4')
const logger = log4js.getLogger('passport')
const LocalStrategy = require('passport-local').Strategy
const md5 = require('md5')

passport.use(new LocalStrategy(
    /**
     * @param username 用户输入的用户名
     * @param password 用户输入的密码
     * @param done 验证验证完成后的回调函数，由passport调用
     */
    function (username, password, done) {
        User.findOne({username: username},function (err,result) {
            if (result !== null) {
                if (result.password === md5(password)) {
                    return done(null, doPassword(result),'登录成功')
                } else {
                    return done(null, false, '密码错误')
                }
            } else {
                return done(null, false, '用户不存在')
            }
        }).catch(function (err) {
            logger.error(err.message)
            return done(null, false, {message: err.message})
        })
    }
))

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser(function (user, done) {
    done(null, user)
})

// deserializeUser 在每次请求的时候将从 mongodb 中读取用户对象
passport.deserializeUser(function (id, done) {
    console.log(id)
    User.findById(id, function (err, user) {
        done(err, doPassword(user))
    })
    // done(null, user)
})

//隐藏密码,相当于是去掉密码的用户信息保存在session里
function doPassword(user) {
    if(user) {
        user.password = ''
        return user
    } else {
        return null
    }
}

module.exports = passport
