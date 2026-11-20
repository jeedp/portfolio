import { Award, BookOpen, Briefcase, FileText, GraduationCap, Plus, Presentation, Trophy } from 'lucide-react'
import { certificates, timeline, type Certificate, type TimelineItem } from '../data/profile'
import { Section } from '../components/Section'
import { Badge } from '../components/Badge'

const timelineIcon: Record<TimelineItem['type'], typeof Briefcase> = {
  work: Briefcase,
  academic: BookOpen,
  training: Presentation,
  education: GraduationCap,
}

const certIcon: Record<Certificate['category'], typeof Award> = {
  Certification: Award,
  'Online course': FileText,
  'Seminar or workshop': Presentation,
  Achievement: Trophy,
}

export function Experience() {
  return (
    <Section id="experience" title="Experience and education" intro="Where I've worked, studied and trained so far.">
      <ol className="relative space-y-6 before:absolute before:bottom-2 before:left-[19px] before:top-2 before:w-px before:bg-line">
        {timeline.map(item => {
          const Icon = item.placeholder ? Plus : timelineIcon[item.type]
          return (
            <li key={item.title} className="relative grid grid-cols-[40px_1fr] gap-5">
              <span className={`relative z-10 grid size-10 place-items-center rounded-full border bg-bg ${item.placeholder ? 'border-dashed border-line text-muted' : 'border-accent/40 text-accent'}`}>
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
              <div className={`rounded-2xl border p-5 sm:p-6 ${item.placeholder ? 'border-dashed border-line' : 'border-line bg-surface'}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className={`text-lg font-semibold ${item.placeholder ? 'text-muted' : ''}`}>{item.title}</h3>
                  <span className="font-mono text-sm text-muted">{item.period}</span>
                </div>
                <p className="mt-1 text-[15px] text-muted">{item.org}</p>
                {item.description && <p className="mt-3 leading-relaxed">{item.description}</p>}
                {item.tech && (
                  <div className="mt-4 flex flex-wrap gap-2">{item.tech.map(t => <Badge key={t}>{t}</Badge>)}</div>
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}

export function Certifications() {
  return (
    <Section
      id="certifications"
      title="Certifications and achievements"
      intro="Courses I've completed, plus space for the seminars, workshops and awards still to come."
      className="border-y border-line bg-surface/40"
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map(c => {
          const Icon = c.placeholder ? Plus : certIcon[c.category]
          const body = (
            <>
              <div className="flex items-start justify-between gap-3">
                <span className={`grid size-10 place-items-center rounded-xl ${c.placeholder ? 'border border-dashed border-line text-muted' : 'bg-accent-soft text-accent'}`}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-xs text-muted">{c.category}</span>
              </div>
              <h3 className={`mt-5 font-semibold ${c.placeholder ? 'text-muted' : ''}`}>{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.issuer}</p>
              {c.date && <p className="mt-auto pt-4 font-mono text-xs text-muted">Completed {c.date}</p>}
            </>
          )
          const cls = `flex h-full flex-col rounded-2xl border p-5 ${c.placeholder ? 'border-dashed border-line' : 'border-line bg-bg/60'}`
          return (
            <li key={c.title}>
              {c.file ? (
                <a href={`${import.meta.env.BASE_URL}${c.file}`} className={`${cls} transition-colors hover:border-accent/40`}>{body}</a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
