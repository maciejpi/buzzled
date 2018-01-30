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

    <div v-else class="no-result">
      <p>Apologies, we haven’t found an outcome for your query.</p>
      <p class="emoticon">O.o</p>
      <p>OK, without using fancy words: Sorry, we don’t have this word in our list. But to compensate here’s a winning buzzword: "to leverage", which in most cases can be simply replaced by "to use".</p>
      <p>
        <button @click="resetInput"
                class="link">Back to full list</button>
      </p>
    </div>

  </main>

</template>

<script>
import { tagsClass } from '../helpers/mixins'

export default {
  name: 'fullList',
  mixins: [tagsClass],
  props: ['words', 'tagsSplitPattern'],
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
        ? word.replace(regex, str => `<span class="highlight">${str}</span>`)
        : word
    },
    filterTag (name) {
      this.filterName = name
    },
    resetInput () {
      this.search = ''
      this.enterInput()
    },
    enterInput () {
      this.$refs.searchBox.focus()
    }
  },
  computed: {
    filteredWords () {
      return this.words.filter(term => {
        const searchInputFilter = this.search.length
          ? term.gsx$title.$t.toLowerCase().includes(this.search.toLowerCase())
          : this.words

        if (this.filterName && this.filterName !== this.filterNames[0]) {
          return term.gsx$tags.$t.split(this.tagsSplitPattern).some(tag => {
            if (tag === this.filterName) {
              return searchInputFilter
            }
          })
        } else {
          this.filterName = this.filterNames[0]
          return searchInputFilter
        }
      })
    }
  }
}
</script>
