
//小方格距离头部的间距
function getPosTop(i,j){
	return 20+120*i;
}

//小方格距离左部的间距
function getPosLeft(i,j){
	return 20+120*j;
}

//设置动态生成数字的背景颜色
function getGridNumberBackgroundColor(generateNumber){
	switch(generateNumber){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
}

//不同的数字设置不同的字体颜色
function getGridNumberColor(generateNumber){
	if(generateNumber<=4){
		return "#776e65";
	}
	return "white";
}