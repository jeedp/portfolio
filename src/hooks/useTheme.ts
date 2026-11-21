import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

/** Light by default; the visitor's choice is remembered in this browser. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0e0e0e' : '#efeeeb')
    try { localStorage.setItem('theme', theme) } catch { /* private mode */ }
  }, [theme])
  return { theme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }
}
