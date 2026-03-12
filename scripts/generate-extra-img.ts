import { Word } from '@/models/word'
import { WORDS_PATH } from '@/utils/constants'
import path from 'path'
import { saveWords } from '@/utils/saveWords'
import { isWordPictureInvalid } from '@/utils/isPictureValid'

interface FoundImgResult {
  hits: Array<{
    webformatURL?: string
  }>
}

const PIXABAY_API_KEY = '54995697-62f0aec723f7e6fb10edf4b51'
const WORDS_PATH_FULL = `${path.resolve('./')}/${WORDS_PATH}`

async function findImg(search: string): Promise<string> {
  const searchEnc = encodeURIComponent(search.replace('/', ' '))
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${searchEnc}&image_type=photo&per_page=3`
  const data: FoundImgResult = await fetch(url).then((v) => v.json())
  return data?.hits[0]?.webformatURL ?? ''
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
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }
})()
