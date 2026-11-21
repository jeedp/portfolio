import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Crosshair, Plus } from 'lucide-react'
import { profile, projects, type Project } from '../data/profile'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { BrandIcon } from '../components/BrandIcon'
import { ProjectVisual } from '../components/ProjectVisual'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

function TechList({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map(t => (
        <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/40 px-2.5 py-1 text-[13px] text-ink">
          <BrandIcon name={t} className="size-3.5" />
          {t}
        </li>
      ))}
    </ul>
  )
}

/** One project, in full: what it is, the problem it's really about, the proof, and the details on request. */
function ProjectPanel({ project }: { project: Project }) {
  return (
    <div className="grid lg:grid-cols-[1.05fr_1fr]">
      <div className="border-b border-line lg:border-b-0 lg:border-r">
        <ProjectVisual project={project} tall />
      </div>

      <div className="flex flex-col p-6 sm:p-9">
        <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <span>{project.year}</span><span aria-hidden="true">/</span><span>{project.kind}</span>
          {project.status && <span className="rounded-full bg-accent-soft px-2 py-0.5 font-sans text-[11px] font-medium text-accent">{project.status}</span>}
        </p>
        <h3 id={`p-${project.id}`} className="mt-3 text-3xl font-semibold sm:text-4xl">{project.title}</h3>
        <p className="mt-4 text-base leading-relaxed sm:text-[17px]">{project.summary}</p>
        {project.role && <p className="mt-3 text-sm leading-relaxed text-muted">{project.role}</p>}

        <div className="mt-6"><TechList tech={project.tech} /></div>

        {project.focus && (
          <div className="mt-6 flex gap-3.5 rounded-2xl border border-line bg-bg/40 p-4">
            <Crosshair className="mt-0.5 size-[18px] shrink-0 text-accent-2" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">Technical focus</p>
              <p className="mt-1 text-sm leading-relaxed text-body">{project.focus}</p>
            </div>
          </div>
        )}

        {project.metric && (
          <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="tabular text-3xl font-semibold tracking-tight text-ink">{project.metric.value}</span>
            <span className="text-sm text-muted">{project.metric.label}</span>
          </p>
        )}

        <details className="group/d mt-6 border-y border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
            Features and technical details
            <Plus className="size-4 text-muted transition-transform duration-300 group-open/d:rotate-45" aria-hidden="true" />
          </summary>
          <ul className="space-y-2.5 pb-5 text-[15px] leading-relaxed">
            {[...project.features, ...(project.details ?? [])].map(f => (
              <li key={f} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-accent-2" />{f}</li>
            ))}
          </ul>
        </details>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
          {project.availability && <p className="text-xs text-muted">{project.availability}</p>}
          {project.repo && (
            <a href={project.repo} className="group inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-bg transition-[background-color,color,transform] hover:bg-accent hover:text-on-accent active:scale-[.97]">
              View repository <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function GitHubActivity() {
  const repos = useGitHubRepos(profile.githubUser, 4)
  if (!repos || repos.length === 0) return null
  return (
    <div className="mt-12">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-lg font-semibold">More on GitHub</h3>
        <a href={`${profile.github}?tab=repositories`} className="link-draw inline-flex items-center gap-1 text-sm text-body hover:text-ink">
          All repositories <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {repos.map(r => (
          <li key={r.name} className="min-w-0">
            <a href={r.html_url} className="group block h-full">
              <Card className="flex h-full flex-col p-5">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-sm font-medium text-ink">{r.name}</span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" aria-hidden="true" />
                </span>
                <span className="mt-2 line-clamp-2 text-sm text-muted">{r.description ?? 'No description yet.'}</span>
                {r.language && <span className="mt-auto pt-4 text-xs text-muted">{r.language}</span>}
              </Card>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** A gallery: one project at a time, chosen by tab, arrow buttons or the arrow keys. */
export function Projects() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const go = (next: number, focus = false) => {
    const n = (next + projects.length) % projects.length
    setDir(n > index || (index === projects.length - 1 && n === 0) ? 1 : -1)
    setIndex(n)
    if (focus) tabs.current[n]?.focus()
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1, true) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1, true) }
  }
  const project = projects[index]

  return (
    <Section
      id="projects"
      label="Selected work"
      title="Systems I designed and built."
      intro={`${projects.length} projects across web, IoT and desktop. Each one taught me something about performance, reliability or working with real data.`}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Projects" onKeyDown={onKey} className="flex flex-wrap gap-1 rounded-full border border-line bg-card p-1">
          {projects.map((p, i) => {
            const on = i === index
            return (
              <button
                key={p.id}
                ref={el => { tabs.current[i] = el }}
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={on}
                aria-controls="project-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => go(i)}
                className={`relative h-9 rounded-full px-4 text-sm transition-colors ${on ? 'text-bg' : 'text-muted hover:text-ink'}`}
              >
                {on && <motion.span layoutId="project-tab" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                <span className="relative">{p.title.replace('SLSU ', '').replace(' System', '')}</span>
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-3">
          <span className="tabular font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous project" className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-[background-color,transform] hover:bg-card-hover active:scale-95">
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next project" className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-[background-color,transform] hover:bg-card-hover active:scale-95">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <Card id="project-panel" role="tabpanel" aria-labelledby={`tab-${project.id}`} className="min-h-[560px]">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={project.id}
            custom={dir}
            initial={{ opacity: 0, x: 24 * dir, filter: 'blur(4px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -24 * dir, filter: 'blur(4px)' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectPanel project={project} />
          </motion.div>
        </AnimatePresence>
      </Card>

      <GitHubActivity />
    </Section>
  )
}
