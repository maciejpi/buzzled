<template>
  <div>
    <h1>Buzzword</h1>
    <router-link :to="{ name: 'buzzword' }">Random</router-link>
    <input v-model="search"
           type="text">
    <ul v-if="findTerm.length">
      <li v-for="(term, index) in findTerm"
          :key="index">
        <span v-html="highlight(term.word)"></span> - {{ term.tag }}: {{ term.description }}</li>
    </ul>
    <p v-else>We don't have this word on our list.</p>
  </div>
</template>

<script>
export default {
  name: 'allBuzzwords',
  props: { buzzwords: Array },
  data () {
    return {
      search: '',
      minLength: 3
    }
  },
  methods: {
    highlight (word) {
      const regex = new RegExp(this.search, 'gi')
      return this.search.length >= this.minLength ? word.replace(regex, `<span class="highlight">${this.search}</span>`) : word
    }
  },
  computed: {
    findTerm () {
      return this.buzzwords.filter(term => {
        return this.search.length >= this.minLength ? term.word.toLowerCase().includes(this.search.toLowerCase()) : this.buzzwords
      })
    }
  }
}
</script>
