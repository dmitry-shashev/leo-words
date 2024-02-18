import { writeFileSync } from 'fs'
import path from 'path'
import { parseWords } from '@/scripts/extra/parse-words'
import { getSubtitles } from 'youtube-caption-extractor'

const PROJECT_PATH = path.resolve('./')
const ADD_TO_BLOCK_LIST_PATH = `${PROJECT_PATH}/scripts/extra/add-to-block-list.json`

const videoID: string | undefined = process.argv[2]
if (!videoID) {
  throw new Error('The source was not specified')
}

// main
;(async function (): Promise<void> {
  const subtitles = await getSubtitles({
    videoID,
    lang: 'en',
  })

  const text = subtitles.map((v) => v.text).join(' ')
  const newWords = parseWords(text)

  writeFileSync(ADD_TO_BLOCK_LIST_PATH, JSON.stringify(newWords, null, 2))

  // eslint-disable-next-line no-console
  console.log(`New words: ${newWords.length}`)
})()
