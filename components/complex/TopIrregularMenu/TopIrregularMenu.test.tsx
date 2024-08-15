import { test, expect } from 'vitest'
import { createStore } from '@/store/store'
import { setAllWords } from '@/store/slices/wordsSlice'
import { testWords } from '@/components/test-data/test-words'
import { act, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { TopIrregularMenu } from '@/components/complex/TopIrregularMenu/TopIrregularMenu'

test('TopIrregularMenu', () => {
  const store = createStore()
  store.dispatch(setAllWords(testWords))

  const { asFragment, getByLabelText } = render(
    <Provider store={store}>
      <TopIrregularMenu />
    </Provider>
  )
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

  checkControl(shuffleBtn)
})
