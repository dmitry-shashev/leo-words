import { Word } from '@/models/word'
import { WORDS_PATH } from '@/utils/constants'
import path from 'path'
import { saveWords } from '@/utils/saveWords'
import { isWordPictureInvalid } from '@/utils/isPictureValid'

interface FoundImgResult {
  items: Array<{
    preview?: {
      url?: string
    }
  }>
}

const WORDS_PATH_FULL = `${path.resolve('./')}/${WORDS_PATH}`

async function findImg(search: string): Promise<string> {
  const searchEnc = encodeURIComponent(search.replace('/', ' '))
  const url = `https://www.freepik.com/api/regular/search?locale=en&term=${searchEnc}`
  const data: FoundImgResult = await fetch(url).then((v) => v.json())
  return data?.items[0]?.preview?.url ?? ''
}

// main
;(async function (): Promise<void> {
  const words: Array<Word> = (await import(WORDS_PATH_FULL)).default

  // mutate found words in order to add images
  const wordsWithoutImg = words.filter(isWordPictureInvalid)

  for (let w of wordsWithoutImg) {
    try {
      await new Promise((r) => setTimeout(r, 1000))
      const img = await findImg(w.wordValue)
      // @ts-ignore
      w['picture'] = img

      saveWords(words)
      // eslint-disable-next-line no-console
      console.log(`Apply to  ${w.wordValue}[${w.id}] image: ${img}`)
    } catch (e) {
      // @#$
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
})()
