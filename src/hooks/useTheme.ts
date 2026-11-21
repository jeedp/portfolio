import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

/** Dark by default; the visitor's choice is remembered in this browser. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#08090c' : '#f6f7f9')
    try { localStorage.setItem('theme', theme) } catch { /* private mode */ }
  }, [theme])
  return { theme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }
}
