import type { ReactNode } from 'react'

/** A technology tag. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-raised px-3 py-1 text-[13px] leading-5 text-body">
      {children}
    </span>
  )
}
