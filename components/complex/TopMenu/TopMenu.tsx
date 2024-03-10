'use client'

import { FC } from 'react'
import {
  getSettingsLang,
  getSettingsShowImage,
  getSettingsSound,
  getSettingsSpeedMode,
  toggleLang,
  toggleShowImage,
  toggleSound,
  toggleSpeedMode,
} from '@/store/slices/settingsSlice'
import { useSelector } from 'react-redux'
import { SquareBtn } from '@/components/simple/SquareBtn/SquareBtn'
import { WordsBtn } from '@/components/simple/WordsBtn/WordsBtn'
import {
  getIsByWrongWords,
  getWordsAll,
  getWordsFinished,
  getWordsWrong,
  setAllWords,
  toggleByWrongWords,
} from '@/store/slices/wordsSlice'
import { useAppDispatch } from '@/store/store'
import { shuffleArr } from '@/utils/shuffleArr'

export const TopMenu: FC = () => {
  const dispatch = useAppDispatch()
  const sound = useSelector(getSettingsSound)
  const lang = useSelector(getSettingsLang)
  const showImage = useSelector(getSettingsShowImage)
  const speedMode = useSelector(getSettingsSpeedMode)

  const allWords = useSelector(getWordsAll)
  const wrongWords = useSelector(getWordsWrong)
  const finishedWords = useSelector(getWordsFinished)
  const isByWrongWords = useSelector(getIsByWrongWords)

  const onSound = (): void => {
    dispatch(toggleSound())
  }

  const onLang = (): void => {
    dispatch(toggleLang())
  }

  const onShowImage = (): void => {
    dispatch(toggleShowImage())
  }

  const onWrongWords = (): void => {
    dispatch(toggleByWrongWords())
  }

  const onShuffle = (): void => {
    const newWords = shuffleArr(allWords)
    dispatch(setAllWords(newWords))
  }

  const onSpeedMode = (): void => {
    dispatch(toggleSpeedMode())
  }

  return (
    <div className="flex flex-row justify-between p-1 mb-1 border-b">
      <div className="flex flex-row gap-1">
        <div className="border-r">
          <SquareBtn onClick={onShuffle} label="🪃" />
        </div>
        <SquareBtn onClick={onSound} label={sound.icon} />
        <SquareBtn onClick={onLang} label={lang.icon} />
        <SquareBtn onClick={onShowImage} label={showImage.icon} />
        <SquareBtn onClick={onSpeedMode} label={speedMode.icon} />
      </div>
      <WordsBtn
        hoverMode={isByWrongWords}
        onClick={onWrongWords}
        current={finishedWords.length}
        wrong={wrongWords.length}
        total={allWords.length}
      />
    </div>
  )
}
