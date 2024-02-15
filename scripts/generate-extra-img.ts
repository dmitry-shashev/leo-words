import { Word } from '@/models/word'
import { WORDS_PATH } from '@/utils/constants'
import path from 'path'
import { parse } from 'node-html-parser'
import { saveWords } from '@/utils/saveWords'

const WORDS_PATH_FULL = `${path.resolve('./')}/${WORDS_PATH}`

async function findImg(search: string): Promise<string> {
  const str = await fetch(
    `https://www.freepik.com/search?format=search&query=${encodeURIComponent(search)}`
  ).then((v) => v.text())
  const root = parse(str)
  const img = root.querySelector('.js-detail-data-link img')
  return img?.getAttribute('src')?.split('?')?.[0] ?? ''
}

// main
;(async function (): Promise<void> {
  const words: Array<Word> = (await import(WORDS_PATH_FULL)).default

  // mutate found words in order to add images
  const wordsWithoutImg = words.filter(
    (v) => !v.picture || v.picture.endsWith('f714.png')
  )

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
