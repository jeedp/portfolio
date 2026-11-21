import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, Copy, Download, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Marquee } from '../components/Marquee'
import { GitHubIcon, LinkedInIcon } from '../components/SocialIcons'

const ease = [0.16, 1, 0.3, 1] as const
/** The page's one orchestrated entrance: tiles rise in turn, once, on load. */
const tile = (i: number) => ({
  initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.7, delay: 0.06 * i, ease },
})

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
          initial={{ opacity: 0, y: '50%', filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: '-50%', filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease }}
          className="col-start-1 row-start-1 text-ink"
        >
          {profile.focusAreas[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function useLocalTime() {
  const fmt = () => new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit', timeZone: profile.timezone }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => { const t = setInterval(() => setTime(fmt()), 20_000); return () => clearInterval(t) })
  return time
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* mailto still works */ }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="group mt-auto flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-bg/40 px-4 py-3 text-left transition-colors hover:border-line-strong"
    >
      <span className="min-w-0 truncate font-mono text-sm text-ink">{profile.email}</span>
      <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted group-hover:text-ink">
        {copied ? <><Check className="size-3.5 text-accent-2" /> Copied</> : <><Copy className="size-3.5" /> Copy</>}
      </span>
      <span role="status" className="sr-only">{copied ? 'Email address copied' : ''}</span>
    </button>
  )
}

const stack = ['C++', 'C#', 'Python', 'JavaScript', 'PHP', 'Laravel', 'Node.js', 'MySQL', 'SQL Server', 'Firebase', 'ESP32', 'Raspberry Pi', 'Arduino', 'Git']

export function Hero() {
  const time = useLocalTime()
  const pdf = `${import.meta.env.BASE_URL}${profile.resume}`
  return (
    <section id="home" aria-labelledby="home-title" className="pt-28 pb-10 sm:pt-32">
      <div className="shell grid auto-rows-auto grid-cols-1 gap-3 md:grid-cols-6 lg:grid-cols-12">
        {/* intro */}
        <motion.div {...tile(0)} className="md:col-span-6 lg:col-span-7 lg:row-span-2">
          <Card className="flex h-full flex-col justify-between gap-10 p-7 sm:p-10">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-3 py-1 text-xs text-body">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                {profile.availability}
              </p>
              <h1 id="home-title" className="mt-8 text-[44px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[68px]">
                Jed B. Padro
              </h1>
              <p className="mt-3 font-mono text-sm text-muted sm:text-[15px]">{profile.title} → {profile.subtitle}</p>
              <p className="mt-7 max-w-[48ch] text-lg leading-relaxed text-body">
                I build practical systems where software meets hardware: desktop apps with real databases, IoT devices, and web systems that keep running when the network drops.
              </p>
              <p className="mt-4 text-[15px] text-muted">Currently exploring <Focus /></p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="#projects">View my projects <ArrowRight className="size-4" aria-hidden="true" /></Button>
              <Button href={pdf} variant="secondary" download><Download className="size-4" aria-hidden="true" /> Download résumé</Button>
              <div className="ml-1 flex items-center gap-1">
                <a href={profile.github} aria-label="GitHub" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-card-hover hover:text-ink"><GitHubIcon className="size-5" /></a>
                <a href={profile.linkedin} aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-card-hover hover:text-ink"><LinkedInIcon className="size-5" /></a>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* portrait */}
        <motion.div {...tile(1)} className="md:col-span-6 lg:col-span-5 lg:row-span-2">
          <Card className="h-full min-h-[380px] p-0 sm:min-h-[460px]">
            <img
              src={`${import.meta.env.BASE_URL}${profile.photo}`}
              alt={`Portrait of ${profile.name}`}
              width={960}
              height={1199}
              fetchPriority="high"
              className="absolute inset-0 -z-10 size-full object-cover object-[50%_28%]"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="flex h-full items-end p-5">
              <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/15 bg-black/35 px-4 py-3 text-white backdrop-blur-md">
                <div>
                  <p className="text-sm font-medium">{profile.name}</p>
                  <p className="text-xs text-white/70">BS Computer Engineering, SLSU</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-white/80"><MapPin className="size-3.5" aria-hidden="true" /> Philippines</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* status + time */}
        <motion.div {...tile(2)} className="md:col-span-3 lg:col-span-3">
          <Card className="flex h-full flex-col justify-between gap-6 p-6">
            <p className="text-sm text-muted">Local time</p>
            <div>
              <p className="tabular text-3xl font-semibold tracking-tight text-ink">{time}</p>
              <p className="mt-1 text-sm text-muted">Southern Leyte, UTC+8</p>
            </div>
          </Card>
        </motion.div>

        {/* metric */}
        <motion.div {...tile(3)} className="md:col-span-3 lg:col-span-3">
          <Card className="flex h-full flex-col justify-between gap-6 p-6">
            <p className="text-sm text-muted">Kiosk floor drawings</p>
            <div>
              <p className="tabular text-3xl font-semibold tracking-tight text-ink">14 <span className="text-muted">→</span> <span className="text-accent-2">3 MB</span></p>
              <p className="mt-1 text-sm text-muted">so the map runs on a Raspberry Pi</p>
            </div>
          </Card>
        </motion.div>

        {/* metric */}
        <motion.div {...tile(4)} className="md:col-span-3 lg:col-span-3">
          <Card className="flex h-full flex-col justify-between gap-6 p-6">
            <p className="text-sm text-muted">Internship</p>
            <div>
              <p className="tabular text-3xl font-semibold tracking-tight text-ink">5 <span className="text-base font-normal text-muted">of 5 bugs fixed</span></p>
              <p className="mt-1 text-sm text-muted">in a production Laravel system</p>
            </div>
          </Card>
        </motion.div>

        {/* now building */}
        <motion.a {...tile(5)} href="#projects" className="group md:col-span-3 lg:col-span-3">
          <Card className="flex h-full flex-col justify-between gap-6 p-6">
            <p className="flex items-center justify-between text-sm text-muted">
              Now building
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
            </p>
            <div>
              <p className="text-lg font-semibold leading-snug text-ink">SLSU Campus Wayfinding</p>
              <p className="mt-1 text-sm text-muted">Thesis · Raspberry Pi kiosk</p>
            </div>
          </Card>
        </motion.a>

        {/* stack */}
        <motion.div {...tile(6)} className="md:col-span-6 lg:col-span-8">
          <Card className="flex h-full flex-col justify-center gap-4 py-6">
            <p className="px-6 text-sm text-muted">Tools I build with</p>
            <Marquee items={stack} />
          </Card>
        </motion.div>

        {/* contact */}
        <motion.div {...tile(7)} className="md:col-span-6 lg:col-span-4">
          <Card className="flex h-full flex-col gap-4 p-6">
            <p className="text-sm text-muted">Say hello</p>
            <CopyEmail />
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
