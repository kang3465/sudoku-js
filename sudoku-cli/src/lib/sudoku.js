export default {
  name: "sudoku",
  data: function () {
    return {
      hole: [],
      test: [[]],  //挖过洞后的数组
      nHole: 1,
      N: 9,//数独长度，基本是9
      num: 0,
      X: 0,
      Y: 0,
      FillNum: -1,
      Cnum: -1,
      holeNumber: 25,//设置挖洞数量
    }
  },
  mounted: {
    // this.gameCore(this.holeNumber)
  },
  methods: {
    //构造函数
    gameCore: function (holeNumber) {
      this.hole = new Array(81);
      this.holeNumber = holeNumber;

      initialGame();  //初始化
    },
    //设置挖洞数量
    setHoleNumber: function (holeNumber) {
      this.holeNumber = holeNumber;
    },
    //Generator方法    ，产生原始填充数独
    Generator: function () {
      this.Cnum = 0;
      this.N = 9;
      this.nHole = 0;
      var count = 0;
      this.num = 10 + (int)(Math.random() * 6);  //产生10到16之间的随机数,不包括16,也就是10到15的整数
      //while循环  尝试在数组中填入符合数独规则的数字  以此来减少树的分支,提高效率
      while (count != this.num) {
        this.X = Math.floor(Math.random() * 9);
        this.Y = Math.floor(Math.random() * 9);
        this.FillNum = 1 + Math.floor(Math.random() * 9);
        if (bPack(this.X, this.Y, this.FillNum)) {
          test[this.X][this.Y] = this.FillNum;
          count++;
        }
      }
    },//bPack方法  判断是否可将 n 填入 M[y][x] 里
    bPack: function (x, y, n) {
      //for循环  纵横判断
      for (var i = 0; i < this.N; i++)                 //若 M[0~N-1][x]
        if (n == test[x][i] || n == test[i][y])   //或 M[y][0~N-1] 中已存在 n
          return false;                   //则返回 false
      //for循环 区域判断
      var D_X, D_Y, OrderNum;
      OrderNum = 9 * (x + 1) + (y + 1);
      D_X = ((int)(x / 3)) * 3;
      D_Y = ((int)(y / 3)) * 3;
      for (var count = 0; count != 9; count++) {
        if (D_X == x && D_Y == y)
          continue;
        if (test[(D_X + count / 3)][(D_Y + count % 3)] == n)
          return false;
      }
      //返回结果
      return true;
    },
    //fill方法  此方法用来填充完整已有数子的数独
    fill: function (num) {
      if (this.Cnum == 81) {
        return;  //表示填满返回
      }
      if (this.test[this.Cnum / 9][this.Cnum % 9] != 0) {
        ++this.Cnum;
        this.fill(this.Cnum);    //位置不为0,填充下一个
        return;
      } else {
        //从1到9里面选择数字填进去
        for (var x = 1; x != 11; x++) {    //x=10 是哨兵
          if (this.Cnum == 81) {
            return;  //表示填满返回
          }
          if (x == 10 && this.Cnum != 0) {
            --this.Cnum;
            test[(this.Cnum / 9)][(this.Cnum % 9)] = 0;
            return;
          }
          if (this.bPack((this.Cnum / 9), (this.Cnum % 9), x)) {
            test[(this.Cnum / 9)][(this.Cnum % 9)] = x;
            ++this.Cnum;
            this.fill(this.Cnum);
          }
        }
      }
    },
    initialGame: function () {

      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++)
          this.test[i][j] = 0;

      }
      for (var i = 0; i < 81; i++) {
        this.hole[i] = 0;
      }

      this.Generator();
      this.fill(this.Cnum);
      this.DigHole();
    },
    //随机挖洞，生成游戏布局
    DigHole: function () {
      var r, x, y;
      for (var i = 0; i < holeNumber;) {
        r = Math.floor(Math.random() * 81);
        x = r / 9;
        y = r % 9;
        if (this.test[x][y] != 0) {
          this.test[x][y] = 0;
          i++;
        }
      }
    },
  }
}
