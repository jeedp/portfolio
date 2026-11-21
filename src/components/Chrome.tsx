import { Briefcase, FileText, Mail, Moon, Sun, User } from 'lucide-react'
import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'

export const resumeHref = `${import.meta.env.BASE_URL}${profile.resume}`

/** The JP mark: two letters and an accent square. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" aria-label={`${profile.name}, back to top`} className={`inline-flex items-baseline gap-[3px] text-[22px] font-black leading-none tracking-[-0.04em] text-ink ${className}`}>
      JP<span aria-hidden="true" className="inline-block size-[7px] rounded-[1px] bg-accent" />
    </a>
  )
}

/** A section heading: title, subtitle and the accent rule with its dot. */
export function SectionTitle({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return (
    <header className="mb-12 md:mb-16">
      <h2 id={id} className="text-[32px] font-bold leading-tight tracking-[-0.02em] md:text-[40px]">{title}</h2>
      <p className="mt-1 text-[17px] text-muted">{subtitle}</p>
      <span aria-hidden="true" className="relative mt-4 block h-[2px] w-16 bg-accent">
        <span className="absolute -left-[2px] -top-[3px] size-2 rounded-full bg-accent" />
      </span>
    </header>
  )
}

const navIcons = { work: Briefcase, about: User, contact: Mail }

export function Header({ theme, onToggleTheme }: { theme: 'light' | 'dark'; onToggleTheme: () => void }) {
  return (
    <header className="flex items-center justify-between gap-4 px-5 pt-6 sm:px-8 md:px-12 md:pt-8">
      <div className="flex items-center gap-6 md:gap-12">
        <Logo />
        <a href={`mailto:${profile.email}`} className="hidden items-center gap-2 text-[14px] font-medium text-body transition-colors hover:text-ink md:inline-flex">
          <Mail className="size-4" aria-hidden="true" /> {profile.email}
        </a>
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="grid size-9 place-items-center rounded-full text-body transition-[background-color,color,transform] hover:bg-panel hover:text-ink active:scale-95"
        >
          {theme === 'dark' ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
        </button>
      </div>
      <nav aria-label="Main">
        <ul className="flex items-center gap-1 sm:gap-2">
          {(['work', 'about', 'contact'] as const).map(id => {
            const Icon = navIcons[id]
            return (
              <li key={id}>
                <a href={`#${id}`} className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-[15px] text-body transition-colors hover:bg-panel hover:text-ink">
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="hidden capitalize sm:inline">{id}</span>
                  <span className="sr-only sm:hidden">{id}</span>
                </a>
              </li>
            )
          })}
          <li>
            <a href={resumeHref} target="_blank" rel="noopener" className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-[15px] text-body transition-colors hover:bg-panel hover:text-ink">
              <FileText className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Résumé</span>
              <span className="sr-only sm:hidden">Résumé</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

const socials = [
  { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: profile.github, label: 'GitHub', Icon: GitHubIcon },
]

/** The vertical rail of social links that follows the page on wide screens. */
export function SideRail() {
  return (
    <aside aria-label="Profiles" className="fixed top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex" style={{ left: 'max(1.25rem, calc((100vw - 1240px) / 2 + 2.25rem))' }}>
      {socials.map(({ href, label, Icon }) => (
        <a key={label} href={href} aria-label={label} className="grid size-9 place-items-center rounded-full text-muted transition-[color,transform] hover:-translate-y-0.5 hover:text-accent">
          <Icon className="size-5" />
        </a>
      ))}
      <a href={`mailto:${profile.email}`} aria-label="Email" className="grid size-9 place-items-center rounded-full text-muted transition-[color,transform] hover:-translate-y-0.5 hover:text-accent">
        <Mail className="size-5" />
      </a>
      <span aria-hidden="true" className="mt-1 h-16 w-px bg-line-strong" />
    </aside>
  )
}

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {socials.map(({ href, label, Icon }) => (
        <a key={label} href={href} aria-label={label} className="grid size-10 place-items-center rounded-full text-body transition-colors hover:bg-panel hover:text-accent">
          <Icon className="size-5" />
        </a>
      ))}
    </div>
  )
}
