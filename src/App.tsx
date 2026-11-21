import { MotionConfig } from 'framer-motion'
import { Header, SideRail } from './components/Chrome'
import { useTheme } from './hooks/useTheme'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'
import { About } from './sections/About'
import { Contact } from './sections/Contact'

/** The whole site sits on one white sheet over a warm grey page. */
export default function App() {
  const { theme, toggle } = useTheme()
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sheet">Skip to content</a>
      <div id="top" className="sm:px-6 sm:py-8 lg:py-10">
        <div className="sheet mx-auto max-w-[1240px] sm:rounded-[24px]">
          <Header theme={theme} onToggleTheme={toggle} />
          <SideRail />
          <main id="main" className="px-5 sm:px-8 md:px-12 xl:pl-28">
            <Hero />
            <Work />
            <About />
            <Contact />
          </main>
        </div>
      </div>
    </MotionConfig>
  )
}
