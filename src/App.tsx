import { MotionConfig } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { BackToTop } from './components/BackToTop'
import { EmailIcon, GitHubIcon, LinkedInIcon } from './components/SocialIcons'
import { useTheme } from './hooks/useTheme'
import { profile } from './data/profile'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Education, Experience } from './sections/Experience'
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
        <Experience />
        <Skills />
        <Education />
        <Resume />
        <Contact />
      </main>

      {/* the template's footer */}
      <footer className="border-t border-line bg-soft">
        <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-2xl font-bold text-ink">{profile.name}</p>
            <p className="text-base text-body">{profile.title} · {profile.subtitle}</p>
            <div className="flex gap-x-6 text-body">
              <a href={`mailto:${profile.email}`} aria-label="Email" className="transition-colors hover:text-accent"><EmailIcon /></a>
              <a href={profile.linkedin} aria-label="LinkedIn" className="transition-colors hover:text-accent"><LinkedInIcon /></a>
              <a href={profile.github} aria-label="GitHub" className="transition-colors hover:text-accent"><GitHubIcon /></a>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm text-muted md:items-end md:text-right">
            <p>© {new Date().getFullYear()} {profile.name}. Updated {profile.updated}.</p>
            <p>
              Design based on{' '}
              <a href="https://github.com/RyanFitzgerald/devportfolio" className="link-draw text-body hover:text-accent">DevPortfolio</a>{' '}
              by Ryan Fitzgerald (MIT).
            </p>
          </div>
        </div>
      </footer>
      <BackToTop />
    </MotionConfig>
  )
}
