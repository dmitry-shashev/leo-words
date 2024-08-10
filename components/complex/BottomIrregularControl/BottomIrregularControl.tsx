'use client'

import { FC } from 'react'
import { useAppDispatch } from '@/store/store'
import {
  checkIrregularNo,
  checkIrregularOk,
  getIsByIrregularWrongWords,
  getIsFinalIrregularWordsStep,
  goIrregularBack,
  goToNextIrregularWordStep,
} from '@/store/slices/irregularWordsSlice'
import { useSelector } from 'react-redux'
import { RegularBtn } from '@/components/simple/RegularBtn/RegularBtn'
import { TransparentBtn } from '@/components/simple/TransparentBtn/TransparentBtn'

export const BottomIrregularControl: FC = () => {
  const dispatch = useAppDispatch()

  const isByIrregularWrongWords = useSelector(getIsByIrregularWrongWords)
  const isFinalIrregularWordsStep = useSelector(getIsFinalIrregularWordsStep)

  const onIrregularCheck = (): void => {
    dispatch(goToNextIrregularWordStep())
  }

  const onIrregularOk = (): void => {
    dispatch(checkIrregularOk())
  }

  const onIrregularNo = (): void => {
    dispatch(checkIrregularNo())
  }

  const onIrregularBack = (): void => {
    dispatch(goIrregularBack())
  }

  return (
    <div>
      <div className="flex justify-between gap-4 mb-8">
        {isFinalIrregularWordsStep ? (
          <>
            <RegularBtn onClick={onIrregularNo} label="No" color="red" />
            <RegularBtn onClick={onIrregularOk} label="Ok" color="green" />
          </>
        ) : (
          <RegularBtn onClick={onIrregularCheck} label="Check" color="blue" />
        )}
      </div>
      <div className="flex">
        {!isByIrregularWrongWords && (
          <TransparentBtn onClick={onIrregularBack} label="Back" />
        )}
      </div>
    </div>
  )
}
