import { FC } from 'react'

interface Props {
  label: string
  color: 'blue' | 'green' | 'red'
  size?: 'large' | 'medium'
  onClick: () => void
  ariaLabel?: string
}

export const RegularBtn: FC<Props> = ({
  label,
  color,
  onClick,
  ariaLabel,
  size = 'large',
}) => {
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

  let sizeClasses: string
  switch (size) {
    case 'large':
      sizeClasses = 'text-3xl h-16 '
      break
    case 'medium':
      sizeClasses = 'text-xl h-10'
      break
    default:
      sizeClasses = ''
  }

  return (
    <button
      aria-label={ariaLabel ?? label}
      onClick={onClick}
      className={`${bgColor} ${sizeClasses} font-semibold text-white rounded grow`}
      type="button"
    >
      {label}
    </button>
  )
}
