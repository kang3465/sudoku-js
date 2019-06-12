//动态显示生成的随机数的方法
function showNumberWithAnimation(generateX,generateY,generateNumber){
	var gridNumber = $("#grid-number-"+generateX+"-"+generateY);
	gridNumber.css("background-color",getGridNumberBackgroundColor(generateNumber));
	gridNumber.css("color",getGridNumberColor(generateNumber));
	gridNumber.text(generateNumber);
	gridNumber.animate({
	   width:"100px",
	   height:"100px",
	   top:getPosTop(generateX,generateY),
	   left:getPosLeft(generateX,generateY)
	},50);
	
}

//向左移动动画
function showMoveAnimation(fromX,fromY,toX,toY){
	var gridNumber = $("#grid-number-"+fromX+"-"+fromY);
	gridNumber.animate({
	   top:getPosTop(toX,toY),
	   left:getPosLeft(toX,toY)
	},200);
}

//判断是否可以向左移动的方法
function canMoveLeft(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i][j-1]==0 || board[i][j-1]==board[i][j] ){
					return true;
				}
			}
		}
	}
	return false;
}

//向左移的时候判断左边是否有数字是否可以向左移动
function noBlokHorizontalCol(row,col1,col2,board){
	for(var i=col1+1;i<col2;i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}

//判断是否可以向上移动的方法
function canMoveUp(board){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i-1][j]==0 || board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//向上移动的时候判断上边是否有数字可以向上移动的方法
function noBlokHorizontalRow(row1,row2,col,board){
	for(var i=row1+1;i<row2;i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}

//判断是否可以向右移动的方法
function canMoveRight(board){
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				if(board[i][j+1]==0 ||board[i][j+1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断是否可以向下移动的方法方法
function canMoveDown(board){
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				if(board[i+1][j]==0 || board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	
	return false;
}
