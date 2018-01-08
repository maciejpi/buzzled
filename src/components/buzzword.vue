<template>
  <div>

    <header>
      <h1>Buzzword</h1>
      <router-link :to="{ name: 'allBuzzwords' }">All buzzwords</router-link>
    </header>

    <main>

      <section>
        "{{ this.randomTerm.word }}" "{{ this.randomTerm.description }}":
      </section>

      <button @click="randomise">Another Buzzword</button>

    </main>

  </div>
</template>

<script>
export default {
  name: 'buzzword',
  props: { buzzwords: Array },
  data () {
    return {
      currentWord: null,
      randomIndex: undefined
    }
  },
  methods: {
    randomise () {
      this.randomIndex = Math.floor(Math.random() * this.buzzwords.length)
    }
  },
  computed: {
    randomTerm () {
      this.randomIndex = Math.floor(Math.random() * this.buzzwords.length)
      this.currentWord = Object.assign({}, this.buzzwords[this.randomIndex])
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
