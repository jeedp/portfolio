import { ArrowUpRight, Download } from 'lucide-react'
import { certificates, profile, projects, timeline } from '../data/profile'
import { Button } from '../components/Button'

/** The résumé as one card: the download up front, the CV in four columns underneath. */
export function Resume() {
  const pdf = `${import.meta.env.BASE_URL}${profile.resume}`
  const work = timeline.filter(t => !t.placeholder && t.type !== 'education')
  const certs = certificates.filter(c => !c.placeholder)
  const columns = [
    { title: 'Education', lines: ['BS Computer Engineering', 'Southern Leyte State University'] },
    { title: 'Experience', lines: work.map(w => w.title) },
    { title: 'Projects', lines: projects.map(p => p.title) },
    { title: 'Certifications', lines: certs.map(c => c.title) },
  ]
  return (
    <section id="resume" aria-labelledby="resume-title" className="py-24 md:py-32">
      <div className="container-page">
        <div className="overflow-hidden rounded-[32px] border border-line bg-surface">
          <div className="grid items-end gap-8 p-8 sm:p-12 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 text-sm text-muted">Résumé</p>
              <h2 id="resume-title" className="display text-5xl sm:text-6xl">Prefer it on one page?</h2>
              <p className="mt-5 max-w-lg leading-relaxed text-body">
                The same facts as this site, formatted for print and applicant tracking systems. Updated {profile.updated}.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={pdf} download><Download className="size-4" aria-hidden="true" /> Download PDF</Button>
              <Button href={pdf} target="_blank" rel="noopener" variant="secondary">Open <ArrowUpRight className="size-4" aria-hidden="true" /></Button>
            </div>
          </div>
          <div className="grid gap-px border-t border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {columns.map(c => (
              <div key={c.title} className="bg-surface p-8 sm:px-12">
                <h3 className="text-sm text-muted">{c.title}</h3>
                <ul className="mt-3 space-y-1.5 text-[15px] text-ink">{c.lines.map(l => <li key={l}>{l}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
