import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = { id: string; title: string; note?: ReactNode; children: ReactNode; className?: string }

/**
 * The template's section: a large monospace title with a short accent bar on the left four columns,
 * the content on the right eight. The bar draws in once when the section first comes into view.
 */
export function Section({ id, title, note, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-20 sm:py-24 lg:py-28 ${className}`}>
      <div className="shell grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-4">
          <h2 id={`${id}-title`} className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">{title}</h2>
          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 h-[5px] w-[75px] origin-left rounded-full bg-accent"
          />
          {note && <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-muted">{note}</p>}
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  )
}
