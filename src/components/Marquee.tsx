import { BrandIcon } from './BrandIcon'

/** A slow, endless strip of tech logos. It pauses under the pointer and stands still under reduced motion. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {items.map(name => (
        <li key={name} className="flex items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-2 text-sm whitespace-nowrap text-ink">
          <BrandIcon name={name} className="size-4" />
          {name}
        </li>
      ))}
    </ul>
  )
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]" role="list" aria-label="Technologies I use">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
