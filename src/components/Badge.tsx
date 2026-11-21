import type { ReactNode } from 'react'

/** The template's skill chip. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-soft px-3 py-1 font-mono text-[13px] text-ink ring-1 ring-line">
      {children}
    </span>
  )
}
