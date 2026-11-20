import { GraduationCap } from 'lucide-react'
import { about } from '../data/profile'
import { Section } from '../components/Section'

export function About() {
  return (
    <Section id="about" title="About me">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed">
          {about.paragraphs.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <GraduationCap className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-ink">BS Computer Engineering</p>
                <p className="text-muted">Southern Leyte State University, 4th year</p>
              </div>
            </div>
            <dl className="mt-6 divide-y divide-line border-t border-line">
              {about.highlights.map(h => (
                <div key={h.label} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="text-[15px] text-muted">{h.label}</dt>
                  <dd className="shrink-0 font-mono text-lg font-medium text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-muted">What I'm interested in</h3>
            <ul className="flex flex-wrap gap-2">
              {about.interests.map(i => (
                <li key={i} className="rounded-full border border-line px-3.5 py-1.5 text-[15px] text-body">{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
