import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { nav, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = nav.map(n => n.id)

/**
 * The template's header (centred links, a frosted bar once you scroll past the hero),
 * extended with the name on the left, a theme switch, a résumé link and a mobile menu.
 */
export function Navbar({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${solid ? 'bg-bg/80 shadow-[0_1px_0_var(--line)] backdrop-blur-md' : ''}`}>
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-on-accent">
        Skip to content
      </a>
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between gap-6">
        <a href="#home" className={`font-mono text-[15px] font-semibold text-ink transition-opacity duration-300 ${solid ? 'opacity-100' : 'md:opacity-0 md:pointer-events-none'}`}>
          {profile.shortName}<span className="text-accent">.</span>
        </a>

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {nav.filter(n => n.id !== 'home').map(item => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative py-1 font-mono text-[15px] font-medium transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span layoutId="nav-bar" aria-hidden="true" className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
                  )}
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
            className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-soft hover:text-ink"
          >
            {theme === 'dark' ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </button>
          <a
            href={`${import.meta.env.BASE_URL}${profile.resume}`}
            download
            className="hidden h-10 items-center rounded-full bg-ink px-5 font-mono text-sm font-medium text-bg transition-[background-color,color,transform] hover:bg-accent hover:text-on-accent active:scale-[.97] md:inline-flex"
          >
            Résumé
          </a>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-soft md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="shell pb-6">
              {nav.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-line py-3.5 font-mono text-lg ${active === item.id ? 'text-accent' : 'text-ink'}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-5">
                <a href={`${import.meta.env.BASE_URL}${profile.resume}`} download className="flex h-12 items-center justify-center rounded-full bg-ink font-mono text-sm font-medium text-bg">
                  Download résumé
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
