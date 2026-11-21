import { ArrowUpRight, Download, FileText } from 'lucide-react'
import { certificates, profile, projects, timeline } from '../data/profile'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'

/** The résumé at a glance, with the PDF one click away. */
export function Resume() {
  const pdf = `${import.meta.env.BASE_URL}${profile.resume}`
  const work = timeline.filter(t => !t.placeholder && t.type !== 'education')
  const certs = certificates.filter(c => !c.placeholder)
  const cols = [
    { title: 'Education', lines: ['BS Computer Engineering', 'Southern Leyte State University'] },
    { title: 'Experience', lines: work.map(w => w.title) },
    { title: 'Projects', lines: projects.map(p => p.title) },
    { title: 'Certifications', lines: [`${certs.length} courses`, 'Cisco Networking Academy'] },
  ]
  return (
    <Section id="resume" label="Résumé" title="Prefer it on one page?">
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-6 border-b border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent text-on-accent shadow-[0_8px_24px_-8px_var(--accent)]">
              <FileText className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-ink">{profile.name} — Résumé</p>
              <p className="text-sm text-muted">PDF · updated {profile.updated} · same facts as this site</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={pdf} download><Download className="size-4" aria-hidden="true" /> Download PDF</Button>
            <Button href={pdf} target="_blank" rel="noopener" variant="secondary">Open <ArrowUpRight className="size-4" aria-hidden="true" /></Button>
          </div>
        </div>
        <dl className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {cols.map(c => (
            <div key={c.title} className="bg-bg p-6 sm:p-8">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{c.title}</dt>
              <dd className="mt-3 space-y-1.5 text-[15px] text-ink">{c.lines.map(l => <p key={l}>{l}</p>)}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </Section>
  )
}
