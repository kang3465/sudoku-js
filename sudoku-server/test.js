/*
this.test = new Array();
for (let i = 0; i < 9; i++) {
    this.test[i] = new Array();
    for (let j = 0; j < 9; j++)
        this.test[i][j] = 0;

}
this.test[0][0]=1
console.log(this.test)
*/

const redis = require("redis");
const client = redis.createClient("6379","101.200.56.109");
// client.auth_pass()
client.auth("kang.redis",(a,b)=>{
console.log([a,b])
})

client.on("error",error=>{
    console.log(error);
})
/*
client.auth("123456",res=>{
    console.log(res);
})
*/
/*client.set('hello','This is a value');
client.get('hello',function (err,v) {
    console.log("redis get hello err,v",err,v);
})

client.set('hello',JSON.stringify({name:"jacky",age:22}));*/
client.get('kang3465@icloud.com',function (err,v) {
    // console.log("redis get hello err,v",err,JSON.parse(v).name);
    console.log("redis get hello err,v",v);
})
