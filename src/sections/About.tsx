import { Cpu, Globe, Monitor, Router } from 'lucide-react'
import { about } from '../data/profile'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { BrandIcon } from '../components/BrandIcon'

/** What I build, by area, with the stack I've actually used there. */
const areas = [
  { Icon: Monitor, title: 'Desktop apps', stack: ['C#', 'Windows Forms', 'SQL Server'], text: 'Data-driven tools with a real relational schema behind them.' },
  { Icon: Cpu, title: 'IoT and embedded', stack: ['ESP32', 'Arduino', 'FreeRTOS'], text: 'Firmware that talks to sensors, servos and the cloud.' },
  { Icon: Globe, title: 'Web systems', stack: ['Laravel', 'PHP', 'MySQL'], text: 'Server-rendered apps and APIs, including a production Laravel codebase.' },
  { Icon: Router, title: 'Kiosks and devices', stack: ['Raspberry Pi', 'Node.js', 'SQLite'], text: 'Offline-first software that runs on the hardware it ships with.' },
]

export function About() {
  return (
    <Section id="about" label="About" title="An engineer who likes the whole system.">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div className="space-y-5 text-lg leading-relaxed">
          {about.paragraphs.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
          <ul className="flex flex-wrap gap-2 pt-3">
            {about.interests.map(i => (
              <li key={i} className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm text-ink">{i}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {areas.map(({ Icon, title, stack, text }) => (
            <Card key={title} className="flex flex-col p-6">
              <span className="grid size-10 place-items-center rounded-xl border border-line bg-bg/60 text-accent-2">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-body">{text}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {stack.map(t => (
                  <li key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/40 px-2 py-0.5 text-xs text-ink">
                    <BrandIcon name={t} className="size-3" />{t}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
