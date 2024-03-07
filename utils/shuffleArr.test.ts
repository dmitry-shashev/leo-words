import { expect, test } from 'vitest'
import { shuffleArr } from '@/utils/shuffleArr'

test('shuffleArr', () => {
  function checkFunc<T>(arr: ReadonlyArray<T>): void {
    let result: Array<T>
    do {
      result = shuffleArr(arr)
    } while (result[0] === arr[0])

    expect(arr.length).toBe(result.length)
    expect([...arr].sort()).toEqual([...result].sort())
  }

  checkFunc([2, 15, 7, 21, 72, 0])
  checkFunc(['a', 'c', 'b'])
  expect(shuffleArr([])).toEqual([])
})
