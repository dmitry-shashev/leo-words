import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/offsetlimit/10/5')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Create Next App')
})
