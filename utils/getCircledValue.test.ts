import { expect, test } from 'vitest'
import {
  getNextCircledValue,
  getPrevCircledValue,
} from '@/utils/getCircledValue'

test('getNextCircledValue', () => {
  const data = getData()

  expect(getNextCircledValue({ id: 5 }, data)).toEqual({
    value: {
      id: 7,
    },
    reset: true,
  })
  expect(getNextCircledValue({ id: 3 }, data)).toEqual({
    value: {
      id: 12,
    },
    reset: false,
  })
  expect(getNextCircledValue({ id: 7 }, data)).toEqual({
    value: {
      id: 3,
    },
    reset: false,
  })
  expect(getNextCircledValue({ id: 200 }, data)).toEqual({
    value: {
      id: 200,
    },
    reset: false,
  })
  expect(getNextCircledValue({ id: 200 }, [])).toEqual({
    value: {
      id: 200,
    },
    reset: false,
  })

  expect(data).toEqual(getData())
})

test('getPrevCircledValue', () => {
  const data = getData()

  expect(getPrevCircledValue({ id: 7 }, data)).toEqual({
    value: {
      id: 5,
    },
    reset: true,
  })
  expect(getPrevCircledValue({ id: 5 }, data)).toEqual({
    value: {
      id: 12,
    },
    reset: false,
  })
  expect(getPrevCircledValue({ id: 12 }, data)).toEqual({
    value: {
      id: 3,
    },
    reset: false,
  })
  expect(getPrevCircledValue({ id: 200 }, data)).toEqual({
    value: {
      id: 200,
    },
    reset: false,
  })
  expect(getPrevCircledValue({ id: 200 }, [])).toEqual({
    value: {
      id: 200,
    },
    reset: false,
  })

  expect(data).toEqual(getData())
})

const getData = (): Array<{ id: number }> => [
  {
    id: 7,
  },
  {
    id: 3,
  },
  {
    id: 12,
  },
  {
    id: 5,
  },
]
