import { Award, BookOpen, Briefcase, GraduationCap, Presentation } from 'lucide-react'
import { certificates, timeline, type TimelineItem } from '../data/profile'
import { Section } from '../components/Section'
import { Badge } from '../components/Badge'

/** Placeholders remind you what to add while you run `npm run dev`; they never ship to the live site. */
const showPlaceholders = import.meta.env.DEV

const icon: Record<TimelineItem['type'], typeof Briefcase> = { work: Briefcase, academic: BookOpen, training: Presentation, education: GraduationCap }

export function Experience() {
  const items = timeline.filter(t => showPlaceholders || !t.placeholder)
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've been" aside="Work, study and training so far, most recent first.">
      <ol className="relative">
        {items.map((item, i) => {
          const Icon = icon[item.type]
          return (
            <li key={item.title} className={`grid gap-4 border-t border-line py-10 md:grid-cols-[200px_1fr] md:gap-12 ${item.placeholder ? 'opacity-50' : ''} ${i === items.length - 1 ? 'border-b' : ''}`}>
              <p className="display tabular text-3xl text-ink md:text-4xl">{item.period}</p>
              <div className="grid gap-5 sm:grid-cols-[48px_1fr]">
                <span className="hidden size-12 place-items-center rounded-full bg-raised text-accent sm:grid">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-medium">
                    {item.title}
                    {item.placeholder && <span className="ml-2 rounded-full border border-dashed border-line-strong px-2 py-0.5 text-xs text-muted">placeholder, dev only</span>}
                  </h3>
                  <p className="mt-1 text-[15px] text-muted">{item.org}</p>
                  {item.description && <p className="mt-4 max-w-[62ch] leading-relaxed">{item.description}</p>}
                  {item.tech && <div className="mt-5 flex flex-wrap gap-2">{item.tech.map(t => <Badge key={t}>{t}</Badge>)}</div>}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}

export function Certifications() {
  const items = certificates.filter(c => showPlaceholders || !c.placeholder)
  return (
    <Section id="certifications" eyebrow="Certifications" title="Always learning" aside="Courses completed through Cisco Networking Academy and the DICT-ITU DTC Initiative.">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(c => {
          const body = (
            <>
              <Award className={`size-5 ${c.placeholder ? 'text-muted' : 'text-accent'}`} aria-hidden="true" />
              <h3 className="mt-6 text-lg font-medium leading-snug">{c.title}</h3>
              <p className="mt-2 text-sm text-muted">{c.placeholder ? c.issuer : 'Cisco Networking Academy'}</p>
              <p className="mt-auto pt-6 text-sm text-muted">{c.placeholder ? 'Placeholder, dev only' : <>Completed <span className="tabular text-body">{c.date}</span></>}</p>
            </>
          )
          const cls = `flex h-full flex-col rounded-[24px] p-7 ${c.placeholder ? 'border border-dashed border-line-strong' : 'border border-line bg-surface'}`
          return (
            <li key={c.title}>
              {c.file ? <a href={`${import.meta.env.BASE_URL}${c.file}`} className={`${cls} transition-colors hover:border-line-strong`}>{body}</a> : <div className={cls}>{body}</div>}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
