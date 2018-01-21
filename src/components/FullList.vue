<template>

  <main class="main full-list">
    <div class="nav-area">

      <ul class="tag-filters">
        <li v-for="filter in filterNames" :key="filter">
          <button @click="filterTag(filter)"
                  :class="[filter.toLowerCase(), { active: filterName === filter }]"
                  >{{ filter }}</button>
        </li>
      </ul>

      <div class="search-box-wrapper">
        <input v-model="search"
                type="search"
                ref="searchBox"
                placeholder="Find a word"
                class="search-box">
        <span @click="resetInput"
              class="search-icon"></span>
        <span @click="resetInput"
              v-show="this.search.length"
              class="clear-input-icon"></span>
      </div>
    </div>

    <ul v-if="filteredWords.length"
        class="keywords-list">
      <li v-for="(term, index) in filteredWords"
          :key="index">

        <h2 v-html="highlight(term.gsx$title.$t)"
            class="keyword">{{ term.tag }}</h2>
        <p class="keyword-desc">{{ term.gsx$description.$t }}</p>

        <ul class="tags-list small">
          <li v-for="(tag, index) in term.gsx$tags.$t.split(', ')"
              :key="index"
              :class="tagClass(tag)"
              class="tag-item small">{{tag}}</li>
        </ul>

      </li>
    </ul>

    <p v-else
       class="no-result">We don't have this word on our list.</p>

  </main>

</template>

<script>
import { tagsClass } from '../tagsClass'

export default {
  name: 'fullList',
  mixins: [tagsClass],
  props: { words: Array },
  data () {
    return {
      search: '',
      filterName: '',
      filterNames: ['All', 'Business', 'Tech', 'Buzzword']
    }
  },
  methods: {
    highlight (word) {
      const regex = new RegExp(this.search, 'gi')
      return this.search.length
        ? word.replace(regex, `<span class="highlight">${this.search}</span>`)
        : word
    },
    filterTag (name) {
      this.filterName = name
    },
    resetInput () {
      this.search = ''
      this.$refs.searchBox.focus()
    }
  },
  computed: {
    filteredWords () {
      return this.words.filter(term => {
        const searchInputFilter = this.search.length
          ? term.gsx$title.$t.toLowerCase().includes(this.search.toLowerCase())
          : this.words

        if (this.filterName && this.filterName !== 'All') {
          return term.gsx$tags.$t.split(', ').some(tag => {
            if (tag === this.filterName) {
              return searchInputFilter
            }
          })
        } else {
          this.filterName = 'All'
          return searchInputFilter
        }
      })
    }
  }
}
</script>
