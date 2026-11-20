import { about } from '../data/profile'
import { Section } from '../components/Section'

export function About() {
  const [lead, ...rest] = about.paragraphs
  return (
    <Section id="about" label="About">
      <p className="max-w-[40ch] text-xl font-medium leading-snug tracking-[-0.015em] text-ink sm:text-2xl">
        {lead}
      </p>

      <div className="mt-10 grid gap-6 text-base leading-relaxed sm:grid-cols-2 sm:gap-10">
        {rest.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
      </div>

      <div className="mt-14 grid border-t border-line sm:grid-cols-3">
        {about.highlights.map((h, i) => (
          <div key={h.label} className={`py-6 sm:pr-6 ${i > 0 ? 'border-t border-line sm:border-l sm:border-t-0 sm:pl-6' : ''}`}>
            <p className="tabular text-3xl font-medium tracking-tight text-ink">{h.value}</p>
            <p className="mt-2 text-sm leading-snug text-muted">{h.label}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-muted">
        <span className="text-body">Interested in</span>{' '}
        {about.interests.map((i, n) => (
          <span key={i}>
            {/Internet/.test(i) ? i : i.toLowerCase()}
            {n < about.interests.length - 2 ? ', ' : n === about.interests.length - 2 ? ' and ' : '.'}
          </span>
        ))}
      </p>
    </Section>
  )
}
