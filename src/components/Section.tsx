import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = { id: string; number: string; label: string; title: ReactNode; intro?: ReactNode; children: ReactNode; className?: string }

/**
 * Every section shares this header: a narrow left column with the number and label,
 * the title (and an optional line) on the right. Content sits under the title column on wide screens.
 */
export function Section({ id, number, label, title, intro, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-22 md:py-32 ${className}`}>
      <div className="shell">
        <Reveal className="grid gap-5 md:grid-cols-12 md:gap-8">
          <p className="label flex items-center gap-3 self-start md:col-span-3 md:pt-4">
            <span className="text-accent">{number}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            {label}
          </p>
          <div className="md:col-span-9">
            <h2 id={`${id}-title`} className="text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[56px]">{title}</h2>
            {intro && <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-body">{intro}</p>}
          </div>
        </Reveal>
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  )
}
