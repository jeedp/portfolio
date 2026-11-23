import { ArrowDown, ArrowRight, FileText, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { profile, projects } from '../data/profile'
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
      <img src={asset(src)} alt={alt} fetchPriority="high" className="block w-full" />
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
        <img
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

/** The name on two big lines with the pitch below it; the collage of all three projects beside it. */
export function Hero() {
  const cut = profile.name.lastIndexOf(' ')
  const [first, last] = [profile.name.slice(0, cut), profile.name.slice(cut + 1)]
  return (
    <section aria-labelledby="hero-title" className="grid items-center gap-12 pb-16 pt-10 md:pt-12 lg:grid-cols-12 lg:gap-14 lg:pb-24">
      <motion.div className="lg:col-span-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
        <div className="flex items-center gap-4">
          <img src={asset(profile.photo)} alt={profile.name} width={64} height={64} className="size-16 rounded-full object-cover object-top ring-4 ring-panel" />
          <p className="text-[15px] text-muted">Hello, it’s me</p>
        </div>

        <h1 id="hero-title" className="mt-8">
          <span className="spaced block text-[13px] font-medium uppercase tracking-[0.3em] text-ink sm:text-[14px] sm:tracking-[0.34em]">{profile.title}</span>
          <span className="mt-4 block text-[64px] font-black uppercase leading-[0.9] tracking-[-0.035em] sm:text-[96px] xl:text-[112px]">
            <span className="block">{first}</span>
            <span className="block">{last}</span>
          </span>
        </h1>

        <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed">
          I study at Southern Leyte State University and build software that runs on real hardware:
          desktop apps with their own database, an ESP32 parking gate and an offline campus kiosk.
        </p>

        <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-muted">
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden="true" />{profile.location}</span>
          <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-2 rounded-full bg-accent" />{profile.availability}</span>
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-on-accent shadow-[0_10px_24px_-10px_var(--accent)] transition-[filter,transform] hover:brightness-110 active:scale-[.97]">
            Let’s talk <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a href={resumeHref} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-[15px] font-medium text-ink transition-[background-color,transform] hover:bg-panel active:scale-[.97]">
            <FileText className="size-4" aria-hidden="true" /> Résumé
          </a>
        </div>
      </motion.div>

      <motion.div className="lg:col-span-6" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12, ease }}>
        <Collage />
      </motion.div>
    </section>
  )
}
