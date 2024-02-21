import { StructEnum } from 'struct-enum'

export interface ShowImageValue {
  value: string
  icon: string
}

class ShowImage extends StructEnum<ShowImage, ShowImageValue> {
  EMPTY = this.buildValue({
    value: '',
    icon: '',
  })

  YES = this.buildValue({
    value: 'Yes',
    icon: '😼',
  })

  NO = this.buildValue({
    value: 'No',
    icon: '🙀',
  })
}

const obj: Readonly<ShowImage> = new ShowImage()
export { obj as ShowImage }
