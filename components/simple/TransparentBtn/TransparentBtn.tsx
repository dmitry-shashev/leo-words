import { FC } from 'react'

interface Props {
  label: string
  onClick: () => void
  ariaLabel?: string
}

export const TransparentBtn: FC<Props> = ({ label, onClick, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      className="grow text-lg text-blue-200 border-blue-200 border rounded h-10"
      type="button"
    >
      {label}
    </button>
  )
}
