/*
var b = function(){console.log(1)};
var a = function(v1,v2){v2(v1);}
a(1,b);
*/

function A(a,callback){
    var b=callback;
    console.log(a+b);



}
function B(c){
    return (-c);
}
A(31,B(2))
A(1,x=>{
    console.log(x)
})
console.log(NaN == NaN);
console.log((null == undefined));
console.log(null === undefined);
console.log(null instanceof Object);
console.log((4>=4)&&(5<=2) );


var count = 1;
var x=0;while(x<20){console.log(count); count++;x+=2;}
var a1=10;

var a2=20;

console.log("a1+a2="+a1+a2)
var s ="sdfaadsfKOJOAISDJI"
console.log(s.toLowerCase())
function f1() {
    var n = 999;
    nAdd = function () { n += 1; }
    function f2() {
        console.log(n);
    }
    return f2;
}
var result = f1();
result();
nAdd();
result();


var    obj    =    {    };


var    obj    =    /    /;
var    obj    =    [    ];

