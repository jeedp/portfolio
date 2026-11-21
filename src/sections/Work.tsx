import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, X } from 'lucide-react'
import { projects, type Project } from '../data/profile'
import { SectionTitle } from '../components/Chrome'
import { Shots } from '../components/Shots'
import { TechBadge } from '../components/TechBadge'
import { Reveal } from '../components/Reveal'

const label = (p: Project) => [p.kind, p.year, p.status].filter(Boolean).join(' · ')

/** The full case study, in a native dialog. */
function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    d.showModal()
    d.addEventListener('close', onClose)
    return () => d.removeEventListener('close', onClose)
  }, [onClose])

  const List = ({ items }: { items: string[] }) => (
    <ul className="mt-3 space-y-2">
      {items.map(t => <li key={t} className="flex gap-3"><span aria-hidden="true" className="mt-[12px] h-[2px] w-3 shrink-0 bg-accent" />{t}</li>)}
    </ul>
  )

  return (
    <dialog
      ref={ref}
      aria-labelledby={`cs-${project.id}`}
      onClick={e => { if (e.target === ref.current) ref.current?.close() }}
      className="m-auto max-h-[88dvh] w-[min(920px,calc(100%-2rem))] overflow-y-auto rounded-[24px] bg-sheet p-0 text-body shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-line bg-sheet/95 px-6 py-5 backdrop-blur sm:px-10">
        <div>
          <p className="eyebrow">{label(project)}</p>
          <h3 id={`cs-${project.id}`} className="mt-2 text-2xl font-bold tracking-[-0.02em] sm:text-3xl">{project.title}</h3>
        </div>
        <button type="button" onClick={() => ref.current?.close()} aria-label="Close case study" className="grid size-10 shrink-0 place-items-center rounded-full bg-panel text-ink transition-transform active:scale-95">
          <X className="size-4" />
        </button>
      </div>
      <div className="grid gap-10 px-6 py-8 sm:px-10 md:grid-cols-2">
        <div className="space-y-8">
          <div><h4 className="eyebrow">Problem</h4><p className="mt-3 text-ink">{project.problem}</p></div>
          <div><h4 className="eyebrow">Objective</h4><p className="mt-3 text-ink">{project.objective}</p></div>
          <div><h4 className="eyebrow">Key features</h4><List items={project.features} /></div>
        </div>
        <div className="space-y-8">
          {project.challenges && (
            <div>
              <h4 className="eyebrow">Challenges and solutions</h4>
              <ol className="mt-3 space-y-5">
                {project.challenges.map(c => (
                  <li key={c.challenge} className="border-l-2 border-accent/60 pl-4">
                    <p className="text-ink">{c.challenge}</p>
                    <p className="mt-1 text-[15px]">{c.solution}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div><h4 className="eyebrow">Status</h4><p className="mt-3 text-ink">{project.availability}</p></div>
          <div className="flex flex-wrap gap-2">{project.tech.map(t => <TechBadge key={t} name={t} size="sm" />)}</div>
        </div>
      </div>
    </dialog>
  )
}

/** One project: its real screenshots beside what it is, what I did, the stack and the links. */
function ProjectSlide({ project, n, total, onOpen }: { project: Project; n: number; total: number; onOpen: () => void }) {
  return (
    <article
      id={project.id}
      aria-labelledby={`t-${project.id}`}
      aria-roledescription="slide"
      aria-label={`${n} of ${total}`}
      className="grid w-full shrink-0 snap-start snap-always scroll-mt-8 items-start gap-8 lg:grid-cols-12 lg:gap-14"
    >
      <div className="lg:col-span-7">
        <Shots project={project} />
      </div>
      <div className="lg:col-span-5">
        <p className="eyebrow"><span className="text-accent-text">{String(n).padStart(2, '0')}</span> <span aria-hidden="true" className="mx-1.5 inline-block h-px w-5 bg-line-strong align-middle" /> {label(project)}</p>
        <h3 id={`t-${project.id}`} className="mt-4 text-[28px] font-bold leading-tight tracking-[-0.02em] sm:text-[32px]">{project.title}</h3>
        <p className="mt-4 leading-relaxed">{project.summary}</p>

        <h4 className="eyebrow mt-7">What I did</h4>
        <ul className="mt-3 space-y-1.5 text-[16px] text-ink">
          {project.contributions.map(c => <li key={c} className="flex gap-3"><span aria-hidden="true" className="mt-[12px] h-[2px] w-3 shrink-0 bg-accent" />{c}</li>)}
        </ul>

        {project.result && (
          <p className="mt-7 flex items-baseline gap-3 border-t border-line pt-5">
            <span className="tabular shrink-0 text-[26px] font-bold tracking-tight text-accent-text">{project.result.value}</span>
            <span className="text-[14px] leading-snug text-muted">{project.result.label}</span>
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-2">{project.tech.map(t => <TechBadge key={t} name={t} size="sm" />)}</div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={onOpen} aria-haspopup="dialog" className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium text-sheet transition-[opacity,transform] hover:opacity-90 active:scale-[.97]">
            <Plus className="size-4" aria-hidden="true" /> Case study
          </button>
          {project.repo && (
            <a href={project.repo} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] font-medium text-ink transition-[background-color,transform] hover:bg-panel active:scale-[.97]">
              {project.id === 'wayfinding' ? 'Team repository' : 'Source on GitHub'} <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

const arrow = 'grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-[background-color,opacity,transform] hover:bg-panel active:scale-95 disabled:pointer-events-none disabled:opacity-30'

/** The projects as a carousel: one per slide, moved by arrows, dots, swipe, trackpad or the arrow keys. */
export function Work() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const total = projects.length

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => setActive(Math.min(total - 1, Math.max(0, Math.round(el.scrollLeft / el.clientWidth))))
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [total])

  const go = (i: number) => {
    const el = track.current
    if (!el) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: Math.min(total - 1, Math.max(0, i)) * el.clientWidth, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section aria-labelledby="work" className="py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-x-8">
        <SectionTitle id="work" title="Selected Work" subtitle="Three systems I built, each shown running for real." />
        <div className="mb-12 flex items-center gap-5 md:mb-16">
          <p className="tabular font-mono text-[14px] text-muted" aria-live="polite">
            <span className="text-ink">{String(active + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous project" className={arrow}><ArrowLeft className="size-4" /></button>
            <button type="button" onClick={() => go(active + 1)} disabled={active === total - 1} aria-label="Next project" className={arrow}><ArrowRight className="size-4" /></button>
          </div>
        </div>
      </div>

      <Reveal>
        <div
          ref={track}
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected work"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1) }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1) }
          }}
          className="flex snap-x snap-mandatory gap-0 overflow-x-auto overscroll-x-contain rounded-[22px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => <ProjectSlide key={p.id} project={p} n={i + 1} total={total} onOpen={() => setOpen(i)} />)}
        </div>
      </Reveal>

      <div className="mt-10 flex justify-center gap-2" role="group" aria-label="Choose a project">
        {projects.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`${p.title}${i === active ? ' (showing)' : ''}`}
            aria-current={i === active}
            className="group grid h-8 place-items-center px-1"
          >
            <span className={`block h-[3px] rounded-full transition-[width,background-color] duration-300 ${i === active ? 'w-10 bg-accent' : 'w-5 bg-line-strong group-hover:bg-muted'}`} />
          </button>
        ))}
      </div>

      {open !== null && <CaseStudy project={projects[open]} onClose={close} />}
    </section>
  )
}
