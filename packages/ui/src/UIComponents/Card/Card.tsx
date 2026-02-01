import React from 'react'
import styles from './card.module.css'

export type CardProps = {
  /** Card title */
  title?: React.ReactNode
  /** Body text / description */
  body?: React.ReactNode
  /** Footer content (typically a Button) */
  footer?: React.ReactNode
  /** Optional className */
  className?: string
  /** Asset element (Phosphor icon or image) — for icon, pass `<Info size={32} weight="bold" />` */
  asset?: React.ReactNode
  /** Asset type determines sizing: 'icon' = 32px Phosphor icon, 'image' = 160px box */
  assetType?: 'icon' | 'image'
  /** Layout direction: 'horizontal' = asset beside content, 'vertical' = asset above content */
  direction?: 'horizontal' | 'vertical'
  /** Variant: 'transparent' = no background, 'filled' = background-secondary with border-radius */
  variant?: 'transparent' | 'filled'
}

export const Card: React.FC<CardProps> = ({
  title,
  body,
  footer,
  className,
  asset,
  assetType = 'icon',
  direction = 'horizontal',
  variant = 'transparent',
}) => {
  const rootClasses = [
    styles.card,
    styles[`card--${direction}`],
    styles[`card--${variant}`],
    className || '',
  ].filter(Boolean).join(' ')

  const assetClasses = [
    styles.asset,
    assetType === 'image' ? styles['asset--image'] : styles['asset--icon'],
  ].join(' ')

  return (
    <div className={rootClasses}>
      {asset && <div className={assetClasses}>{asset}</div>}

      <div className={styles.content}>
        <div className={styles.text}>
          {title && <div className={styles.title}>{title}</div>}
          {body && <div className={styles.body}>{body}</div>}
        </div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  )
}

export default Card
