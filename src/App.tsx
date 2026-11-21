import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { BackToTop } from './components/BackToTop'
import { GitHubIcon, LinkedInIcon } from './components/SocialIcons'
import { useTheme } from './hooks/useTheme'
import { profile } from './data/profile'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Certifications, Experience } from './sections/Experience'
import { Resume } from './sections/Resume'
import { Contact } from './sections/Contact'

export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <MotionConfig reducedMotion="user">
      <div className="backdrop" aria-hidden="true" />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="shell flex flex-col gap-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name} · Updated {profile.updated}</p>
          <div className="flex items-center gap-1">
            <a href={profile.github} aria-label="GitHub" className="grid size-10 place-items-center rounded-full transition-colors hover:bg-card-hover hover:text-ink"><GitHubIcon className="size-[18px]" /></a>
            <a href={profile.linkedin} aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full transition-colors hover:bg-card-hover hover:text-ink"><LinkedInIcon className="size-[18px]" /></a>
            <a href="#home" className="link-draw ml-3 hover:text-ink">Back to top</a>
          </div>
        </div>
      </footer>
      <BackToTop />
    </MotionConfig>
  )
}
