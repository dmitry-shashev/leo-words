import { readFileSync, writeFileSync, existsSync } from 'fs'
import path from 'path'
import { parseWords } from '@/scripts/extra/parse-words'
import { printParseResult } from '@/scripts/extra/not-accurate-alg'

const PROJECT_PATH = path.resolve('./')
const ADD_TO_BLOCK_LIST_PATH = `${PROJECT_PATH}/content/FOUND.json`

const fileSource: string | undefined = process.argv[2]
if (!fileSource) {
  throw new Error('The source was not specified')
}
if (!existsSync(fileSource)) {
  throw new Error('The source file was not found')
}

const text = readFileSync(fileSource!, 'utf-8')
const parsedWordsData = parseWords(text)

writeFileSync(ADD_TO_BLOCK_LIST_PATH, JSON.stringify(parsedWordsData, null, 2))

printParseResult(parsedWordsData)
