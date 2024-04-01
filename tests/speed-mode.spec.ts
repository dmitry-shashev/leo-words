import { test } from '@playwright/test'
import { WordPage } from '@/tests/pages/WordPage'

test('speed mode', async ({ page }) => {
  await page.goto('/offsetlimit/10/5')
  const wordPage = new WordPage(page)

  await wordPage.verifyBaseWord('housekeeper')
  await wordPage.toggleSpeed()

  await wordPage.verifyBaseWord('housekeeper')

  await wordPage.check()
  await wordPage.ok()

  await wordPage.verifyBaseWord('Furthermore')
  await wordPage.no()

  await wordPage.verifyBaseWord('ferocious')
  await wordPage.no()

  await wordPage.verifyBaseWord('extensive')
  await wordPage.ok()

  await wordPage.verifyBaseWord('contempt')
  await wordPage.ok()

  await wordPage.verifyCurrentPosition(5, 2, 5)

  await wordPage.verifyBaseWord('Furthermore')
  await wordPage.check()
  await wordPage.ok()

  await wordPage.verifyBaseWord('ferocious')
  await wordPage.check()
  await wordPage.ok()

  await wordPage.verifyBaseWord('housekeeper')
  await wordPage.verifyCurrentPosition(0, 0, 5)
})
