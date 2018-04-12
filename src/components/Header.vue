<template>

  <header v-if="introHeader()"
          class="intro-header">
    <h1>Buzzled</h1>
  </header>

  <header v-else
          class="app-header">
    <router-link tag="h1"
                 :to="{ name: 'intro' }"
                 class="app-title-link">Buzzled</router-link>

    <router-link v-if="isOnRandomCardPage()"
                 :to="{ name: 'card', params: { id: currentWordRoute } }">Show cards</router-link>
    <router-link v-else
                 :to="{ name: 'fullList' }">Show list</router-link>
  </header>

</template>

<script>
import { mapState } from 'vuex'
import { transformWord } from '@/utils/helpers'

export default {
  name: 'appHeader',

  methods: {
    introHeader () {
      return this.$route.name === 'intro'
    },
    isOnRandomCardPage () {
      return this.$route.name === 'fullList'
    }
  },

  computed: {
    ...mapState({
      currentWord: state => state.card.currentWord
    }),
    currentWordRoute () {
      return (
        this.currentWord.gsx$title &&
        transformWord(this.currentWord.gsx$title.$t)
      )
    }
  }
}
</script>
