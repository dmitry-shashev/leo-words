import { writeFileSync } from 'fs'
import path from 'path'
import { parseWords } from '@/scripts/extra/parse-words'
import { printParseResult } from '@/scripts/extra/not-accurate-alg'
import { Innertube } from 'youtubei.js'

const PROJECT_PATH = path.resolve('./')
const ADD_TO_BLOCK_LIST_PATH = `${PROJECT_PATH}/content/FOUND.json`

const videoID: string | undefined = process.argv[2]
if (!videoID) {
  throw new Error('The source was not specified')
}

// main
;(async function (): Promise<void> {
  const yt = await Innertube.create()
  const info = await yt.getInfo(videoID)

  const transcriptResult = await info.getTranscript()
  const textFragments =
    transcriptResult.transcript.content?.body?.initial_segments.map(
      (v) => v.snippet.text
    ) ?? []
  const text = textFragments.join(' ')

  const parsedWordsData = parseWords(text)

  writeFileSync(
    ADD_TO_BLOCK_LIST_PATH,
    JSON.stringify(parsedWordsData, null, 2)
  )

  printParseResult(parsedWordsData)
})()
