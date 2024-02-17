'use client'

import { FC, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getWordsAll, setAllWords } from '@/store/slices/wordsSlice'
import { Word } from '@/models/word'
import parsedWordsPure from '../../../auto-generated/words.json'
import { persistor, useAppDispatch } from '@/store/store'

interface Props {
  children: ReactNode
  limit?: number
  offset?: number
}

export const App: FC<Props> = ({ children, limit, offset }) => {
  const dispatch = useAppDispatch()
  const allWords = useSelector(getWordsAll)

  useEffect(() => {
    const currentOffset: number = offset ?? 0
    const currentLimit: number | undefined = limit
      ? limit + currentOffset
      : undefined
    let parsedWords = (parsedWordsPure as Array<Word>).slice(
      currentOffset,
      currentLimit
    )
    if (allWords.length !== parsedWords.length) {
      persistor.purge().then(() => {
        dispatch(setAllWords(parsedWords))
      })
    }
  }, [dispatch, allWords, limit, offset])

  if (allWords.length === 0) {
    return (
      <div className="flex h-80">
        <div className="text-2xl text-blue-400 m-auto">Loading ...</div>
      </div>
    )
  }

  return <>{children}</>
}
