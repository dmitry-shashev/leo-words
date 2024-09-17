import { Word } from '@/models/word'

export function getLastWords(words: ReadonlyArray<Word>): Array<Word> {
  const wordsSorted = [...words].sort((a, b) => b.created - a.created)

  if (wordsSorted.length < 2) {
    return wordsSorted
  }

  const baseAdded = wordsSorted[0]?.added
  if (!baseAdded) {
    return wordsSorted
  }

  return wordsSorted.filter((v) => v.added === baseAdded)
}
