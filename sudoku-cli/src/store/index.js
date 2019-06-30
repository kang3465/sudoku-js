import Vue from 'vue'
import Vuex from 'vuex'
import '../../static/sockjs'
import '../lib/stomp'

Vue.use(Vuex)

export default new Vuex.Store({
  /**
   * 用于存放数据对象
   * */
  state: {
    user: {
      id: window.localStorage.getItem('user' || '[]') == null ? '-1' : window.localStorage.getItem('user' || '[]').id,
      name: window.localStorage.getItem('user' || '[]') == null ? '未登录' : window.localStorage.getItem('user' || '[]').name,
      userface: window.localStorage.getItem('user' || '[]') == null ? 'http://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F43%2F89%2F59399eb9148bb_610.jpg&thumburl=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2806881758%2C790704577%26fm%3D26%26gp%3D0.jpg' : window.localStorage.getItem('user' || '[]').userface,
      username: window.localStorage.getItem('user' || '[]') == null ? '' : window.localStorage.getItem('user' || '[]').username,
      roles: window.localStorage.getItem('user' || '[]') == null ? '' : window.localStorage.getItem('user' || '[]').roles,
      type: window.localStorage.getItem('user' || '[]') == null ? '' : window.localStorage.getItem('user' || '[]').type
    },
    token:null/*window.localStorage.getItem('token' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('token' || '[]'))*/,
    routes: [],
    msgList: [],
    isDotMap: new Map(),
    currentFriend: {},
    stomp: null,
    nfDot: false
  },
  /**
   * 方法，但是由于js只支持单线程，所以也只支持单线程
   * 调用：store.commit("updateMsgList", []);
   * */
  mutations: {
    initMenu(state, menus){
      state.routes = menus;
    },
    login(state, user){
      state.user = user.user;
      window.localStorage.setItem('user', JSON.stringify(user.user));
      state.token = user.token;
      window.localStorage.setItem('token', JSON.stringify(user.token));
    },
    logout(state){
      window.localStorage.removeItem('user');
      state.token = null;
      window.localStorage.removeItem('token');
      state.routes = [];
    },
    toggleNFDot(state, newValue){
      state.nfDot = newValue;
    },
    updateMsgList(state, newMsgList){
      state.msgList = newMsgList;
    },
    updateCurrentFriend(state, newFriend){
      state.currentFriend = newFriend;
    },
    addValue2DotMap(state, key){
      state.isDotMap.set(key, "您有未读消息")
    },
    removeValueDotMap(state, key){
      state.isDotMap.delete(key);
    }
  },
  /**
   * 方法，但是支持异步多线程
   * 调用：store.dispatch('connect');
   * */
  actions: {
    connect(context){
      context.state.stomp = Stomp.over(new SockJS("/ws/endpointChat"));
      context.state.stomp.connect({}, frame=> {
        context.state.stomp.subscribe("/user/queue/chat", message=> {
          let msg = JSON.parse(message.body);
          var oldMsg = window.localStorage.getItem(context.state.user.username + "#" + msg.from);
          if (oldMsg == null) {
            oldMsg = [];
            oldMsg.push(msg);
            window.localStorage.setItem(context.state.user.username + "#" + msg.from, JSON.stringify(oldMsg))
          } else {
            var oldMsgJson = JSON.parse(oldMsg);
            oldMsgJson.push(msg);
            window.localStorage.setItem(context.state.user.username + "#" + msg.from, JSON.stringify(oldMsgJson))
          }
          if (msg.from != context.state.currentFriend.username) {
            context.commit("addValue2DotMap", "isDot#" + context.state.user.username + "#" + msg.from);
          }
          //更新msgList
          var oldMsg2 = window.localStorage.getItem(context.state.user.username + "#" + context.state.currentFriend.username);
          if (oldMsg2 == null) {
            context.commit('updateMsgList', []);
          } else {
            context.commit('updateMsgList', JSON.parse(oldMsg2));
          }
        });
        context.state.stomp.subscribe("/topic/nf", message=> {
          context.commit('toggleNFDot', true);
        });
      }, failedMsg=> {

      });
    }
  }
});
