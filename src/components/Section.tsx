import type { ReactNode } from 'react'

type Props = { id: string; label: string; title?: ReactNode; intro?: ReactNode; children: ReactNode; className?: string }

/**
 * An editorial section: on wide screens a quiet label column on the left (it stays in view while
 * the section scrolls) and the content on the right. The rule above each section separates it.
 */
export function Section({ id, label, title, intro, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className={`border-t border-line py-20 md:py-28 ${className}`}>
      <div className="container-page grid gap-x-12 gap-y-8 lg:grid-cols-[200px_1fr]">
        <div>
          <h2 id={`${id}-label`} className="text-sm font-medium text-muted lg:sticky lg:top-24">
            {label}
          </h2>
        </div>
        <div className="min-w-0">
          {(title || intro) && (
            <header className="mb-12 max-w-2xl">
              {title && <p className="text-2xl font-medium leading-snug tracking-[-0.015em] text-ink sm:text-[28px]">{title}</p>}
              {intro && <p className="mt-3 text-base leading-relaxed text-muted">{intro}</p>}
            </header>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
