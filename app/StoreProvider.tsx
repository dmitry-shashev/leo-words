'use client'

import { FC, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from '@/store/store'
import { PersistGate } from 'redux-persist/integration/react'
import packageJson from '../package.json'

interface Props {
  children: ReactNode
}

export const StoreProvider: FC<Props> = ({ children }) => {
  useEffect(() => {
    const currenVersion = localStorage.getItem('version')
    const currentUrl = localStorage.getItem('currentUrl')

    if (
      !currenVersion ||
      currenVersion !== packageJson.version ||
      currentUrl !== location.href
    ) {
      localStorage.clear()
      localStorage.setItem('currentUrl', location.href)
      localStorage.setItem('version', packageJson.version)
      window.location.reload()
      return
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )
}
