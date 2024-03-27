import { FC } from 'react'
import { App } from '@/components/complex/App/App'
import { TopMenu } from '@/components/complex/TopMenu/TopMenu'
import { WordView } from '@/components/complex/WordView/WordView'
import { BottomControl } from '@/components/complex/BottomControl/BottomControl'
import { SoundControl } from '@/components/complex/SoundControl/SoundControl'

interface Props {
  params: {
    offset: string
    limit: string
  }
}

const OffsetLimitPage: FC<Props> = ({ params: { offset, limit } }) => {
  return (
    <App limit={+limit} offset={+offset}>
      <TopMenu />
      <WordView />
      <BottomControl />
      <SoundControl />
    </App>
  )
}

export default OffsetLimitPage
