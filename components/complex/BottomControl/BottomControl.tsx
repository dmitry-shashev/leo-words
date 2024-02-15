'use client'

import { FC } from 'react'
import { RegularBtn } from '@/components/simple/RegularBtn/RegularBtn'
import { TransparentBtn } from '@/components/simple/TransparentBtn/TransparentBtn'
import { useSelector } from 'react-redux'
import {
  checkNo,
  checkOk,
  getIsByWrongWords,
  getIsCheckState,
  goBack,
  goToCheckState,
} from '@/store/slices/wordsSlice'
import { useAppDispatch } from '@/store/store'

export const BottomControl: FC = () => {
  const dispatch = useAppDispatch()
  const isCheckState = useSelector(getIsCheckState)
  const isByWrongWords = useSelector(getIsByWrongWords)

  const onCheck = (): void => {
    dispatch(goToCheckState())
  }

  const onOk = (): void => {
    dispatch(checkOk())
  }

  const onNo = (): void => {
    dispatch(checkNo())
  }

  const onBack = (): void => {
    dispatch(goBack())
  }

  return (
    <div>
      <div className="flex justify-between gap-4 mb-8">
        {isCheckState ? (
          <>
            <RegularBtn onClick={onNo} label="No" color="red" />
            <RegularBtn onClick={onOk} label="Ok" color="green" />
          </>
        ) : (
          <RegularBtn onClick={onCheck} label="Check" color="blue" />
        )}
      </div>
      <div className="flex">
        {!isByWrongWords && <TransparentBtn onClick={onBack} label="Back" />}
      </div>
    </div>
  )
}
