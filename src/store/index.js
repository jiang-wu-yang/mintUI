import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: sessionStorage.getItem('islogin'), //保存当前是否已登录
    username:sessionStorage.getItem('username')

  },
  mutations: {
    //这个方法由vuex调用   vuex会自动传入state对象
    loginOk(state,username){
      state.islogin = true;
      state.username = username
    }
  },
  actions: {
  },
  modules: {
  }
})
