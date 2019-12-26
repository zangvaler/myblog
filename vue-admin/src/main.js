import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(Vuex)


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
