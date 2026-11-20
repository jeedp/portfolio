import { CodeXml, Cpu, Database, Globe, Sparkles, Wrench } from 'lucide-react'
import { skills, type SkillGroup } from '../data/profile'
import { Section } from '../components/Section'

const icons: Record<SkillGroup['icon'], typeof Cpu> = { code: CodeXml, globe: Globe, database: Database, cpu: Cpu, wrench: Wrench }

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I work with"
      aside="Tools I've used in real projects, from firmware on a microcontroller to the database and the screen. No ratings: the projects show the depth."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map(group => {
          const Icon = icons[group.icon]
          return (
            <div key={group.name} className="rounded-[24px] border border-line bg-surface p-7">
              <div className="flex items-center justify-between">
                <h3 className="display text-[28px]">{group.name}</h3>
                <Icon className="size-5 text-muted" aria-hidden="true" />
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map(item => (
                  <li key={item} className="rounded-full bg-raised px-3.5 py-1.5 text-sm text-ink">{item}</li>
                ))}
              </ul>
            </div>
          )
        })}
        <div className="rounded-[24px] border border-accent/30 bg-accent-soft p-7">
          <div className="flex items-center justify-between">
            <h3 className="display text-[28px]">Learning next</h3>
            <Sparkles className="size-5 text-accent" aria-hidden="true" />
          </div>
          <p className="mt-6 text-[15px] leading-relaxed text-body">
            Artificial intelligence and machine learning, plus better testing and cleaner architecture in the code I already write.
          </p>
        </div>
      </div>
    </Section>
  )
}
