import { CodeXml, Cpu, Database, Globe, Sparkles, Wrench } from 'lucide-react'
import { skills, type SkillGroup } from '../data/profile'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { BrandIcon } from '../components/BrandIcon'

const icons: Record<SkillGroup['icon'], typeof Cpu> = { code: CodeXml, globe: Globe, database: Database, cpu: Cpu, wrench: Wrench }
// a bento: the two biggest groups get the wide tiles
const spans = ['lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2']

export function Skills() {
  return (
    <Section id="skills" label="Skills" title="The stack, from firmware to the screen." intro="Tools I've used in real projects. No percentage bars: the projects show the depth.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {skills.map((group, i) => {
          const Icon = icons[group.icon]
          return (
            <Card key={group.name} className={`p-6 ${spans[i] ?? 'lg:col-span-2'}`}>
              <div className="flex items-center gap-2.5 text-sm text-muted">
                <Icon className="size-4" aria-hidden="true" /> {group.name}
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map(item => (
                  <li key={item} className="flex items-center gap-2.5 rounded-xl border border-line bg-bg/40 px-3 py-2.5 text-sm whitespace-nowrap text-ink">
                    <BrandIcon name={item} className="size-[18px]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
        <Card className="flex flex-col justify-between gap-6 p-6 sm:col-span-2 lg:col-span-6 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3 text-ink">
            <Sparkles className="size-5 text-accent-2" aria-hidden="true" />
            <span className="font-semibold">Learning next</span>
          </div>
          <p className="text-[15px] text-body lg:text-right">Artificial intelligence and machine learning, plus better testing and cleaner architecture in the code I already write.</p>
        </Card>
      </div>
    </Section>
  )
}
