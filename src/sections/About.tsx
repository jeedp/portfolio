import { about } from '../data/profile'
import { Section } from '../components/Section'

export function About() {
  const [lead, ...rest] = about.paragraphs
  return (
    <Section id="about" eyebrow="About me" title={<>Curious about how<br className="hidden sm:block" /> things work, all the way down.</>}>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <p className="display text-[28px] leading-[1.2] text-ink sm:text-[34px]">{lead}</p>
        <div className="space-y-6 text-base leading-relaxed sm:text-[17px]">
          {rest.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
          <div className="pt-4">
            <p className="mb-3 text-sm text-muted">Interests</p>
            <ul className="flex flex-wrap gap-2">
              {about.interests.map(i => (
                <li key={i} className="rounded-full border border-line-strong px-4 py-1.5 text-sm text-ink">{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
