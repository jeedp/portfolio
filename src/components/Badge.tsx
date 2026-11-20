import type { ReactNode } from 'react'

/** A technology tag: plain text in a hairline frame, no fill. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-0.5 text-[12.5px] leading-5 text-body">
      {children}
    </span>
  )
}
