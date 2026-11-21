import { BrandIcon } from './BrandIcon'

/** A technology: its real logo and its name, the same everywhere on the site. */
export function TechBadge({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-line bg-sheet text-ink ${size === 'sm' ? 'gap-1.5 px-2.5 py-1 text-[13px]' : 'gap-2 px-3 py-1.5 text-sm'}`}>
      <BrandIcon name={name} className={size === 'sm' ? 'size-3.5' : 'size-4'} />
      {name}
    </span>
  )
}
