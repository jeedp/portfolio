import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { GitHubIcon, LinkedInIcon } from '../components/BrandIcons'

const ease = [0.16, 1, 0.3, 1] as const

/** Cycles through the focus areas every 2.6 s; holds the first one under reduced motion. */
function CyclingWord() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI(n => (n + 1) % profile.focusAreas.length), 2600)
    return () => clearInterval(t)
  }, [reduce])
  return (
    <span className="relative inline-grid align-bottom">
      {/* the longest word reserves the width so nothing jumps */}
      <span className="invisible col-start-1 row-start-1">{[...profile.focusAreas].sort((a, b) => b.length - a.length)[0]}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={profile.focusAreas[i]}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease }}
          className="col-start-1 row-start-1 font-medium text-accent"
        >
          {profile.focusAreas[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero() {
  const base = import.meta.env.BASE_URL
  return (
    <section id="home" aria-labelledby="home-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 md:pb-28">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-sm text-body backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </p>

          <p className="text-lg text-body">
            Hi, I'm <span className="font-semibold text-ink">{profile.name}</span>
          </p>
          <h1 id="home-title" className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {profile.headline}
          </h1>
          <p className="mt-5 font-mono text-sm text-accent sm:text-[15px]">
            {profile.title} <span className="text-muted">/</span> {profile.subtitle}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-body">{profile.intro}</p>
          <p className="mt-3 text-lg text-body">
            Currently exploring <CyclingWord />.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="#projects">
              View my projects <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href={`${base}${profile.resume}`} variant="secondary" download>
              <Download className="size-4" aria-hidden="true" /> Download résumé
            </Button>
            <div className="ml-1 flex items-center gap-1">
              <a href={profile.github} aria-label="GitHub profile" className="grid size-11 place-items-center rounded-xl text-muted transition-colors hover:text-accent">
                <GitHubIcon />
              </a>
              <a href={profile.linkedin} aria-label="LinkedIn profile" className="grid size-11 place-items-center rounded-xl text-muted transition-colors hover:text-accent">
                <LinkedInIcon />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="relative mx-auto w-full max-w-[340px]"
        >
          <div className="absolute -inset-6 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]" aria-hidden="true" />
          <div className="relative rounded-full border border-dashed border-line p-3">
            <Avatar className="aspect-square w-full" />
          </div>
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-body shadow-lg">
            <MapPin className="size-4 text-accent" aria-hidden="true" /> {profile.location}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
