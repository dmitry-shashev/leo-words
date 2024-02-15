import { login } from '@/utils/login'
import { getWords } from '@/utils/getWords'
import { Word } from '@/models/word'
import { saveWords } from '@/utils/saveWords'
import path from 'path'
import 'dotenv/config'
import { WORDS_PATH } from '@/utils/constants'

const ACCOUNT_EMAIL = process.env.ACCOUNT_EMAIL ?? ''
const ACCOUNT_PASSWORD = process.env.ACCOUNT_PASSWORD ?? ''

const WORDS_PATH_FULL = `${path.resolve('./')}/${WORDS_PATH}`

// main
;(async function (): Promise<void> {
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

  const oldWords: Array<Word> = (await import(WORDS_PATH_FULL)).default

  // try to apply images from old words
  const wordsWithoutImg = result.filter(
    (v) => !v.picture || v.picture.endsWith('f714.png')
  )
  for (let w of wordsWithoutImg) {
    const oldImg = oldWords.find((v) => v.id === w.id)?.picture ?? ''
    if (oldImg && !oldImg.endsWith('f714.png')) {
      // @ts-ignore
      w['picture'] = oldImg
      // eslint-disable-next-line no-console
      console.log(`Apply to ${w.wordValue}[${w.id}] image: ${oldImg}`)
    }
  }
  saveWords(result)
})()
