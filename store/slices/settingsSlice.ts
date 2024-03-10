import { Sound, SoundValue } from '@/types/sound'
import { Lang, LangValue } from '@/types/lang'
import { createSelector, createSlice, Slice } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'
import { ShowImage, ShowImageValue } from '@/types/show-image'
import { SpeedMode, SpeedModeValue } from '@/types/speed-mode'

interface SettingsState {
  sound: SoundValue
  lang: LangValue
  showImage: ShowImageValue
  speedMode: SpeedModeValue
}

const initialState: SettingsState = {
  sound: Sound.ON,
  lang: Lang.EN,
  showImage: ShowImage.YES,
  speedMode: SpeedMode.NO,
}

export const settingsSlice: Slice<
  SettingsState,
  {
    toggleSound(state: SettingsState): void
    toggleLang(state: SettingsState): void
    toggleShowImage(state: SettingsState): void
    toggleSpeedMode(state: SettingsState): void
  }
> = createSlice({
  name: 'settingsSlice',
  initialState,
  reducers: {
    toggleSound(state) {
      state.sound = state.sound.value === Sound.ON.value ? Sound.OFF : Sound.ON
    },
    toggleLang(state) {
      state.lang = state.lang.value === Lang.EN.value ? Lang.RU : Lang.EN
    },
    toggleShowImage(state) {
      state.showImage =
        state.showImage.value === ShowImage.YES.value
          ? ShowImage.NO
          : ShowImage.YES
    },
    toggleSpeedMode(state) {
      state.speedMode =
        state.speedMode.value === SpeedMode.YES.value
          ? SpeedMode.NO
          : SpeedMode.YES
    },
  },
})

export const { toggleSound, toggleLang, toggleShowImage, toggleSpeedMode } =
  settingsSlice.actions

//----------------------------------------------------------------

const getSettingsState = (rootState: RootState): SettingsState =>
  rootState.settingsReducer

export const getSettingsSound = createSelector(
  getSettingsState,
  (state) => state.sound
)

export const getSettingsLang = createSelector(
  getSettingsState,
  (state) => state.lang
)

export const getSettingsShowImage = createSelector(
  getSettingsState,
  (state) => state.showImage
)

export const getSettingsSpeedMode = createSelector(
  getSettingsState,
  (state) => state.speedMode
)

export default settingsSlice.reducer
