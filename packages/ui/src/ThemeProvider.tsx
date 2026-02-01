import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'product-a' | 'product-b' | 'product-c';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  /**
   * Where to apply the data-theme attribute.
   * - 'root': applies to document.documentElement (<html>)
   * - 'body': applies to document.body
   * - 'provider': applies to a wrapper div (useful for nested theming)
   */
  applyTo?: 'root' | 'body' | 'provider';
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'product-a',
  applyTo = 'root'
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for stored preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('yuanhhou-theme') as Theme;
      if (stored && (stored === 'product-a' || stored === 'product-b' || stored === 'product-c')) {
        return stored;
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    // Store preference
    localStorage.setItem('yuanhhou-theme', theme);

    // Apply theme attribute based on applyTo setting
    if (applyTo === 'root') {
      document.documentElement.setAttribute('data-theme', theme);
    } else if (applyTo === 'body') {
      document.body.setAttribute('data-theme', theme);
    }
    // 'provider' mode handles it via the wrapper div
  }, [theme, applyTo]);

  const toggleTheme = () => {
    setTheme(current => {
      if (current === 'product-a') return 'product-b';
      if (current === 'product-b') return 'product-c';
      return 'product-a';
    });
  };

  const value = { theme, setTheme, toggleTheme };

  // For 'provider' mode, wrap children in a themed div
  if (applyTo === 'provider') {
    return (
      <ThemeContext.Provider value={value}>
        <div data-theme={theme} style={{ minHeight: '100%' }}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Hook for components that need to respond to theme changes
 * but don't need to change the theme themselves.
 */
export function useCurrentTheme(): Theme {
  const { theme } = useTheme();
  return theme;
}

/* EOF */
