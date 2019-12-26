import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: () => import('@/view/Login')
        },
        {
            path: '/main',
            component: () => import('../view/main')
        },
        {
            path: '/bloglist',
            component: () => import('../view/blogList')
        },
        {
            path: '/blogging',
            component: () => import('../view/blogging')
        },
        {
            path: '/tag',
            component: () => import('../view/tag')
        },
        {
            path: '/classify',
            component: () => import('../view/classify')
        },
        {
            path: '/imgs',
            component: () => import('../view/imgs')
        },
        {
            path: '/register',
            component: () => import('../view/register')
        }
    ]
})
