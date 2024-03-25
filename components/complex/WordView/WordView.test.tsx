import { test, expect } from 'vitest'
import { createStore } from '@/store/store'
import { render } from '@testing-library/react'
import { goToCheckState, setAllWords } from '@/store/slices/wordsSlice'
import { testWords } from '@/components/test-data/test-words'
import { Provider } from 'react-redux'
import { WordView } from './WordView'
import { toggleShowImage } from '@/store/slices/settingsSlice'

test('WordView', () => {
  const store = createStore()
  store.dispatch(setAllWords(testWords))

  const { asFragment } = render(
    <Provider store={store}>
      <WordView />
    </Provider>
  )

  expect(asFragment()).toMatchSnapshot()

  store.dispatch(goToCheckState())
  expect(asFragment()).toMatchSnapshot()

  store.dispatch(toggleShowImage())
  expect(asFragment()).toMatchSnapshot()
})
