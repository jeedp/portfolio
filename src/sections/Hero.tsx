import { ArrowDown, ArrowRight, FileText, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile, projects } from '../data/profile'
import { FadeImg } from '../components/FadeImg'
import { resumeHref } from '../components/Chrome'

const ease = [0.16, 1, 0.3, 1] as const
const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`

/** A screenshot in the same thin window frame the project slides use. */
function Frame({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-sheet shadow-[0_22px_45px_-20px_rgb(0_0_0/0.45)] ${className}`}>
      <div aria-hidden="true" className="flex h-5 items-center gap-1 border-b border-line px-2.5">
        <span className="size-1.5 rounded-full bg-line-strong" /><span className="size-1.5 rounded-full bg-line-strong" /><span className="size-1.5 rounded-full bg-line-strong" />
      </div>
      <FadeImg src={asset(src)} alt={alt} fetchPriority="high" className="block w-full" />
    </div>
  )
}

/** All three projects at once, overlapping; every image is a real screenshot. Links to Selected Work. */
function Collage() {
  const byId = (id: string) => projects.find(p => p.id === id)!
  const [kiosk, parking, trainsmart] = [byId('wayfinding'), byId('parking'), byId('trainsmart')]
  const move = 'transition-transform duration-700 ease-out-expo'
  return (
    <a href="#work" className="group block" aria-label={`Selected work: ${projects.length} projects. Go to the projects.`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-panel">
        <Frame src={kiosk.shots[0].src} alt={kiosk.shots[0].alt} className={`absolute left-[4%] top-[6%] w-[74%] ${move} group-hover:-translate-y-1`} />
        <Frame src={parking.shots[0].src} alt={parking.shots[0].alt} className={`absolute bottom-[5%] right-[4%] w-[46%] ${move} group-hover:translate-y-1`} />
        <FadeImg
          src={asset(trainsmart.shots[1].src)}
          alt={trainsmart.shots[1].alt}
          className={`absolute bottom-[6%] left-[8%] w-[19%] rounded-xl border border-line shadow-[0_22px_45px_-20px_rgb(0_0_0/0.55)] ${move} group-hover:-translate-y-1.5`}
        />
      </div>
      <div className="mt-4 flex items-end justify-between gap-6 px-1">
        <p className="eyebrow"><span aria-hidden="true" className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle" />Selected work · {projects.length} projects</p>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-medium text-accent-text">
          See all <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </a>
  )
}

/** True once the loading screen in index.html has finished, so the entrance plays where people can see it. */
function useAppReady() {
  const [ready, setReady] = useState(() => typeof window === 'undefined' || Boolean((window as { __appReady?: boolean }).__appReady))
  useEffect(() => {
    if (ready) return
    const go = () => setReady(true)
    window.addEventListener('app:ready', go)
    const fallback = setTimeout(go, 7000)
    return () => { window.removeEventListener('app:ready', go); clearTimeout(fallback) }
  }, [ready])
  return ready
}

/** Fades and lifts one part of the hero in, `at` seconds after the loading screen clears. */
function In({ at, ready, y = 14, className = '', children }: { at: number; ready: boolean; y?: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, delay: at, ease }}>
      {children}
    </motion.div>
  )
}

/** The name on two big lines with the pitch below it; the collage of all three projects beside it. */
export function Hero() {
  const ready = useAppReady()
  const still = useReducedMotion()
  const cut = profile.name.lastIndexOf(' ')
  const [first, last] = [profile.name.slice(0, cut), profile.name.slice(cut + 1)]
  const line = (text: string, at: number) => (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span className="block" initial={{ y: '105%' }} animate={ready ? { y: 0 } : undefined} transition={{ duration: 0.9, delay: at, ease }}>{text}</motion.span>
    </span>
  )

  return (
    <section aria-labelledby="hero-title" className="grid items-center gap-12 pb-16 pt-10 md:pt-12 lg:grid-cols-12 lg:gap-14 lg:pb-24">
      <div className="lg:col-span-6">
        <div className="flex items-center gap-4">
          <motion.img
            src={asset(profile.photo)} alt={profile.name} width={64} height={64}
            className="size-16 rounded-full object-cover object-top ring-4 ring-panel"
            initial={{ opacity: 0, scale: 0.85 }} animate={ready ? { opacity: 1, scale: 1 } : undefined} transition={{ duration: 0.6, ease }}
          />
          {/* The chat bubble: the photo says hello. */}
          <motion.p
            className="relative rounded-[5px] bg-ink px-3 py-1.5 text-[13px] font-medium text-sheet"
            style={{ transformOrigin: 'left center' }}
            initial={{ opacity: 0, scale: 0.6, x: -6 }} animate={ready ? { opacity: 1, scale: 1, x: 0 } : undefined}
            transition={{ type: 'spring', stiffness: 420, damping: 22, delay: 0.2 }}
          >
            <span aria-hidden="true" className="absolute -left-[4px] top-1/2 size-2.5 -translate-y-1/2 rotate-45 rounded-[1px] bg-ink" />
            <span className="relative">Hello, it’s me</span>
          </motion.p>
        </div>

        <h1 id="hero-title" className="mt-8">
          <motion.span
            className="spaced block text-[13px] font-medium uppercase tracking-[0.3em] text-ink sm:text-[14px] sm:tracking-[0.34em]"
            initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ duration: 0.7, delay: 0.35, ease }}
          >{profile.title}</motion.span>
          <span className="mt-4 block text-[64px] font-black uppercase leading-[0.9] tracking-[-0.035em] sm:text-[96px] xl:text-[112px]">
            {line(first, 0.45)}
            {line(last, 0.55)}
          </span>
        </h1>

        <In at={0.8} ready={ready}>
          <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed">
            I build software for the web, IoT devices and the desktop. I’ve interned as a web developer and I’m now
            working on my undergraduate thesis.
          </p>
        </In>

        <In at={0.95} ready={ready}>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-muted">
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden="true" />{profile.location}</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-2 rounded-full bg-accent" />{profile.availability}</span>
          </p>
        </In>

        <div className="mt-8 flex flex-wrap gap-3">
          {/* "Let's talk" pops in, sends out one ripple, then pulses softly every few seconds. */}
          <motion.span
            className="relative inline-flex"
            initial={{ opacity: 0, scale: 0.4 }} animate={ready ? { opacity: 1, scale: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 1.1 }}
          >
            {!still && ready && (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-accent"
                initial={{ opacity: 0.35, scale: 1 }}
                animate={{ opacity: 0, scale: 1.9 }}
                transition={{ duration: 1.4, delay: 1.35, ease: 'easeOut', repeat: Infinity, repeatDelay: 3.2 }}
              />
            )}
            <a href={`mailto:${profile.email}`} className="relative inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-on-accent shadow-[0_10px_24px_-10px_var(--accent)] transition-[filter,transform] hover:brightness-110 active:scale-[.97]">
              Let’s talk <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </motion.span>
          <motion.span
            className="inline-flex"
            initial={{ opacity: 0, y: 10 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6, delay: 1.2, ease }}
          >
            <a href={resumeHref} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-[15px] font-medium text-ink transition-[background-color,transform] hover:bg-panel active:scale-[.97]">
              <FileText className="size-4" aria-hidden="true" /> Résumé
            </a>
          </motion.span>
        </div>
      </div>

      <In at={0.6} ready={ready} y={24} className="lg:col-span-6">
        <Collage />
      </In>
    </section>
  )
}
