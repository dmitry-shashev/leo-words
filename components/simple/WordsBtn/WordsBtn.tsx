import { FC } from 'react'

interface Props {
  current: number
  wrong: number
  total: number
  hoverMode: boolean
  onClick: () => void
}

export const WordsBtn: FC<Props> = ({
  current,
  wrong,
  total,
  onClick,
  hoverMode,
}) => {
  let bgColor = ''
  if (hoverMode) {
    bgColor = 'bg-blue-100'
  }
  return (
    <button
      onClick={onClick}
      className={`${bgColor} h-10 px-2 text-xl`}
      type="button"
      aria-label="Words button"
    >
      <span aria-label="Counter current" className="text-emerald-500">
        {current}
      </span>
      <span className="mx-1">/</span>
      <span aria-label="Counter wrong" className="text-orange-700">
        {wrong}
      </span>
      <span className="mx-1">/</span>
      <span aria-label="Counter total" className="text-gray-400">
        {total}
      </span>
    </button>
  )
}
