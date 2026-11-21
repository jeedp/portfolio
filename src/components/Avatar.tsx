import { useState } from 'react'
import { profile } from '../data/profile'

/** Your portrait from public/<profile.photo>; a monogram stands in if it is missing. */
export function Avatar({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  const src = profile.photo && !failed ? `${import.meta.env.BASE_URL}${profile.photo}` : ''
  return (
    <div className={`relative overflow-hidden bg-soft ${className}`}>
      {src ? (
        <img
          src={src}
          alt={`Portrait of ${profile.name}`}
          width={960}
          height={1199}
          fetchPriority="high"
          onError={() => setFailed(true)}
          className="size-full object-cover object-[50%_30%]"
        />
      ) : (
        <div role="img" aria-label={`${profile.name}'s monogram`} className="grid size-full place-items-center font-mono text-6xl font-bold text-ink">JP</div>
      )}
    </div>
  )
}
