import { test, expect } from '@playwright/test'
import { WordPage } from '@/tests/pages/WordPage'

test('shuffle', async ({ page }) => {
  await page.goto('/offsetlimit/10/5')
  const wordPage = new WordPage(page)

  const baseWord: string | null = await wordPage.getCurrentWord()
  let currentWord = baseWord
  do {
    await wordPage.shuffle()
    currentWord = await wordPage.getCurrentWord()
  } while (baseWord === currentWord)

  expect(baseWord).not.toBe(currentWord)
})
