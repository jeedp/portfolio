import type { ReactNode } from 'react'
import { Download, Mail } from 'lucide-react'
import { about, certificates, profile, projects, skills, timeline } from '../data/profile'
import { Section } from '../components/Section'
import { Button } from '../components/Button'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-line pt-5">
      <h3 className="mb-3 text-sm font-medium text-accent">{title}</h3>
      {children}
    </div>
  )
}

/** The whole CV on one sheet, built from the same data as the rest of the site. */
export function Resume() {
  const base = import.meta.env.BASE_URL
  const work = timeline.filter(t => !t.placeholder && t.type !== 'education')
  const realCerts = certificates.filter(c => !c.placeholder)
  return (
    <Section
      id="resume"
      title="Résumé"
      intro="Everything above on one page. Download the PDF for applications, or read it here."
    >
      <div className="overflow-hidden rounded-3xl border border-line bg-surface">
        <div className="flex flex-col gap-6 border-b border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-2xl font-semibold text-ink">{profile.name}</p>
            <p className="mt-1 text-muted">{profile.title} · {profile.subtitle} · {profile.location}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`${base}${profile.resume}`} download>
              <Download className="size-4" aria-hidden="true" /> Download PDF
            </Button>
            <Button href={`mailto:${profile.email}`} variant="secondary">
              <Mail className="size-4" aria-hidden="true" /> Email me
            </Button>
          </div>
        </div>

        <div className="grid gap-x-12 gap-y-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-8">
            <Block title="Summary">
              <p className="leading-relaxed">{about.paragraphs[0]}</p>
            </Block>
            <Block title="Experience">
              <ul className="space-y-4">
                {work.map(w => (
                  <li key={w.title}>
                    <div className="flex flex-wrap justify-between gap-x-4">
                      <span className="font-medium text-ink">{w.title}</span>
                      <span className="font-mono text-sm text-muted">{w.period}</span>
                    </div>
                    <p className="text-[15px] text-muted">{w.org}</p>
                  </li>
                ))}
              </ul>
            </Block>
            <Block title="Projects">
              <ul className="space-y-4">
                {projects.map(p => (
                  <li key={p.id}>
                    <span className="font-medium text-ink">{p.title}</span>
                    <span className="text-muted">, {p.tech.slice(0, 3).join(', ')}</span>
                    {p.result && <p className="text-[15px] leading-relaxed">{p.result}</p>}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <div className="space-y-8">
            <Block title="Education">
              <p className="font-medium text-ink">BS Computer Engineering</p>
              <p className="text-[15px] text-muted">Southern Leyte State University, 4th year</p>
            </Block>
            <Block title="Technical skills">
              <dl className="space-y-2.5 text-[15px]">
                {skills.map(s => (
                  <div key={s.name}>
                    <dt className="inline font-medium text-ink">{s.name}: </dt>
                    <dd className="inline">{s.items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </Block>
            <Block title="Certifications">
              <ul className="space-y-1.5 text-[15px]">
                {realCerts.map(c => (
                  <li key={c.title} className="flex justify-between gap-4">
                    <span>{c.title}</span>
                    <span className="shrink-0 font-mono text-sm text-muted">{c.date}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm text-muted">Cisco Networking Academy, through the DICT-ITU DTC Initiative</p>
            </Block>
          </div>
        </div>
      </div>
    </Section>
  )
}
