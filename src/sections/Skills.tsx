import { CodeXml, Cpu, Database, Globe, Wrench } from 'lucide-react'
import { skills, type SkillGroup } from '../data/profile'
import { Section } from '../components/Section'

const icons: Record<SkillGroup['icon'], typeof Cpu> = { code: CodeXml, globe: Globe, database: Database, cpu: Cpu, wrench: Wrench }

export function Skills() {
  return (
    <Section id="skills" title="Skills" note="Tools I've used in real projects. No percentage bars: the projects show the depth.">
      <div className="space-y-8">
        {skills.map(group => {
          const Icon = icons[group.icon]
          return (
            <div key={group.name} className="grid gap-4 sm:grid-cols-[220px_1fr] sm:gap-8">
              <h3 className="flex items-center gap-3 font-mono text-base font-semibold sm:pt-1.5">
                <Icon className="size-5 text-accent" aria-hidden="true" /> {group.name}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map(item => (
                  <li key={item} className="rounded-full bg-soft px-4 py-2 font-mono text-[15px] font-medium text-ink ring-1 ring-line transition-colors hover:bg-accent-soft hover:text-accent">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
        <div className="grid gap-4 border-t border-line pt-8 sm:grid-cols-[220px_1fr] sm:gap-8">
          <h3 className="font-mono text-base font-semibold text-muted sm:pt-0.5">Learning next</h3>
          <p className="text-lg leading-relaxed">Artificial intelligence and machine learning, plus better testing and cleaner architecture in the code I already write.</p>
        </div>
      </div>
    </Section>
  )
}
