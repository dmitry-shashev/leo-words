import { Word } from '@/models/word'
import { IrregularWord } from '@/models/irregular-word'

export function getEmptyWord(): Word {
  return {
    id: 0,
    wordValue: '',
    pronunciation: '',
    picture: '',
    combinedTranslation: '',
    transcription: '',
    created: 0,
  }
}

export function getEmptyIrregularWord(): IrregularWord {
  return {
    id: 0,
    infinitive: '',
    pastSimple: '',
    pastParticiple: '',
  }
}
