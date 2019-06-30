import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/fore/Login'
import Home from '@/components/fore/Home'
import sudoku from '@/components/fore/home/sudoku'
import demo from '@/components/fore/home/demo'
import rankingList from '@/components/fore/home/rankingList'
import userList from '@/components/fore/home/userList'
import PersonalCenter from '@/components/fore/home/PersonalCenter'
import Personalinfo from '@/components/fore/home/admin/Personalinfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      hidden: true,

    },{
      path: '/Home',
      name: 'Home',
      component: Home,
      hidden: true,
      children: [
        {
          path: '/sudoku',
          name: '数独游戏',
          component: sudoku,
          hidden: true,
          meta: {
            keepAlive: false,
            requireAuth: true
          }
        },{
          path: '/demo',
          name: 'demo',
          component: demo,
          hidden: true,
          meta: {
            keepAlive: false,
            requireAuth: true
          }
        },{
          path: '/rankingList',
          name: '排行榜',
          component: rankingList,
          hidden: true,
          meta: {
            keepAlive: false,
            requireAuth: true
          }
        },{
          path: '/userList',
          name: '在线用户',
          component: userList,
          hidden: true,
          meta: {
            keepAlive: false,
            requireAuth: true
          }
        },{
          path: '/PersonalCenter',
          name: '个人中心',
          component: PersonalCenter,
          hidden: true,
          meta: {
            keepAlive: false,
            requireAuth: true
          },children: [
            {
              path: '/Personalinfo',
              name: '个人信息',
              component: Personalinfo,
              hidden: true,
              meta: {
                keepAlive: false,
                requireAuth: true
              }
            },]
        },
      ]
    },
  ]
})
