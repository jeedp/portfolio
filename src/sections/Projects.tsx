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

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby={`p-${project.id}`}
      className={`group overflow-hidden rounded-[28px] border border-line bg-surface transition-colors duration-300 hover:border-line-strong ${featured ? 'md:col-span-2 lg:grid lg:grid-cols-[1.15fr_1fr]' : 'flex flex-col'}`}
    >
      <div className="overflow-hidden">
        <div className="h-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]">
          <ProjectVisual project={project} tall={featured} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-muted">
            <span className="tabular">{project.year}</span> · {project.kind}
            {project.status && <span className="ml-2 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">{project.status}</span>}
          </p>
          {project.repo && (
            <a
              href={project.repo}
              aria-label={`${project.title} on GitHub`}
              className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong text-ink transition-[background-color,color,border-color,transform] hover:border-accent hover:bg-accent hover:text-on-accent active:scale-95"
            >
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </a>
          )}
        </div>

        <h3 id={`p-${project.id}`} className="display mt-4 text-4xl sm:text-[44px]">{project.title}</h3>
        <p className="mt-4 text-base leading-relaxed">{project.summary}</p>
        {project.role && <p className="mt-3 text-sm leading-relaxed text-muted">{project.role}</p>}

        {project.metric && (
          <div className="mt-6 flex items-baseline gap-4 border-t border-line pt-6">
            <p className="display tabular shrink-0 text-4xl text-accent">{project.metric.value}</p>
            <p className="text-sm leading-snug text-muted">{project.metric.label}</p>
          </div>
        )}

        {featured && (
          <ul className="mt-6 space-y-2 text-[15px]">
            {project.features.map(f => (
              <li key={f} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />{f}</li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-7">
          {project.tech.map(t => <Badge key={t}>{t}</Badge>)}
        </div>
      </div>
    </motion.article>
  )
}

function GitHubActivity() {
  const repos = useGitHubRepos(profile.githubUser, 4)
  if (!repos || repos.length === 0) return null
  return (
    <div className="mt-16 rounded-[28px] border border-line p-7 sm:p-9">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="display text-3xl">Also on GitHub</h3>
        <a href={`${profile.github}?tab=repositories`} className="link-draw inline-flex items-center gap-1 text-sm text-body hover:text-ink">
          All repositories <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
      <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {repos.map(r => (
          <li key={r.name} className="min-w-0 border-t border-line">
            <a href={r.html_url} className="group flex items-center justify-between gap-4 py-4">
              <span className="min-w-0">
                <span className="block font-mono text-sm text-ink transition-colors group-hover:text-accent">{r.name}</span>
                <span className="mt-0.5 block truncate text-sm text-muted">{r.description ?? r.language ?? 'Repository'}</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-muted transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
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
      eyebrow="Selected work"
      title="Projects"
      aside="Three systems I designed and built: a campus kiosk, an IoT parking gate and a desktop app with its own database."
    >
      <div role="group" aria-label="Filter projects by type" className="mb-8 flex flex-wrap gap-2">
        {filters.map(f => {
          const on = filter === f
          const n = f === 'All' ? projects.length : projects.filter(p => p.category === f).length
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`h-10 rounded-full px-5 text-sm transition-[background-color,color,border-color,transform] active:scale-[.97] ${on ? 'bg-ink text-bg' : 'border border-line-strong text-body hover:border-ink hover:text-ink'}`}
            >
              {f} <span className="ml-1 tabular opacity-60">{n}</span>
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p, i) => <ProjectCard key={p.id} project={p} featured={i === 0 && shown.length !== 2} />)}
        </AnimatePresence>
      </motion.div>

      <GitHubActivity />
    </Section>
  )
}
