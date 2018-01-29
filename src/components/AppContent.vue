<template>
  <div class="app-main-wrapper">

    <div v-if="isLoading" class="is-loading">
      <img src="../assets/icons/loader.gif" alt="Loading">
    </div>

    <div v-else-if="error" class="app-error">
      <p>Something went wrong. Please try refreshing the page.</p>
    </div>

    <keep-alive v-else>
      <router-view :words="words" :tagsSplitPattern="tagsSplitPattern"></router-view>
    </keep-alive>

  </div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue'

export default {
  components: {
    'app-header': Header
  },
  data () {
    return {
      words: [],
      isLoading: false,
      error: false,
      tagsSplitPattern: /\s+|[,|;|.]\s*/,
      intro: true
    }
  },
  methods: {
    sortWords (words) {
      return words.sort((a, b) => {
        const wordA = a.gsx$title.$t.toLowerCase()
        const wordB = b.gsx$title.$t.toLowerCase()
        return wordA < wordB ? -1 : wordA > wordB ? 1 : 0
      })
    }
  },
  created () {
    this.isLoading = true
    axios
      .get(
        'https://spreadsheets.google.com/feeds/list/1mmaTvgPLN-0mWdyjGea4Z29TwKqHK___OwyZHyHBoW0/od6/public/values?alt=json'
      )
      .then(
        response => {
          this.isLoading = false
          this.words = this.sortWords(response.data.feed.entry)
        },
        error => {
          this.isLoading = false
          this.error = true
          console.error(error)
        }
      )
  }
}
</script>
