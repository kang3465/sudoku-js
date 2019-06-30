// 路由相关
const Router = require('koa-router');
// 日志相关
const body = require('koa-body');
const config = require('config');
const path = require('path');
const fs = require('fs');
const log = require('tracer').colorConsole({level: config.log.level});
// 初始化路由
const router = new Router();
// 网络请求
const axios = require('axios');
// const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const respBean = require('../model/respBean.js');


/**
 * 读取文件
 * */
router.post('/read', async function (ctx, next) {
    delete global.userList[ctx.request.body.username];
    ctx.body= new respBean(200,"下线成功");
});
/**
 * 获取文件的后缀
 * @param {*} name
 */
function getUploadFileExt(name) {
    let ext = name.split('.');
    return ext[ext.length - 1];
}/**
 * 判断文件夹是否存在 如果不存在则创建文件夹
 * @param {*} p
 */
function checkDirExist(p) {
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p);
    }
}
/**
 * 上传文件
 */

const koaBodyOptions = {
    multipart: true,
    encoding: 'gzip',
    formidable: {
        uploadDir: path.join(__dirname, '../../public/img'),
        keepExtensions: true,         // 会直接保留原始的文件后缀
        maxFileSize: 200 * 1024 * 1024,    // 设置上传文件大小最大限制，默认2M
        onFileBegin: (name, file) => {

            // 获取文件后缀
            const ext = getUploadFileExt(file.name);

            // 最终要保存到的文件夹目录
            // const dir = path.join(__dirname, `./upload/${getUploadDirName()}`);

            // 检查文件夹是否存在如果不存在则新建文件夹
            // checkDirExist(dir);

            // 重新覆盖 file.path 属性
            // file.path = `${dir}/${getUploadFileName(ext)}`;
        },
        onError: (err) => {
            console.log(err);
        }
    }
}
router.post('/upload',body(koaBodyOptions), async function (ctx, next) {
    // 上传单个文件
    console.log(ctx.request.body);
    console.log(ctx.request.files);
    let user=[]
    const file = ctx.request.files.avatar; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../../public/img/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    fs.unlinkSync(file.path);
    return ctx.body = "上传成功！";
});

module.exports = router;
