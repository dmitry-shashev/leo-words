'use client'

import { FC, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getWordsAll, setAllWords } from '@/store/slices/wordsSlice'
import { Word } from '@/models/word'
import parsedWordsPure from '../../../auto-generated/words.json'
import { useAppDispatch } from '@/store/store'
import packageJson from '../../../package.json'
import {
  sliceByLastNum,
  sliceByOffsetLimit,
  sliceByTimePeriod,
} from '@/utils/sliceWords'
import { useDebug } from '@/hooks/useDebug'

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

    const currenVersion = localStorage.getItem('version')
    const currentUrl = localStorage.getItem('currentUrl')
    // we reset store in case of updating the version
    // or changing the range of words from the UI
    if (
      !currenVersion ||
      currenVersion !== packageJson.version ||
      allWords.length !== parsedWords.length ||
      currentUrl !== location.href
    ) {
      localStorage.clear()
      localStorage.setItem('currentUrl', location.href)
      localStorage.setItem('version', packageJson.version)
      dispatch(setAllWords(parsedWords))
    }
  }, [dispatch, allWords, limit, offset, last])

  if (allWords.length === 0) {
    return (
      <div className="flex h-80">
        <div className="text-2xl text-blue-400 m-auto">Loading ...</div>
      </div>
    )
  }

  return <>{children}</>
}
