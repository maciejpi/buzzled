import Vue from 'vue'
import Vuex from 'vuex'

import appStatus from './modules/appStatus'
import fullList from './modules/fullList'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appStatus,
    fullList
  },

  state: {
    words: [],
    tagsSplitPattern: /\s+|[,|;|.]\s*/
  },

  getters: {},

  mutations: {
    setWords (state, words) {
      state.words = words
    }
  },

  actions: {}
})
