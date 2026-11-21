import type { ReactNode } from 'react'

type Props = { id: string; label: string; title: ReactNode; intro?: ReactNode; action?: ReactNode; children: ReactNode; className?: string }

/** A section: a small label, the heading, an optional line under it and an optional action on the right. */
export function Section({ id, label, title, intro, action, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className}`}>
      <div className="shell">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              {label}
            </p>
            <h2 id={`${id}-title`} className="text-3xl font-semibold sm:text-[44px] sm:leading-[1.1]">{title}</h2>
            {intro && <p className="mt-4 text-base leading-relaxed text-body sm:text-lg">{intro}</p>}
          </div>
          {action}
        </header>
        {children}
      </div>
    </section>
  )
}
