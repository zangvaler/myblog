import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        bloglist: [],    // 所有博客
        taglist: [],     // 所有标签
        classifylist: [], // 所有分类
        token: localStorage.getItem('userName') || '' // 存储的token
    },

    mutations: {
        getToken (state, params) {
            state.token = params.token
        },
        changebloglist (state, params) {
            state.bloglist = params.blogList
        },
        changetaglist (state, params) {
            state.taglist = params.tagList
        },
        changeclassifylist (state, params) {
            state.classifylist = params.tagList
        }
    }
});

export default store