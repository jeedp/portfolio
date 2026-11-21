import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Plus, X } from 'lucide-react'
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

/** `featured`: the hero already shows this project's screenshot, so on small screens the row skips it. */
function ProjectRow({ project, n, flip, featured, onOpen }: { project: Project; n: number; flip: boolean; featured: boolean; onOpen: () => void }) {
  return (
    <article id={project.id} aria-labelledby={`t-${project.id}`} className="grid scroll-mt-8 items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''} ${featured ? 'hidden lg:block' : ''}`}>
        <Shots project={project} />
      </Reveal>
      <Reveal delay={0.08} className="lg:col-span-5">
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
      </Reveal>
    </article>
  )
}

export function Work() {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  return (
    <section aria-labelledby="work" className="py-16 md:py-24">
      <SectionTitle id="work" title="Selected Work" subtitle="Three systems I built, each shown running for real." />
      <div className="space-y-24 md:space-y-32">
        {projects.map((p, i) => <ProjectRow key={p.id} project={p} n={i + 1} flip={i % 2 === 1} featured={i === 0} onOpen={() => setOpen(i)} />)}
      </div>
      {open !== null && <CaseStudy project={projects[open]} onClose={close} />}
    </section>
  )
}
