import { brands, isDark } from '../data/icons'

/** A real brand mark at a given size, or a lettermark tile for brands Simple Icons doesn't carry. */
export function BrandIcon({ name, className = 'size-5' }: { name: string; className?: string }) {
  const b = brands[name]
  if (!b) return null
  if (!b.path) {
    return (
      <span aria-hidden="true" className={`grid shrink-0 place-items-center rounded-[5px] font-mono text-[9px] font-semibold leading-none text-white ${className}`} style={{ background: b.hex }}>
        {b.letters}
      </span>
    )
  }
  return (
    <svg role="img" aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill={isDark(b.hex) ? 'currentColor' : b.hex}>
      <path d={b.path} />
    </svg>
  )
}
