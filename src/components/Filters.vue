<template>

  <ul class="tag-filters">
    <li>
      <button @click="resetTags"
              class="all"
              :class="{ active: filterName === '' }">All</button>
    </li>

    <li v-for="filter in filterNames"
        :key="filter">
      <button @click="filterByTag(filter)"
              :class="[filter.toLowerCase(), { active: filterName === filter }]">{{ filter }}</button>
    </li>
  </ul>

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'resetTags',
      'filterByTag'
    ])
  },

  computed: {
    ...mapState({
      filterName: state => state.filters.filterName
    }),
    ...mapGetters([
      'filterNames'
    ])
  }
}
</script>
