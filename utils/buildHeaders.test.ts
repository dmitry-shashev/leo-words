import { expect, test } from 'vitest'
import { buildHeaders } from '@/utils/buildHeaders'

test('buildHeaders', () => {
  expect(buildHeaders('b12134')).toEqual({
    'Content-type': 'application/json',
    Referer: 'https://lingualeo.com/ru',
    Origin: 'https://lingualeo.com',
    Cookie: 'remember=b12134',
  })
})
