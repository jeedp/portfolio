import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { EmailIcon, GitHubIcon, LinkedInIcon } from '../components/SocialIcons'

const ease = [0.16, 1, 0.3, 1] as const
const fadeUp = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.2 * i, ease },
})

/** The template's backdrop: an accent glow from the top-left, a 200px grid and faint code symbols. */
function Backdrop() {
  const symbols: [number, number, number, number, string][] = [
    [50, 50, 24, -15, '</>'], [150, 100, 20, 10, '{}'], [250, 80, 18, -5, '=>'], [100, 200, 22, 15, '[]'], [300, 180, 20, -10, '<>'],
    [200, 250, 24, 5, '()'], [50, 320, 18, -8, '::'], [350, 300, 22, 12, '=='], [150, 350, 20, -15, '++'], [250, 370, 24, 8, ';'],
  ]
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_800px_1200px_at_0%_0%,rgb(29_78_216/0.22)_0%,rgb(29_78_216/0.12)_20%,rgb(29_78_216/0.05)_40%,transparent_75%)] dark:opacity-80" />
      <svg aria-hidden="true" className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" style={{ stroke: 'var(--hero-grid)' }}>
        <defs>
          <pattern id="hero-grid" x="50%" y={-1} width={200} height={200} patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
          <pattern id="hero-symbols" width={400} height={400} patternUnits="userSpaceOnUse">
            {symbols.map(([x, y, size, rot, t]) => (
              <text key={t} x={x} y={y} fill="var(--accent)" stroke="none" fontFamily="var(--font-mono)" fontSize={size} transform={`rotate(${rot})`}>{t}</text>
            ))}
          </pattern>
        </defs>
        <rect fill="url(#hero-symbols)" width="100%" height="100%" opacity={0.14} stroke="none" />
        <rect fill="url(#hero-grid)" width="100%" height="100%" strokeWidth={0} />
      </svg>
    </>
  )
}

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
          initial={{ opacity: 0, y: '50%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-50%' }}
          transition={{ duration: 0.3, ease }}
          className="col-start-1 row-start-1 font-medium text-accent"
        >
          {profile.focusAreas[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const socials = [
  { href: `mailto:${profile.email}`, label: 'Email', Icon: EmailIcon },
  { href: profile.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: profile.github, label: 'GitHub', Icon: GitHubIcon },
]

export function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="relative isolate overflow-hidden lg:min-h-screen">
      <Backdrop />
      <div className="shell grid min-h-[inherit] items-center gap-14 pb-36 pt-28 sm:pt-32 lg:grid-cols-12 lg:pb-40">
        <div className="lg:col-span-7">
          <motion.p {...fadeUp(0)} className="inline-flex items-center gap-2.5 rounded-full bg-card/80 px-4 py-1.5 font-mono text-[12.5px] text-body sm:text-sm ring-1 ring-line backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {profile.availability}
          </motion.p>

          <motion.h1 {...fadeUp(1)} id="home-title" className="mt-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            I'm <span className="text-accent">{profile.shortName}</span>
          </motion.h1>
          <motion.p {...fadeUp(2)} className="mt-6 font-mono text-lg font-medium text-body sm:text-xl">
            {profile.title} · {profile.subtitle}
          </motion.p>

          <motion.div {...fadeUp(3)}>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-body">
              I build practical systems where software meets hardware: desktop apps with real databases, IoT devices, and web systems that keep working when the network doesn't.
            </p>
            <p className="mt-3 font-mono text-[15px] text-muted">
              Currently exploring <Focus />
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#projects">View my projects <ArrowRight className="size-4" aria-hidden="true" /></Button>
              <Button href={`${import.meta.env.BASE_URL}${profile.resume}`} variant="secondary" download>
                <Download className="size-4" aria-hidden="true" /> Download résumé
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-[320px] lg:col-span-5 lg:max-w-[420px] lg:justify-self-end"
        >
          <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[2rem] bg-accent/15 blur-2xl" />
          <Avatar className="aspect-[4/5] w-full rounded-[1.75rem] shadow-2xl ring-1 ring-line" />
          <figcaption className="absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full bg-card px-4 py-2 font-mono text-[13px] text-ink shadow-lg ring-1 ring-line">
            SLSU · Computer Engineering
          </figcaption>
        </motion.figure>
      </div>

      <motion.div {...fadeUp(4)} className="absolute inset-x-0 bottom-0">
        <div className="shell flex gap-6 pb-10 text-body sm:gap-8 lg:pb-14">
          {socials.map(({ href, label, Icon }) => (
            <a key={label} href={href} aria-label={label} className="transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-accent">
              <Icon className="size-7 md:size-8" />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
