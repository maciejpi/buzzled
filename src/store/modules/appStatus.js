import axios from 'axios'

export default {
  state: {},

  getters: {},

  mutations: {},

  actions: {
    fetchWords ({ commit }) {
      const words =
        'https://spreadsheets.google.com/feeds/list/1mmaTvgPLN-0mWdyjGea4Z29TwKqHK___OwyZHyHBoW0/od6/public/values?alt=json'

      return new Promise((resolve, reject) => {
        axios
          .get(words)
          .then(response => {
            commit('setWords', response.data.feed.entry)
            resolve()
          })
          .catch(() => {
            reject(new Error('Failed fetching api'))
          })
      })
    }
  }
}
