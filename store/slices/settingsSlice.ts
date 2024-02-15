import { Sound, SoundValue } from '@/types/sound'
import { Lang, LangValue } from '@/types/lang'
import { createSelector, createSlice, Slice } from '@reduxjs/toolkit'
import { RootState } from '@/store/store'

interface SettingsState {
  sound: SoundValue
  lang: LangValue
}

const initialState: SettingsState = {
  sound: Sound.ON,
  lang: Lang.EN,
}

export const settingsSlice: Slice<
  SettingsState,
  {
    toggleSound(state: SettingsState): void
    toggleLang(state: SettingsState): void
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
  },
})

export const { toggleSound, toggleLang } = settingsSlice.actions

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

export default settingsSlice.reducer
