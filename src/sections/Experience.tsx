import { ArrowUpRight } from 'lucide-react'
import { certificates, timeline } from '../data/profile'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { TechBadge } from '../components/TechBadge'

/** Placeholders remind you what to add while you run `npm run dev`; they never ship to the live site. */
const showPlaceholders = import.meta.env.DEV
const typeLabel = { work: 'Experience', academic: 'Academic', training: 'Training', education: 'Education' } as const

/** Education and experience on one vertical timeline, newest first, education anchored at the end. */
export function Experience() {
  const items = timeline.filter(t => showPlaceholders || !t.placeholder)
  return (
    <Section
      id="experience"
      number="04"
      label="Experience"
      title="Education and experience."
      intro="Where I've studied, worked and trained so far."
    >
      <Reveal>
      <ol className="relative md:ml-[25%]">
        <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-line-strong" />
        {items.map(item => (
            <li key={item.title} className={`relative pb-12 pl-10 last:pb-0 ${item.placeholder ? 'opacity-50' : ''}`}>
              <span aria-hidden="true" className={`absolute left-0 top-2 size-[11px] rounded-full border-2 ${item.type === 'education' ? 'border-ink bg-bg' : 'border-accent bg-accent'}`} />
              <p className="label flex flex-wrap gap-x-3">
                <span className="tabular text-ink">{item.period}</span>
                <span>{typeLabel[item.type]}</span>
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] sm:text-2xl">
                {item.title}
                {item.placeholder && <span className="ml-2 align-middle text-xs font-normal text-muted">(placeholder, dev only)</span>}
              </h3>
              <p className="mt-1 text-[16px] text-muted">{item.org}</p>
              {item.description && <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed">{item.description}</p>}
              {item.tech && <div className="mt-5 flex flex-wrap gap-2">{item.tech.map(t => <TechBadge key={t} name={t} size="sm" />)}</div>}
            </li>
        ))}
      </ol>
      </Reveal>
    </Section>
  )
}

/** Visually secondary: a compact grid of the real certificates, each linking to the original. */
export function Certifications() {
  const items = certificates.filter(c => showPlaceholders || !c.placeholder)
  const base = import.meta.env.BASE_URL
  return (
    <Section
      id="certifications"
      number="05"
      label="Certifications"
      title="Certifications."
      intro="Courses completed through Cisco Networking Academy, offered by the DICT-ITU DTC Initiative."
    >
      <Reveal>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(c => (
            <li key={c.title} className={`h-full ${c.placeholder ? 'opacity-50' : ''}`}>
              <a
                href={c.file ? `${base}${c.file}` : undefined}
                target="_blank"
                rel="noopener"
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-2.5 transition-colors hover:border-line-strong"
              >
                {c.image
                  ? <img src={`${base}${c.image}`} alt="" width={800} height={542} loading="lazy" className="aspect-[800/542] w-full rounded-xl border border-line bg-white object-cover" />
                  : <div className="aspect-[800/542] rounded-xl border border-dashed border-line-strong" />}
                <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                  <h3 className="text-[15px] font-medium leading-snug text-ink">{c.title}</h3>
                  <p className="mt-auto flex items-center justify-between gap-2 pt-3 text-xs text-muted">
                    <span className="tabular">{c.placeholder ? 'Placeholder, dev only' : c.date}</span>
                    {c.file && <span className="inline-flex items-center gap-1 transition-colors group-hover:text-ink">View <ArrowUpRight className="size-3" aria-hidden="true" /></span>}
                  </p>
                </div>
              </a>
            </li>
        ))}
      </ul>
      </Reveal>
    </Section>
  )
}
