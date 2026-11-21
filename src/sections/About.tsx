import { Compass, Layers, Wrench } from 'lucide-react'
import { about } from '../data/profile'
import { Section } from '../components/Section'
import { Card } from '../components/Card'

const values = [
  { Icon: Layers, title: 'Full-stack, all the way down', text: 'From the screen a person taps to the database, the server and the microcontroller underneath.' },
  { Icon: Compass, title: 'Practical first', text: 'Things that keep working outside a demo: offline, on modest hardware, with real data.' },
  { Icon: Wrench, title: 'Careful with other people’s code', text: 'I read before I change, measure before I call it faster, and write down what I did.' },
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
        <div className="grid gap-3">
          {values.map(({ Icon, title, text }) => (
            <Card key={title} className="flex gap-4 p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-bg/60 text-accent-2">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body">{text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
