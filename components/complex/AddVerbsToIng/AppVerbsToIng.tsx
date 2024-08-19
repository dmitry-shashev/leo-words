'use client'

import { FC, ReactNode, useEffect } from 'react'
import { useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'
import { getWordsAll, setAllWords } from '@/store/slices/wordsSlice'
import { AppLoading } from '@/components/simple/AppLoading/AppLoading'
import { verbsToIng } from '@/content/verbs-to-ing'

interface Props {
  children: ReactNode
}

export const AppVerbsToIng: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch()
  const allWords = useSelector(getWordsAll)

  useEffect(() => {
    dispatch(setAllWords(verbsToIng))
  }, [dispatch])

  if (allWords.length === 0) {
    return <AppLoading />
  }

  return <>{children}</>
}
