import { StructEnum } from 'struct-enum'

export interface TimePeriodValue {
  value: string
  seconds: number
}

class TimePeriod extends StructEnum<TimePeriod, TimePeriodValue> {
  EMPTY = this.buildValue({
    value: '',
    seconds: 0,
  })

  DAY = this.buildValue({
    value: 'day',
    seconds: 24 * 60 * 60,
  })

  WEEK = this.buildValue({
    value: 'week',
    seconds: 7 * 24 * 60 * 60,
  })

  MONTH = this.buildValue({
    value: 'month',
    seconds: 30 * 24 * 60 * 60,
  })

  YEAR = this.buildValue({
    value: 'year',
    seconds: 365 * 24 * 60 * 60,
  })

  getByValue(value: TimePeriodValue['value']): TimePeriodValue {
    return this.getByFieldValue('value', value)
  }
}

const obj: Readonly<TimePeriod> = new TimePeriod()
export { obj as TimePeriod }
