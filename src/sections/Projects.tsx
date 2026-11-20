import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheckBig, ExternalLink, Lock, Star } from 'lucide-react'
import { profile, projects, type Project } from '../data/profile'
import { Section } from '../components/Section'
import { Badge } from '../components/Badge'
import { ProjectVisual } from '../components/ProjectVisual'
import { GitHubIcon } from '../components/BrandIcons'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

const filters = ['All', 'Desktop', 'IoT', 'Web'] as const
type Filter = (typeof filters)[number]

function ProjectCard({ project, wide }: { project: Project; wide: boolean }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/40 ${
        wide ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.1fr_1fr]' : ''
      }`}
    >
      <div className={`overflow-hidden border-line ${wide ? 'border-b lg:border-b-0 lg:border-r' : 'border-b'}`}>
        <div className="h-full transition-transform duration-500 ease-out-expo group-hover:scale-[1.02]">
          <ProjectVisual project={project} fill={wide} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">{project.kind}</span>
          {project.status && (
            <span className="rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">{project.status}</span>
          )}
        </div>
        <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-3 leading-relaxed">{project.summary}</p>
        {project.role && <p className="mt-3 text-[15px] text-muted">{project.role}</p>}

        <ul className="mt-5 space-y-2">
          {project.features.map(f => (
            <li key={f} className="flex gap-2.5 text-[15px] leading-relaxed">
              <CircleCheckBig className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {project.result && (
          <p className="mt-5 rounded-xl border border-line bg-raised/60 px-4 py-3 text-[15px] leading-relaxed text-ink">{project.result}</p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map(t => <Badge key={t}>{t}</Badge>)}
        </div>

        <div className="mt-auto pt-6">
          {project.repo ? (
            <a href={project.repo} className="inline-flex items-center gap-2 font-medium text-ink transition-colors hover:text-accent">
              <GitHubIcon className="size-[18px]" /> View repository
              <ExternalLink className="size-3.5 opacity-60" aria-hidden="true" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-muted">
              <Lock className="size-4" aria-hidden="true" /> {project.repoNote ?? 'Repository link coming soon'}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function GitHubActivity() {
  const repos = useGitHubRepos(profile.githubUser)
  if (!repos || repos.length === 0) return null
  return (
    <div className="mt-16">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <h3 className="text-xl font-semibold">Recently updated on GitHub</h3>
        <a href={`${profile.github}?tab=repositories`} className="inline-flex items-center gap-1.5 text-[15px] text-muted transition-colors hover:text-accent">
          All repositories <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map(r => (
          <li key={r.name}>
            <a href={r.html_url} className="flex h-full flex-col rounded-xl border border-line bg-surface p-4 transition-colors hover:border-accent/40">
              <span className="font-mono text-[15px] font-medium text-ink">{r.name}</span>
              {r.description && <span className="mt-1.5 line-clamp-2 text-sm text-muted">{r.description}</span>}
              <span className="mt-auto flex items-center gap-4 pt-3 text-xs text-muted">
                {r.language && <span>{r.language}</span>}
                {r.stargazers_count > 0 && <span className="inline-flex items-center gap-1"><Star className="size-3" aria-hidden="true" />{r.stargazers_count}</span>}
                <span>Updated {new Date(r.pushed_at).toLocaleDateString('en', { month: 'short', year: 'numeric' })}</span>
              </span>
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
      title="Featured projects"
      intro="Real systems I've designed and built, from a desktop app with its own database to an IoT gate and a campus navigation kiosk."
    >
      <div role="group" aria-label="Filter projects by type" className="mb-8 flex flex-wrap gap-2">
        {filters.map(f => {
          const count = f === 'All' ? projects.length : projects.filter(p => p.category === f).length
          const on = filter === f
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-[15px] transition-colors active:scale-[.97] ${
                on ? 'border-accent bg-accent-soft text-accent' : 'border-line text-body hover:border-accent/50 hover:text-ink'
              }`}
            >
              {f} <span className="font-mono text-xs opacity-70">{count}</span>
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => <ProjectCard key={p.id} project={p} wide={i === 0 && shown.length !== 2} />)}
        </AnimatePresence>
      </motion.div>

      <GitHubActivity />
    </Section>
  )
}
