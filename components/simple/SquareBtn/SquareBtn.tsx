import { FC } from 'react'

interface Props {
  label: string
  onClick: () => void
  ariaLabel?: string
}

export const SquareBtn: FC<Props> = ({ label, onClick, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      className="w-10 h-10 text-gray-400 text-xl opacity-30"
      type="button"
    >
      {label}
    </button>
  )
}
