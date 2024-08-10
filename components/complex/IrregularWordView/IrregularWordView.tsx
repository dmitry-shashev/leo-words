'use client'

import { FC } from 'react'
import { useSelector } from 'react-redux'
import {
  getCurrentIrregularWord,
  getIrregularWordStep,
} from '@/store/slices/irregularWordsSlice'
import { IrregularWordStep } from '@/types/irregular-word-step'

function determineWordSizeClass(word: string): string {
  const length = word.length
  if (length > 16) {
    return 'text-xl'
  }
  if (length > 24) {
    return 'text-lg'
  }
  return 'text-3xl'
}

export const IrregularWordView: FC = () => {
  const currentWord = useSelector(getCurrentIrregularWord)
  const irregularWordStep = useSelector(getIrregularWordStep)

  return (
    <div className="mb-10">
      <div
        className={`${determineWordSizeClass(currentWord.infinitive)} text-center h-40 text-blue-400`}
      >
        <div aria-label="Infinitive word" key={currentWord.infinitive}>
          {currentWord.infinitive}
        </div>
      </div>

      <div
        className={`${determineWordSizeClass(currentWord.pastSimple)} text-center h-40 text-blue-400`}
      >
        {[
          IrregularWordStep.CHECK_PAST_SIMPLE.value,
          IrregularWordStep.CHECK_PAST_PARTICIPLE.value,
        ].includes(irregularWordStep.value) && (
          <div aria-label="Past simple word" key={currentWord.pastSimple}>
            {currentWord.pastSimple}
          </div>
        )}
      </div>

      <div
        className={`${determineWordSizeClass(currentWord.pastParticiple)} text-center h-44 text-blue-400`}
      >
        {[IrregularWordStep.CHECK_PAST_PARTICIPLE.value].includes(
          irregularWordStep.value
        ) && (
          <div
            aria-label="Past participle word"
            key={currentWord.pastParticiple}
          >
            {currentWord.pastParticiple}
          </div>
        )}
      </div>
    </div>
  )
}
