export const tagsClass = {
  methods: {
    tagClass (tag) {
      return {
        business: tag === 'Business',
        tech: tag === 'Tech',
        buzzword: tag === 'Buzzword'
      }
    }
  }
}
