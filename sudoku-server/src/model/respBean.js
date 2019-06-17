"use strict"

function RespBean(status,msg,obj,token) {
    this.status = status;
    this.msg = msg;
    this.obj = obj;
    this.token = token;
}
RespBean.prototype.build = function() {
    return new RespBean()
};
RespBean.prototype.ok = function(msg,obj,token) {
    return new RespBean(200,msg,obj,token);
};
RespBean.prototype.ok = function(msg,obj) {
    return new RespBean(200,msg,obj,null);
};
RespBean.prototype.ok = function(msg) {
    return new RespBean(200,msg,null,null);
};
RespBean.prototype.error = function(msg,obj,token) {
    return new RespBean(404,msg,obj,token);
};
RespBean.prototype.error = function(msg,obj) {
    return new RespBean(404,msg,obj,null);
};
RespBean.prototype.error = function(msg) {
    return new RespBean(404,msg,null,null);
};
RespBean.prototype.setStatus = function(status) {
    this.status = status;
};
RespBean.prototype.setMsg = function(msg) {
    this.msg = msg;
};
RespBean.prototype.setObj = function(obj) {
    this.obj = obj;
};
RespBean.prototype.setToken = function(token) {
    this.token = token;
};

module.exports = RespBean;
