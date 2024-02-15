import { StructEnum } from 'struct-enum'

export interface SoundValue {
  value: number
  icon: string
}

class Sound extends StructEnum<Sound, SoundValue> {
  EMPTY = this.buildValue({
    icon: '',
    value: -1,
  })

  ON = this.buildValue({
    icon: '🔊',
    value: 1,
  })

  OFF = this.buildValue({
    icon: '🔇',
    value: 0,
  })
}

const obj: Readonly<Sound> = new Sound()
export { obj as Sound }
