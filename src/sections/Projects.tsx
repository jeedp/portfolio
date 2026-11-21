import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { projects, type Project } from '../data/profile'
import { Section } from '../components/Section'
import { TechBadge } from '../components/TechBadge'
import { ProjectVisual } from '../components/ProjectVisual'

function Meta({ project, n }: { project: Project; n: number }) {
  return (
    <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-accent">Project {String(n).padStart(2, '0')}</span>
      <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
      <span>{project.kind}</span>
      <span aria-hidden="true">·</span>
      <span className="tabular">{project.year}</span>
    </p>
  )
}

/** The full case study, opened in a dialog so the cards in the row stay compact and equal. */
function DetailsDialog({ project, n, onClose }: { project: Project; n: number; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    d.showModal()
    const close = () => onClose()
    d.addEventListener('close', close)
    return () => d.removeEventListener('close', close)
  }, [onClose])

  return (
    <dialog
      ref={ref}
      aria-labelledby={`d-${project.id}`}
      onClick={e => { if (e.target === ref.current) ref.current?.close() }}
      className="m-auto max-h-[88dvh] w-[min(960px,calc(100%-2rem))] overflow-y-auto rounded-[28px] border border-line bg-bg p-0 text-body backdrop:bg-black/60 backdrop:backdrop-blur-sm"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-line bg-bg/95 px-6 py-5 backdrop-blur sm:px-10">
        <div>
          <Meta project={project} n={n} />
          <h3 id={`d-${project.id}`} className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{project.title}</h3>
        </div>
        <button type="button" onClick={() => ref.current?.close()} aria-label="Close project details" className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-[background-color,transform] hover:bg-surface active:scale-95">
          <X className="size-4" />
        </button>
      </div>

      <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-10 md:grid-cols-2">
        <div className="space-y-8">
          <div><h4 className="label">Problem</h4><p className="mt-3 text-[16px] leading-relaxed text-ink">{project.problem}</p></div>
          <div><h4 className="label">Objective</h4><p className="mt-3 text-[16px] leading-relaxed text-ink">{project.objective}</p></div>
          <div>
            <h4 className="label">My contributions</h4>
            <ul className="mt-3 space-y-2 text-[16px] text-ink">
              {project.contributions.map(c => <li key={c} className="flex gap-3"><span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent" />{c}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="label">Key features</h4>
            <ul className="mt-3 space-y-2 text-[16px]">
              {project.features.map(f => <li key={f} className="flex gap-3"><span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent" />{f}</li>)}
            </ul>
          </div>
        </div>
        <div className="space-y-8">
          {project.challenges && (
            <div>
              <h4 className="label">Challenges and solutions</h4>
              <ol className="mt-3 space-y-5">
                {project.challenges.map(c => (
                  <li key={c.challenge} className="border-l border-line-strong pl-4">
                    <p className="text-[16px] text-ink">{c.challenge}</p>
                    <p className="mt-1 text-[15px] leading-relaxed">{c.solution}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
          {project.result && (
            <div className="border-t border-line pt-5">
              <p className="tabular text-3xl font-semibold tracking-tight text-ink">{project.result.value}</p>
              <p className="mt-1 text-sm text-muted">{project.result.label}</p>
            </div>
          )}
          <div><h4 className="label">Status</h4><p className="mt-3 text-[16px] text-ink">{project.availability}</p></div>
          <div className="flex flex-wrap gap-2">{project.tech.map(t => <TechBadge key={t} name={t} size="sm" />)}</div>
          {project.repo && (
            <a href={project.repo} className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[15px] font-medium text-on-accent transition-[background-color,transform] hover:bg-accent-hover active:scale-[.97]">
              GitHub repository <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </dialog>
  )
}

/** A compact card: visual, meta, title, summary, stack, the key figure and the two actions. */
function ProjectCard({ project, n, onOpen }: { project: Project; n: number; onOpen: () => void }) {
  return (
    <article
      aria-labelledby={`p-${project.id}`}
      aria-roledescription="slide"
      className="flex w-[85vw] max-w-[540px] shrink-0 snap-start flex-col rounded-[28px] border border-line bg-surface p-3 sm:w-[480px] lg:w-[540px]"
    >
      <ProjectVisual project={project} show={project.image ? 'image' : 'diagram'} className="aspect-[16/10] [&_img]:object-[50%_45%]" />
      <div className="flex flex-1 flex-col gap-5 px-3 pb-3 pt-6 sm:px-5 sm:pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Meta project={project} n={n} />
          {project.status && <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">{project.status}</span>}
        </div>
        <h3 id={`p-${project.id}`} className="text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] sm:text-[30px]">{project.title}</h3>
        <p className="text-[16px] leading-relaxed">{project.summary}</p>
        <div className="flex flex-wrap gap-2">{project.tech.map(t => <TechBadge key={t} name={t} size="sm" />)}</div>
        {project.result && (
          <div className="flex items-baseline gap-3 border-t border-line pt-4">
            <p className="tabular shrink-0 text-2xl font-semibold tracking-tight text-ink">{project.result.value}</p>
            <p className="text-sm leading-snug text-muted">{project.result.label}</p>
          </div>
        )}
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[15px] font-medium text-on-accent transition-[background-color,transform] hover:bg-accent-hover active:scale-[.97]"
          >
            View project details
          </button>
          {project.repo && (
            <a href={project.repo} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] font-medium text-ink transition-[border-color,background-color,transform] hover:border-ink/50 hover:bg-bg active:scale-[.97]">
              GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

/** The projects as one horizontal row that snaps card by card; arrows, swipe, trackpad and the keyboard all move it. */
export function Projects() {
  const track = useRef<HTMLDivElement>(null)
  const [view, setView] = useState({ start: true, end: false, progress: 0, visible: 1 })
  const [open, setOpen] = useState<number | null>(null)
  const closeDetails = useCallback(() => setOpen(null), [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      setView({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft >= max - 4,
        progress: max > 0 ? el.scrollLeft / max : 0,
        visible: el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1,
      })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  /** Step one card at a time. */
  const go = (dir: 1 | -1) => {
    const el = track.current
    const card = el?.firstElementChild as HTMLElement | null
    if (!el || !card) return
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '16')
    el.scrollBy({ left: dir * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  const arrow = 'grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-[background-color,opacity,transform] hover:bg-surface active:scale-95 disabled:pointer-events-none disabled:opacity-30'

  return (
    <Section
      id="projects"
      number="03"
      label="Projects"
      title="Selected works."
      intro="Selected academic and personal projects, from a desktop app with its own database to an IoT gate and my undergraduate thesis."
    >
      <div className="mb-6 flex items-center justify-between gap-6">
        <div className="flex flex-1 items-center gap-4">
          <span className="label shrink-0">{projects.length} projects</span>
          <div aria-hidden="true" className="relative h-px max-w-xs flex-1 overflow-hidden bg-line-strong">
            <span
              className="absolute inset-y-0 left-0 bg-accent transition-transform duration-150"
              style={{ width: `${view.visible * 100}%`, transform: `translateX(${(view.progress * (1 - view.visible) / Math.max(view.visible, 0.01)) * 100}%)` }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={view.start} aria-label="Previous project" className={arrow}><ArrowLeft className="size-4" /></button>
          <button type="button" onClick={() => go(1)} disabled={view.end} aria-label="Next project" className={arrow}><ArrowRight className="size-4" /></button>
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects, scroll sideways for more"
        tabIndex={0}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 [scrollbar-width:thin] md:-mx-8 md:scroll-px-8 md:px-8"
      >
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} n={i + 1} onOpen={() => setOpen(i)} />)}
      </div>

      {open !== null && <DetailsDialog project={projects[open]} n={open + 1} onClose={closeDetails} />}
    </Section>
  )
}
