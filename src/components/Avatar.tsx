import { useState } from 'react'
import { profile } from '../data/profile'

/**
 * Your photo from public/<profile.photo>. Until you add one (or if it fails to load),
 * a monogram placeholder shows in its place.
 */
export function Avatar({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false)
  const src = profile.photo && !failed ? `${import.meta.env.BASE_URL}${profile.photo}` : ''
  return (
    <div className={`relative overflow-hidden rounded-full border border-line bg-surface ${className}`}>
      {src ? (
        <img src={src} alt={`Portrait of ${profile.name}`} width={480} height={480} onError={() => setFailed(true)} className="size-full object-cover" />
      ) : (
        <div role="img" aria-label={`${profile.name}'s monogram`} className="bg-grid relative grid size-full place-items-center bg-raised/60">
          <span className="font-mono text-6xl font-medium tracking-tight text-accent">JP</span>
        </div>
      )}
    </div>
  )
}
