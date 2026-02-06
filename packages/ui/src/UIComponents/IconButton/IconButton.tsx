import React from 'react'
import styles from './iconButton.module.css'

export type IconButtonSize = 'sm' | 'md' | 'lg'
export type IconButtonVariant = 'default' | 'ghost' | 'brand' | 'danger'

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** The Phosphor icon component to render */
  icon: React.ElementType
  /** Size of the button and icon */
  size?: IconButtonSize
  /** Visual variant */
  variant?: IconButtonVariant
  /** Weight of the icon (Phosphor-specific) */
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  /** Accessible label (required for icon-only buttons) */
  'aria-label': string
  /** Optional href to render as anchor */
  href?: string
  /** Whether link opens in new tab */
  external?: boolean
}

/**
 * IconButton - An accessible icon-only button component
 *
 * @example
 * <IconButton icon={X} aria-label="Close dialog" onClick={onClose} />
 * <IconButton icon={Trash} variant="danger" aria-label="Delete item" />
 * <IconButton icon={ArrowRight} href="/next" aria-label="Go to next page" />
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon: IconComponent,
  size = 'md',
  variant = 'default',
  weight = 'regular',
  'aria-label': ariaLabel,
  href,
  external,
  className,
  disabled,
  ...props
}) => {
  const classes = [
    styles.iconButton,
    styles[size],
    styles[variant],
    disabled && styles.disabled,
    className,
  ].filter(Boolean).join(' ')

  const iconElement = <IconComponent weight={weight} className={styles.icon} aria-hidden="true" />

  // Render as anchor if href is provided
  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {iconElement}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
      {...props}
    >
      {iconElement}
    </button>
  )
}

export default IconButton
