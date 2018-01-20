<template>
  <div id="app"
       class="app-wrapper">

    <app-header></app-header>

    <router-view :words="words"></router-view>

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
      words: []
    }
  },
  created () {
    axios
      .get(
        'https://spreadsheets.google.com/feeds/list/1mmaTvgPLN-0mWdyjGea4Z29TwKqHK___OwyZHyHBoW0/od6/public/values?alt=json'
      )
      .then(response => {
        this.words = response.data.feed.entry
      })
  }
}
</script>
