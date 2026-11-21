import { Award } from 'lucide-react'
import { certificates, timeline } from '../data/profile'
import { Section } from '../components/Section'
import { Badge } from '../components/Badge'

/** Placeholders remind you what to add while you run `npm run dev`; they never ship to the live site. */
const showPlaceholders = import.meta.env.DEV

function Bullet({ children }: { children: string }) {
  return (
    <li className="flex items-start">
      <span aria-hidden="true" className="mr-3 mt-2.5 size-1.5 shrink-0 rounded-full bg-muted/60" />
      <span className="text-base leading-relaxed">{children}</span>
    </li>
  )
}

/** The template's timeline: a card per role, a dot at the top of each and a line joining them. */
export function Experience() {
  const items = timeline.filter(t => (showPlaceholders || !t.placeholder) && t.type !== 'education')
  return (
    <Section id="experience" title="Experience">
      <ol className="relative">
        {items.map((item, i) => (
          <li key={item.title} className="relative mb-12 last:mb-0">
            <span aria-hidden="true" className="absolute -top-2 left-1/2 z-20 size-4 -translate-x-1/2 rounded-full border-2 border-accent bg-accent ring-4 ring-bg" />
            {i < items.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-1/2 z-10 h-12 w-0.5 -translate-x-1/2 translate-y-full bg-line-strong" />}
            <div className={`rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line transition-shadow duration-300 hover:shadow-md sm:p-7 ${item.placeholder ? 'opacity-60' : ''}`}>
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                <div>
                  <h3 className="text-lg font-semibold sm:text-xl">
                    {item.title}
                    {item.placeholder && <span className="ml-2 align-middle font-sans text-xs font-normal text-muted">(placeholder, dev only)</span>}
                  </h3>
                  <p className="mt-0.5 text-base text-accent sm:text-lg">{item.org}</p>
                </div>
                <span className="tabular shrink-0 font-mono text-sm text-muted">{item.period}</span>
              </div>
              {item.description && <ul className="space-y-2"><Bullet>{item.description}</Bullet></ul>}
              {item.tech && <div className="mt-5 flex flex-wrap gap-2">{item.tech.map(t => <Badge key={t}>{t}</Badge>)}</div>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/** The template's education card, with the certifications listed as its achievements. */
export function Education() {
  const edu = timeline.find(t => t.type === 'education')
  const certs = certificates.filter(c => showPlaceholders || !c.placeholder)
  return (
    <Section id="education" title="Education">
      {edu && (
        <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line sm:p-7">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div>
              <h3 className="text-lg font-semibold sm:text-xl">Bachelor of Science in Computer Engineering</h3>
              <p className="mt-0.5 text-base text-accent sm:text-lg">{edu.org}</p>
            </div>
            <span className="font-mono text-sm text-muted">{edu.period}</span>
          </div>
          <ul className="mt-4 space-y-2">
            <Bullet>Thesis: SLSU Campus Wayfinding System, an offline navigation kiosk on a Raspberry Pi (in development).</Bullet>
            <Bullet>On-the-job training as a web developer intern on a production Laravel system.</Bullet>
          </ul>
        </div>
      )}

      <h3 id="certifications" className="mt-14 scroll-mt-24 text-2xl font-bold">Certifications</h3>
      <p className="mt-2 text-base text-muted">Completed through Cisco Networking Academy, offered by the DICT-ITU DTC Initiative.</p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {certs.map(c => {
          const body = (
            <>
              <Award className={`mt-0.5 size-5 shrink-0 ${c.placeholder ? 'text-muted' : 'text-accent'}`} aria-hidden="true" />
              <span className="min-w-0">
                <span className={`block font-mono text-[15px] font-medium ${c.placeholder ? 'text-muted' : 'text-ink'}`}>{c.title}</span>
                <span className="mt-0.5 block text-sm text-muted">{c.placeholder ? `${c.issuer} (dev only)` : `Completed ${c.date}`}</span>
              </span>
            </>
          )
          const cls = `flex h-full items-start gap-4 rounded-xl p-5 ${c.placeholder ? 'border border-dashed border-line-strong' : 'bg-soft ring-1 ring-line'}`
          return (
            <li key={c.title}>
              {c.file ? <a href={`${import.meta.env.BASE_URL}${c.file}`} className={`${cls} transition-colors hover:bg-card hover:ring-line-strong`}>{body}</a> : <div className={cls}>{body}</div>}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
