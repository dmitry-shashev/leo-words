'use client'

import { FC, useEffect, useState } from 'react'
import { Sound } from '@/types/sound'
import { useSelector } from 'react-redux'
import {
  getSettingsLang,
  getSettingsSound,
  getSettingsSpeedMode,
} from '@/store/slices/settingsSlice'
import {
  getCurrentWordId,
  getIsCheckState,
  getNextPrev10Words,
} from '@/store/slices/wordsSlice'
import { Lang } from '@/types/lang'
import { SpeedMode } from '@/types/speed-mode'

export const SoundControl: FC = () => {
  const sound = useSelector(getSettingsSound)
  const currentWordId = useSelector(getCurrentWordId)
  const isCheckState = useSelector(getIsCheckState)
  const next10Words = useSelector(getNextPrev10Words)
  const lang = useSelector(getSettingsLang)
  const speedMode = useSelector(getSettingsSpeedMode)

  const [currentAudio, setCurrentAudio] = useState<
    Record<number, HTMLAudioElement>
  >({})

  useEffect(() => {
    let audioToSet = { ...currentAudio }
    // add new
    next10Words.forEach((w) => {
      if (w.id in audioToSet) {
        return
      }
      const audio = new Audio(w.pronunciation)
      audio.preload = 'auto'
      audioToSet[w.id] = audio
    })
    // remove old
    audioToSet = Object.fromEntries(
      Object.entries(audioToSet).filter(([id]) =>
        next10Words.some((t) => t.id === +id)
      )
    )
    setCurrentAudio(audioToSet)
  }, [currentWordId])

  const currentAudioElem = currentAudio[currentWordId] ?? null
  useEffect(() => {
    if (Sound.ON.value !== sound.value) {
      return
    }

    if (SpeedMode.YES.value === speedMode.value) {
      currentAudioElem?.play()
      return
    }

    if (Lang.EN.value === lang.value) {
      if (!isCheckState) {
        currentAudioElem?.play()
      }
      return
    }

    if (isCheckState) {
      currentAudioElem?.play()
    }
  }, [isCheckState, currentAudioElem, sound.value, speedMode])

  return <></>
}
