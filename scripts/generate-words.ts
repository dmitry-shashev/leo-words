import { login } from '@/utils/login'
import { getWords } from '@/utils/getWords'
import { Word } from '@/models/word'
import { saveWords } from '@/utils/saveWords'
import path from 'path'
import 'dotenv/config'
import { WORDS_PATH } from '@/utils/constants'
import {
  isWordPictureInvalid,
  isWordPictureValid,
} from '@/utils/isPictureValid'

const ACCOUNT_EMAIL = process.env.ACCOUNT_EMAIL ?? ''
const ACCOUNT_PASSWORD = process.env.ACCOUNT_PASSWORD ?? ''

if (!ACCOUNT_EMAIL || !ACCOUNT_PASSWORD) {
  throw new Error('Leo account data was not found')
}

const WORDS_PATH_FULL = `${path.resolve('./')}/${WORDS_PATH}`

// main
;(async function (): Promise<void> {
  const oldWords: Array<Word> = (await import(WORDS_PATH_FULL)).default

  const accessToken = await login(ACCOUNT_EMAIL, ACCOUNT_PASSWORD)

  // get all words
  const result: Array<Word> = []
  let lastWordInSet: number | null = null
  do {
    const words = await getWords(accessToken, lastWordInSet)
    result.push(...words)

    // eslint-disable-next-line no-console
    console.log(
      `Total: ${result.length}, found arr length: ${words.length}, last id: ${lastWordInSet}`
    )

    lastWordInSet = words.at(-1)?.id ?? null
  } while (lastWordInSet)

  // try to apply images from old words
  const wordsWithoutImg = result.filter(isWordPictureInvalid)
  const oldWordsCorrectPictures = oldWords.filter(isWordPictureValid)

  for (let w of wordsWithoutImg) {
    // @ts-ignore
    w['picture'] =
      oldWordsCorrectPictures.find((old) => old.id === w.id)?.picture ?? ''
  }

  saveWords(result)
})()
