import { FC } from 'react'
import { TopMenu } from '@/components/complex/TopMenu/TopMenu'
import { App } from '@/components/complex/App/App'
import { WordView } from '@/components/complex/WordView/WordView'
import { BottomControl } from '@/components/complex/BottomControl/BottomControl'
import { SoundControl } from '@/components/complex/SoundControl/SoundControl'

interface Props {
  param: {
    wordsLimit: number
  }
}

const LastPage: FC<Props> = ({ params: { wordsLimit } }: any) => {
  return (
    <App wordsLimit={wordsLimit}>
      <TopMenu />
      <WordView />
      <BottomControl />
      <SoundControl />
    </App>
  )
}

export default LastPage
