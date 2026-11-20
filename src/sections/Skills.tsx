import { CodeXml, Cpu, Database, Globe, Wrench } from 'lucide-react'
import { skills, type SkillGroup } from '../data/profile'
import { Section } from '../components/Section'

const icons: Record<SkillGroup['icon'], typeof Cpu> = { code: CodeXml, globe: Globe, database: Database, cpu: Cpu, wrench: Wrench }

export function Skills() {
  return (
    <Section
      id="skills"
      title="Technical skills"
      intro="The languages and tools I've used in real projects, from firmware on a microcontroller to the database and the screen."
      className="border-y border-line bg-surface/40"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = icons[group.icon]
          return (
            <div
              key={group.name}
              className={`rounded-2xl border border-line bg-bg/60 p-6 transition-colors hover:border-accent/40 ${i === 0 ? 'lg:row-span-1' : ''}`}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-semibold">{group.name}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <li key={item} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[15px] text-ink">{item}</li>
                ))}
              </ul>
            </div>
          )
        })}
        <div className="flex flex-col justify-center rounded-2xl border border-dashed border-line p-6">
          <p className="font-semibold text-ink">Learning next</p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
            Artificial intelligence and machine learning, plus better testing and cleaner architecture in the code I already write.
          </p>
        </div>
      </div>
    </Section>
  )
}
