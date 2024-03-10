import { StructEnum } from 'struct-enum'

export interface SpeedModeValue {
  value: string
  icon: string
}

class SpeedMode extends StructEnum<SpeedMode, SpeedModeValue> {
  EMPTY = this.buildValue({
    value: '',
    icon: '',
  })

  YES = this.buildValue({
    value: 'Yes',
    icon: '🚀',
  })

  NO = this.buildValue({
    value: 'No',
    icon: '🐌',
  })
}

const obj: Readonly<SpeedMode> = new SpeedMode()
export { obj as SpeedMode }
