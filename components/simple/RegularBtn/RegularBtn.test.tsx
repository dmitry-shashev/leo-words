import { expect, test, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { RegularBtn } from '@/components/simple/RegularBtn/RegularBtn'

test('RegularBrn', () => {
  const onClick = vi.fn()
  const label = 'Some btn'
  const { asFragment, getByRole } = render(
    <RegularBtn label={label} onClick={onClick} color="green" />
  )

  expect(asFragment()).toMatchSnapshot()

  expect(onClick).toBeCalledTimes(0)
  fireEvent.click(getByRole('button'))
  expect(onClick).toBeCalledTimes(1)
})

test('RegularBrn - medium', () => {
  const onClick = vi.fn()
  const label = 'Some medium btn'
  const { asFragment } = render(
    <RegularBtn label={label} onClick={onClick} color="green" size="medium" />
  )

  expect(asFragment()).toMatchSnapshot()
})
