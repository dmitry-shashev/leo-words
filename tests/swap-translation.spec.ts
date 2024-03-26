import { test } from '@playwright/test'
import { WordPage } from '@/tests/pages/WordPage'

test('swap translation', async ({ page }) => {
  await page.goto('/offsetlimit/10/3')
  const wordPage = new WordPage(page)

  await wordPage.verifyBaseWord('housekeeper')

  await wordPage.toggleLang()
  await wordPage.verifyBaseWord('домашняя хозяйка')

  await wordPage.check()
  await wordPage.no()
  await wordPage.verifyBaseWord('кроме того')

  await wordPage.check()
  await wordPage.ok()
  await wordPage.verifyBaseWord('свирепый')

  await wordPage.check()
  await wordPage.ok()
  await wordPage.verifyBaseWord('домашняя хозяйка')

  await wordPage.check()
  await wordPage.ok()
  await wordPage.verifyBaseWord('домашняя хозяйка')

  await wordPage.check()
  await wordPage.ok()
  await wordPage.verifyBaseWord('кроме того')

  await wordPage.toggleLang()
  await wordPage.verifyBaseWord('Furthermore')
})
