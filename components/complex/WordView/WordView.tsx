'use client'

import { FC } from 'react'
import { useSelector } from 'react-redux'
import {
  getCurrentWordPicture,
  getCurrentWordTranslation,
  getCurrentWordValue,
  getIsCheckState,
  getNextPrev10Words,
} from '@/store/slices/wordsSlice'

export const WordView: FC = () => {
  const wordValue = useSelector(getCurrentWordValue)
  const wordTranslation = useSelector(getCurrentWordTranslation)
  const wordPicture = useSelector(getCurrentWordPicture)
  const isCheckState = useSelector(getIsCheckState)
  // for optimization purposes - not to wait the next pic
  const nextPrev10Words = useSelector(getNextPrev10Words)

  // const wordValue = 'Some day we are'
  let valueFontSize = 'text-5xl'
  if (wordValue.length > 16) {
    valueFontSize = 'text-3xl'
  }
  if (wordValue.length > 24) {
    valueFontSize = 'text-xl'
  }

  let translationFontSize = 'text-3xl'
  if (wordTranslation.length > 16) {
    translationFontSize = 'text-xl'
  }
  if (wordTranslation.length > 24) {
    translationFontSize = 'text-lg'
  }

  let blurClass = isCheckState ? '' : 'blur'

  return (
    <div className="mb-10">
      <div className={`${valueFontSize} font-semibold h-24 text-center p-1`}>
        {wordValue}
      </div>
      <div className={`${translationFontSize} text-center h-20 text-blue-400`}>
        {isCheckState && <>{wordTranslation}</>}
      </div>
      <div className="flex justify-center align-middle">
        <div className="w-80 h-80 flex justify-center align-middle bg-blue-50 shadow">
          {wordPicture && (
            <img
              src={wordPicture}
              className={`${blurClass} object-contain`}
              alt="Word Image"
            />
          )}
        </div>
      </div>
      <div hidden>
        {nextPrev10Words
          .filter((v) => v.picture)
          .map((v) => (
            <img key={v.id} src={v.picture} alt={v.wordValue} />
          ))}
      </div>
    </div>
  )
}
