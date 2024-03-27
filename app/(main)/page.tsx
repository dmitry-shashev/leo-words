import { FC } from 'react'
import { WordView } from '@/components/complex/WordView/WordView'
import { TopMenu } from '@/components/complex/TopMenu/TopMenu'
import { BottomControl } from '@/components/complex/BottomControl/BottomControl'
import { App } from '@/components/complex/App/App'
import { SoundControl } from '@/components/complex/SoundControl/SoundControl'

const HomePage: FC = () => {
  return (
    <App>
      <TopMenu />
      <WordView />
      <BottomControl />
      <SoundControl />
    </App>
  )
}

export default HomePage
