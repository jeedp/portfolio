import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { Button } from '../components/Button'

const ease = [0.16, 1, 0.3, 1] as const
/** The one entrance on the page: the hero's lines rise in turn on load. */
const rise = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.08 * i, ease },
})

export function Hero() {
  const pdf = `${import.meta.env.BASE_URL}${profile.resume}`
  return (
    <section id="home" aria-labelledby="home-title" className="pt-32 pb-22 md:pt-44 md:pb-32">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div {...rise(0)} className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <p className="label">Computer Engineering Student</p>
            <p className="inline-flex items-center gap-2 text-sm text-body">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Open to internships
            </p>
          </motion.div>

          <motion.h1 {...rise(1)} id="home-title" className="mt-7 max-w-[13ch] text-[46px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-7xl lg:text-[84px]">
            {profile.headline}
          </motion.h1>

          <motion.p {...rise(2)} className="mt-8 max-w-[50ch] text-lg leading-relaxed text-body sm:text-xl sm:leading-relaxed">
            I’m <span className="text-ink">{profile.name}</span>, a 4th-year Computer Engineering student at Southern Leyte State University. I build desktop apps, IoT systems and web software, and I’m looking for a software engineering internship.
          </motion.p>

          <motion.div {...rise(3)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button href="#projects">View projects <ArrowRight className="size-4" aria-hidden="true" /></Button>
            <Button href={pdf} variant="secondary" download><Download className="size-4" aria-hidden="true" /> Download résumé</Button>
          </motion.div>

          <motion.div {...rise(4)} className="mt-8 flex gap-6 text-sm">
            <a href={profile.github} className="link-draw inline-flex items-center gap-1 text-body hover:text-ink">GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
            <a href={profile.linkedin} className="link-draw inline-flex items-center gap-1 text-body hover:text-ink">LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
          </motion.div>
        </div>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease }}
          className="mx-auto w-full max-w-[360px] lg:col-span-5 lg:mr-0 lg:max-w-[440px]"
        >
          <div className="overflow-hidden rounded-[28px] border border-line bg-surface">
            <img
              src={`${import.meta.env.BASE_URL}${profile.photo}`}
              alt={`Portrait of ${profile.name}`}
              width={960}
              height={1199}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover object-[50%_28%]"
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between text-sm">
            <span className="text-ink">{profile.name}</span>
            <span className="text-muted">Southern Leyte, Philippines</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
