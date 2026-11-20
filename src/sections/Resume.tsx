import { ArrowUpRight, Download } from 'lucide-react'
import { certificates, profile, projects, skills, timeline } from '../data/profile'
import { Section } from '../components/Section'
import { Button } from '../components/Button'

/** The résumé at a glance: four columns a recruiter can scan, plus the PDF. Built from the same data as the page. */
export function Resume() {
  const pdf = `${import.meta.env.BASE_URL}${profile.resume}`
  const work = timeline.filter(t => !t.placeholder && t.type !== 'education')
  const certs = certificates.filter(c => !c.placeholder)
  const columns: { title: string; lines: string[] }[] = [
    { title: 'Education', lines: ['BS Computer Engineering', 'Southern Leyte State University'] },
    { title: 'Experience', lines: work.map(w => `${w.title}, ${w.period}`) },
    { title: 'Projects', lines: projects.map(p => p.title) },
    { title: 'Skills', lines: skills.map(s => `${s.name}: ${s.items.slice(0, 3).join(', ')}`) },
  ]

  return (
    <Section
      id="resume"
      label="Résumé"
      title="The one-page version, for applications."
      intro={`Updated ${profile.updated}. Same facts as this site, formatted for print and applicant tracking systems.`}
    >
      <div className="flex flex-wrap gap-3">
        <Button href={pdf} download>
          <Download className="size-4" aria-hidden="true" /> Download PDF
        </Button>
        <Button href={pdf} target="_blank" rel="noopener" variant="secondary">
          Open in a new tab <ArrowUpRight className="size-4" aria-hidden="true" />
        </Button>
      </div>

      {/* 1px gaps over the line colour draw the dividers between columns at every breakpoint */}
      <div className="mt-12 grid gap-px border-y border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {columns.map(c => (
          <div key={c.title} className="bg-bg py-6 sm:px-6 sm:first:pl-0 sm:nth-3:pl-0 lg:nth-3:pl-6">
            <h3 className="mb-3 text-sm text-muted">{c.title}</h3>
            <ul className="space-y-1.5 text-[15px] leading-snug text-ink">
              {c.lines.map(l => <li key={l}>{l}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="pt-6 text-sm text-muted">
        {certs.length} certifications through Cisco Networking Academy, listed in full in the PDF.
      </p>
    </Section>
  )
}
