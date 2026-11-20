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
      <footer className="border-t border-line">
        <div className="container-page flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Designed and built by Jed in React and Tailwind CSS · Updated {profile.updated}</p>
        </div>
      </footer>
      <BackToTop />
    </MotionConfig>
  )
}
