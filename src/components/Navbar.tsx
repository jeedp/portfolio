import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { nav, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = nav.map(n => n.id)

/** One floating glass capsule: the mark, the sections with a sliding highlight, the theme switch and the résumé. */
export function Navbar({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const pdf = `${import.meta.env.BASE_URL}${profile.resume}`
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-0 focus:z-10 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent">
        Skip to content
      </a>
      <div className="mx-auto max-w-4xl rounded-[22px] border border-line bg-bg/70 shadow-[0_10px_40px_-15px_rgb(0_0_0/0.5)] backdrop-blur-xl">
        <nav aria-label="Main" className="flex h-14 items-center justify-between gap-3 pl-2 pr-2">
          <a href="#home" className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 text-sm font-semibold text-ink">
            <img src={`${import.meta.env.BASE_URL}${profile.photo}`} alt="" width={32} height={32} className="size-8 rounded-full object-cover object-top ring-1 ring-line" />
            {profile.shortName}
          </a>

          <ul className="hidden items-center md:flex">
            {nav.filter(n => n.id !== 'home').map(item => {
              const on = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={on ? 'true' : undefined}
                    className={`relative block rounded-full px-3.5 py-1.5 text-sm transition-colors ${on ? 'text-ink' : 'text-muted hover:text-ink'}`}
                  >
                    {on && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-card-hover ring-1 ring-line" transition={{ type: 'spring', stiffness: 450, damping: 38 }} />}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-card-hover hover:text-ink"
            >
              {theme === 'dark' ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            </button>
            <a href={pdf} download className="hidden h-10 items-center rounded-full bg-ink px-4 text-sm font-medium text-bg transition-[background-color,color,transform] hover:bg-accent hover:text-on-accent active:scale-[.97] sm:inline-flex">
              Résumé
            </a>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-card-hover md:hidden"
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
              <ul className="border-t border-line p-2">
                {nav.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base ${active === item.id ? 'bg-card-hover text-ink' : 'text-body'}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-1">
                  <a href={pdf} download className="flex h-11 items-center justify-center rounded-2xl bg-ink text-sm font-medium text-bg">Download résumé</a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
