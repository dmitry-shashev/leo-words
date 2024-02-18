import { writeFileSync } from 'fs'
import path from 'path'
import { parseWords } from '@/scripts/extra/parse-words'
import { getSubtitles } from 'youtube-caption-extractor'
import { printParseResult } from '@/scripts/extra/not-accurate-alg'

const PROJECT_PATH = path.resolve('./')
const ADD_TO_BLOCK_LIST_PATH = `${PROJECT_PATH}/scripts/extra/FOUND.json`

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
  const parsedWordsData = parseWords(text)

  writeFileSync(
    ADD_TO_BLOCK_LIST_PATH,
    JSON.stringify(parsedWordsData, null, 2)
  )

  printParseResult(parsedWordsData)
})()
