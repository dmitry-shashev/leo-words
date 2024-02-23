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
  last?: string
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
      let time = Date.now() / 1000
      switch (last) {
        case 'day':
          time -= 24 * 60 * 60
          parsedWords = parsedWords.filter((v) => v.created > time)
          break

        case 'week':
          time -= 7 * 24 * 60 * 60
          parsedWords = parsedWords.filter((v) => v.created > time)
          break

        case 'month':
          time -= 30 * 24 * 60 * 60
          parsedWords = parsedWords.filter((v) => v.created > time)
          break

        case 'year':
          time -= 365 * 24 * 60 * 60
          parsedWords = parsedWords.filter((v) => v.created > time)
          break

        // here we suppose it is a number
        default:
          const parsedLast = parseInt(last)
          if (!isNaN(parsedLast) && parsedLast) {
            parsedWords = parsedWords.slice(0, parsedLast)
          }
          break
      }
    }

    const currenVersion = localStorage.getItem('version')
    // we reset store in case of updating the version
    // or changing the range of words from the UI
    if (
      !currenVersion ||
      currenVersion !== version ||
      allWords.length !== parsedWords.length
    ) {
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
