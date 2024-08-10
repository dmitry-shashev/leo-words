'use client'

import { FC, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getWordsAll, setAllWords } from '@/store/slices/wordsSlice'
import { Word } from '@/models/word'
import parsedWordsPure from '../../../auto-generated/words.json'
import { useAppDispatch } from '@/store/store'
import {
  sliceByLastNum,
  sliceByOffsetLimit,
  sliceByTimePeriod,
} from '@/utils/sliceWords'
import { useDebug } from '@/hooks/useDebug'
import { AppLoading } from '@/components/simple/AppLoading/AppLoading'

interface Props {
  children: ReactNode
  limit?: number
  offset?: number
  last?: string
}

export const App: FC<Props> = ({ children, limit, offset, last }) => {
  const dispatch = useAppDispatch()
  const allWords = useSelector(getWordsAll)

  useDebug()

  useEffect(() => {
    let parsedWords = parsedWordsPure as Array<Word>

    if (limit !== undefined && offset !== undefined) {
      parsedWords = sliceByOffsetLimit(offset, limit, parsedWords)
    }

    if (last) {
      switch (true) {
        case /\d+/.test(last):
          parsedWords = sliceByLastNum(last, parsedWords)
          break

        case /[a-zA-Z]/.test(last):
          parsedWords = sliceByTimePeriod(last, parsedWords)
          break

        default:
          break
      }
    }

    if (allWords.length !== parsedWords.length) {
      dispatch(setAllWords(parsedWords))
    }
  }, [dispatch, allWords, limit, offset, last])

  if (allWords.length === 0) {
    return <AppLoading />
  }

  return <>{children}</>
}
