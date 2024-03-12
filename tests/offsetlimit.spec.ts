import { test } from '@playwright/test'
import { WordPage } from '@/tests/pages/WordPage'

test('base navigation', async ({ page }) => {
  await page.goto('/offsetlimit/10/5')
  const wordPage = new WordPage(page)

  await wordPage.verifyIsCheck()
  await wordPage.verifyCurrentPosition(0, 0, 5)
  await wordPage.verifyBaseWord('housekeeper')

  await wordPage.check()
  await wordPage.verifyTranslatedWord('домашняя хозяйка')
  await wordPage.ok()

  await wordPage.verifyIsCheck()
  await wordPage.verifyCurrentPosition(1, 0, 5)
  await wordPage.verifyBaseWord('Furthermore')

  await wordPage.check()
  await wordPage.verifyTranslatedWord('кроме того')
  await wordPage.no()

  await wordPage.verifyCurrentPosition(2, 1, 5)
  await wordPage.verifyBaseWord('ferocious')

  await wordPage.back()
  await wordPage.verifyCurrentPosition(1, 0, 5)
  await wordPage.verifyBaseWord('Furthermore')
  await wordPage.check()
  await wordPage.ok()
  await wordPage.verifyCurrentPosition(2, 0, 5)
  await wordPage.verifyBaseWord('ferocious')

  await wordPage.check()
  await wordPage.verifyTranslatedWord('свирепый')
  await wordPage.no()

  await wordPage.verifyCurrentPosition(3, 1, 5)
  await wordPage.verifyBaseWord('extensive')

  await wordPage.check()
  await wordPage.verifyTranslatedWord('обширный')
  await wordPage.no()

  await wordPage.verifyCurrentPosition(4, 2, 5)
  await wordPage.verifyBaseWord('contempt')

  await wordPage.check()
  await wordPage.verifyTranslatedWord('презрение')
  await wordPage.no()

  // final check mode
  await wordPage.verifyCurrentPosition(5, 3, 5)
  await wordPage.verifyBaseWord('ferocious')

  await wordPage.check()
  await wordPage.no()

  await wordPage.verifyCurrentPosition(5, 3, 5)
  await wordPage.verifyBaseWord('extensive')

  await wordPage.check()
  await wordPage.ok()

  await wordPage.verifyCurrentPosition(5, 2, 5)
  await wordPage.verifyBaseWord('contempt')

  await wordPage.check()
  await wordPage.ok()

  await wordPage.verifyCurrentPosition(5, 1, 5)
  await wordPage.verifyBaseWord('ferocious')

  await wordPage.check()
  await wordPage.ok()

  await wordPage.verifyCurrentPosition(0, 0, 5)
  await wordPage.verifyBaseWord('housekeeper')
})

test('go by wrong words', async ({ page }) => {
  await page.goto('/offsetlimit/10/5')
  const wordPage = new WordPage(page)

  await wordPage.check()
  await wordPage.no()

  await wordPage.check()
  await wordPage.ok()

  await wordPage.check()
  await wordPage.no()

  await wordPage.check()
  await wordPage.no()

  await wordPage.verifyBaseWord('contempt')
  await wordPage.toggleMode()
  await wordPage.verifyCurrentPosition(4, 3, 5)
  await wordPage.verifyBaseWord('housekeeper')

  await wordPage.check()
  await wordPage.ok()
  await wordPage.verifyCurrentPosition(4, 2, 5)
  await wordPage.verifyBaseWord('ferocious')

  await wordPage.check()
  await wordPage.no()
  await wordPage.verifyCurrentPosition(4, 2, 5)
  await wordPage.verifyBaseWord('extensive')

  await wordPage.check()
  await wordPage.ok()
  await wordPage.verifyCurrentPosition(4, 1, 5)
  await wordPage.verifyBaseWord('ferocious')

  await wordPage.toggleMode()
  await wordPage.verifyCurrentPosition(4, 1, 5)
  await wordPage.verifyBaseWord('contempt')

  await wordPage.check()
  await wordPage.ok()
  await wordPage.verifyCurrentPosition(5, 1, 5)
  await wordPage.verifyBaseWord('ferocious')

  await wordPage.check()
  await wordPage.ok()
  await wordPage.verifyCurrentPosition(0, 0, 5)
  await wordPage.verifyBaseWord('housekeeper')
})

// TODO: implement text tests
//   swap translation test
//   speed mode test
// shuffle
