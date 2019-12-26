import Vue from 'vue'
import Vuex from 'vuex'
import { apiURL } from '../util/api/api.js'
import axios from '../util/api/index.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogList: [],
    updataBlog: ''
  },
  mutations: {
    SET_INITBLOG_DATA (state, obj) {
      state.blogList = obj
    },
    UPDATA_BLOG_DATA (state, obj) {
      state.updataBlog = obj
    }
  },
  getters: {
    blogList: state => state.blogList
  },
  actions: {
    requestBloglist ({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(apiURL.BLOGLIST, {}, response => {
          if (response.status >= 200 && response.status < 300) {
            commit('SET_INITBLOG_DATA', response.data.data.list)
            resolve(response.data.data.list)
          } else {
            console.log('出错了...')
          }
        })
      })
    },
    updataBlog ({ commit }, data) {
      return new Promise((resolve, reject) => {
        console.log(data);
        axios.post(apiURL.MODIFYBLOG, data, response => {
          if (response.status >= 200 && response.status < 300) {
            commit('SET_INITBLOG_DATA', data)
            resolve(data)
          } else {
            console.log('出错了...')
          }
        })
      })
    }
  },
  modules: {
  }
})
