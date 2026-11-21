import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { projects, type Project } from '../data/profile'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { TechBadge } from '../components/TechBadge'
import { ProjectVisual } from '../components/ProjectVisual'

type Layout = 'right' | 'left' | 'wide'
const layouts: Layout[] = ['right', 'left', 'wide']

function Meta({ project, n }: { project: Project; n: number }) {
  return (
    <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="text-accent">Project {String(n).padStart(2, '0')}</span>
      <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
      <span>{project.kind}</span>
      <span aria-hidden="true">·</span>
      <span className="tabular">{project.year}</span>
      {project.status && <span className="rounded-full bg-accent-soft px-2 py-0.5 normal-case tracking-normal text-accent">{project.status}</span>}
    </p>
  )
}

function Result({ project }: { project: Project }) {
  if (!project.result) return null
  return (
    <div className="flex items-baseline gap-4 border-t border-line pt-5">
      <p className="tabular shrink-0 text-3xl font-semibold tracking-tight text-ink">{project.result.value}</p>
      <p className="text-sm leading-snug text-muted">{project.result.label}</p>
    </div>
  )
}

function Features({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map(f => (
        <li key={f} className="flex gap-3 text-[16px] leading-relaxed">
          <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent" />
          {f}
        </li>
      ))}
    </ul>
  )
}

/** The case study behind "View project details": problem, objective, my part, challenges, availability. */
function Details({ project, id }: { project: Project; id: string }) {
  return (
    <div id={id} className="grid gap-10 rounded-[24px] border border-line bg-surface p-6 sm:p-10 md:grid-cols-2">
      <div className="space-y-8">
        <div>
          <h4 className="label">Problem</h4>
          <p className="mt-3 text-[16px] leading-relaxed text-ink">{project.problem}</p>
        </div>
        <div>
          <h4 className="label">Objective</h4>
          <p className="mt-3 text-[16px] leading-relaxed text-ink">{project.objective}</p>
        </div>
        <div>
          <h4 className="label">My contributions</h4>
          <ul className="mt-3 space-y-2 text-[16px] text-ink">
            {project.contributions.map(c => <li key={c} className="flex gap-3"><span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-accent" />{c}</li>)}
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
                  <p className="mt-1 text-[15px] leading-relaxed text-body">{c.solution}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
        <div>
          <h4 className="label">Status</h4>
          <p className="mt-3 text-[16px] text-ink">{project.availability}</p>
        </div>
      </div>
    </div>
  )
}

function Actions({ project, open, onToggle, panelId }: { project: Project; open: boolean; onToggle: () => void; panelId: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[15px] font-medium text-on-accent transition-[background-color,transform] hover:bg-accent-hover active:scale-[.97]"
      >
        {open ? <Minus className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
        {open ? 'Hide project details' : 'View project details'}
      </button>
      {project.repo && (
        <a href={project.repo} className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] font-medium text-ink transition-[border-color,background-color,transform] hover:border-ink/50 hover:bg-surface active:scale-[.97]">
          GitHub repository <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}

function ProjectFeature({ project, n, layout }: { project: Project; n: number; layout: Layout }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const toggle = () => setOpen(o => !o)

  const text = (
    <div className="flex flex-col gap-7">
      <Meta project={project} n={n} />
      <h3 id={`p-${project.id}`} className="text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[44px]">{project.title}</h3>
      <p className="max-w-[52ch] text-[17px] leading-relaxed">{project.summary}</p>
      <div className="flex flex-wrap gap-2">{project.tech.map(t => <TechBadge key={t} name={t} size="sm" />)}</div>
      <Features items={project.features} />
      <Result project={project} />
      <Actions project={project} open={open} onToggle={toggle} panelId={panelId} />
    </div>
  )

  const details = (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="details"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-10"><Details project={project} id={panelId} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  if (layout === 'wide') {
    return (
      <article aria-labelledby={`p-${project.id}`}>
        <Reveal className="grid gap-4 sm:grid-cols-12">
          <ProjectVisual project={project} show="image" className="aspect-[4/5] sm:col-span-5 lg:col-span-4 [&_img]:object-[50%_45%]" />
          <ProjectVisual project={project} show="diagram" className="aspect-[4/3] sm:col-span-7 sm:aspect-auto lg:col-span-8" />
        </Reveal>
        <Reveal className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-7 lg:col-span-6">
            <Meta project={project} n={n} />
            <h3 id={`p-${project.id}`} className="text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[44px]">{project.title}</h3>
            <p className="max-w-[52ch] text-[17px] leading-relaxed">{project.summary}</p>
            <div className="flex flex-wrap gap-2">{project.tech.map(t => <TechBadge key={t} name={t} size="sm" />)}</div>
          </div>
          <div className="flex flex-col gap-7 lg:col-span-6">
            <dl className="grid gap-6 sm:grid-cols-2">
              <div className="border-t border-line-strong pt-4"><dt className="label">Problem</dt><dd className="mt-2 text-[16px] leading-relaxed text-ink">{project.problem}</dd></div>
              <div className="border-t border-line-strong pt-4"><dt className="label">Objective</dt><dd className="mt-2 text-[16px] leading-relaxed text-ink">{project.objective}</dd></div>
            </dl>
            <Features items={project.features} />
            <Result project={project} />
            <Actions project={project} open={open} onToggle={toggle} panelId={panelId} />
          </div>
        </Reveal>
        {details}
      </article>
    )
  }

  const visual = (
    <ProjectVisual project={project} className="aspect-[4/3] lg:sticky lg:top-28" />
  )
  return (
    <article aria-labelledby={`p-${project.id}`}>
      <Reveal className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        {layout === 'left' ? (
          <>
            <div className="lg:col-span-7">{visual}</div>
            <div className="lg:col-span-5">{text}</div>
          </>
        ) : (
          <>
            <div className="order-2 lg:order-1 lg:col-span-5">{text}</div>
            <div className="order-1 lg:order-2 lg:col-span-7">{visual}</div>
          </>
        )}
      </Reveal>
      {details}
    </article>
  )
}

export function Projects() {
  return (
    <Section
      id="projects"
      number="03"
      label="Projects"
      title="Selected works."
      intro="Selected academic and personal projects, from a desktop app with its own database to an IoT gate and my undergraduate thesis."
    >
      <div className="space-y-28 md:space-y-36">
        {projects.map((p, i) => <ProjectFeature key={p.id} project={p} n={i + 1} layout={layouts[i % layouts.length]} />)}
      </div>
    </Section>
  )
}
