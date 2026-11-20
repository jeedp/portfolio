import type { ReactNode } from 'react'

type Props = { id: string; eyebrow?: string; title: ReactNode; aside?: ReactNode; children: ReactNode; className?: string }

/** A section with a large serif title; an optional line sits to the right of the title on wide screens. */
export function Section({ id, eyebrow, title, aside, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-24 md:py-32 ${className}`}>
      <div className="container-page">
        <header className="mb-14 grid items-end gap-6 md:mb-20 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            {eyebrow && <p className="mb-4 text-sm text-muted">{eyebrow}</p>}
            <h2 id={`${id}-title`} className="display text-[44px] sm:text-6xl lg:text-7xl">{title}</h2>
          </div>
          {aside && <p className="max-w-md text-base leading-relaxed text-muted md:justify-self-end">{aside}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
