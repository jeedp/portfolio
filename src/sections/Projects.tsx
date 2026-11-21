import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Lock } from 'lucide-react'
import { profile, projects, type Project } from '../data/profile'
import { Section } from '../components/Section'
import { Badge } from '../components/Badge'
import { ProjectVisual } from '../components/ProjectVisual'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

const filters = ['All', 'Web', 'IoT', 'Desktop'] as const
type Filter = (typeof filters)[number]

/** The template's project card: number, title, description, skills and a round arrow; the whole card links to the code. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const linked = Boolean(project.repo)
  const Wrapper = linked ? 'a' : 'div'
  const linkProps = linked ? { href: project.repo, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${project.title}, view the code on GitHub` } : {}
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group list-none"
    >
      <Wrapper
        {...linkProps}
        className={`relative block rounded-2xl bg-soft p-6 ring-1 ring-line transition-[background-color,box-shadow,transform] duration-300 sm:p-8 ${linked ? 'hover:-translate-y-1 hover:bg-card hover:shadow-xl hover:ring-line-strong' : ''}`}
      >
        {linked && (
          <span aria-hidden="true" className="absolute right-6 top-6 grid size-11 place-items-center rounded-full bg-ink text-bg transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent sm:right-8 sm:top-8 sm:size-12">
            <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        )}

        <p className="font-mono text-sm text-accent">
          {String(index + 1).padStart(2, '0')}
          <span className="ml-3 text-muted">{project.year} · {project.kind}</span>
          {project.status && <span className="ml-3 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">{project.status}</span>}
        </p>
        <h3 className="mt-2 pr-14 text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h3>
        <p className="mt-4 pr-0 text-lg leading-relaxed sm:pr-14">{project.summary}</p>
        {project.role && <p className="mt-3 text-[15px] text-muted">{project.role}</p>}

        <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-line">
          <ProjectVisual project={project} />
        </div>

        {project.metric && (
          <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="font-mono text-2xl font-bold tracking-tight text-ink">{project.metric.value}</span>
            <span className="text-[15px] text-muted">{project.metric.label}</span>
          </p>
        )}

        <ul className="mt-5 space-y-2">
          {project.features.slice(0, 3).map(f => (
            <li key={f} className="flex items-start gap-3 text-base">
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-muted/60" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">{project.tech.map(t => <Badge key={t}>{t}</Badge>)}</div>
        {!linked && <p className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-muted"><Lock className="size-4" aria-hidden="true" /> Private repository</p>}
      </Wrapper>
    </motion.li>
  )
}

function GitHubActivity() {
  const repos = useGitHubRepos(profile.githubUser, 4)
  if (!repos || repos.length === 0) return null
  return (
    <div className="mt-14">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-xl font-bold">More on GitHub</h3>
        <a href={`${profile.github}?tab=repositories`} className="link-draw inline-flex items-center gap-1 font-mono text-sm text-body hover:text-accent">
          All repositories <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </a>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {repos.map(r => (
          <li key={r.name} className="min-w-0">
            <a href={r.html_url} className="group flex h-full items-center justify-between gap-4 rounded-xl bg-soft px-5 py-4 ring-1 ring-line transition-colors hover:bg-card hover:ring-line-strong">
              <span className="min-w-0">
                <span className="block truncate font-mono text-[15px] font-medium text-ink group-hover:text-accent">{r.name}</span>
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
    <Section id="projects" title="Projects" note="Systems I designed and built: a campus kiosk, an IoT parking gate and a desktop app with its own database.">
      <div role="group" aria-label="Filter projects by type" className="mb-8 flex flex-wrap gap-2">
        {filters.map(f => {
          const on = filter === f
          return (
            <button
              key={f}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(f)}
              className={`h-10 rounded-full px-5 font-mono text-sm font-medium transition-[background-color,color,box-shadow,transform] active:scale-[.97] ${on ? 'bg-ink text-bg' : 'bg-soft text-body ring-1 ring-line hover:text-ink hover:ring-line-strong'}`}
            >
              {f}
            </button>
          )
        })}
      </div>
      <ul className="space-y-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map(p => <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} />)}
        </AnimatePresence>
      </ul>
      <GitHubActivity />
    </Section>
  )
}
