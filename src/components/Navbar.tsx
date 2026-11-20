import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { nav, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = nav.map(n => n.id)
const pill = 'border border-line bg-surface/75 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)] backdrop-blur-xl'

/** A floating navigation: the name on the left, the sections in a centred pill, actions on the right. */
export function Navbar({ theme, onToggleTheme }: { theme: 'dark' | 'light'; onToggleTheme: () => void }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-4">
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent">
        Skip to content
      </a>
      <nav aria-label="Main" className="container-page flex items-center justify-between gap-4">
        <a href="#home" className={`flex h-11 items-center gap-2.5 rounded-full pl-1.5 pr-4 text-sm font-medium text-ink ${pill}`}>
          <img src={`${import.meta.env.BASE_URL}${profile.photo}`} alt="" width={32} height={32} className="size-8 rounded-full object-cover object-top" />
          {profile.shortName}
        </a>

        <ul className={`hidden h-11 items-center rounded-full px-1.5 md:flex ${pill}`}>
          {nav.filter(n => n.id !== 'home').map(item => {
            const isActive = active === item.id
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-full px-4 py-1.5 text-sm transition-colors ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
                >
                  {isActive && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-raised" transition={{ type: 'spring', stiffness: 450, damping: 38 }} />
                  )}
                  <span className="relative">{item.label}</span>
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
            className={`grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-ink ${pill}`}
          >
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <a href="#contact" className="hidden h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-on-accent transition-[filter,transform] hover:brightness-110 active:scale-[.97] lg:inline-flex">
            Let's talk
          </a>
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`grid size-11 place-items-center rounded-full text-ink md:hidden ${pill}`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`container-page mt-3 rounded-3xl p-3 md:hidden ${pill}`}
          >
            <ul>
              {nav.map(item => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg ${active === item.id ? 'bg-raised text-ink' : 'text-body'}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href={`${import.meta.env.BASE_URL}${profile.resume}`} download className="mt-2 flex h-12 items-center justify-center rounded-2xl bg-accent text-[15px] font-medium text-on-accent">
              Download résumé
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
