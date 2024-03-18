import { expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { WordsBtn } from '@/components/simple/WordsBtn/WordsBtn'

test('WordsBtn', () => {
  const onClick = vi.fn()

  const { asFragment, getByRole } = render(
    <WordsBtn
      current={15}
      wrong={6}
      total={1231}
      onClick={onClick}
      hoverMode={false}
    />
  )

  expect(asFragment()).toMatchSnapshot()

  expect(onClick).toBeCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toBeCalledTimes(1)
})
