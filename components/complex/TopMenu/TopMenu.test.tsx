import { test, expect } from 'vitest'
import { createStore } from '@/store/store'
import { setAllWords } from '@/store/slices/wordsSlice'
import { testWords } from '@/components/test-data/test-words'
import { act, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { TopMenu } from '@/components/complex/TopMenu/TopMenu'

test('TopMenu', () => {
  const store = createStore()
  store.dispatch(setAllWords(testWords))

  const { asFragment, getByLabelText } = render(
    <Provider store={store}>
      <TopMenu />
    </Provider>
  )
  const soundBtn = getByLabelText('Sound')
  const langBtn = getByLabelText('Lang')
  const showImgBtn = getByLabelText('Show Image')
  const speedModeBtn = getByLabelText('Speed Mode')
  const shuffleBtn = getByLabelText('Shuffle')

  function checkControl(control: HTMLElement): void {
    act(() => {
      control.click()
    })
    expect(asFragment()).toMatchSnapshot()
    act(() => {
      control.click()
    })
    expect(asFragment()).toMatchSnapshot()
  }

  checkControl(soundBtn)
  checkControl(langBtn)
  checkControl(showImgBtn)
  checkControl(speedModeBtn)
  checkControl(shuffleBtn)
})
