import { ArrowUpRight } from 'lucide-react'
import { about, certificates, education, philosophy, profile, seniorHigh, skills, timeline } from '../data/profile'
import { SectionTitle } from '../components/Chrome'
import { TechBadge } from '../components/TechBadge'
import { Reveal } from '../components/Reveal'

function Sub({ children, id }: { children: string; id: string }) {
  return (
    <h3 id={id} className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.16em] text-ink">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />{children}
    </h3>
  )
}

const facts = [
  { k: 'Studying', v: `BS Computer Engineering, ${education.school}` },
  { k: 'Graduating', v: education.expected.replace('Expected ', '') },
  { k: 'Based in', v: profile.location },
  { k: 'Interested in', v: 'Software engineering, embedded systems, IoT' },
]

export function About() {
  const experience = timeline.filter(t => !t.placeholder && t.type !== 'education')
  const degree = timeline.find(t => t.type === 'education')
  const certs = certificates.filter(c => !c.placeholder)
  return (
    <section aria-labelledby="about" className="py-16 md:py-24">
      <SectionTitle id="about" title="About Me" subtitle="Who I am, what I’ve done, and how I work." />

      {/* Bio and portrait */}
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="space-y-5 text-[17px] leading-relaxed lg:col-span-7">
          {about.paragraphs.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
          <dl className="!mt-10 grid gap-x-8 gap-y-5 border-t border-line pt-8 sm:grid-cols-2">
            {facts.map(f => (
              <div key={f.k}>
                <dt className="eyebrow">{f.k}</dt>
                <dd className="mt-1 text-[16px] font-medium text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5">
          <figure className="relative mx-auto max-w-[400px]">
            <span aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-[24px] bg-accent-soft ring-1 ring-accent/30" />
            <img
              src={`${import.meta.env.BASE_URL}${profile.photo}`}
              alt={`Portrait of ${profile.name}`}
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-[24px] object-cover object-top"
            />
          </figure>
        </Reveal>
      </div>

      {/* Education */}
      <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:gap-16" aria-labelledby="edu-title">
        <div className="lg:col-span-4">
          <Sub id="edu-title">Education</Sub>
          <p className="mt-4 max-w-[34ch] text-muted">Computer Engineering now, after a STEM strand in senior high.</p>
        </div>
        <div className="border-y border-line lg:col-span-8">
          <Reveal>
            <div className="grid gap-2 py-6 sm:grid-cols-[160px_1fr] sm:gap-8">
              <p className="tabular font-mono text-[13px] uppercase tracking-[0.08em] text-muted sm:pt-1">{degree?.period ?? education.period}<span className="block text-accent-text">Expected</span></p>
              <div>
                <p className="text-[19px] font-bold text-ink">{education.degree}</p>
                <p className="text-[15px] text-muted">{education.school} · {education.location}</p>
                <p className="eyebrow mt-5">Relevant coursework</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {education.coursework.map(c => <li key={c} className="rounded-full border border-line px-3 py-1 text-[14px] text-ink">{c}</li>)}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid gap-2 border-t border-line py-6 sm:grid-cols-[160px_1fr] sm:gap-8">
              <p className="tabular font-mono text-[13px] uppercase tracking-[0.08em] text-muted sm:pt-1">{seniorHigh.period}</p>
              <div>
                <p className="text-[19px] font-bold text-ink">{seniorHigh.level}</p>
                <p className="text-[15px] text-muted">{seniorHigh.school} · {seniorHigh.location}</p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-[14px] font-medium text-accent-text">{seniorHigh.honors}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Experience */}
      <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:gap-16" aria-labelledby="exp-title">
        <div className="lg:col-span-4">
          <Sub id="exp-title">Experience</Sub>
          <p className="mt-4 max-w-[34ch] text-muted">My internship and thesis, newest first.</p>
        </div>
        <ol className="divide-y divide-line border-y border-line lg:col-span-8">
          {experience.map(t => (
            <Reveal key={t.title}>
              <li className="grid gap-2 py-6 sm:grid-cols-[160px_1fr] sm:gap-8">
                <p className="tabular font-mono text-[13px] uppercase tracking-[0.08em] text-muted sm:pt-1">{t.period}</p>
                <div>
                  <p className="text-[19px] font-bold text-ink">{t.title}</p>
                  <p className="text-[15px] text-muted">{t.org}</p>
                  {t.description && <p className="mt-2 text-[16px]">{t.description}</p>}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* How I work */}
      <div className="mt-24" aria-labelledby="how-title">
        <Sub id="how-title">How I work</Sub>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {philosophy.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <li className="h-full rounded-[22px] bg-panel p-7">
                <p className="tabular font-mono text-[13px] text-accent-text">{String(i + 1).padStart(2, '0')}</p>
                <p className="mt-5 text-[20px] font-bold leading-snug tracking-[-0.01em] text-ink">{p.title}</p>
                <p className="mt-3 text-[16px] leading-relaxed">{p.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Toolkit */}
      <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:gap-16" aria-labelledby="tools-title">
        <div className="lg:col-span-4">
          <Sub id="tools-title">Toolkit</Sub>
          <p className="mt-4 max-w-[34ch] text-muted">What I’ve used in coursework, projects and my internship.</p>
        </div>
        <dl className="space-y-6 lg:col-span-8">
          {skills.map(g => (
            <div key={g.name} className="grid gap-3 sm:grid-cols-[160px_1fr] sm:gap-8">
              <dt className="text-[15px] font-medium text-ink sm:pt-1.5">{g.name}</dt>
              <dd className="flex flex-wrap gap-2">{g.items.map(t => <TechBadge key={t} name={t} size="sm" />)}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Certifications */}
      <div className="mt-24 grid gap-10 lg:grid-cols-12 lg:gap-16" aria-labelledby="cert-title">
        <div className="lg:col-span-4">
          <Sub id="cert-title">Certifications</Sub>
          <p className="mt-4 max-w-[34ch] text-muted">Cisco Networking Academy courses through the DICT-ITU DTC Initiative.</p>
        </div>
        <ul className="divide-y divide-line border-y border-line lg:col-span-8">
          {certs.map(c => (
            <li key={c.title}>
              <a href={c.file ? `${import.meta.env.BASE_URL}${c.file}` : undefined} target="_blank" rel="noopener" className="group flex items-center justify-between gap-6 py-4">
                <span className="text-[16px] font-medium text-ink transition-colors group-hover:text-accent-text">{c.title}</span>
                <span className="flex shrink-0 items-center gap-3 text-[14px] text-muted">
                  <span className="tabular">{c.date}</span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
