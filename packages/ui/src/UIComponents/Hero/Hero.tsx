import React from 'react'
import styles from './hero.module.css'

export type HeroProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  className?: string
  /** CTA removed — title/subtitle only. Remove these props from callers if safe. */
  /** Heading level for accessibility (h1..h6) */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = 'Hero image',
  className,
  headingLevel = 'h1',
}) => {
  const Heading = headingLevel as any

  return (
    <section className={`${styles.hero} ${className ?? ''}`} aria-labelledby="hero-heading">
      <div className={styles.text}>
        <Heading id="hero-heading" className={styles.title}>{title}</Heading>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {/* CTA removed by request; keep title/subtitle only */}
      </div>

      <div className={styles.media} aria-hidden={imageSrc ? 'false' : 'true'}>
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
    </section>
  )
}

export default Hero
