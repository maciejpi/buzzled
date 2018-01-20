<template>

  <main class="main card">

    <section v-if="this.randomTerm.gsx$title"
             class="term-wrapper">

      <div>
        <h2 class="keyword">{{ this.randomTerm.gsx$title.$t }} </h2>
        <p class="keyword-desc">{{ this.randomTerm.gsx$description.$t }}</p>
      </div>

      <ul class="tags-list">
        <li v-for="(tag, index) in this.randomTerm.gsx$tags.$t.split(', ')"
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
import { tagsClass } from '../tagsClass'
export default {
  name: 'card',
  props: { words: Array },
  mixins: [tagsClass],
  data () {
    return {
      currentWord: {},
      randomIndex: undefined
    }
  },
  methods: {
    randomise () {
      this.randomIndex = Math.floor(Math.random() * this.words.length)
    }
  },
  computed: {
    randomTerm () {
      this.randomise()
      this.currentWord = Object.assign({}, this.words[this.randomIndex])
      return this.currentWord
    }
  },
  watch: {
    randomTerm () {
      return this.currentWord
    }
  }
}
</script>
