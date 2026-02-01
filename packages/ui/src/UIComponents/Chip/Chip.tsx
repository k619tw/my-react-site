import React from 'react'
import styles from './chip.module.css'

const checkmarkIcon = 'http://localhost:3845/assets/a7ddbb5830c0ef538ebefe242336bda65f3262b3.svg'
const angleIcon = 'http://localhost:3845/assets/e351285055696d4d9a078b25a886f6156f1ce948.svg'

export type ChipProps = {
  /** Label text for the chip */
  label: React.ReactNode
  /** Selected state */
  selected?: boolean
  /** Callback when chip is clicked */
  onClick?: () => void
  /** Optional className */
  className?: string
  /** ARIA role for accessibility */
  role?: 'radio' | 'checkbox'
  /** Show/hide icon */
  showIcon?: boolean
  /** Custom icon element (Phosphor icon or other) — overrides default placeholder */
  icon?: React.ReactNode
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onClick,
  className,
  role = 'button',
  showIcon = true,
  icon,
}) => {
  const chipClasses = [
    styles.chip,
    selected ? styles['chip--selected'] : styles['chip--unselected'],
    className || '',
  ].filter(Boolean).join(' ')

  const defaultIcon = selected ? checkmarkIcon : angleIcon
  const iconToShow = icon !== undefined ? icon : defaultIcon

  return (
    <button
      className={chipClasses}
      onClick={onClick}
      type="button"
      role={role}
      aria-checked={role === 'radio' || role === 'checkbox' ? selected : undefined}
      aria-pressed={role === 'button' ? selected : undefined}
    >
      {showIcon && (
        <div className={styles.icon}>
          {typeof iconToShow === 'string' ? (
            <img src={iconToShow} alt="" />
          ) : (
            iconToShow
          )}
        </div>
      )}
      <span>{label}</span>
    </button>
  )
}

export default Chip
