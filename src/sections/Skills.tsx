import { skills } from '../data/profile'
import { Section } from '../components/Section'

/** A spec table: one row per area, the tools as plain text. No bars, no ratings. */
export function Skills() {
  return (
    <Section
      id="skills"
      label="Skills"
      title="Tools I've used in real projects, from firmware to the database to the screen."
    >
      <dl className="border-t border-line">
        {skills.map(group => (
          <div key={group.name} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[200px_1fr] sm:gap-8">
            <dt className="text-sm text-muted">{group.name}</dt>
            <dd>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-ink">
                {group.items.map(item => <li key={item}>{item}</li>)}
              </ul>
            </dd>
          </div>
        ))}
        <div className="grid gap-2 py-5 sm:grid-cols-[200px_1fr] sm:gap-8">
          <dt className="text-sm text-muted">Learning next</dt>
          <dd className="text-[15px] text-body">
            Artificial intelligence and machine learning, and better testing and architecture in the code I already write.
          </dd>
        </div>
      </dl>
    </Section>
  )
}
