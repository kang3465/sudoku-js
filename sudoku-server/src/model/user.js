let mysql = require("../../mysql.js");
let user = {};

user.findOne = function (u, fn) {
    return new Promise((resolve, reject) => {
        let username = u.username;
        mysql.queryplug("select * from user where username = ?", [username]).then(results => {
            resolve(results)
        }).catch(e=>{
            reject(e)
        })
    })
}
module.exports = user

