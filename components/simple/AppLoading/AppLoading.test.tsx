import { expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { AppLoading } from '@/components/simple/AppLoading/AppLoading'

test('AppLoading', () => {
  const { asFragment } = render(<AppLoading />)

  expect(asFragment()).toMatchSnapshot()
})
