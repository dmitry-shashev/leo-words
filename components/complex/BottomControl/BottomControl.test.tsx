import { expect, test } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { BottomControl } from '@/components/complex/BottomControl/BottomControl'
import { StoreProvider } from '@/app/StoreProvider'

test('BottomControl', async () => {
  const { asFragment, getByLabelText, queryByLabelText } = render(
    <StoreProvider>
      <BottomControl />
    </StoreProvider>
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
