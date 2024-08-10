import { IrregularWord } from '@/models/irregular-word'
import {
  IrregularWordStep,
  IrregularWordStepValue,
} from '@/types/irregular-word-step'
import {
  createSelector,
  createSlice,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import {
  getNextCircledValue,
  getPrevCircledValue,
} from '@/utils/getCircledValue'

function getEmptyIrregularWord(): IrregularWord {
  return {
    id: 0,
    infinitive: '',
    pastSimple: '',
    pastParticiple: '',
  }
}

interface IrregularWordsState {
  allIrregularWords: ReadonlyArray<IrregularWord>
  finishedIrregularWords: Array<IrregularWord>
  wrongIrregularWords: Array<IrregularWord>
  currentIrregularWord: IrregularWord
  savedCurrentIrregularWord: IrregularWord
  irregularWordStep: IrregularWordStepValue
  isByWrongIrregularWords: boolean
}

const initialState: IrregularWordsState = {
  allIrregularWords: [],
  finishedIrregularWords: [],
  wrongIrregularWords: [],
  currentIrregularWord: getEmptyIrregularWord(),
  savedCurrentIrregularWord: getEmptyIrregularWord(),
  irregularWordStep: IrregularWordStep.EMPTY,
  isByWrongIrregularWords: false,
}

export const irregularWordsSlice: Slice<
  IrregularWordsState,
  {
    setAllIrregularWords(
      state: IrregularWordsState,
      action: PayloadAction<Array<IrregularWord>>
    ): void
    goToNextIrregularWordStep(state: IrregularWordsState): void
    checkIrregularOk(state: IrregularWordsState): void
    checkIrregularNo(state: IrregularWordsState): void
    goIrregularBack(state: IrregularWordsState): void
    toggleByWrongIrregularWords(state: IrregularWordsState): void
  }
> = createSlice({
  name: 'irregularWordsSlice',
  initialState,
  reducers: {
    //----------------------------------------------------------------
    setAllIrregularWords(state, action) {
      state.allIrregularWords = action.payload
      state.finishedIrregularWords = []
      state.irregularWordStep = IrregularWordStep.CHECK_INFINITIVE
      state.currentIrregularWord = action.payload[0]!
    },
    //----------------------------------------------------------------
    goToNextIrregularWordStep(state: IrregularWordsState) {
      switch (state.irregularWordStep.value) {
        case IrregularWordStep.CHECK_INFINITIVE.value:
          state.irregularWordStep = IrregularWordStep.CHECK_PAST_SIMPLE
          break
        case IrregularWordStep.CHECK_PAST_SIMPLE.value:
          state.irregularWordStep = IrregularWordStep.CHECK_PAST_PARTICIPLE
          break
      }
    },
    //----------------------------------------------------------------
    checkIrregularOk(state: IrregularWordsState) {
      state.irregularWordStep = IrregularWordStep.CHECK_INFINITIVE

      if (state.isByWrongIrregularWords) {
        if (state.wrongIrregularWords.length === 1) {
          state.isByWrongIrregularWords = false
          state.wrongIrregularWords = []
          if (
            state.finishedIrregularWords.length >=
            state.allIrregularWords.length - 1
          ) {
            state.currentIrregularWord = state.allIrregularWords[0]!
            state.finishedIrregularWords = []
          } else {
            state.currentIrregularWord = state.savedCurrentIrregularWord
          }
          return
        }

        const { value } = getNextCircledValue(
          state.currentIrregularWord,
          state.wrongIrregularWords
        )
        state.wrongIrregularWords = state.wrongIrregularWords.filter(
          (v) => v.id !== state.currentIrregularWord.id
        )
        state.currentIrregularWord = value
        return
      }

      state.finishedIrregularWords.push(state.currentIrregularWord)
      const { value, reset } = getNextCircledValue(
        state.currentIrregularWord,
        state.allIrregularWords
      )
      state.currentIrregularWord = value
      if (reset) {
        if (state.wrongIrregularWords.length > 0) {
          state.isByWrongIrregularWords = true
          state.savedCurrentIrregularWord = state.currentIrregularWord
          state.currentIrregularWord = state.wrongIrregularWords[0]!
          return
        }
        state.finishedIrregularWords = []
      }
    },
    //----------------------------------------------------------------
    checkIrregularNo(state: IrregularWordsState) {
      state.irregularWordStep = IrregularWordStep.CHECK_INFINITIVE

      if (state.isByWrongIrregularWords) {
        const { value } = getNextCircledValue(
          state.currentIrregularWord,
          state.wrongIrregularWords
        )
        state.currentIrregularWord = value
        return
      }

      state.wrongIrregularWords.push(state.currentIrregularWord)
      state.finishedIrregularWords.push(state.currentIrregularWord)
      const { value, reset } = getNextCircledValue(
        state.currentIrregularWord,
        state.allIrregularWords
      )
      state.currentIrregularWord = value
      if (reset) {
        if (state.wrongIrregularWords.length > 0) {
          state.isByWrongIrregularWords = true
          state.savedCurrentIrregularWord = state.currentIrregularWord
          state.currentIrregularWord = state.wrongIrregularWords[0]!
          return
        }
        state.finishedIrregularWords = []
      }
    },
    //----------------------------------------------------------------
    goIrregularBack(state: IrregularWordsState) {
      const { value } = getPrevCircledValue(
        state.currentIrregularWord,
        state.allIrregularWords
      )

      state.irregularWordStep = IrregularWordStep.CHECK_INFINITIVE
      state.currentIrregularWord = value
      state.finishedIrregularWords = state.finishedIrregularWords.filter(
        (v) => v.id !== state.currentIrregularWord.id
      )
      state.wrongIrregularWords = state.wrongIrregularWords.filter(
        (v) => v.id !== state.currentIrregularWord.id
      )
    },
    //----------------------------------------------------------------
    toggleByWrongIrregularWords(state) {
      if (state.wrongIrregularWords.length === 0) {
        return
      }
      const value = !state.isByWrongIrregularWords
      if (value) {
        state.savedCurrentIrregularWord = state.currentIrregularWord
        state.currentIrregularWord = state.wrongIrregularWords[0]!
      } else {
        state.currentIrregularWord = state.savedCurrentIrregularWord
      }
      state.isByWrongIrregularWords = value
    },
    //----------------------------------------------------------------
  },
})

export const {
  setAllIrregularWords,
  goToNextIrregularWordStep,
  toggleByWrongIrregularWords,
  checkIrregularOk,
  checkIrregularNo,
  goIrregularBack,
} = irregularWordsSlice.actions

//----------------------------------------------------------------

export const getIrregularWordsState = (
  rootState: RootState
): IrregularWordsState => rootState.irregularWordsReducer

export const getAllIrregularWords = createSelector(
  getIrregularWordsState,
  (state) => state.allIrregularWords
)

export const getIrregularWordStep = createSelector(
  getIrregularWordsState,
  (state) => state.irregularWordStep
)

export const getIsFinalIrregularWordsStep = createSelector(
  getIrregularWordStep,
  (step) => step.value === IrregularWordStep.CHECK_PAST_PARTICIPLE.value
)

export const getCurrentIrregularWord = createSelector(
  getIrregularWordsState,
  (state) => state.currentIrregularWord
)

export const getIsByIrregularWrongWords = createSelector(
  getIrregularWordsState,
  (state) => state.isByWrongIrregularWords
)

export const getFinishedIrregularWords = createSelector(
  getIrregularWordsState,
  (state) => state.finishedIrregularWords
)

export const getWrongIrregularWords = createSelector(
  getIrregularWordsState,
  (state) => state.wrongIrregularWords
)

//----------------------------------------------------------------

export default irregularWordsSlice.reducer
