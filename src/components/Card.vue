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

    <button @click="findRandomTerm"
            class="cta">Buzzle me again</button>

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
      navigateToWord: 'navigateToWord'
    })
  },

  computed: {
    ...mapState({
      tagsSplitPattern: state => state.tagsSplitPattern,
      currentWord: state => state.card.currentWord
    })
  },

  watch: {
    $route (to, from) {
      this.navigateToWord()
    }
  },

  created () {
    this.findRandomTerm()
  }
}
</script>
