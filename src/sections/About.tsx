import { about } from '../data/profile'
import { Section } from '../components/Section'

export function About() {
  const [lead, ...rest] = about.paragraphs
  return (
    <Section id="about" title="About Me">
      <p className="text-xl leading-relaxed text-ink sm:text-2xl">{lead}</p>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {rest.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
      </div>

      <dl className="mt-12 grid gap-4 sm:grid-cols-3">
        {about.highlights.map(h => (
          <div key={h.label} className="rounded-2xl bg-soft p-6 ring-1 ring-line">
            <dt className="sr-only">{h.label}</dt>
            <dd>
              <span className="block font-mono text-3xl font-bold tracking-tight text-accent">{h.value}</span>
              <span className="mt-2 block text-[15px] leading-snug text-muted">{h.label}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 flex flex-wrap gap-3">
        {about.interests.map(i => (
          <span key={i} className="rounded-full bg-soft px-4 py-2 font-mono text-sm font-medium text-ink ring-1 ring-line transition-colors hover:bg-accent-soft hover:text-accent">
            {i}
          </span>
        ))}
      </div>
    </Section>
  )
}
