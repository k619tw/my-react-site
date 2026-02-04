import React from 'react'
import { Check, CaretRight } from '@phosphor-icons/react'
import styles from './chip.module.css'

export type ChipProps = {
  /** Label text for the chip */
  label: React.ReactNode
  /** Selected state */
  selected?: boolean
  /** Callback when chip is clicked */
  onClick?: () => void
  /** Callback when chip receives focus */
  onFocus?: () => void
  /** Optional className */
  className?: string
  /** ARIA role for accessibility */
  role?: 'radio' | 'checkbox'
  /** Show/hide icon */
  showIcon?: boolean
  /** Custom icon element (Phosphor icon or other) — overrides default placeholder */
  icon?: React.ReactNode
  /** Tab index for keyboard navigation */
  tabIndex?: number
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(({
  label,
  selected = false,
  onClick,
  onFocus,
  className,
  role = 'button',
  showIcon = true,
  icon,
  tabIndex,
}, ref) => {
  const chipClasses = [
    styles.chip,
    selected ? styles['chip--selected'] : styles['chip--unselected'],
    className || '',
  ].filter(Boolean).join(' ')

  const defaultIcon = selected
    ? <Check size={16} weight="bold" aria-hidden="true" />
    : <CaretRight size={16} weight="bold" aria-hidden="true" />
  const iconToShow = icon !== undefined ? icon : defaultIcon

  return (
    <button
      ref={ref}
      className={chipClasses}
      onClick={onClick}
      onFocus={onFocus}
      type="button"
      role={role}
      aria-checked={role === 'radio' || role === 'checkbox' ? selected : undefined}
      aria-pressed={role === 'button' ? selected : undefined}
      tabIndex={tabIndex}
    >
      {showIcon && (
        <div className={styles.icon}>
          {iconToShow}
        </div>
      )}
      <span>{label}</span>
    </button>
  )
})

Chip.displayName = 'Chip'

export default Chip
