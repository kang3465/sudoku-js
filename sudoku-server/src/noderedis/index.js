const redis = require("redis");
const redisClient = redis.createClient("6379","101.200.56.109");

redisClient.on("error",error=>{
    console.log(error);
})
/*
client.auth("123456",res=>{
    console.log(res);
})
*/
redisClient.set('hello','This is a value');
redisClient.get('hello',function (err,v) {
    if (!err){

    }
    console.log("redis get hello err,v",err,v);
})
module.exports=redisClient;
