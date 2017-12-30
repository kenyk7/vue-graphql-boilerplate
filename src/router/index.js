import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import Auth from '@/views/Auth'
import Profile from '@/views/Profile'

import { getToken, isTokenExpired, logout } from '@/helpers/authHelpers'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        auth: false
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Auth,
      beforeEnter: (to, from, next) => {
        if (getToken()) {
          next({name: 'Home'})
        }
        next()
      }
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter (to, from, next) {
        logout()
        next({name: 'Home'})
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// http://router.vuejs.org/en/advanced/meta.html
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (isTokenExpired()) {
      logout()
      next({
        name: 'Login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
