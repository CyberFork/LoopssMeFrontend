import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/locales'
import Trust from '@/views/Trust.vue'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const routes = [{
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    meta: {
      title: i18n.t('menu.home'),
      menu: true
    }
  },
  {
    path: '/mining',
    name: 'mining',
    component: () => import(/* webpackChunkName: "mining" */ '@/views/Mining.vue'),
    meta: {
      title: i18n.t('menu.mining'),
      menu: true
    }
  },
  {
    path: '/trust',
    name: 'trust',
    component: Trust,
    meta: {
      title: i18n.t('menu.trust'),
      menu: true
    }
  },
  {
    path: '/invited',
    name: 'invited',
    component: Trust,
    meta: {
      title: i18n.t('menu.trust'),
      menu: false
    }
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import(/* webpackChunkName: "homePage" */ '@/views/HomePage.vue'),
    meta: {
      title: i18n.t('menu.homePage'),
      menu: true
    }
  },
  {
    path: '/wallet',
    name: 'wallet',
    component: () => import(/* webpackChunkName: "wallet" */ '@/views/Wallet.vue'),
    meta: {
      title: i18n.t('menu.wallet'),
      menu: true
    }
  },
  {
    path: '/swap',
    name: 'swap',
    component: () => import(/* webpackChunkName: "swap" */ '@/views/Swap.vue'),
    meta: {
      title: i18n.t('menu.swap'),
      menu: true
    }
  },
  {
    name: 'error',
    path: '/error',
    redirect: '/error/404',
    component: () => import(/* webpackChunkName: "error" */ '../views/error'),
    children: [{
      path: '/error/404',
      name: '404',
      component: () => import(/* webpackChunkName: "error" */ '../views/error/404.vue')
    }, {
      path: '/error/needLogin',
      name: 'needLogin',
      component: () => import(/* webpackChunkName: "error" */ '../views/error/needLogin.vue')
    }]
  }, {
    path: '*',
    redirect: '/error/404'
  }
]

export default new Router({
  routes
})
