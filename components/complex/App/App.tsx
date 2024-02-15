'use client'

import { FC, ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getWordsAll, setAllWords } from '@/store/slices/wordsSlice'
import { Word } from '@/models/word'
import parsedWordsPure from '../../../auto-generated/words.json'
import { persistor, useAppDispatch } from '@/store/store'

interface Props {
  children: ReactNode
  wordsLimit?: number
}

export const App: FC<Props> = ({ children, wordsLimit }) => {
  const dispatch = useAppDispatch()
  const allWords = useSelector(getWordsAll)

  useEffect(() => {
    let parsedWords = (parsedWordsPure as Array<Word>).slice(0, wordsLimit)
    if (allWords.length !== parsedWords.length) {
      persistor.purge().then(() => {
        dispatch(setAllWords(parsedWords))
      })
    }
  }, [dispatch, allWords, wordsLimit])

  if (allWords.length === 0) {
    return (
      <div className="flex h-80">
        <div className="text-2xl text-blue-400 m-auto">Loading ...</div>
      </div>
    )
  }

  return <>{children}</>
}
