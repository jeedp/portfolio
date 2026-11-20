import { useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { profile, skills } from '../data/profile'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'

const ease = [0.16, 1, 0.3, 1] as const

/** One orchestrated entrance: each block rises in turn, once, on load. */
const rise = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.08 * i, ease },
})

/** The focus area that cycles every 2.6 s. Holds still under reduced motion. */
function Focus() {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI(n => (n + 1) % profile.focusAreas.length), 2600)
    return () => clearInterval(t)
  }, [reduce])
  const longest = [...profile.focusAreas].sort((a, b) => b.length - a.length)[0]
  return (
    <span className="inline-grid">
      <span className="invisible col-start-1 row-start-1">{longest}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={profile.focusAreas[i]}
          initial={{ opacity: 0, y: '40%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-40%' }}
          transition={{ duration: 0.3, ease }}
          className="col-start-1 row-start-1 text-ink"
        >
          {profile.focusAreas[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function LocalTime() {
  const fmt = () => new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit', timeZone: profile.timezone }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => { const t = setInterval(() => setTime(fmt()), 30_000); return () => clearInterval(t) })
  return <span className="tabular">{time}</span>
}

/** A datasheet for a person: the facts a recruiter scans for, in the format an engineer would print them. */
function SpecSheet() {
  const stack = ['C#', 'C++', 'JavaScript', 'PHP', 'Laravel', 'ESP32']
  const rows: [string, ReactNode][] = [
    ['Role', profile.title],
    ['School', 'Southern Leyte State University'],
    ['Focus', 'Software engineering, embedded systems, IoT'],
    ['Stack', stack.join(' · ')],
    ['Location', <>Southern Leyte, PH <span className="text-muted">· <LocalTime /> local</span></>],
  ]
  return (
    <motion.aside
      {...rise(3)}
      aria-label="Profile summary"
      className="relative rounded-xl border border-line bg-surface/70 font-mono text-[12.5px] shadow-[0_30px_80px_-40px_rgb(0_0_0/0.8)] backdrop-blur"
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-3 text-muted">
        <span>DATASHEET</span>
        <span>REV. {profile.updated.toUpperCase().replace(/ (\d+)/, ' $1')}</span>
      </div>
      <div className="flex items-center gap-4 border-b border-line px-5 py-5">
        <Avatar className="size-14 shrink-0 rounded-lg" />
        <div className="min-w-0 font-sans">
          <p className="text-base font-medium text-ink">{profile.name}</p>
          <p className="truncate text-sm text-muted">{profile.subtitle}</p>
        </div>
      </div>
      <dl className="divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[84px_1fr] gap-4 px-5 py-3">
            <dt className="text-muted">{k}</dt>
            <dd className="text-body">{v}</dd>
          </div>
        ))}
        <div className="grid grid-cols-[84px_1fr] gap-4 px-5 py-3">
          <dt className="text-muted">Status</dt>
          <dd className="flex items-center gap-2 text-ink">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            Available for internships
          </dd>
        </div>
      </dl>
      <div className="flex items-center justify-between border-t border-line px-5 py-3 text-muted">
        <span>{skills.reduce((n, g) => n + g.items.length, 0)} tools across {skills.length} areas</span>
        <a href="#skills" className="inline-flex items-center gap-1 text-body transition-colors hover:text-accent">
          Full list <ArrowDownRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </motion.aside>
  )
}

export function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="relative pt-32 pb-24 sm:pt-40 md:pb-32">
      <div className="container-page grid items-end gap-14 lg:grid-cols-[1fr_400px] lg:gap-16">
        <div>
          <motion.p {...rise(0)} className="mb-8 text-sm text-muted">
            {profile.name} <span className="mx-1.5 text-line-strong">/</span> {profile.title}
          </motion.p>
          <motion.h1
            {...rise(1)}
            id="home-title"
            className="max-w-[15ch] text-[42px] font-medium leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[68px]"
          >
            {profile.headline}
          </motion.h1>
          <motion.div {...rise(2)}>
            <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-body">{profile.intro}</p>
            <p className="mt-4 text-base text-muted">
              Currently exploring <Focus />
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="#projects">View my projects</Button>
              <Button href={`${import.meta.env.BASE_URL}${profile.resume}`} variant="secondary" download>
                Download résumé
              </Button>
              <span className="mx-2 hidden h-5 w-px bg-line-strong sm:block" aria-hidden="true" />
              <a href={profile.github} className="link-draw inline-flex items-center gap-1 py-2 text-sm text-body hover:text-ink">
                GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
              <a href={profile.linkedin} className="link-draw ml-3 inline-flex items-center gap-1 py-2 text-sm text-body hover:text-ink">
                LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>

        <SpecSheet />
      </div>
    </section>
  )
}
