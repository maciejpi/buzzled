<template>

  <header class="app-header">
    <h1>Buzzled</h1>

    <router-link v-if="isOnRandomCardPage()"
                :to="{ name: 'card' }"
                 class="router-link">Show random words</router-link>
    <router-link v-else
                 :to="{ name: 'fullList' }"
                 class="router-link">Show list</router-link>
  </header>

</template>

<script>
export default {
  methods: {
    isOnRandomCardPage () {
      return this.$route.name === 'fullList'
    }
  }
}
</script>
