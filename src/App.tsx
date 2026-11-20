import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { BackToTop } from './components/BackToTop'
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
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <footer className="overflow-hidden border-t border-line">
        <div className="container-page flex flex-col gap-4 pt-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. Updated {profile.updated}.</p>
          <div className="flex gap-6">
            <a href={profile.github} className="link-draw hover:text-ink">GitHub</a>
            <a href={profile.linkedin} className="link-draw hover:text-ink">LinkedIn</a>
            <a href="#home" className="link-draw hover:text-ink">Back to top</a>
          </div>
        </div>
        <p aria-hidden="true" className="display container-page mt-8 select-none whitespace-nowrap text-[22vw] leading-[0.8] text-ink/[0.06] lg:text-[17rem]">
          Jed Padro
        </p>
      </footer>
      <BackToTop />
    </MotionConfig>
  )
}
