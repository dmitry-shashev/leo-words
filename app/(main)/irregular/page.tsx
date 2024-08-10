import { FC } from 'react'
import { AppIrregular } from '@/components/complex/AppIrregular/AppIrregular'
import { TopIrregularMenu } from '@/components/complex/TopIrregularMenu/TopIrregularMenu'
import { IrregularWordView } from '@/components/complex/IrregularWordView/IrregularWordView'
import { BottomIrregularControl } from '@/components/complex/BottomIrregularControl/BottomIrregularControl'

const IrregularPage: FC = () => {
  return (
    <AppIrregular>
      <TopIrregularMenu />
      <IrregularWordView />
      <BottomIrregularControl />
    </AppIrregular>
  )
}

export default IrregularPage
