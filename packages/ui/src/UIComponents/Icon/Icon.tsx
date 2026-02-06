import React from 'react'
import styles from './icon.module.css'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl'
export type IconColor = 'primary' | 'secondary' | 'tertiary' | 'brand' | 'success' | 'danger' | 'warning' | 'info' | 'on-primary' | 'inherit'

export interface IconProps {
  /** The Phosphor icon component to render */
  icon: React.ElementType
  /** Size of the icon - maps to design tokens */
  size?: IconSize
  /** Semantic color of the icon */
  color?: IconColor
  /** Weight of the icon (Phosphor-specific) */
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
  /** Custom className */
  className?: string
  /** Accessible label (required if icon conveys meaning) */
  'aria-label'?: string
  /** Set to true if icon is purely decorative */
  'aria-hidden'?: boolean
}

/**
 * Icon component - wrapper for Phosphor icons using design system tokens
 *
 * @example
 * <Icon icon={Star} size="md" color="brand" />
 * <Icon icon={Check} size="lg" color="success" aria-label="Completed" />
 */
export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color = 'primary',
  weight = 'regular',
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}) => {
  const classes = [
    styles.icon,
    styles[size],
    styles[`color-${color}`],
    className,
  ].filter(Boolean).join(' ')

  // If no aria-label, default to aria-hidden for decorative icons
  const isHidden = ariaHidden ?? !ariaLabel

  return (
    <span className={classes} role={ariaLabel ? 'img' : undefined} aria-label={ariaLabel} aria-hidden={isHidden}>
      <IconComponent weight={weight} className={styles.svg} />
    </span>
  )
}

export default Icon
