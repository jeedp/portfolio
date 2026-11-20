import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { nav, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = nav.map(n => n.id)

export function Navbar({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'}`}>
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-bg">
        Skip to content
      </a>
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-6">
        <a href="#home" className="group flex items-center gap-2.5 text-[15px] font-medium text-ink" aria-label={`${profile.shortName}, back to top`}>
          <span aria-hidden="true" className="grid size-7 place-items-center rounded-md bg-ink font-mono text-[11px] font-semibold text-bg transition-colors group-hover:bg-accent group-hover:text-on-accent">JP</span>
          {profile.shortName}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.filter(n => n.id !== 'home').map(item => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-2 text-sm transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      aria-hidden="true"
                      className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <a
            href={`${import.meta.env.BASE_URL}${profile.resume}`}
            download
            className="hidden h-9 items-center rounded-full border border-line-strong px-4 text-sm text-ink transition-[border-color,transform] hover:border-ink active:scale-[.97] sm:inline-flex"
          >
            Résumé
          </a>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-raised md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="h-[calc(100dvh-4rem)] border-t border-line bg-bg md:hidden"
          >
            <ul className="container-page pt-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between border-b border-line py-4 text-2xl font-medium tracking-tight ${active === item.id ? 'text-ink' : 'text-muted'}`}
                  >
                    {item.label}
                    {active === item.id && <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-page mt-8">
              <a href={`${import.meta.env.BASE_URL}${profile.resume}`} download className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-bg">
                Download résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
