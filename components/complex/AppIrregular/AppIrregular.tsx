'use client'

import { FC, ReactNode, useEffect } from 'react'
import { AppLoading } from '@/components/simple/AppLoading/AppLoading'
import { useSelector } from 'react-redux'
import {
  getAllIrregularWords,
  setAllIrregularWords,
} from '@/store/slices/irregularWordsSlice'
import { useAppDispatch } from '@/store/store'
import irregularWords from '../../../scripts/extra/irregular-verbs.json'

interface Props {
  children: ReactNode
}

export const AppIrregular: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch()
  const allIrregularWords = useSelector(getAllIrregularWords)

  useEffect(() => {
    if (allIrregularWords.length > 0) {
      return
    }
    const pureIrregularWords = irregularWords as unknown as ReadonlyArray<
      [string, string, string]
    >
    dispatch(
      setAllIrregularWords(
        pureIrregularWords.map((v, index) => ({
          id: index,
          infinitive: v[0],
          pastSimple: v[1],
          pastParticiple: v[2],
        }))
      )
    )
  }, [dispatch, allIrregularWords])

  if (allIrregularWords.length === 0) {
    return <AppLoading />
  }

  return <>{children}</>
}
