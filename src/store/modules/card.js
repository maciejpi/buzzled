import router from '@/router/index'
import { transformWord } from '@/utils/helpers'

export default {
  state: {
    currentIndex: undefined,
    lastIndex: undefined,
    currentWord: {}
  },

  getters: {
    urlWordIndex (state, getters, rootState) {
      return rootState.words.findIndex(
        word => transformWord(word.gsx$title.$t) === rootState.route.params.id
      )
    },
    defaultWordIndex (state, getters, rootState) {
      const defaultWord = 'Lean product development'
      return rootState.words.findIndex(
        word => word.gsx$title.$t === defaultWord
      )
    },
    wordIndex (state, getters) {
      return getters.urlWordIndex >= 0
        ? getters.urlWordIndex
        : getters.defaultWordIndex
    }
  },

  mutations: {
    randomiseIndex (state, wordsListLength) {
      state.currentIndex = Math.floor(Math.random() * wordsListLength)
    },
    updateIndex (state, index) {
      state.currentIndex = index
    },
    setCurrentWord (state, newWord) {
      state.currentWord = { ...newWord }
    },
    setLastIndex (state, index) {
      state.lastIndex = index
    }
  },

  actions: {
    findRandomTerm ({ state, getters, commit, rootState }) {
      if (state.currentIndex === undefined) {
        commit('updateIndex', getters.wordIndex)
        commit('setLastIndex', getters.wordIndex + 1)
      } else {
        commit('setLastIndex', state.currentIndex)
        while (state.currentIndex === state.lastIndex) {
          commit('randomiseIndex', rootState.words.length)
        }
      }
      commit('setCurrentWord', rootState.words[state.currentIndex])

      router.push({
        name: 'card',
        params: {
          id: transformWord(state.currentWord.gsx$title.$t)
        }
      })
    },
    navigateToWord ({ state, getters, commit, rootState }) {
      if (
        rootState.route.name === 'card' &&
        state.currentIndex !== getters.wordIndex
      ) {
        commit('updateIndex', getters.wordIndex)
        commit('setCurrentWord', rootState.words[state.currentIndex])
      }
    }
  }
}
