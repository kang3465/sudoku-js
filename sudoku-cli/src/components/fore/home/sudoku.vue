<template>
  <div>
    <div v-on:click="">当前成绩：{{Math.floor((this.currentTmie-this.startTmie)/1000)}}秒</div>
    <div id="grid-select">
      <div v-on:click="selectf" class="grid-select" id="grid-select-1" style="left: 10px">1</div>
      <div v-on:click="selectf" class="grid-select" id="grid-select-2" style="left: 70px">2</div>
      <div v-on:click="selectf" class="grid-select" id="grid-select-3" style="left: 130px">3</div>
      <div v-on:click="selectf" class="grid-select" id="grid-select-4" style="left: 190px">4</div>
      <div v-on:click="selectf" class="grid-select" id="grid-select-5" style="left: 250px">5</div>
      <div v-on:click="selectf" class="grid-select" id="grid-select-6" style="left: 310px">6</div>
      <div v-on:click="selectf" class="grid-select" id="grid-select-7" style="left: 370px">7</div>
      <div v-on:click="selectf" class="grid-select" id="grid-select-8" style="left: 430px">8</div>
      <div v-on:click="selectf" class="grid-select" id="grid-select-9" style="left: 490px">9</div>
    </div>
    <br/>
    <div id="grid-container">
      <!--<div v-for="(item, index) in this.test" >
        <div class="cell" v-for="(it, i) in item" :id="'grid-cell-'+index+'-'+i" >
          {{it}}
        </div>
      </div>-->
      <div class="grid-cell" id="grid-cell-0-0" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-0-1" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-0-2" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-0-3" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-0-4" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-0-5" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-0-6" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-0-7" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-0-8" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-1-0" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-1-1" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-1-2" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-1-3" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-1-4" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-1-5" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-1-6" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-1-7" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-1-8" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-2-0" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-2-1" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-2-2" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-2-3" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-2-4" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-2-5" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-2-6" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-2-7" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-2-8" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-3-0" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-3-1" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-3-2" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-3-3" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-3-4" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-3-5" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-3-6" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-3-7" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-3-8" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-4-0" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-4-1" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-4-2" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-4-3" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-4-4" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-4-5" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-4-6" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-4-7" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-4-8" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-5-0" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-5-1" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-5-2" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-5-3" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-5-4" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-5-5" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-5-6" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-5-7" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-5-8" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-6-0" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-6-1" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-6-2" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-6-3" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-6-4" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-6-5" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-6-6" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-6-7" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-6-8" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-7-0" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-7-1" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-7-2" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-7-3" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-7-4" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-7-5" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-7-6" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-7-7" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-7-8" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-8-0" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-8-1" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-8-2" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-8-3" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-8-4" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-8-5" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-8-6" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-8-7" v-on:click="su"></div>
      <div class="grid-cell" id="grid-cell-8-8" v-on:click="su"></div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: "sudoku",
    data: function () {
      return {
        scoteList: [],
        showScoteList: false,
        selectNum: -1,
        startTmie: new Date(),
        currentTmie: new Date(),
        hole: [],
        test: [[]],  //挖过洞后的数组
        nHole: 1,
        N: 9,//数独长度，基本是9
        num: 0,
        X: 0,
        Y: 0,
        FillNum: -1,
        Cnum: -1,
        holeNumber: 10,//设置挖洞数量
      }
    },
    mounted: function () {
      this.gameCore(25);
      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        _this.currentTmie = new Date().getTime(); // 修改数据date
      }, 1000)
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    },
    methods: {
      getScote: function () {
        this.postRequest('/xserver/user/scote', {}).then(resp => {
          // _this.loading = false;
          if (resp && resp.status == 200) {
            this.scoteList = resp.data;
            this.showScoteList = true;
            /**
             * 将返回的user对象放入前端的容器中
             */
          }
        })
      },
      //弹消息
      alertMsg(msg) {
        this.$alert(msg, '友情提示', {
          confirmButtonText: '确定',
          callback: action => {/*
            this.$notify({
              title: '重要重要!',
              type: 'warning',
              message: '小伙伴们需要注意的是，目前只有权限管理模块完工了，因此这个项目中你无法看到所有的功能，除了权限管理相关的模块。权限管理相关的模块主要有两个，分别是 [系统管理->基础信息设置->权限组] 可以管理角色和资源的关系， [系统管理->操作员管理] 可以管理用户和角色的关系。',
              duration: 0
            });*/
          }
        });
      },
      selectf: function (event) {
        let y = event.toElement.id[12];
        // console.log([y]);
        this.selectNum = y;
      },
      su: function (event) {
        let x = event.toElement.id[10];
        let y = event.toElement.id[12];
        // console.log([x, y]);
        if (this.selectNum !== -1) {
          if (this.isLegal(x, y, this.selectNum)) {
            this.test[x][y] = this.selectNum;
            this.selectNum = -1;
            this.updateBoardView()
          } else {
            // this.alertMsg("")
            // this.alertMsg(new Date().getTime()-this.startTime);
            this.$notify({
              title: '提示',
              type: 'warning',
              message: '无法填入',
              duration: 0
            });
          }
          if (this.isFinish()) {
            let time = Math.floor((new Date().getTime() - this.startTime) / 1000)
            this.alertMsg("游戏完成，用时：" + time + "秒。");
            this.postRequest('/xserver/user/scoteadd', {
              scote: time,
              holeNumber: this.holeNumber,
            }).then(resp => {
              _this.loading = false;
              if (resp && resp.status == 200) {
                let data = resp.data;
                /**
                 * 将返回的user对象放入前端的容器中
                 */
              }
            });
          }
        }
      },//判断81个格子是否都已填上数，填上则表示结束了，返回TRUE
      isFinish: function () {
        let flag = true; //默认为填完了
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (this.test[i][j] === 0) {
              flag = false;
              break; //只要有一个还为0，即表示没有填完
            }
          }
        }
        return flag;
      },
      //判断操作是否符合游戏填数规则，符合返回TRHE
      isLegal: function (x, y, num) {
        // console.log([x, y, num]);
        // debugger
        let flag = true;  //默认不含有相同元素

        for (let i = 0; i < 9; i++) {  // 判断行和列是否含有num元素
          if (this.test[x][i] == num) { //行判断
            flag = false;
            break;
          }
          if (this.test[i][y] == num) {  //列判断
            flag = false;
            break;
          }
        }

        //判断第（tempa, tempb)小九宫格是否含有num元素
        let tempa = Math.floor(x / 3);
        let tempb = Math.floor(y / 3);
        for (let i = tempa * 3; i < (3 + tempa * 3); i++) {//扫描该（a，b）所在的小九宫格
          for (let j = tempb * 3; j < (3 + tempb * 3); j++) {

            if (this.test[i][j] == num) {
              flag = false;
              break;
            }
          }
        }
        return flag;
      }
      ,
      //小方格距离头部的间距
      getPosTop: function (i, j) {
        return 10 + 60 * i;
      }
      ,
      //小方格距离左部的间距
      getPosLeft: function (i, j) {
        return 10 + 60 * j;
      }
      ,
      //构造函数
      gameCore: function (holeNumber) {
        this.hole = new Array(81);
        /* this.test = new Array(); //存放挖好洞的布局
         for (let i = 0; i <10 ; i++) {
           this.test[i]=new Array();
         }*/
        this.N = 9;
        this.holeNumber = holeNumber;
        this.startTime = new Date().getTime();
        this.initialGame();  //初始化
        // this.initView();
      }
      ,
      //设置挖洞数量
      setHoleNumber: function (holeNumber) {
        this.holeNumber = holeNumber;
      }
      ,
      //Generator方法    ，产生原始填充数独
      Generator: function () {
        this.Cnum = 0;
        this.N = 9;
        this.nHole = 0;
        let count = 0;
        this.num = 10 + Math.floor(Math.random() * 6);  //产生10到16之间的随机数,不包括16,也就是10到15的整数
        //while循环  尝试在数组中填入符合数独规则的数字  以此来减少树的分支,提高效率
        while (count !== this.num) {
          this.X = Math.floor(Math.random() * this.N);
          this.Y = Math.floor(Math.random() * this.N);
          this.FillNum = 1 + Math.floor(Math.random() * this.N);
          if (this.isLegal(this.X, this.Y, this.FillNum)) {
            this.test[this.X][this.Y] = this.FillNum;
            count++;
          }
        }
      }
      ,//bPack方法  判断是否可将 n 填入 M[y][x] 里
      bPack: function (x, y, n) {
        //for循环  纵横判断
        for (let i = 0; i < this.N; i++)                         //若 M[0~N-1][x]
          if (n === this.test[x][i] || n === this.test[i][y])   //或 M[y][0~N-1] 中已存在 n
            return false;                   //则返回 false
        //for循环 区域判断
        let D_X, D_Y, OrderNum;
        OrderNum = 9 * (x + 1) + (y + 1);
        D_X = (Math.floor(x / 3)) * 3;
        D_Y = (Math.floor(y / 3)) * 3;

        for (let count = 0; count !== this.N; count++) {
          if (D_X === x && D_Y === y)
            continue;
          if (this.test[(Math.floor(D_X + count / 3))][(Math.floor(D_Y + count % 3))] === n)
            return false;
        }
        //返回结果
        return true;
      }
      ,
      //fill方法  此方法用来填充完整已有数子的数独
      fill: function (num) {
        if (this.Cnum === 81) {
          return;  //表示填满返回
        }
        if (this.test[Math.floor(this.Cnum / 9)][Math.floor(this.Cnum % 9)] !== 0) {
          ++this.Cnum;
          this.fill(this.Cnum);    //位置不为0,填充下一个
          return;
        } else {
          //从1到9里面选择数字填进去
          for (let x = 1; x !== 11; x++) {    //x=10 是哨兵
            if (this.Cnum === 81) {
              return;  //表示填满返回
            }
            if (x === 10 && this.Cnum !== 0) {
              --this.Cnum;
              this.test[Math.floor(this.Cnum / 9)][Math.floor(this.Cnum % 9)] = 0;
              return;
            }
            if (this.isLegal(Math.floor(this.Cnum / 9), Math.floor(this.Cnum % 9), x)) {
              this.test[Math.floor(this.Cnum / 9)][Math.floor(this.Cnum % 9)] = x;
              ++this.Cnum;
              this.fill(this.Cnum);
            }
          }
        }
      }
      ,
      initialGame: function () {

        for (let i = 0; i < this.N; i++) {
          this.test[i] = [];
          for (let j = 0; j < this.N; j++)
            this.test[i][j] = 0;

        }
        for (let i = 0; i < 81; i++) {
          this.hole[i] = 0;
        }

        this.Generator();
        this.fill(this.Cnum);
        this.DigHole();
        this.initView();
      }
      ,
      //随机挖洞，生成游戏布局
      DigHole: function () {
        let r, x, y;
        for (let i = 0; i < this.holeNumber;) {
          r = Math.floor(Math.random() * 81);
          x = r / 9;
          y = r % 9;
          if (this.test[Math.floor(x)][Math.floor(y)] !== 0) {
            this.test[Math.floor(x)][Math.floor(y)] = 0;
            i++;
          }
        }
      }
      ,
      initView() {
        console.log(this.test);
        for (let i = 0; i < this.N; i++) {
          //定义一个二维数组
          for (let j = 0; j < this.N; j++) {
            //16个小方格的初始值都为0
            let gridCell = $("#grid-cell-" + i + "-" + j);
            //设置小方格距离头部的距离
            gridCell.css("top", this.getPosTop(i, j));
            //设置小方格距离左部的距离
            gridCell.css("left", this.getPosLeft(i, j));
          }
        }
        this.updateBoardView();
        // this.updateSelectView();
      }
      ,
      updateBoardView: function () {
        $(".grid-number").remove();
        for (let i = 0; i < this.N; i++) {
          for (let j = 0; j < this.N; j++) {
            //在大框中添加div内容为数字
            let gridContainer = $("#grid-container");
            gridContainer.append("<div class='grid-number' id='grid-number-" + i + "-" + j + "'></div>");
            let gridNumber = $("#grid-number-" + i + "-" + j);
            //判断二维数组中的值是否为0
            // console.log(gridNumber);
            if (this.test[i][j] === 0) {
              gridNumber.css("width", "0px");
              gridNumber.css("height", "0px");
              gridNumber.css("top", this.getPosTop(i, j) + 25);
              gridNumber.css("left", this.getPosLeft(i, j) + 25);
              gridNumber.css("position", "absolute");
              gridNumber.css("border-radius", "3px");
              gridNumber.css("font-weight", "bold");
              gridNumber.css("font-size", "30px");
              gridNumber.css("line-height", "50px");
              gridNumber.css("text-align", "center");
            }
            //如果棋盘格的值不为0的话,设置数字格为高宽为75并设置背景色和前景色及数字值
            else {
              gridNumber.css("width", "50px");
              gridNumber.css("height", "50px");
              gridNumber.css("top", this.getPosTop(i, j));
              gridNumber.css("left", this.getPosLeft(i, j));
              gridNumber.css("position", "absolute");
              gridNumber.css("border-radius", "3px");
              gridNumber.css("font-weight", "bold");
              gridNumber.css("font-size", "30px");
              gridNumber.css("line-height", "50px");
              gridNumber.css("text-align", "center");
              // gridNumber.css("background-color", getGridNumberBackgroundColor(board[i][j]));
              // gridNumber.css("color", getGridNumberColor(board[i][j]));
              gridNumber.text(this.test[i][j]);
            }

          }
        }
      }
      /* ,
       updateSelectView: function () {
         for (let i = 0; i < 9; i++) {
           $("#grid-select").append("<div  v-on:click='selectf' class='grid-select' id='grid-select-" + i + "'></div>");
           //在大框中添加div内容为数字
           let gridSelect = $("#grid-select-" + i);
           //判断二维数组中的值是否为0
           console.log(gridSelect);
           gridSelect.css("width", "50px");
           gridSelect.css("height", "50px");
           gridSelect.css("top", "10px");
           gridSelect.css("position", "absolute");
           gridSelect.css("border-radius", "3px");
           gridSelect.css("font-weight", "bold");
           gridSelect.css("font-size", "30px");
           gridSelect.css("line-height", "50px");
           gridSelect.css("text-align", "center");
           gridSelect.css("background-color", "#ccc0b3");
           // gridSelect.css("background-color", getgridSelectBackgroundColor(board[i][j]));
           // gridSelect.css("color", getgridSelectColor(board[i][j]));
           gridSelect.text(i + 1);
         }
       }*/
    }
  }
</script>

<style scoped>
  #grid-container {
    position: relative;
    width: 550px;
    height: 550px;
    border-radius: 10px;
    margin: 0px auto;
    padding: 20px;
    background-color: #bbada0;
  }

  #grid-select {
    position: relative;
    width: 550px;
    height: 70px;
    border-radius: 10px;
    margin: 0px auto;
    padding: 20px;
    background-color: #bbada0;
  }

  .grid-select {
    width: 50px;
    height: 50px;
    top: 10px;
    position: absolute;
    border-radius: 3px;
    font-weight: bold;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
    background-color: #ccc0b3;
  }

  .grid-cell {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 3px;
    background-color: #ccc0b3;
  }

  .grid-number {
    position: absolute;
    border-radius: 3px;
    font-family: Arial;
    font-weight: bold;
    font-size: 30px;
    line-height: 50px;
    text-align: center;
  }


</style>
