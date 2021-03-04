import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import config from '@/config'
import Api from '@/apis'
import { loadLanguageAsync } from '@/locales'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConflux: false,
    user: '',
    menu: [],
    curLang: config.lang, //中zh-CN 英en-US
    clientWidth: document.documentElement.clientWidth,
    clientHeight: document.documentElement.clientHeight,
    globalLoading: false,
    globalLoadingTip: '',
    invitationAddress: '',
    web3: null,
    isWalletSelecting: false,
    LOOPToken: ''
  },
  mutations: {
    SET_USER: (state, address) => {
      state.user = address
    },
    SET_WALLET_SELECTING: (state, isWalletSelecting) => {
      state.isWalletSelecting = isWalletSelecting
    },
    SET_LANG: (state, lang) => {
      state.curLang = lang
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
    },
    SET_LOADING(state, option = {}) {
      state.globalLoading = option.isShow
      state.globalLoadingTip = option.tip
    },
    SET_SCREEN(state, screenObj) {
      state.clientWidth = screenObj.width
      state.clientHeight = screenObj.height
    },
    SAVE_INVITATION(state, address = '') {
      state.invitationAddress = address
    },
    SET_WEB3(state, web3) {
      state.web3 = web3
    },
    SET_LOOPTOKEN(state, token) {
      state.LOOPToken = token
    },
    SET_CONFLUX(state, bool) {
      state.isConflux = bool
    }
  },
  actions: {
    SaveInvitation({ commit }, address) {
      commit('SAVE_INVITATION', address)
      //router.push(`/trust?q=${address}`)
    },
    SetMenu({ commit }, routes) {
      const menu = []
      routes.map(item => {
        if (item.meta && item.meta.menu) {
          menu.push(item)
        }
      })
      commit('SET_MENU', menu)
    },
    //开启全局loading
    ShowLoading({ commit }, tip) {
      commit('SET_LOADING', {
        isShow: true,
        tip
      })
    },
    //关闭全局loading
    HideLoading({ commit }) {
      commit('SET_LOADING', {
        isShow: false
      })
    },
    // 登录
    Login({ commit }, params) {
      const redirect =
        router.currentRoute.query.redirect || router.currentRoute.path
      console.log('登录')
      return Api.login(params).then(({ account }) => {
        if (account) {
          commit('SET_USER', account)
          if (router.currentRoute.name === 'needLogin') {
            router.push(redirect)
          }
        }
      })
    },
    // 登出
    Logout({ commit, state }) {
      this.dispatch('ShowLoading')
      return Api.logout().finally(() => {
        commit('SET_USER', '')
        commit('SET_WEB3', null)
        console.log(
          '登出',
          router.currentRoute,
          ['/mining', '/trust'].includes(router.currentRoute.path)
        )
        this.dispatch('HideLoading')
        if (['/mining', '/trust'].includes(router.currentRoute.path)) {
          router.push({
            path: '/error/needLogin',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
        }
      })
    },
    SetScreen({ commit }, screenObj) {
      commit('SET_SCREEN', screenObj)
    },
    SetLang({ commit }, lang) {
      return new Promise((resolve, reject) => {
        commit('SET_LANG', lang)
        loadLanguageAsync(lang)
      })
    },
    SetWeb3({ commit }, web3) {
      return new Promise((resolve, reject) => {
        commit('SET_WEB3', web3)
      })
    },
    SetUser({ commit }, account) {
      return new Promise((resolve, reject) => {
        commit('SET_USER', account)
      })
    },
    SetWalletSelecting({ commit }, isSelecting) {
      return new Promise((resolve, reject) => {
        commit('SET_WALLET_SELECTING', isSelecting)
      })
    },
    SetLOOPToken({ commit }, token) {
      commit('SET_LOOPTOKEN', token)
    },
    SetConflux({ commit }, bool) {
      commit('SET_CONFLUX', bool)
    }
  }
})
