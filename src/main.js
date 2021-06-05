import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入mintui
import MinUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MinUI)
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
//引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.axios = axios
//引入comment
import moment from 'moment'
Vue.prototype.moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
