import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import storage from 'store'
import Antd from 'ant-design-vue'
import i18n from './locales'
import config from '@/config'
//全局样式
import 'assets/css/global.less'
//全局公用组件
import 'components/utils'
// import 'assets/js/web3'
//全局公用filter
import './filters'

Vue.use(Antd)
Vue.config.productionTip = false
const lang = storage.get('lang') || config.lang

function checkRouter() {
  router.beforeEach((to, from, next) => {
    const isLogin = store.state.user
    const redirect = to.fullPath
    const loginRoutes = ['/mining', '/trust', '/homePage', '/wallet', '/swap']
    if (!isLogin && loginRoutes.includes(to.path)) {
      next({
        path: '/error/needLogin',
        query: {
          redirect
        }
      })
      return
    }

    if (isLogin && to.path === '/error/needLogin') {
      to.query.redirect ? next(to.query.redirect) : next()
      return
    }

    next()
  })
}

function initVue() {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
}
async function startApp() {
  await store.dispatch('Login')
  store.dispatch('SetLang', lang)
  store.dispatch('SetMenu', router.options.routes)
  checkRouter()
  initVue()
}
startApp()
