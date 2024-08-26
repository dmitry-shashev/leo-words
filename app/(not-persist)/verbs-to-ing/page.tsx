import { FC } from 'react'
import { TopMenu } from '@/components/complex/TopMenu/TopMenu'
import { AppVerbsToIng } from '@/components/complex/AppVerbsToIng/AppVerbsToIng'
import { WordView } from '@/components/complex/WordView/WordView'
import { BottomControl } from '@/components/complex/BottomControl/BottomControl'
import { SoundControl } from '@/components/complex/SoundControl/SoundControl'

const VerbsToIngPage: FC = () => {
  return (
    <AppVerbsToIng>
      <TopMenu />
      <WordView />
      <BottomControl />
      <SoundControl />
    </AppVerbsToIng>
  )
}

export default VerbsToIngPage
