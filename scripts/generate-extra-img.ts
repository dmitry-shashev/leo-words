import { Word } from '@/models/word'
import { WORDS_PATH } from '@/utils/constants'
import path from 'path'
import { saveWords } from '@/utils/saveWords'
import { isWordPictureInvalid } from '@/utils/isPictureValid'

interface PexelsResult {
  photos: Array<{
    src?: {
      medium?: string
    }
  }>
}

const PEXELS_API_KEY =
  '0q1ptLP4xJpoSYHMnUHyReuWe8FaHp1p6Hd5cwQtSEkN5IdW7SShRk3V'
const WORDS_PATH_FULL = `${path.resolve('./')}/${WORDS_PATH}`

async function findImg(search: string): Promise<string> {
  const searchEnc = encodeURIComponent(search.replace('/', ' '))
  const url = `https://api.pexels.com/v1/search?query=${searchEnc}&per_page=3`
  const data: PexelsResult = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY },
  }).then((v) => v.json())
  return data?.photos[0]?.src?.medium ?? ''
}

// main
const words: Array<Word> = (await import(WORDS_PATH_FULL)).default
const wordsWithoutImg = words.filter(isWordPictureInvalid)

for (const w of wordsWithoutImg) {
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
