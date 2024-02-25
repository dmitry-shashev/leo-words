import playwright from 'playwright'
import { parseWords } from '@/scripts/extra/parse-words'
import { writeFileSync } from 'fs'
import { printParseResult } from '@/scripts/extra/not-accurate-alg'
import path from 'path'

const PROJECT_PATH = path.resolve('./')
const ADD_TO_BLOCK_LIST_PATH = `${PROJECT_PATH}/content/FOUND.json`

const url: string | undefined = process.argv[2]
if (!url) {
  throw new Error('The source was not specified')
}

// main
;(async function (): Promise<void> {
  const browser = await playwright['chromium'].launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(url)
  await page.waitForTimeout(4000)

  let text = await page.innerText('body')

  const parsedWordsData = parseWords(text)
  writeFileSync(
    ADD_TO_BLOCK_LIST_PATH,
    JSON.stringify(parsedWordsData, null, 2)
  )
  printParseResult(parsedWordsData)

  await browser.close()
})()
