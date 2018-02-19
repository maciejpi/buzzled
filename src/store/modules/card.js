import router from '@/router/index'
import { transformWord } from '@/utils/helpers'

export default {
  state: {
    currentIndex: undefined,
    lastIndex: undefined,
    currentWord: {},
    wordsInMemory: 0
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
        : state.lastIndex === undefined
          ? getters.defaultWordIndex
          : state.currentIndex
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
    },
    addWordToMemory (state) {
      state.wordsInMemory++
    },
    removeWordFromMemory (state) {
      state.wordsInMemory--
    },
    resetMemory (state) {
      state.wordsInMemory = 1
    }
  },

  actions: {
    findRandomTerm ({ state, getters, commit, rootState }) {
      if (state.currentIndex === undefined) {
        commit('updateIndex', getters.wordIndex)
      } else {
        commit('setLastIndex', state.currentIndex)
        while (state.currentIndex === state.lastIndex) {
          commit('randomiseIndex', rootState.words.length)
        }
      }
      commit('setCurrentWord', rootState.words[state.currentIndex])
      commit('addWordToMemory')

      router.push({
        name: 'card',
        params: {
          id: transformWord(state.currentWord.gsx$title.$t)
        }
      })
    },
    removeWordFromMemory ({ commit }) {
      commit('removeWordFromMemory')
    },
    resetMemory ({ commit }) {
      commit('resetMemory')
    },
    updateWord ({ state, getters, commit, rootState }) {
      if (state.currentIndex !== getters.wordIndex) {
        commit('updateIndex', getters.wordIndex)
        commit('setCurrentWord', rootState.words[state.currentIndex])
      }
    }
  }
}
