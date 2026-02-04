import React from 'react'
import { useTheme, Theme } from '../ThemeProvider'
import styles from './themeSelector.module.css'

interface ThemeSelectorProps {
  className?: string
  'aria-labelledby'?: string
}

export function ThemeSelector({ className, 'aria-labelledby': ariaLabelledBy }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme()

  const themes: { id: Theme; label: string; description: string; colors: [string, string] }[] = [
    { id: 'product-a', label: 'Theme A', description: 'White and Blue theme', colors: ['#ffffff', '#0079c8'] },
    { id: 'product-b', label: 'Theme B', description: 'Purple and Lime theme', colors: ['#8000c8', '#a0ff3c'] },
    { id: 'product-c', label: 'Theme C', description: 'Cream and Brown theme', colors: ['#f5f0e8', '#6e5032'] },
  ]

  return (
    <div
      className={`${styles.selector} ${className || ''}`}
      role="radiogroup"
      aria-labelledby={ariaLabelledBy}
    >
      {themes.map((t) => (
        <button
          key={t.id}
          className={`${styles.swatch} ${theme === t.id ? styles.active : ''}`}
          onClick={() => setTheme(t.id)}
          role="radio"
          aria-checked={theme === t.id}
          aria-label={t.description}
          title={t.label}
        >
          <span
            className={styles.colorTop}
            style={{ backgroundColor: t.colors[0] }}
            aria-hidden="true"
          />
          <span
            className={styles.colorBottom}
            style={{ backgroundColor: t.colors[1] }}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  )
}
