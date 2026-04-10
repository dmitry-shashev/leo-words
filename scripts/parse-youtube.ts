import { writeFileSync } from 'fs'
import path from 'path'
import { parseWords } from '@/scripts/extra/parse-words'
import { printParseResult } from '@/scripts/extra/not-accurate-alg'
import { fetchYoutubeTranscript } from '@/utils/fetchYoutubeTranscript'

const PROJECT_PATH = path.resolve('./')
const ADD_TO_BLOCK_LIST_PATH = `${PROJECT_PATH}/content/FOUND.json`

const videoID: string | undefined = process.argv[2]
if (!videoID) {
  throw new Error('The source was not specified')
}

// main
;(async function (): Promise<void> {
  const transcriptItems = await fetchYoutubeTranscript(videoID)
  const textFragments = transcriptItems.map((item) => item.text.trim())
  if (textFragments.length === 0) {
    throw new Error(`No transcript was found for video ${videoID}`)
  }
  const text = textFragments.join(' ')

  const parsedWordsData = parseWords(text)

  writeFileSync(
    ADD_TO_BLOCK_LIST_PATH,
    JSON.stringify(parsedWordsData, null, 2)
  )

  printParseResult(parsedWordsData)
})()
