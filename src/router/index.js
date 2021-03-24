import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/layout/Home.vue'
import { addDynamicMenuRoutes } from '../api/layout/index.js'
import { navMenu } from '../api/menu/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [{
      path: 'dashboard',
      component: () => import('../views/dashboard/Dashboard.vue'),
      meta: {
        title: '首页',
        icon: 'el-icon-info'
      }
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('pvToken')
  if (to.path === '/login') {
    if (token !== null) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (token === null) {
      next({ path: '/login' })
    } else {
      if (store.state.navMenu.length === 0) {
        navMenu().then(res => {
          if (res !== undefined) {
            store.commit({
              type: 'navMenu',
              navMenu: res
            })
            const routers = addDynamicMenuRoutes(res)
            router.addRoutes(routers)
          }
        })
      }
      next()
    }
  }
})

export default router
