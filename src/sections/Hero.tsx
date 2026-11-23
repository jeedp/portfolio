import { ArrowDown, ArrowRight, FileText, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { profile, projects } from '../data/profile'
import { Shots } from '../components/Shots'
import { resumeHref } from '../components/Chrome'

const ease = [0.16, 1, 0.3, 1] as const

/** Name, role and pitch on the left; the strongest project, running for real, on the right. */
export function Hero() {
  const featured = projects[0]
  return (
    <section aria-labelledby="hero-title" className="grid items-center gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-14 lg:pb-24">
      <motion.div
        className="lg:col-span-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="flex items-center gap-4">
          <img
            src={`${import.meta.env.BASE_URL}${profile.photo}`}
            alt={profile.name}
            width={64}
            height={64}
            className="size-16 rounded-full object-cover object-top ring-4 ring-panel"
          />
          <p className="text-[15px] text-muted">Hello, it’s me</p>
        </div>

        <h1 id="hero-title" className="mt-8">
          <span className="spaced block text-[13px] font-medium uppercase tracking-[0.3em] text-ink sm:text-[14px] sm:tracking-[0.34em] lg:text-[13px] lg:tracking-[0.18em] xl:text-[14px] xl:tracking-[0.34em]">{profile.title}</span>
          <span className="mt-4 block text-[52px] font-black uppercase leading-[0.95] tracking-[-0.03em] sm:text-[68px]">
            {profile.name}
          </span>
        </h1>

        <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed">
          I study at Southern Leyte State University and build software that runs on real hardware:
          desktop apps with their own database, an ESP32 parking gate and an offline campus kiosk.
        </p>

        <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-muted">
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden="true" />{profile.location}</span>
          <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-2 rounded-full bg-accent" />{profile.availability}</span>
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-on-accent shadow-[0_10px_24px_-10px_var(--accent)] transition-[filter,transform] hover:brightness-110 active:scale-[.97]">
            Let’s talk <ArrowRight className="size-4" aria-hidden="true" />
          </a>
          <a href={resumeHref} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 text-[15px] font-medium text-ink transition-[background-color,transform] hover:bg-panel active:scale-[.97]">
            <FileText className="size-4" aria-hidden="true" /> Résumé
          </a>
        </div>
      </motion.div>

      <motion.div
        className="lg:col-span-7"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.12, ease }}
      >
        <a href={`#${featured.id}`} className="group block" aria-label={`Featured work: ${featured.title}. Go to the project.`}>
          <Shots project={featured} eager />
          <div className="mt-5 flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div>
              <p className="eyebrow"><span aria-hidden="true" className="mr-2 inline-block size-1.5 rounded-full bg-accent align-middle" />Featured · {featured.kind} · {featured.status}</p>
              <p className="mt-2 text-[22px] font-bold leading-snug tracking-[-0.01em] text-ink">{featured.title}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[15px] font-medium text-accent-text">
              See the project <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </span>
          </div>
        </a>
      </motion.div>
    </section>
  )
}
