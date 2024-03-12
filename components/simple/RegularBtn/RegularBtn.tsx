import { FC } from 'react'

interface Props {
  label: string
  color: 'blue' | 'green' | 'red'
  onClick: () => void
  ariaLabel?: string
}

export const RegularBtn: FC<Props> = ({ label, color, onClick, ariaLabel }) => {
  let bgColor: string
  switch (color) {
    case 'blue':
      bgColor = 'bg-blue-500'
      break
    case 'red':
      bgColor = 'bg-red-700'
      break
    case 'green':
      bgColor = 'bg-green-700'
      break
  }

  return (
    <button
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      className={`${bgColor} text-3xl font-semibold text-white h-16 rounded grow`}
      type="button"
    >
      {label}
    </button>
  )
}
