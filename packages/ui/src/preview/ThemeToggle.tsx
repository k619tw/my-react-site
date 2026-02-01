import React from 'react';
import { useTheme, Theme } from '../ThemeProvider';
import styles from './ThemeToggle.module.css';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const getSliderPosition = () => {
    if (theme === 'product-a') return 'translateX(0)';
    if (theme === 'product-b') return 'translateX(100%)';
    return 'translateX(200%)';
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <span className={styles.label}>Theme</span>
      <div className={styles.toggle}>
        <button
          className={`${styles.option} ${theme === 'product-a' ? styles.active : ''}`}
          onClick={() => setTheme('product-a')}
          aria-pressed={theme === 'product-a'}
        >
          <span className={styles.icon}>☀️</span>
          <span>A</span>
        </button>
        <button
          className={`${styles.option} ${theme === 'product-b' ? styles.active : ''}`}
          onClick={() => setTheme('product-b')}
          aria-pressed={theme === 'product-b'}
        >
          <span className={styles.icon}>🤖</span>
          <span>EVA</span>
        </button>
        <button
          className={`${styles.option} ${theme === 'product-c' ? styles.active : ''}`}
          onClick={() => setTheme('product-c')}
          aria-pressed={theme === 'product-c'}
        >
          <span className={styles.icon}>🏠</span>
          <span>MUJI</span>
        </button>
        <div 
          className={styles.slider} 
          style={{ 
            transform: getSliderPosition()
          }} 
        />
      </div>
    </div>
  );
}

/* EOF */
