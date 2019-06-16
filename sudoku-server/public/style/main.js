//定义一个存储16个小方格的二维数组
var board = new Array();

//定义一个全局变量记录总成绩
var scote=0;


$(function(){
    //创建游戏的方法
	newGame();
});

//创建游戏的方法
function newGame(){
	//初始化游戏小方格界面
	init();
	//随机生成随机位置的数字
	generateOneNumber();
	generateOneNumber();
	$("#scote").text("得分：0");
	scote=0
}

//创建16个小方格的方法
function init(){
	for(var i=0;i<4;i++){
		//定义一个二维数组
		board[i] = new Array();
		for(var j=0;j<4;j++){
			//16个小方格的初始值都为0
			board[i][j] = 0;
			var gridCell = $("#grid-cell-"+i+"-"+j);
			//设置小方格距离头部的距离
			gridCell.css("top",getPosTop(i,j));
			//设置小方格距离左部的距离
			gridCell.css("left",getPosLeft(i,j));
		}
	}

	//更新小方格的内容
	updateBoardView();
}

function updateBoardView(){
	$(".grid-number").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			//在大框中添加div内容为数字
			$("#grid-container").append("<div class='grid-number' id='grid-number-"+i+"-"+j+"'></div>");
			var gridNumber = $("#grid-number-"+i+"-"+j);
			//判断二维数组中的值是否为0
			if(board[i][j]==0){
				gridNumber.css("width","0px");
				gridNumber.css("height","0px");
				gridNumber.css("top",getPosTop(i,j)+50);
				gridNumber.css("left",getPosLeft(i,j)+50);
			}
			  //如果棋盘格的值不为0的话,设置数字格为高宽为75并设置背景色和前景色及数字值
            else {
                gridNumber.css("width", "100px");
                gridNumber.css("height", "100px");
                gridNumber.css("top", getPosTop(i, j));
                gridNumber.css("left", getPosLeft(i, j));
                gridNumber.css("background-color", getGridNumberBackgroundColor(board[i][j]));
                gridNumber.css("color", getGridNumberColor(board[i][j]));
                gridNumber.text(board[i][j]);
            }

		}
	}
}

function generateOneNumber(){
	//随机生成一个数字
	var generateNumber = Math.random()<0.5?2:4;
	//随机生成一个位置
	var generateX = parseInt(Math.floor(Math.random()*4));
	var generateY = parseInt(Math.floor(Math.random()*4));
	   //定义一个死循环,完成生成随机空格子
    while (true) {
        //如果当前格子的值为0,满足条件
        if (board[generateX][generateY] == 0) {
            break;
        }
        //否则重新随机一个位置
         generateX = parseInt(Math.floor(Math.random() * 4));
         generateY = parseInt(Math.floor(Math.random() * 4));
    }
	//把随机数字在随机位置中显示
	board[generateX][generateY]=generateNumber;
	//刷新数字（动态显示)
	showNumberWithAnimation(generateX,generateY,generateNumber);

}

