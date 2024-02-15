import { Word } from '@/models/word'

export interface Group {
  readonly groupCount: number
  readonly groupName: string
  readonly words: Array<Word>
}
