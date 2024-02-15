import { FC } from 'react'

interface Props {
  label: string | number
  onClick: () => void
}

export const SquareBtn: FC<Props> = ({ label, onClick }) => {
  return (
    <button
      className="w-10 h-10 text-gray-400 text-xl opacity-30"
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}
