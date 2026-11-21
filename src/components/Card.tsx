import type { HTMLAttributes, PointerEvent, ReactNode } from 'react'

/** A bordered card; a soft light follows the pointer across it (desktop only, via CSS hover). */
export function Card({ children, className = '', ...rest }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <div onPointerMove={onPointerMove} className={`card spotlight ${className}`} {...rest}>
      {children}
    </div>
  )
}
