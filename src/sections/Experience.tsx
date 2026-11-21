import { Award, BookOpen, Briefcase, GraduationCap, Presentation } from 'lucide-react'
import { certificates, timeline, type TimelineItem } from '../data/profile'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { BrandIcon } from '../components/BrandIcon'

/** Placeholders remind you what to add while you run `npm run dev`; they never ship to the live site. */
const showPlaceholders = import.meta.env.DEV
const icon: Record<TimelineItem['type'], typeof Briefcase> = { work: Briefcase, academic: BookOpen, training: Presentation, education: GraduationCap }

export function Experience() {
  const items = timeline.filter(t => showPlaceholders || !t.placeholder)
  return (
    <Section id="experience" label="Experience" title="Where I've worked, studied and trained.">
      <Card className="p-2 sm:p-3">
        <ol>
          {items.map((item, i) => {
            const Icon = icon[item.type]
            return (
              <li key={item.title} className={`grid gap-4 rounded-2xl p-5 transition-colors hover:bg-card-hover sm:grid-cols-[48px_1fr_auto] sm:gap-6 sm:p-6 ${item.placeholder ? 'opacity-50' : ''} ${i > 0 ? 'border-t border-line' : ''}`}>
                <span className="grid size-12 place-items-center rounded-xl border border-line bg-bg/60 text-accent-2">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.title}
                    {item.placeholder && <span className="ml-2 align-middle text-xs font-normal text-muted">(placeholder, dev only)</span>}
                  </h3>
                  <p className="mt-0.5 text-[15px] text-muted">{item.org}</p>
                  {item.description && <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed">{item.description}</p>}
                  {item.tech && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.tech.map(t => (
                        <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/40 px-2.5 py-1 text-[13px] text-ink">
                          <BrandIcon name={t} className="size-3.5" />{t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <p className="tabular order-first font-mono text-xs text-muted sm:order-none sm:pt-1.5">{item.period}</p>
              </li>
            )
          })}
        </ol>
      </Card>
    </Section>
  )
}

export function Certifications() {
  const items = certificates.filter(c => showPlaceholders || !c.placeholder)
  return (
    <Section id="certifications" label="Certifications" title="Always learning." intro="Courses completed through Cisco Networking Academy, offered by the DICT-ITU DTC Initiative.">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(c => (
          <li key={c.title}>
            <Card className={`flex h-full flex-col p-6 ${c.placeholder ? 'border-dashed opacity-60' : ''}`}>
              <Award className="size-5 text-accent-2" aria-hidden="true" />
              <h3 className="mt-5 text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">{c.placeholder ? `${c.issuer} (dev only)` : 'Cisco Networking Academy'}</p>
              {c.date && <p className="tabular mt-auto pt-5 font-mono text-xs text-muted">Completed {c.date}</p>}
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}
