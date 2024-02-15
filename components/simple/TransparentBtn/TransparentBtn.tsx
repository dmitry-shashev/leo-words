import { FC } from 'react'

interface Props {
  label: string
  onClick: () => void
}

export const TransparentBtn: FC<Props> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="grow text-lg text-blue-200 border-blue-200 border rounded h-10"
      type="button"
    >
      {label}
    </button>
  )
}
