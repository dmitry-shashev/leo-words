import { expect, type Page } from '@playwright/test'

export class WordPage {
  constructor(private page: Page) {}

  async check(): Promise<void> {
    await this.page.getByLabel('Check').click()
  }

  async ok(): Promise<void> {
    await this.page.getByLabel('Ok').click()
  }

  async no(): Promise<void> {
    await this.page.getByLabel('No').click()
  }

  async back(): Promise<void> {
    await this.page.getByLabel('Back').click()
  }

  // by wrong words and back
  async toggleMode(): Promise<void> {
    await this.page.getByLabel('Words button').click()
  }

  async toggleLang(): Promise<void> {
    await this.page.getByLabel('Lang').click()
  }

  async toggleSpeed(): Promise<void> {
    await this.page.getByLabel('Speed Mode').click()
  }

  async verifyIsCheck(): Promise<void> {
    await expect(this.page.getByLabel('Check')).toBeVisible()
  }

  async verifyBaseWord(word: string): Promise<void> {
    await expect(this.page.getByLabel('Base word')).toHaveText(word)
  }

  async verifyTranslatedWord(word: string): Promise<void> {
    await expect(this.page.getByLabel('Translated word')).toHaveText(word)
  }

  async verifyCurrentPosition(
    current: number | string,
    wrong: number | string,
    total: number | string
  ): Promise<void> {
    await expect(this.page.getByLabel('Counter current')).toHaveText(
      String(current)
    )
    await expect(this.page.getByLabel('Counter wrong')).toHaveText(
      String(wrong)
    )
    await expect(this.page.getByLabel('Counter total')).toHaveText(
      String(total)
    )
  }
}
