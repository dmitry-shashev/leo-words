'use client'

import { FC } from 'react'
import { useSelector } from 'react-redux'
import {
  getCurrentWordPicture,
  getCurrentWordTranslation,
  getCurrentWordValue,
  getIsByWrongWords,
  getIsCheckState,
  getNextPrev10Words,
} from '@/store/slices/wordsSlice'
import {
  getSettingsShowImage,
  getSettingsSpeedMode,
} from '@/store/slices/settingsSlice'
import { ShowImage } from '@/types/show-image'
import { SpeedMode } from '@/types/speed-mode'

export const WordView: FC = () => {
  const wordValue = useSelector(getCurrentWordValue)
  const wordTranslation = useSelector(getCurrentWordTranslation)
  const wordPicture = useSelector(getCurrentWordPicture)
  const isCheckState = useSelector(getIsCheckState)
  const showImage = useSelector(getSettingsShowImage)
  // for optimization purposes - not to wait the next pic
  const nextPrev10Words = useSelector(getNextPrev10Words)
  const speedMode = useSelector(getSettingsSpeedMode)
  const isByWrongWords = useSelector(getIsByWrongWords)

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

  let wordValueClass = ''
  if (!isByWrongWords && speedMode.value === SpeedMode.YES.value) {
    wordValueClass = 'delayedAppearing'
  }

  return (
    <div className="mb-10">
      <div
        aria-label="Base word"
        className={`${valueFontSize} font-semibold h-24 text-center p-1`}
      >
        {wordValue}
      </div>
      <div className={`${translationFontSize} text-center h-20 text-blue-400`}>
        {isCheckState && (
          <div
            aria-label="Translated word"
            key={wordValue}
            className={wordValueClass}
          >
            {wordTranslation}
          </div>
        )}
      </div>
      <div className="flex justify-center align-middle">
        <div className="w-80 h-80 flex justify-center align-middle bg-blue-50 shadow">
          {wordPicture && (
            <>
              {isCheckState ? (
                <img
                  src={wordPicture}
                  className="object-contain"
                  alt="Word Image"
                />
              ) : (
                <>
                  {ShowImage.YES.value === showImage.value && (
                    <img
                      src={wordPicture}
                      className="blur object-contain"
                      alt="Word Image"
                    />
                  )}
                </>
              )}
            </>
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
