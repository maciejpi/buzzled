<template>

  <header v-if="introHeader()" class="intro-header">
    <h1>Buzzled</h1>
  </header>

  <header v-else class="app-header">
    <router-link tag="h1"
                :to="{ name: 'intro' }"
                 class="app-title-link">Buzzled</router-link>

    <router-link v-if="isOnRandomCardPage()"
                :to="{ name: 'card' }">Show cards</router-link>
    <router-link v-else
                 :to="{ name: 'fullList' }">Show list</router-link>
  </header>

</template>

<script>
export default {
  methods: {
    introHeader () {
      return this.$route.name === 'intro'
    },
    isOnRandomCardPage () {
      return this.$route.name === 'fullList'
    }
  }
}
</script>
