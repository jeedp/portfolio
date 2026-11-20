import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import { about, profile } from '../data/profile'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'

const ease = [0.16, 1, 0.3, 1] as const
const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.1 + 0.08 * i, ease },
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
          initial={{ opacity: 0, y: '45%', filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-45%', filter: 'blur(3px)' }}
          transition={{ duration: 0.35, ease }}
          className="col-start-1 row-start-1 text-accent"
        >
          {profile.focusAreas[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero() {
  const pdf = `${import.meta.env.BASE_URL}${profile.resume}`
  return (
    <section id="home" aria-labelledby="home-title" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* a soft wash of the accent behind the portrait */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 size-[640px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <motion.p {...rise(0)} className="inline-flex items-center gap-2.5 text-sm text-body">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.h1 {...rise(1)} id="home-title" className="display mt-6 text-[72px] sm:text-[112px] lg:text-[132px]">
            Jed B.<br />Padro
          </motion.h1>

          <motion.p {...rise(2)} className="mt-6 text-xl text-ink sm:text-2xl">
            Computer Engineering student <span className="text-muted">&amp;</span> aspiring software engineer
          </motion.p>

          <motion.div {...rise(3)}>
            <p className="mt-5 max-w-[50ch] text-base leading-relaxed text-body sm:text-lg">
              I build practical systems where software meets hardware: desktop apps backed by real databases, IoT devices, and web systems that keep working when the network doesn't.
            </p>
            <p className="mt-4 text-base text-muted">
              Currently exploring <Focus />
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="#projects">
                View my projects <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button href={pdf} variant="secondary" download>
                <Download className="size-4" aria-hidden="true" /> Download résumé
              </Button>
            </div>
            <div className="mt-8 flex gap-6 text-sm">
              <a href={profile.github} className="link-draw inline-flex items-center gap-1 text-body hover:text-ink">GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
              <a href={profile.linkedin} className="link-draw inline-flex items-center gap-1 text-body hover:text-ink">LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
              <a href={`mailto:${profile.email}`} className="link-draw inline-flex items-center gap-1 text-body hover:text-ink">Email <ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="relative order-1 mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:order-2 lg:max-w-none"
        >
          <Avatar className="aspect-[4/5] w-full rounded-[28px]" />
          <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/10 bg-black/45 p-4 text-white backdrop-blur-md sm:inset-x-4 sm:bottom-4">
            <p className="text-xs text-white/60">Currently building</p>
            <p className="mt-1 text-[15px] font-medium leading-snug">SLSU Campus Wayfinding System, my thesis</p>
          </div>
        </motion.div>
      </div>

      {/* key figures, set in the display face */}
      <motion.div {...rise(5)} className="container-page relative mt-20 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3 md:mt-28">
        {about.highlights.map(h => (
          <div key={h.label} className="bg-bg px-6 py-7 sm:px-8">
            <p className="display tabular text-5xl text-ink">{h.value}</p>
            <p className="mt-3 text-sm leading-snug text-muted">{h.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
