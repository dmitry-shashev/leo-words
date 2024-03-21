import { expect, test, vi } from 'vitest'
import { render, act } from '@testing-library/react'
import { SoundControl } from './SoundControl'
import { Provider } from 'react-redux'
import { createStore } from '@/store/store'
import {
  checkNo,
  checkOk,
  goToCheckState,
  setAllWords,
} from '@/store/slices/wordsSlice'
import { testWords } from '@/components/test-data/test-words'
import { SpeedMode } from '@/types/speed-mode'
import { toggleSound, toggleSpeedMode } from '@/store/slices/settingsSlice'

test('SoundControl', () => {
  const store = createStore()
  store.dispatch(setAllWords(testWords))

  const play = vi.fn()
  vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(play)

  render(
    <Provider store={store}>
      <SoundControl />
    </Provider>
  )

  expect(play).toBeCalledTimes(1)

  act(() => {
    store.dispatch(goToCheckState())
  })
  expect(play).toBeCalledTimes(1)

  act(() => {
    store.dispatch(
      checkOk({
        speedMode: SpeedMode.NO,
      })
    )
  })
  expect(play).toBeCalledTimes(2)

  act(() => {
    store.dispatch(goToCheckState())
  })
  expect(play).toBeCalledTimes(2)

  act(() => {
    store.dispatch(
      checkNo({
        speedMode: SpeedMode.NO,
      })
    )
  })
  expect(play).toBeCalledTimes(3)
})

test('Turn off sound', () => {
  const store = createStore()
  store.dispatch(setAllWords(testWords))

  const play = vi.fn()
  vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(play)

  render(
    <Provider store={store}>
      <SoundControl />
    </Provider>
  )

  act(() => {
    store.dispatch(
      checkOk({
        speedMode: SpeedMode.NO,
      })
    )
    store.dispatch(toggleSound())
  })
  expect(play).toBeCalledTimes(1)

  act(() => {
    store.dispatch(
      checkOk({
        speedMode: SpeedMode.NO,
      })
    )
  })
  expect(play).toBeCalledTimes(1)

  act(() => {
    store.dispatch(toggleSound())
  })
})

test('Speed mode', () => {
  const store = createStore()
  store.dispatch(setAllWords(testWords))

  const play = vi.fn()
  vi.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(play)

  render(
    <Provider store={store}>
      <SoundControl />
    </Provider>
  )

  act(() => {
    store.dispatch(toggleSpeedMode())
  })
  expect(play).toBeCalledTimes(2)

  act(() => {
    store.dispatch(
      checkOk({
        speedMode: SpeedMode.YES,
      })
    )
  })
  expect(play).toBeCalledTimes(3)

  act(() => {
    store.dispatch(
      checkNo({
        speedMode: SpeedMode.YES,
      })
    )
  })
  expect(play).toBeCalledTimes(4)
})
