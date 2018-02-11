<template>

  <main class="main card">

    <section class="term-wrapper">
      <div>
        <h2 class="keyword">{{ this.randomTerm.gsx$title.$t }} </h2>
        <p class="keyword-desc">{{ this.randomTerm.gsx$description.$t }}</p>
      </div>

      <ul class="tags-list">
        <li v-for="(tag, index) in this.randomTerm.gsx$tags.$t.split(this.tagsSplitPattern)"
            :key="index"
            :class="tagClass(tag)"
            class="tag-item">{{ tag }}
        </li>
      </ul>
    </section>

    <button @click="randomise"
            class="cta">Buzzle me again</button>

  </main>

</template>

<script>
import { tagsClass } from '@/utils/mixins'
import { mapState } from 'vuex'

export default {
  name: 'card',

  mixins: [tagsClass],

  data () {
    return {
      currentWord: {},
      initialWord: 'Lean product development',
      randomIndex: undefined
    }
  },
  methods: {
    randomise () {
      this.randomIndex = Math.floor(Math.random() * this.words.length)
    }
  },

  computed: {
    ...mapState({
      tagsSplitPattern: state => state.tagsSplitPattern,
      words: state => state.words
    }),
    randomTerm () {
      this.randomIndex === undefined
        ? (this.randomIndex = this.initialWordIndex)
        : this.randomise()

      this.currentWord = {...this.words[this.randomIndex]}
      return this.currentWord
    },
    initialWordIndex () {
      return this.words.findIndex(
        word => word.gsx$title.$t === this.initialWord
      )
    }
  }
}
</script>
