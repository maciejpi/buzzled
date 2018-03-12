import Vue from 'vue'
import Vuex from 'vuex'

import appStatus from './modules/appStatus'
import fullList from './modules/fullList'
import card from './modules/card'
import filters from './modules/filters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appStatus,
    fullList,
    card,
    filters
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
