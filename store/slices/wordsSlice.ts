import { Word } from '@/models/word'
import {
  createSelector,
  createSlice,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import { Lang } from '@/types/lang'
import {
  getNextCircledValue,
  getPrevCircledValue,
} from '@/utils/getCircledValue'
import { SpeedMode, SpeedModeValue } from '@/types/speed-mode'
import { getEmptyWord } from '@/store/store-utils'
import { getLastWords } from '@/utils/getLastWords'

interface CheckButtonAction {
  speedMode: SpeedModeValue
}

interface WordsState {
  allWords: ReadonlyArray<Word>
  finishedWords: Array<Word>
  wrongWords: Array<Word>
  currentWord: Word
  savedCurrentWord: Word
  isCheckState: boolean
  isByWrongWords: boolean
}

const initialState: WordsState = {
  allWords: [],
  currentWord: getEmptyWord(),
  savedCurrentWord: getEmptyWord(),
  finishedWords: [],
  wrongWords: [],
  isCheckState: false,
  isByWrongWords: false,
}

export const wordsSlice: Slice<
  WordsState,
  {
    setAllWords(state: WordsState, action: PayloadAction<Array<Word>>): void
    goToCheckState(state: WordsState): void
    checkOk(state: WordsState, action: PayloadAction<CheckButtonAction>): void
    checkNo(state: WordsState, action: PayloadAction<CheckButtonAction>): void
    goBack(state: WordsState, action: PayloadAction<CheckButtonAction>): void
    toggleByWrongWords(state: WordsState): void
  }
> = createSlice({
  name: 'wordsSlice',
  initialState,
  reducers: {
    //----------------------------------------------------------------
    setAllWords(state, action) {
      state.isCheckState = false
      state.isByWrongWords = false
      state.finishedWords = []
      state.wrongWords = []
      state.allWords = action.payload
      state.currentWord = action.payload[0]!
    },
    //----------------------------------------------------------------
    goToCheckState(state) {
      state.isCheckState = true
    },
    //----------------------------------------------------------------
    checkOk(state, action) {
      state.isCheckState = false

      if (state.isByWrongWords) {
        if (state.wrongWords.length === 1) {
          state.isByWrongWords = false
          state.wrongWords = []
          if (state.finishedWords.length >= state.allWords.length - 1) {
            state.currentWord = state.allWords[0]!
            state.finishedWords = []
          } else {
            state.currentWord = state.savedCurrentWord
          }
          return
        }

        const { value } = getNextCircledValue(
          state.currentWord,
          state.wrongWords
        )
        state.wrongWords = state.wrongWords.filter(
          (v) => v.id !== state.currentWord.id
        )
        state.currentWord = value
        return
      }

      state.finishedWords.push(state.currentWord)
      const { value, reset } = getNextCircledValue(
        state.currentWord,
        state.allWords
      )
      state.currentWord = value
      if (reset) {
        if (state.wrongWords.length > 0) {
          state.isByWrongWords = true
          state.savedCurrentWord = state.currentWord
          state.currentWord = state.wrongWords[0]!
          return
        }
        state.finishedWords = []
      }

      if (action.payload.speedMode.value === SpeedMode.YES.value) {
        state.isCheckState = true
      }
    },
    //----------------------------------------------------------------
    checkNo(state, action) {
      state.isCheckState = false

      if (state.isByWrongWords) {
        const { value } = getNextCircledValue(
          state.currentWord,
          state.wrongWords
        )
        state.currentWord = value
        return
      }

      state.wrongWords.push(state.currentWord)
      state.finishedWords.push(state.currentWord)
      const { value, reset } = getNextCircledValue(
        state.currentWord,
        state.allWords
      )
      state.currentWord = value
      if (reset) {
        if (state.wrongWords.length > 0) {
          state.isByWrongWords = true
          state.savedCurrentWord = state.currentWord
          state.currentWord = state.wrongWords[0]!
          return
        }
        state.finishedWords = []
      }

      if (action.payload.speedMode.value === SpeedMode.YES.value) {
        state.isCheckState = true
      }
    },
    //----------------------------------------------------------------
    goBack(state, action) {
      state.isCheckState = false
      const { value } = getPrevCircledValue(state.currentWord, state.allWords)
      state.currentWord = value
      state.finishedWords = state.finishedWords.filter(
        (v: Word) => v.id !== state.currentWord.id
      )
      state.wrongWords = state.wrongWords.filter(
        (v: Word) => v.id !== state.currentWord.id
      )

      if (action.payload.speedMode.value === SpeedMode.YES.value) {
        state.isCheckState = true
      }
    },
    //----------------------------------------------------------------
    toggleByWrongWords(state) {
      if (state.wrongWords.length === 0) {
        return
      }
      const value = !state.isByWrongWords
      if (value) {
        state.savedCurrentWord = state.currentWord
        state.currentWord = state.wrongWords[0]!
      } else {
        state.currentWord = state.savedCurrentWord
      }
      state.isByWrongWords = value
    },
  },
})

export const {
  goToCheckState,
  checkOk,
  checkNo,
  goBack,
  toggleByWrongWords,
  setAllWords,
} = wordsSlice.actions

//----------------------------------------------------------------

export const getWordsState = (rootState: RootState): WordsState =>
  rootState.wordsReducer

export const getWordsAll = createSelector(
  getWordsState,
  (state) => state.allWords
)

export const getLastWordsAmount = createSelector(
  getWordsAll,
  (allWords) => getLastWords(allWords).length
)

export const getWordsWrong = createSelector(
  getWordsState,
  (state) => state.wrongWords
)

export const getWordsFinished = createSelector(
  getWordsState,
  (state) => state.finishedWords
)

export const getCurrentWordValue = (rootState: RootState): string => {
  if (rootState.settingsReducer.lang.value === Lang.EN.value) {
    return rootState.wordsReducer.currentWord.wordValue
  }
  return rootState.wordsReducer.currentWord.combinedTranslation
}

export const getCurrentWordTranslation = (rootState: RootState): string => {
  if (rootState.settingsReducer.lang.value === Lang.EN.value) {
    return rootState.wordsReducer.currentWord.combinedTranslation
  }
  return rootState.wordsReducer.currentWord.wordValue
}

export const getCurrentWordPicture = createSelector(
  getWordsState,
  (state) => state.currentWord.picture
)

export const getCurrentWord = createSelector(
  getWordsState,
  (state) => state.currentWord
)

export const getCurrentWordId = createSelector(
  getCurrentWord,
  (state) => state.id
)

export const getIsCheckState = createSelector(
  getWordsState,
  (state) => state.isCheckState
)

export const getIsByWrongWords = createSelector(
  getWordsState,
  (state) => state.isByWrongWords
)

export const getNextPrev10Words = createSelector(getWordsState, (state) => {
  let result: Array<Word> = []
  let current: Word = state.currentWord
  let prev: Word = state.currentWord
  for (let i = 0; i < 10; ++i) {
    current = getNextCircledValue(current, state.allWords).value
    if (!result.find((v) => v.id === current.id)) {
      result.push(current)
    }
    prev = getPrevCircledValue(current, state.allWords).value

    if (!result.find((v) => v.id === prev.id)) {
      result.push(prev)
    }
  }
  return result
})

export default wordsSlice.reducer
