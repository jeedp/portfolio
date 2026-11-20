import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { BackToTop } from './components/BackToTop'
import { GitHubIcon, LinkedInIcon } from './components/BrandIcons'
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
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} {profile.name}. Built with React, TypeScript and Tailwind CSS.</p>
          <div className="flex items-center gap-1">
            <a href={profile.github} aria-label="GitHub" className="grid size-10 place-items-center rounded-lg transition-colors hover:text-accent"><GitHubIcon className="size-[18px]" /></a>
            <a href={profile.linkedin} aria-label="LinkedIn" className="grid size-10 place-items-center rounded-lg transition-colors hover:text-accent"><LinkedInIcon className="size-[18px]" /></a>
          </div>
        </div>
      </footer>
      <BackToTop />
    </MotionConfig>
  )
}
