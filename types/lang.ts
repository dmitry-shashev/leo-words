import { StructEnum } from 'struct-enum'

export interface LangValue {
  value: string
  icon: string
}

class Lang extends StructEnum<Lang, LangValue> {
  EMPTY = this.buildValue({
    value: '',
    icon: '',
  })

  EN = this.buildValue({
    value: 'En',
    icon: '🇬🇧',
  })

  RU = this.buildValue({
    value: 'Ru',
    icon: '🇺🇦',
  })
}

const obj: Readonly<Lang> = new Lang()
export { obj as Lang }
