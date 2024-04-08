import { Group, GroupScheme } from '@/models/group'
import { buildHeaders } from '@/utils/buildHeaders'
import { Word, WordScheme } from '@/models/word'

export async function getWords(
  accessToken: string,
  offsetWordId: number | null
): Promise<Array<Word>> {
  const response = await fetch('https://api.lingualeo.com/GetWords', {
    method: 'POST',
    headers: buildHeaders(accessToken),
    body: JSON.stringify({
      apiVersion: '1.0.1',
      attrList: {
        association: 'as',
        combinedTranslation: 'trc',
        created: 'cd',
        id: 'id',
        learningStatus: 'ls',
        listWordSets: 'listWordSets',
        origin: 'wo',
        picture: 'pic',
        progress: 'pi',
        pronunciation: 'pron',
        relatedWords: 'rw',
        speechPartId: 'pid',
        trainings: 'trainings',
        transcription: 'scr',
        translations: 'trs',
        wordLemmaId: 'lid',
        wordLemmaValue: 'lwd',
        wordSets: 'ws',
        wordType: 'wt',
        wordValue: 'wd',
      },
      category: 'all',
      dateGroup: 'all',
      mode: 'basic',
      perPage: 1000,
      status: '',
      wordSetId: 1,
      offset: { wordId: offsetWordId },
      search: '',
      training: null,
      iDs: [
        {
          y: '1707751812558460271',
          g: '1852573056.1707751812',
        },
      ],
    }),
  })
  const data: Array<Group> = await response
    .json()
    .then(({ data }) => data.map(GroupScheme.parse))

  const result: Array<Word> = []
  data.forEach((group) => {
    group.words.forEach((word) => {
      if (!result.find((v) => v.id === word.id)) {
        result.push(WordScheme.parse(word))
      }
    })
  })

  return Array.from(result)
}
