import React from 'react'
import { createRoot } from 'react-dom/client'
import UIComponents from './preview/UIComponents'
import { ThemeProvider } from './ThemeProvider'
import './i18n' // Initialize i18n
import './styles.css'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="product-a" applyTo="root">
        <UIComponents />
      </ThemeProvider>
    </React.StrictMode>
  )
}