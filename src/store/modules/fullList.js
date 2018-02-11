import { sortWords } from '@/utils/helpers'

export default {
  state: {},

  getters: {
    sortedWords (state, getters, rootState) {
      return sortWords(rootState.words)
    }
  },

  mutations: {},

  actions: {}
}
