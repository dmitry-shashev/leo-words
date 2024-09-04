import { test, expect, vi } from 'vitest'
import { createStore } from '@/store/store'
import { fireEvent, render } from '@testing-library/react'
import { setAllWords } from '@/store/slices/wordsSlice'
import { testWords } from '@/components/test-data/test-words'
import { Provider } from 'react-redux'
import { Menu } from '@/components/complex/Menu/Menu'
import { useRouter } from 'next/navigation'

const pushFn = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushFn,
  }),
}))

test('Menu', () => {
  const store = createStore()
  store.dispatch(setAllWords(testWords))

  const { push } = useRouter()

  const { asFragment, getByLabelText } = render(
    <Provider store={store}>
      <Menu />
    </Provider>
  )

  expect(asFragment()).toMatchSnapshot()

  fireEvent.click(getByLabelText('All Words'))
  expect(push).toBeCalledWith('/all')

  const lastInput = getByLabelText('Last Input')
  fireEvent.change(lastInput, { target: { value: '200' } })
  fireEvent.click(getByLabelText('Last'))
  expect(push).toBeCalledWith('/last/200')

  const offsetInput = getByLabelText('Offset Input')
  fireEvent.change(offsetInput, { target: { value: '100' } })
  const limitInput = getByLabelText('Limit Input')
  fireEvent.change(limitInput, { target: { value: '50' } })
  fireEvent.click(getByLabelText('Offset Limit'))
  expect(push).toBeCalledWith('/offsetlimit/100/50')

  fireEvent.click(getByLabelText('Verbs to ing'))
  expect(push).toBeCalledWith('/verbs-to-ing')

  fireEvent.click(getByLabelText('Irregular'))
  expect(push).toBeCalledWith('/irregular')
})
