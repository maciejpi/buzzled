export default {
  state: {
    filterName: ''
  },

  getters: {
    filterNames (state, getters, rootState) {
      const filters = rootState.words.map(word => word.gsx$tags.$t).join(', ')
      return [...new Set(filters.split(', '))]
    },
    activateFilter (state, getters) {
      return filter =>
        getters.filterNames.filter(name => name === filter).join('')
    }
  },

  mutations: {
    filterByTag (state, filter) {
      state.filterName = filter
    }
  },

  actions: {
    resetTags ({ commit, getters }) {
      commit('filterByTag', '')
    },
    filterByTag ({ getters, commit }, tag) {
      commit('filterByTag', getters.activateFilter(tag))
    }
  }
}
