import { skills } from '../data/profile'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { BrandIcon } from '../components/BrandIcon'

/** Five numbered groups, each a row of equal logo tiles. Names always visible; no ratings. */
export function Skills() {
  return (
    <Section
      id="skills"
      number="02"
      label="Skills"
      title="Technical skills."
      intro="The languages, frameworks and tools I've used in real projects, from firmware to the screen."
    >
      <div className="border-t border-line">
        {skills.map((group, i) => (
          <Reveal key={group.name}>
            <div className="grid gap-5 border-b border-line py-8 md:grid-cols-12 md:gap-8">
              <h3 className="flex items-baseline gap-3 md:col-span-3">
                <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-base font-medium text-ink">{group.name}</span>
              </h3>
              <ul className="flex flex-wrap gap-3 md:col-span-9">
                {group.items.map(item => (
                  <li
                    key={item}
                    className="flex w-[104px] flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-2 py-4 text-center transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong sm:w-[112px]"
                  >
                    <BrandIcon name={item} className="size-7" />
                    <span className="text-[13px] leading-tight text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-10 grid gap-2 md:grid-cols-12 md:gap-8">
          <span className="label md:col-span-3">Currently learning</span>
          <span className="text-[17px] text-ink md:col-span-9">Artificial intelligence and machine learning, alongside better testing and cleaner architecture in the code I already write.</span>
        </p>
      </Reveal>
    </Section>
  )
}
