import { expect, test } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { BottomControl } from '@/components/complex/BottomControl/BottomControl'
import { Provider } from 'react-redux'
import { createStore } from '@/store/store'
import { setAllWords } from '@/store/slices/wordsSlice'
import { testWords } from '@/components/test-data/test-words'

test('BottomControl', () => {
  const store = createStore()
  store.dispatch(setAllWords(testWords))

  const { asFragment, getByLabelText, queryByLabelText } = render(
    <Provider store={store}>
      <BottomControl />
    </Provider>
  )

  function checkButtons(
    ok: boolean,
    no: boolean,
    check: boolean,
    back: boolean
  ): void {
    if (ok) {
      expect(queryByLabelText('Ok')).not.toBeNull()
    } else {
      expect(queryByLabelText('Ok')).toBeNull()
    }
    if (no) {
      expect(queryByLabelText('No')).not.toBeNull()
    } else {
      expect(queryByLabelText('No')).toBeNull()
    }
    if (check) {
      expect(queryByLabelText('Check')).not.toBeNull()
    } else {
      expect(queryByLabelText('Check')).toBeNull()
    }
    if (back) {
      expect(queryByLabelText('Back')).not.toBeNull()
    } else {
      expect(queryByLabelText('Back')).toBeNull()
    }
  }

  checkButtons(false, false, true, true)
  fireEvent.click(getByLabelText('Check'))

  checkButtons(true, true, false, true)
  fireEvent.click(getByLabelText('Ok'))

  checkButtons(false, false, true, true)
  fireEvent.click(getByLabelText('Check'))

  checkButtons(true, true, false, true)
  fireEvent.click(getByLabelText('No'))

  checkButtons(false, false, true, true)
  fireEvent.click(getByLabelText('Back'))

  expect(asFragment()).toMatchSnapshot()
})
