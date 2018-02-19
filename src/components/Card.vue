<template>

  <main class="main card">

    <section class="term-wrapper">
      <div>
        <h2 class="keyword">{{ currentWord.gsx$title.$t }} </h2>
        <p class="keyword-desc">{{ currentWord.gsx$description.$t }}</p>
      </div>

      <ul class="tags-list">
        <li v-for="(tag, index) in currentWord.gsx$tags.$t.split(tagsSplitPattern)"
            :key="index"
            :class="tagClass(tag)"
            class="tag-item">{{ tag }}
        </li>
      </ul>
    </section>

    <div class="buttons-wrapper">
      <button @click="goBack"
              class="action-btn back"
              :class="{ hidden: this.wordsInMemory <= 1 }"></button>
      <button @click="findRandomTerm"
              class="action-btn cta">Buzzle me again</button>
    </div>

  </main>

</template>

<script>
import { tagsClass } from '@/utils/mixins'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'card',

  mixins: [tagsClass],

  methods: {
    ...mapActions({
      findRandomTerm: 'findRandomTerm',
      updateWord: 'updateWord',
      removeWordFromMemory: 'removeWordFromMemory',
      resetMemory: 'resetMemory'
    }),
    goBack () {
      this.$router.go(-1)
      this.removeWordFromMemory()
    }
  },

  computed: {
    ...mapState({
      tagsSplitPattern: state => state.tagsSplitPattern,
      currentWord: state => state.card.currentWord,
      wordsInMemory: state => state.card.wordsInMemory
    })
  },

  watch: {
    $route (to, from) {
      from.name === 'card' ? this.updateWord() : this.resetMemory()
    }
  },

  created () {
    this.findRandomTerm()
  }
}
</script>
