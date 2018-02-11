<template>
  <div class="app-main-wrapper">

    <div v-if="isLoading"
         class="is-loading">
      <img src="../assets/icons/loader.gif"
           width="64"
           height="64"
           alt="Loading">
    </div>

    <div v-else-if="error"
         class="app-error">
      <p>Something went wrong. Please try refreshing the page.</p>
    </div>

    <keep-alive v-else>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'appContent',

  data () {
    return {
      isLoading: false,
      error: false
    }
  },

  methods: {
    ...mapActions({
      fetchWords: 'fetchWords'
    })
  },

  created () {
    this.isLoading = true
    this.fetchWords()
    .then(() => {
      this.isLoading = false
    })
    .catch((error) => {
      this.isLoading = false
      this.error = true
      console.error(error)
    })
  }
}
</script>
