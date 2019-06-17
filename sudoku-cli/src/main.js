// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
// import {deleteRequest} from './utils/api'
// import {putRequest} from './utils/api'
// import {isNotNullORBlank} from './utils/utils'
import './utils/filter_utils'
import 'font-awesome/css/font-awesome.min.css'
//ant.design框架
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false;
Vue.use(Antd)
Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
// Vue.prototype.deleteRequest = deleteRequest;
// Vue.prototype.putRequest = putRequest;
// Vue.prototype.isNotNullORBlank = isNotNullORBlank;
/**
 * 每次跳转都会经过此方法，
 * 三个参数
 * to为即将前往的路由（或者叫做路径）
 * from 从那个路由发来的跳转请求
 * next表示下一波的操作（对其传入不同的参数可以控制页面的跳转）
 *
 */
router.beforeEach((to, from, next)=> {
    if (to.name === '/') {
      next();
      return;
    }
    let name = store.state.user.name;
  // let type = store.state.user.type;
    if (name === '未登录') {
      if (to.meta.requireAuth || to.name == null) {
        next({path: '/', query: {redirect: to.path}})
      } else {
        next();
      }
    }
      next();
  }
);
/**
 * 表示用App.vue的内容替换HTML文件中id为app的div
 * */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
