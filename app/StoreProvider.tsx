'use client'

import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'

interface Props {
  children: ReactNode
}

export const StoreProvider: FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}
