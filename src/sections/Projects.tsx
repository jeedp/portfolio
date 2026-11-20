import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { profile, projects, type Project } from '../data/profile'
import { Section } from '../components/Section'
import { Badge } from '../components/Badge'
import { ProjectVisual } from '../components/ProjectVisual'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

const filters = ['All', 'Web', 'IoT', 'Desktop'] as const
type Filter = (typeof filters)[number]

/** One project as a short case study: the picture, then what it is, what I did and the number that proves it. */
function CaseStudy({ project }: { project: Project }) {
  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="border-t border-line pt-8 first:border-t-0 first:pt-0"
      aria-labelledby={`p-${project.id}`}
    >
      <ProjectVisual project={project} />

      <div className="mt-8 grid gap-8 md:grid-cols-[1.35fr_1fr] md:gap-12">
        <div>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="tabular">{project.year}</span>
            <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
            <span>{project.kind}</span>
            {project.status && (
              <>
                <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
                <span className="text-accent">{project.status}</span>
              </>
            )}
          </p>
          <h3 id={`p-${project.id}`} className="mt-3 text-2xl font-medium tracking-[-0.02em] sm:text-[28px]">
            {project.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-body">{project.summary}</p>
          {project.role && <p className="mt-3 text-sm leading-relaxed text-muted">{project.role}</p>}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map(t => <Badge key={t}>{t}</Badge>)}
          </div>
          {project.repo && (
            <a href={project.repo} className="link-draw mt-7 inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-accent">
              View the code on GitHub <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <div>
          {project.metric && (
            <div className="border-b border-line pb-6">
              <p className="tabular text-4xl font-medium tracking-[-0.03em] text-ink">{project.metric.value}</p>
              <p className="mt-2 text-sm leading-snug text-muted">{project.metric.label}</p>
            </div>
          )}
          <ul className="divide-y divide-line">
            {project.features.map(f => (
              <li key={f} className="py-3 text-[15px] leading-snug text-body">{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  )
}

function GitHubActivity() {
  const repos = useGitHubRepos(profile.githubUser)
  if (!repos || repos.length === 0) return null
  return (
    <div className="mt-24">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-medium text-ink">Recently on GitHub</h3>
        <a href={`${profile.github}?tab=repositories`} className="link-draw inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          All repositories <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
      <ul className="border-t border-line">
        {repos.map(r => (
          <li key={r.name}>
            <a href={r.html_url} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[220px_1fr_auto]">
              <span className="font-mono text-sm text-ink transition-colors group-hover:text-accent">{r.name}</span>
              <span className="order-3 col-span-2 truncate text-sm text-muted sm:order-none sm:col-span-1">{r.description ?? r.language ?? ''}</span>
              <span className="tabular text-xs text-muted">{new Date(r.pushed_at).toLocaleDateString('en', { month: 'short', year: 'numeric' })}</span>
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
      title="Three systems I designed and built: a campus kiosk, an IoT gate and a desktop app with its own database."
    >
      <div role="group" aria-label="Filter projects by type" className="mb-12 inline-flex rounded-full border border-line p-1">
        {filters.map(f => {
          const on = filter === f
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`relative h-8 rounded-full px-4 text-sm transition-colors ${on ? 'text-bg' : 'text-muted hover:text-ink'}`}
            >
              {on && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
              <span className="relative">{f}</span>
            </button>
          )
        })}
      </div>

      <div className="space-y-20">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map(p => <CaseStudy key={p.id} project={p} />)}
        </AnimatePresence>
      </div>

      <GitHubActivity />
    </Section>
  )
}
