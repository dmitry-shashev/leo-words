import { expect, test } from 'vitest'
import { createStore } from '@/store/store'
import { Provider } from 'react-redux'
import { fireEvent, render } from '@testing-library/react'
import { BottomIrregularControl } from '@/components/complex/BottomIrregularControl/BottomIrregularControl'
import { setAllIrregularWords } from '@/store/slices/irregularWordsSlice'
import { testIrregularWords } from '@/components/test-data/test-irregular-words'

test('BottomIrregularControl', () => {
  const store = createStore()
  store.dispatch(setAllIrregularWords(testIrregularWords))

  const { asFragment, getByLabelText, queryByLabelText } = render(
    <Provider store={store}>
      <BottomIrregularControl />
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

  checkButtons(false, false, true, true)
  fireEvent.click(getByLabelText('Check'))

  checkButtons(true, true, false, true)
  fireEvent.click(getByLabelText('Ok'))

  checkButtons(false, false, true, true)
  fireEvent.click(getByLabelText('Check'))

  checkButtons(false, false, true, true)
  fireEvent.click(getByLabelText('Check'))

  checkButtons(true, true, false, true)
  fireEvent.click(getByLabelText('No'))

  checkButtons(false, false, true, true)
  fireEvent.click(getByLabelText('Back'))

  expect(asFragment()).toMatchSnapshot()
})
