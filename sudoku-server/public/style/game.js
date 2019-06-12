/*键盘按下的监听操作*/
$(document).keydown(function(event){
    switch(event.keyCode){
    	case 37:   //左键
    	       if(moveLeft()){
    	       	  setTimeout("generateOneNumber()", 210);
                  setTimeout("isgameover()", 300);
    	       }
    	       break;
    	case 38:   //上键
    	       if(moveUp()){
    	       	    setTimeout("generateOneNumber()", 210);
                    setTimeout("isgameover()", 300);
    	       }
    	       break;
    	case 39:   //右键
    	       if(moveRight()){
    	       	   setTimeout("generateOneNumber()", 210);
                   setTimeout("isgameover()", 300);
    	       }
    	       break;
    	case 40:   //下键
    	       if(moveDown()){
    	       	   setTimeout("generateOneNumber()", 210);
                   setTimeout("isgameover()", 300);
    	       }
    	       break;
    	default:
    	 
    	       break;
    }
});

//是否可以移动的方法
function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	//处理向左移动逻辑
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j]!=0){
				//向左移动
				for(var k=0;k<j;k++){
					if(board[i][k]==0 && noBlokHorizontalCol(i,k,j,board)){
						//开始移动
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						
					}else if(board[i][k]==board[i][j] && noBlokHorizontalCol(i,k,j,board)){
					    //才能向左移动
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        scote += board[i][k];
					}
				}
			}
		}
	}
	//更新小方格的内容
	setTimeout("updateBoardView();",200);
	//更新得分
	$("#scote").text("得分:"+scote);
	return true;
}

//判断是否可以向上移动的方法
function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	//处理向上移动的逻辑
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				//向上移动
				for(var k=0;k<i;k++){
					if(board[k][j]==0 && noBlokHorizontalRow(k,i,j,board)){
						//开始移动
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
					}else if(board[k][j]==board[i][j] && noBlokHorizontalRow(k,i,j,board)){
						//开始移动
						showMoveAnimation(i,j,k,j);
						board[k][j] +=board[i][j];
						board[i][j]=0;
						scote += board[k][j];
					}
				}
			}
		}
	}
	
	//更新小方格的内容
	setTimeout("updateBoardView();",200);
	//更新得分
	$("#scote").text("得分:"+scote);
	return true;
}

//判断是否可以向右移动的方法
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	//处理向右移动的逻辑
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0 && noBlokHorizontalCol(i, j, k,board)){
						//开始移动
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
					}else if(board[i][k]==board[i][j] && noBlokHorizontalCol(i, j, k,board)){
					    //才能向左移动
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        scote += board[i][k];
					}
				}
			}
		}
	}
    //更新小方格的内容
	setTimeout("updateBoardView();",200);
	//更新得分
	$("#scote").text("得分:"+scote);
	return true;
}

//判断是否可以向下移动的方法
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	//处理向下移动的逻辑
	for(var i=2;i>=0;i--){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				for(var k=3;k>i;k--){
					if(board[k][j]==0 && noBlokHorizontalRow(i, k, j,board)){
        				//开始移动
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
					}else if(board[k][j]==board[i][j] && noBlokHorizontalRow(i, k, j,board)){
						//开始移动
						showMoveAnimation(i,j,k,j);
						board[k][j] +=board[i][j];
						board[i][j]=0;
						scote += board[k][j];
					}
				}
			}
		}
	}
	//调用更新页面的方法
	setTimeout("updateBoardView();",200);
	//更新得分
	$("#scote").text("得分:"+scote);
	return true;
}

//判断游戏是否结束的方法
function gameOver(){
	//判断16个小方格是否都有数字
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			}
		}
	}
	//16个小方格都有数字再判断两两相邻的方格的值是否有相等的
	if(moveDown()||moveRight()||moveUp()||moveLeft()){
		return false;
	}
	return true;
}

function isgameover(){
	if(gameOver()){
		//alert("游戏结束!");
		$("#grid-container").append("<div id='gameOver' class='gameOver'><p id='setcenter'>本次得分：<span>"+scote+"</span><a href='javascript:restart()' id='restart'>重新开始</a></p></div>");
		/*var gameOver=$("#gameOver");
		gameOver.css("height","500px");
		gameOver.css("","500px");
		*/
	}
}

//重新开始的方法
function restart(){
	$("#gameOver").remove();
	newGame();
}