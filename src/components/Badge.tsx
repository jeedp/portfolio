import type { ReactNode } from 'react'

/** A technology tag. `tone="accent"` highlights it. */
export function Badge({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'accent' }) {
  const look =
    tone === 'accent'
      ? 'border-transparent bg-accent-soft text-accent'
      : 'border-line bg-raised/60 text-body'
  return <span className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[12.5px] leading-none ${look}`}>{children}</span>
}
