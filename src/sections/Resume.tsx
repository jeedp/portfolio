import { ArrowUpRight, Download, FileText } from 'lucide-react'
import { certificates, profile, projects, timeline } from '../data/profile'
import { Section } from '../components/Section'
import { Button } from '../components/Button'

/** The résumé, as a card in the template's style: what's in it, and the PDF. */
export function Resume() {
  const pdf = `${import.meta.env.BASE_URL}${profile.resume}`
  const work = timeline.filter(t => !t.placeholder && t.type !== 'education')
  const certs = certificates.filter(c => !c.placeholder)
  const rows = [
    ['Education', 'BS Computer Engineering, Southern Leyte State University'],
    ['Experience', work.map(w => w.title).join(' · ')],
    ['Projects', projects.map(p => p.title).join(' · ')],
    ['Certifications', `${certs.length} courses, Cisco Networking Academy`],
  ]
  return (
    <Section id="resume" title="Résumé" note={`One page for applications and applicant tracking systems. Updated ${profile.updated}.`}>
      <div className="rounded-2xl bg-soft p-6 ring-1 ring-line sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-on-accent"><FileText className="size-6" aria-hidden="true" /></span>
          <div>
            <h3 className="text-xl font-bold">{profile.name}, résumé</h3>
            <p className="mt-1 text-[15px] text-muted">PDF, generated from the same facts as this site</p>
          </div>
        </div>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {rows.map(([k, v]) => (
            <div key={k} className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6">
              <dt className="font-mono text-sm font-medium text-muted">{k}</dt>
              <dd className="text-base text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={pdf} download><Download className="size-4" aria-hidden="true" /> Download PDF</Button>
          <Button href={pdf} target="_blank" rel="noopener" variant="secondary">Open in a new tab <ArrowUpRight className="size-4" aria-hidden="true" /></Button>
        </div>
      </div>
    </Section>
  )
}
