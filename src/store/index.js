import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openedTab: [],
    activatedTab: {},
    navMenu: []
  },
  mutations: {
    openTab (state, payload) {
      if (payload.option === 'add') {
        state.openedTab.push(payload.openedTab)
      } else {
        state.openedTab.map((v, i) => {
          if (v.name === payload.name) {
            state.openedTab.splice(i, 1)
          }
        })
      }
    },
    activeTab (state, payload) {
      state.activatedTab = payload.activatedTab
    },
    navMenu (state, payload) {
      state.navMenu = payload.navMenu
    }
  },
  actions: {
  },
  modules: {
  }
})
