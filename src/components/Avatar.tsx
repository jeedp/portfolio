import { useState } from 'react'
import { profile } from '../data/profile'

/**
 * Your photo from public/<profile.photo>. Until you add one (or if it fails to load),
 * a monogram shows in its place.
 */
export function Avatar({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  const src = profile.photo && !failed ? `${import.meta.env.BASE_URL}${profile.photo}` : ''
  return (
    <div className={`relative overflow-hidden border border-line bg-raised ${className}`}>
      {src ? (
        <img src={src} alt={`Portrait of ${profile.name}`} width={320} height={320} onError={() => setFailed(true)} className="size-full object-cover" />
      ) : (
        <div role="img" aria-label={`${profile.name}'s monogram`} className="grid size-full place-items-center">
          <span className="font-mono text-lg font-medium text-ink">JP</span>
        </div>
      )}
    </div>
  )
}
