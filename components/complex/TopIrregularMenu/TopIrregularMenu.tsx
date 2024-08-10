'use client'

import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '@/store/store'
import {
  getAllIrregularWords,
  getFinishedIrregularWords,
  getIsByIrregularWrongWords,
  getWrongIrregularWords,
  setAllIrregularWords,
  toggleByWrongIrregularWords,
} from '@/store/slices/irregularWordsSlice'
import { SquareBtn } from '@/components/simple/SquareBtn/SquareBtn'
import { WordsBtn } from '@/components/simple/WordsBtn/WordsBtn'
import { shuffleArr } from '@/utils/shuffleArr'

export const TopIrregularMenu: FC = () => {
  const dispatch = useAppDispatch()

  const allWords = useSelector(getAllIrregularWords)
  const isByWrongIrregularWords = useSelector(getIsByIrregularWrongWords)
  const wrongIrregularWords = useSelector(getWrongIrregularWords)
  const finishedIrregularWords = useSelector(getFinishedIrregularWords)

  const onWrongWords = (): void => {
    dispatch(toggleByWrongIrregularWords())
  }

  const onShuffle = (): void => {
    const newWords = shuffleArr(allWords)
    dispatch(setAllIrregularWords(newWords))
  }

  return (
    <div className="flex flex-row justify-between p-1 mb-1 border-b">
      <div className="flex flex-row gap-1">
        <div className="border-r">
          <SquareBtn onClick={onShuffle} label="🪃" ariaLabel="Shuffle" />
        </div>
      </div>
      <WordsBtn
        hoverMode={isByWrongIrregularWords}
        onClick={onWrongWords}
        current={finishedIrregularWords.length}
        wrong={wrongIrregularWords.length}
        total={allWords.length}
      />
    </div>
  )
}
