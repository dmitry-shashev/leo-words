export interface Word {
  readonly id: number
  readonly combinedTranslation: string
  readonly wordValue: string
  readonly transcription: string
  readonly created: number
  // png
  readonly picture: string
  // mp3
  readonly pronunciation: string
}
