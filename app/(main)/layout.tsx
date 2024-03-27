import '../globals.css'
import { ReactNode } from 'react'
import { StoreProvider } from '@/app/StoreProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>): ReactNode {
  return (
    <div className="p-2">
      <StoreProvider>{children}</StoreProvider>
    </div>
  )
}
