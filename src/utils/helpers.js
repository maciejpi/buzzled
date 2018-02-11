export const sortWords = words => {
  return words.sort((a, b) => {
    const wordA = a.gsx$title.$t.toLowerCase()
    const wordB = b.gsx$title.$t.toLowerCase()
    return wordA < wordB ? -1 : wordA > wordB ? 1 : 0
  })
}
