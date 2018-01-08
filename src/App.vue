<template>
  <div id="app">
    <router-view :buzzwords="buzzwords"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      buzzwords: []
    }
  },
  created () {
    fetch(
      'https://gist.githubusercontent.com/maciejpi/9911f34b1ed008ebc40059bcbda12d45/raw/f8a666f3d793dd2ee3881150f4b7482bbc8dbd96/buzzword.json'
    )
      .then(response => response.json())
      .then(data => {
        this.buzzwords = data
      })
  }
}
</script>

<style src="./assets/styles/main.scss" lang="scss"></style>
