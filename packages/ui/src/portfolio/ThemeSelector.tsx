import React from 'react'
import { useTheme, Theme } from '../ThemeProvider'
import styles from './themeSelector.module.css'

interface ThemeSelectorProps {
  className?: string
}

export function ThemeSelector({ className }: ThemeSelectorProps) {
  const { theme, setTheme } = useTheme()

  const themes: { id: Theme; label: string; colors: [string, string] }[] = [
    { id: 'product-a', label: 'Theme A', colors: ['#ffffff', '#0079c8'] },
    { id: 'product-b', label: 'Theme B', colors: ['#8000c8', '#a0ff3c'] },
    { id: 'product-c', label: 'Theme C', colors: ['#f5f0e8', '#6e5032'] },
  ]

  return (
    <div className={`${styles.selector} ${className || ''}`}>
      {themes.map((t) => (
        <button
          key={t.id}
          className={`${styles.swatch} ${theme === t.id ? styles.active : ''}`}
          onClick={() => setTheme(t.id)}
          aria-pressed={theme === t.id}
          aria-label={t.label}
          title={t.label}
        >
          <span 
            className={styles.colorTop} 
            style={{ backgroundColor: t.colors[0] }} 
          />
          <span 
            className={styles.colorBottom} 
            style={{ backgroundColor: t.colors[1] }} 
          />
        </button>
      ))}
    </div>
  )
}
