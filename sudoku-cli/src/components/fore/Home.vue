<template>
  <div>
    <el-container class="home-container" direction="vertical">
      <el-header class="home-header el-menu-demo">
        <span style="padding-left: 10%" class="home_title">ELE</span>
        <el-menu style="padding-right: 1%" router='true'
                 :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <template v-for=""></template>
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="mytest">我的考试</el-menu-item>
          <el-menu-item index="sudoku">我的数独</el-menu-item>
        </el-menu>
        <div style="display: flex;align-items: center;margin-right: 7px">
          <el-badge style="margin-right: 30px" :is-dot="this.$store.state.nfDot">
            <i class="fa fa-bell-o" @click="goChat" style="cursor: pointer"></i>
          </el-badge>
          <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link home_userinfo" style="display: flex;align-items: center">
    {{user.name}}
    <i><img v-if="user.userface!=''" :src="user.userface"
            style="width: 40px;height: 40px;margin-right: 5px;margin-left: 5px;border-radius: 40px"/></i>
  </span>
            <el-dropdown-menu slot="dropdown" v-if="user.username!='未登录'">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu slot="dropdown" v-if="user.username==='未登录'">
              <el-dropdown-item>登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <div>
        <el-container style="height: 1280px;  width: 960px;margin:0 auto">
          <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
            <!--数据库中有对应的字段来确定菜单视图加载之后是否为 keep-alive 状态-->
            <keep-alive>
              <router-view v-if="this.$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
          </el-main>
        </el-container>
      </div>
    </el-container>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    mounted: function () {
      this.devMsg();
      // this.loadNF();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      loadNF() {
        var _this = this;
        this.getRequest("/chat/sysmsgs").then(resp => {
          var isDot = false;
          resp.data.forEach(msg => {
            if (msg.state == 0) {
              isDot = true;
            }
          })
          _this.$store.commit('toggleNFDot', isDot);
        })
      },
      goChat() {
        this.$router.push({path: '/chat'});
      },
      devMsg(msg,notify) {
        this.$alert('为了确保所有的小伙伴都能看到完整的数据演示，数据库只开放了查询权限和部分字段的更新权限，其他权限都不具备，完整权限的演示需要大家在自己本地部署后，换一个正常的数据库用户后即可查看，这点请大家悉知!', '友情提示', {
          confirmButtonText: '确定',
          callback: action => {
            /*this.$notify({
              title: '重要重要!',
              type: 'warning',
              message: '小伙伴们需要注意的是，目前只有权限管理模块完工了，因此这个项目中你无法看到所有的功能，除了权限管理相关的模块。权限管理相关的模块主要有两个，分别是 [系统管理->基础信息设置->权限组] 可以管理角色和资源的关系， [系统管理->操作员管理] 可以管理用户和角色的关系。',
              duration: 0
            });*/
          }
        });
      },
      handleCommand(cmd) {
        var _this = this;
        if (cmd == 'logout') {
          this.$confirm('注销登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.getRequest("/logout");
            _this.$store.commit('logout');
            _this.$router.replace({path: '/'});
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '取消'
            });
          });
        }
      }
    },
    data() {
      return {
        isDot: false
      }
    },
    computed: {
      user() {
        console.log(this.$store.state.user)
        return this.$store.state.user;
      },
      routes() {
        return this.$store.state.routes
      }
    }
  }
</script>
<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #545c64;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }

  .home-aside {
    background-color: #ECECEC;
    width: 100%;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
</style>
