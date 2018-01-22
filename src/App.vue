<template>
  <div id="app"
       class="app-wrapper">

    <app-header></app-header>

    <div v-if="isLoading" class="is-loading">
      <img src="./assets/icons/loader.gif" alt="Loading icon">
    </div>

    <div v-else-if="error" class="app-error">Something went wrong. Please try refreshing the page.</div>

    <router-view v-else :words="words"></router-view>

    <app-footer></app-footer>

  </div>
</template>

<script>
import axios from 'axios'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  data () {
    return {
      words: [],
      isLoading: false,
      error: false
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
        this.words = response.data.feed.entry
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
