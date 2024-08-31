'use client'

import { FC, useState } from 'react'
import { RegularBtn } from '@/components/simple/RegularBtn/RegularBtn'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { getWordsAll } from '@/store/slices/wordsSlice'

const BLOCK_CLASSES = 'bg-amber-200 p-2 mx-1 mb-3'
const LABEL_CLASSES =
  'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
const INPUT_CLASSES =
  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

export const Menu: FC = () => {
  const router = useRouter()

  const allWords = useSelector(getWordsAll)

  const [last, setLast] = useState<string>('100')
  const [offset, setOffset] = useState('0')
  const [limit, setLimit] = useState('100')

  const onAll = (): void => {
    router.push('/all')
  }

  const onLast = (): void => {
    router.push(`/last/${last}`)
  }

  const onOffsetLimit = (): void => {
    router.push(`/offsetlimit/${offset}/${limit}`)
  }

  const onIrregular = (): void => {
    router.push('/irregular')
  }

  const onVerbsToIng = (): void => {
    router.push('/verbs-to-ing')
  }

  return (
    <>
      <div className={BLOCK_CLASSES}>
        <div>
          Total Words: <b>{allWords.length}</b>
        </div>
      </div>
      <form className={BLOCK_CLASSES}>
        <div className="flex">
          <RegularBtn
            onClick={onAll}
            label="All Words"
            color="blue"
            ariaLabel="All Words"
            size="medium"
          />
        </div>
      </form>

      <form className={BLOCK_CLASSES}>
        <div className="mb-6">
          <label htmlFor="lastInput" className={LABEL_CLASSES}>
            Last Words
          </label>
          <input
            value={last}
            onChange={(e) => setLast(e.target.value)}
            type="text"
            id="lastInput"
            className={INPUT_CLASSES}
          />
        </div>
        <div className="flex">
          <RegularBtn
            onClick={onLast}
            label="Last"
            color="blue"
            ariaLabel="Last"
            size="medium"
          />
        </div>
      </form>

      <form className={BLOCK_CLASSES}>
        <div className="mb-6">
          <label htmlFor="offsetInput" className={LABEL_CLASSES}>
            Offset
          </label>
          <input
            onChange={(e) => setOffset(e.target.value)}
            value={offset}
            className={INPUT_CLASSES}
            type="text"
            id="offsetInput"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="limitInput" className={LABEL_CLASSES}>
            Limit
          </label>
          <input
            onChange={(e) => setLimit(e.target.value)}
            value={limit}
            className={INPUT_CLASSES}
            type="text"
            id="limitInput"
          />
        </div>
        <div className="flex">
          <RegularBtn
            onClick={onOffsetLimit}
            label="Offset Limit"
            color="blue"
            ariaLabel="Offset Limit"
            size="medium"
          />
        </div>
      </form>

      <form className={BLOCK_CLASSES}>
        <div className="flex">
          <RegularBtn
            onClick={onIrregular}
            label="Irregular"
            color="blue"
            ariaLabel="Irregular"
            size="medium"
          />
        </div>
      </form>

      <form className={BLOCK_CLASSES}>
        <div className="flex">
          <RegularBtn
            onClick={onVerbsToIng}
            label="Verbs to ing"
            color="blue"
            ariaLabel="Verbs to ing"
            size="medium"
          />
        </div>
      </form>
    </>
  )
}
