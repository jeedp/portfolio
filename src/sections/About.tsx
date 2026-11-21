import { about } from '../data/profile'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'

const facts = [
  { label: 'Education', value: 'BS Computer Engineering, 4th year' },
  { label: 'University', value: 'Southern Leyte State University' },
  { label: 'Location', value: 'Southern Leyte, Philippines' },
  { label: 'Current focus', value: 'Software development and embedded systems' },
]

/** Editorial: the heading on the left column line, two short paragraphs, then a quiet row of facts. */
export function About() {
  const [first, second, third] = about.paragraphs
  return (
    <Section id="about" number="01" label="About" title="A little about me.">
      <div className="grid gap-8 md:grid-cols-12 md:gap-8">
        <Reveal className="md:col-span-9 md:col-start-4">
          <p className="max-w-[40ch] text-2xl font-medium leading-snug tracking-[-0.015em] text-ink sm:text-[28px]">
            {first}
          </p>
          <div className="mt-10 grid gap-6 text-[17px] leading-relaxed sm:grid-cols-2 sm:gap-10">
            <p>{second}</p>
            <p>{third}</p>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <dl className="mt-16 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(f => (
            <div key={f.label} className="border-t border-line-strong pt-5">
              <dt className="label">{f.label}</dt>
              <dd className="mt-3 text-[17px] leading-snug text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  )
}
