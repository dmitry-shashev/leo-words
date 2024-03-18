import { expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { SquareBtn } from '@/components/simple/SquareBtn/SquareBtn'

test('SquareBtn', () => {
  const onClick = vi.fn()

  const { asFragment, getByRole } = render(
    <SquareBtn onClick={onClick} label="Some sqr btn" />
  )

  expect(asFragment()).toMatchSnapshot()

  expect(onClick).toBeCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toBeCalledTimes(1)
})
