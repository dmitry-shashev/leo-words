import { expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { TransparentBtn } from '@/components/simple/TransparentBtn/TransparentBtn'

test('TransparentBtn', () => {
  const onClick = vi.fn()

  const { asFragment, getByRole } = render(
    <TransparentBtn label="monday" ariaLabel="some btn" onClick={onClick} />
  )

  expect(asFragment()).toMatchSnapshot()

  expect(onClick).toBeCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toBeCalledTimes(1)
})
