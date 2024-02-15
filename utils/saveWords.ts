import fs from 'fs'
import { Word } from '@/models/word'
import { WORDS_PATH } from '@/utils/constants'

export function saveWords(words: ReadonlyArray<Word>): void {
  fs.writeFileSync(WORDS_PATH, JSON.stringify(words))
}
