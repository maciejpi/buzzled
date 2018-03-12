<template>

  <main class="main full-list">
    <div class="nav-area">

      <filters></filters>

      <div class="search-box-wrapper">
        <input v-model="search"
               type="search"
               ref="searchBox"
               placeholder="Find a word"
               class="search-box">

        <span @click="enterInput"
              class="search-icon"></span>

        <span v-show="this.search.length"
              @click="resetInput"
              class="clear-input-icon"></span>
      </div>
    </div>

    <ul v-if="filteredWords.length"
        class="keywords-list">
      <li v-for="(term, index) in filteredWords"
          :key="index">

        <h2 v-html="highlight(term.gsx$title.$t)"
            class="keyword"></h2>
        <p class="keyword-desc">{{ term.gsx$description.$t }}</p>

        <ul class="tags-list small">
          <li v-for="(tag, index) in term.gsx$tags.$t.split(tagsSplitPattern)"
              :key="index"
              :class="tagClass(tag)"
              class="tag-item small">{{tag}}</li>
        </ul>

      </li>
    </ul>

    <div v-else
         class="no-result">
      <p class="emoticon">O.o</p>
      <p>We don’t have this word in our list. But to compensate here’s a winning buzzword:
        <br>"to leverage", which in most cases can be simply replaced by "to use".</p>
      <p>
        <button @click="resetInput"
                class="link">Back to full list</button>
      </p>
    </div>

  </main>

</template>

<script>
import { tagsClass } from '@/utils/mixins'
import { mapState, mapGetters, mapActions } from 'vuex'
import Filters from './Filters.vue'

export default {
  name: 'fullList',

  components: {
    'filters': Filters
  },

  mixins: [tagsClass],

  data () {
    return {
      search: ''
    }
  },

  methods: {
    ...mapActions([
      'resetTags'
    ]),
    highlight (word) {
      const regex = new RegExp(this.search, 'gi')
      return this.search.length
        ? word.replace(regex, str => `<span class="highlight">${str}</span>`)
        : word
    },
    resetInput () {
      this.search = ''
      this.enterInput()
      this.resetTags()
    },
    enterInput () {
      this.$refs.searchBox.focus()
    }
  },

  computed: {
    ...mapState({
      tagsSplitPattern: state => state.tagsSplitPattern,
      filterName: state => state.filters.filterName
    }),
    ...mapGetters({
      words: 'sortedWords'
    }),

    filteredWords () {
      return this.words.filter(term => {
        const searchInputFilter = this.search.length
          ? term.gsx$title.$t.toLowerCase().includes(this.search.toLowerCase())
          : this.words

        if (this.filterName) {
          return term.gsx$tags.$t
            .split(this.tagsSplitPattern)
            .some(tag => {
              if (tag === this.filterName) {
                return searchInputFilter
              }
            })
        } else {
          return searchInputFilter
        }
      })
    }
  }
}
</script>
