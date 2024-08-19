import '../globals.css'
import { ReactNode } from 'react'
import { NotPersistStoreProvider } from '@/app/NotPersistStoreProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>): ReactNode {
  return (
    <div className="p-2">
      <NotPersistStoreProvider>{children}</NotPersistStoreProvider>
    </div>
  )
}
