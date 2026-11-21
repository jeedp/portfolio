import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { nav, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = nav.map(n => n.id)

/** Compact sticky bar: JP on the left, the sections in the middle, the résumé on the right. */
export function Navbar({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
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

  const pdf = `${import.meta.env.BASE_URL}${profile.resume}`
  const solid = scrolled || open
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${solid ? 'border-line bg-bg/85 backdrop-blur-lg' : 'border-transparent'}`}>
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent">
        Skip to content
      </a>
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between gap-6">
        <a href="#home" aria-label={`${profile.name}, home`} className="grid size-9 place-items-center rounded-lg border border-line-strong font-mono text-[13px] font-medium text-ink transition-colors hover:border-accent hover:text-accent">
          JP
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map(item => {
            const on = active === item.id
            return (
              <li key={item.id}>
                <a href={`#${item.id}`} aria-current={on ? 'true' : undefined} className={`relative py-2 text-sm transition-colors ${on ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                  {item.label}
                  {on && <motion.span layoutId="nav-underline" aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-px bg-accent" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </button>
          <a href={pdf} download className="hidden h-9 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition-[border-color,background-color,transform] hover:border-ink/50 hover:bg-surface active:scale-[.97] sm:inline-flex">
            Résumé <Download className="size-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-9 place-items-center rounded-full text-ink md:hidden"
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
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg md:hidden"
          >
            <ul className="shell py-6">
              {nav.map((item, i) => (
                <motion.li key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 * i, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                  <a href={`#${item.id}`} onClick={() => setOpen(false)} className={`flex items-baseline gap-4 border-b border-line py-4 text-2xl font-medium tracking-tight ${active === item.id ? 'text-ink' : 'text-body'}`}>
                    <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="shell">
              <a href={pdf} download className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-[15px] font-medium text-on-accent">
                Download résumé <Download className="size-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
