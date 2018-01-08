<template>
  <div id="app">
    <router-view :buzzwords="buzzwords"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import axios from 'axios'
import footer from './components/footer.vue'

export default {
  name: 'app',
  components: {
    'app-footer': footer
  },
  data () {
    return {
      buzzwords: []
    }
  },
  created () {
    axios.get(
      'https://gist.githubusercontent.com/maciejpi/9911f34b1ed008ebc40059bcbda12d45/raw/f8a666f3d793dd2ee3881150f4b7482bbc8dbd96/buzzword.json'
    )
    .then(response => {
      this.buzzwords = response.data
    })
  }
}
</script>

<style src="./assets/styles/main.scss" lang="scss"></style>
