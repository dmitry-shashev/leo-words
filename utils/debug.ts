import { Word } from '@/models/word'

export class Debug {
  private static DEBUG_CURRENT_WORD = 'DEBUG_CURRENT_WORD'

  static saveCurrentWord(word: Word): void {
    localStorage.setItem(Debug.DEBUG_CURRENT_WORD, JSON.stringify(word))
  }

  static getInfo(): string {
    let result: unknown
    try {
      result = {
        currentWord: JSON.parse(
          localStorage.getItem(Debug.DEBUG_CURRENT_WORD) ?? ''
        ),
      }
    } catch (error) {
      result = { error }
    }
    return JSON.stringify(result, null, 2)
  }
}
