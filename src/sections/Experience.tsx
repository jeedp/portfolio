import { ArrowUpRight } from 'lucide-react'
import { certificates, timeline } from '../data/profile'
import { Section } from '../components/Section'

/** Placeholders remind you what to add while you run `npm run dev`; they never ship to the live site. */
const showPlaceholders = import.meta.env.DEV

function PlaceholderNote({ children }: { children: string }) {
  return (
    <span className="ml-2 rounded border border-dashed border-line-strong px-1.5 py-0.5 font-mono text-[11px] text-muted">
      {children}
    </span>
  )
}

export function Experience() {
  const items = timeline.filter(t => showPlaceholders || !t.placeholder)
  return (
    <Section id="experience" label="Experience">
      <ol className="border-t border-line">
        {items.map(item => (
          <li key={item.title} className="grid gap-2 border-b border-line py-7 sm:grid-cols-[200px_1fr] sm:gap-8">
            <p className="tabular font-mono text-sm text-muted">{item.period}</p>
            <div className={item.placeholder ? 'opacity-60' : ''}>
              <h3 className="text-lg font-medium tracking-[-0.01em]">
                {item.title}
                {item.placeholder && <PlaceholderNote>placeholder · dev only</PlaceholderNote>}
              </h3>
              <p className="mt-1 text-[15px] text-muted">{item.org}</p>
              {item.description && <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-body">{item.description}</p>}
              {item.tech && <p className="mt-3 font-mono text-xs text-muted">{item.tech.join('  ·  ')}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Certifications() {
  const items = certificates.filter(c => showPlaceholders || !c.placeholder)
  const issuers = [...new Set(items.filter(c => !c.placeholder).map(c => c.issuer))]
  return (
    <Section
      id="certifications"
      label="Certifications"
      intro={issuers.length === 1 ? `All completed through ${issuers[0].replace(' · ', ', ')}.` : undefined}
    >
      <ul className="border-t border-line">
        {items.map(c => {
          const row = (
            <>
              <span className={`text-[15px] ${c.placeholder ? 'text-muted' : 'text-ink'}`}>
                {c.title}
                {c.placeholder && <PlaceholderNote>placeholder · dev only</PlaceholderNote>}
              </span>
              <span className="hidden text-sm text-muted sm:block">{c.category}</span>
              <span className="tabular flex items-center gap-1 text-right font-mono text-sm text-muted">
                {c.date}
                {c.file && <ArrowUpRight className="size-3.5" aria-hidden="true" />}
              </span>
            </>
          )
          const cls = 'grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-line py-4 sm:grid-cols-[1fr_160px_100px]'
          return (
            <li key={c.title}>
              {c.file ? (
                <a href={`${import.meta.env.BASE_URL}${c.file}`} className={`${cls} transition-colors hover:text-accent`}>{row}</a>
              ) : (
                <div className={cls}>{row}</div>
              )}
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
