import { test, expect } from 'vitest'
import { createStore } from '@/store/store'
import { act, render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { IrregularWordView } from '@/components/complex/IrregularWordView/IrregularWordView'
import {
  goToNextIrregularWordStep,
  setAllIrregularWords,
} from '@/store/slices/irregularWordsSlice'
import { testIrregularWords } from '@/components/test-data/test-irregular-words'

test('IrregularWordView', () => {
  const store = createStore()
  store.dispatch(setAllIrregularWords(testIrregularWords))

  const { asFragment } = render(
    <Provider store={store}>
      <IrregularWordView />
    </Provider>
  )

  expect(asFragment()).toMatchSnapshot()

  act(() => {
    store.dispatch(goToNextIrregularWordStep())
  })
  expect(asFragment()).toMatchSnapshot()

  act(() => {
    store.dispatch(goToNextIrregularWordStep())
  })
  expect(asFragment()).toMatchSnapshot()
})
