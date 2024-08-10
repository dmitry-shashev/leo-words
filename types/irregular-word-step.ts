import { StructEnum } from 'struct-enum'

export interface IrregularWordStepValue {
  value: string
}

class IrregularWordStep extends StructEnum<
  IrregularWordStep,
  IrregularWordStepValue
> {
  EMPTY = this.buildValue({
    value: '',
  })

  CHECK_INFINITIVE = this.buildValue({
    value: 'check_infinitive',
  })

  CHECK_PAST_SIMPLE = this.buildValue({
    value: 'check_past_simple',
  })

  CHECK_PAST_PARTICIPLE = this.buildValue({
    value: 'check_past_participle',
  })
}

const obj: Readonly<IrregularWordStep> = new IrregularWordStep()
export { obj as IrregularWordStep }
