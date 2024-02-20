'use client'

import { FC, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getWordsAll, setAllWords } from '@/store/slices/wordsSlice'
import { Word } from '@/models/word'
import parsedWordsPure from '../../../auto-generated/words.json'
import { persistor, useAppDispatch } from '@/store/store'
import { version } from '../../../package.json'

interface Props {
  children: ReactNode
  limit?: number
  offset?: number
  last?: number
}

export const App: FC<Props> = ({ children, limit, offset, last }) => {
  const dispatch = useAppDispatch()
  const allWords = useSelector(getWordsAll)

  useEffect(() => {
    const currentOffset: number = offset ?? 0
    const currentLimit: number | undefined = limit
      ? limit + currentOffset
      : undefined
    let parsedWords = parsedWordsPure as Array<Word>

    if (limit !== undefined && offset !== undefined) {
      parsedWords = [...parsedWords]
        .reverse()
        .slice(currentOffset, currentLimit)
    }
    if (last) {
      parsedWords = parsedWords.slice(0, last)
    }

    const currenVersion = localStorage.getItem('version')
    if (!currenVersion || currenVersion !== version) {
      localStorage.setItem('version', version)
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
