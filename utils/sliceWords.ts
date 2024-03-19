import { Word } from '@/models/word'
import { TimePeriod } from '@/types/time-period'

export function sliceByTimePeriod(
  periodValue: string,
  words: ReadonlyArray<Word>
): Array<Word> {
  const period = TimePeriod.getByValue(periodValue)
  let time = Date.now() / 1000 - period.seconds
  return words.filter((v) => v.created > time)
}

export function sliceByLastNum(
  lastNum: string | number,
  words: ReadonlyArray<Word>
): Array<Word> {
  const parsedLastNum = parseInt(String(lastNum))
  if (!isNaN(parsedLastNum) && parsedLastNum) {
    return words.slice(0, parsedLastNum)
  }

  return [...words]
}

export function sliceByOffsetLimit(
  offset: number | string,
  limit: number | string | undefined,
  words: ReadonlyArray<Word>
): Array<Word> {
  const currentOffset: number = Number(offset)
  const currentLimit: number | undefined =
    limit !== undefined ? Number(limit) + currentOffset : undefined

  return [...words].reverse().slice(currentOffset, currentLimit)
}
