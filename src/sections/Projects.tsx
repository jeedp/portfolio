import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Lock } from 'lucide-react'
import { profile, projects, type Project } from '../data/profile'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { BrandIcon } from '../components/BrandIcon'
import { ProjectVisual } from '../components/ProjectVisual'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

const filters = ['All', 'Web', 'IoT', 'Desktop'] as const
type Filter = (typeof filters)[number]

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

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={wide ? 'lg:col-span-2' : ''}
      aria-labelledby={`p-${project.id}`}
    >
      <Card className={`group h-full ${wide ? 'lg:grid lg:grid-cols-[1.1fr_1fr]' : 'flex flex-col'}`}>
        <div className={`border-line ${wide ? 'border-b lg:border-b-0 lg:border-r' : 'border-b'}`}>
          <ProjectVisual project={project} tall={wide} />
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <p className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              <span>{project.year}</span>
              <span aria-hidden="true">/</span>
              <span>{project.kind}</span>
              {project.status && <span className="rounded-full bg-accent-soft px-2 py-0.5 font-sans text-[11px] font-medium text-accent">{project.status}</span>}
            </p>
            {project.repo && (
              <a
                href={project.repo}
                aria-label={`${project.title} on GitHub`}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-[background-color,color,border-color,transform] hover:border-ink hover:bg-ink hover:text-bg active:scale-95"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>

          <h3 id={`p-${project.id}`} className="mt-3 text-2xl font-semibold sm:text-[28px]">{project.title}</h3>
          <p className="mt-3 text-base leading-relaxed">{project.summary}</p>

          {project.metric && (
            <div className="mt-6 rounded-xl border border-line bg-bg/40 p-4">
              <p className="tabular text-2xl font-semibold tracking-tight text-ink">{project.metric.value}</p>
              <p className="mt-1 text-sm text-muted">{project.metric.label}</p>
            </div>
          )}

          {wide && (
            <ul className="mt-6 space-y-2.5 text-[15px]">
              {project.features.map(f => (
                <li key={f} className="flex gap-3"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-2" />{f}</li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-7">
            <TechList tech={project.tech} />
            {!project.repo && <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted"><Lock className="size-4" aria-hidden="true" /> Private repository</p>}
          </div>
        </div>
      </Card>
    </motion.article>
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

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All')
  const shown = useMemo(() => (filter === 'All' ? projects : projects.filter(p => p.category === filter)), [filter])
  return (
    <Section
      id="projects"
      label="Selected work"
      title="Systems I designed and built."
      intro="A campus navigation kiosk, an IoT parking gate and a desktop app with its own database. Each one taught me something about performance, reliability or working with real users."
      action={
        <div role="group" aria-label="Filter projects by type" className="inline-flex rounded-full border border-line bg-card p-1">
          {filters.map(f => {
            const on = filter === f
            return (
              <button key={f} type="button" aria-pressed={on} onClick={() => setFilter(f)} className={`relative h-8 rounded-full px-4 text-sm transition-colors ${on ? 'text-bg' : 'text-muted hover:text-ink'}`}>
                {on && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                <span className="relative">{f}</span>
              </button>
            )
          })}
        </div>
      }
    >
      <motion.div layout className="grid gap-3 lg:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p, i) => <ProjectCard key={p.id} project={p} wide={i === 0 && shown.length !== 2} />)}
        </AnimatePresence>
      </motion.div>
      <GitHubActivity />
    </Section>
  )
}
