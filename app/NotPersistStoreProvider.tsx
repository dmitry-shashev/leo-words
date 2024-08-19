'use client'

import { FC, ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { createStore } from '@/store/store'
import packageJson from '../package.json'

interface Props {
  children: ReactNode
}

export const NotPersistStoreProvider: FC<Props> = ({ children }) => {
  useEffect(() => {
    const currenVersion = sessionStorage.getItem('version')
    const currentUrl = sessionStorage.getItem('currentUrl')

    if (
      !currenVersion ||
      currenVersion !== packageJson.version ||
      currentUrl !== location.href
    ) {
      sessionStorage.setItem('currentUrl', location.href)
      sessionStorage.setItem('version', packageJson.version)
      window.location.reload()
      return
    }
  }, [])

  return <Provider store={createStore()}>{children}</Provider>
}
