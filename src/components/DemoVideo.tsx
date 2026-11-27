import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { FadeImg } from './FadeImg'

/**
 * A short, muted screen recording of the real system. It loops while it's on screen and pauses when it isn't.
 * With reduced motion turned on, the still screenshot is shown instead.
 */
export function DemoVideo({ src, poster, alt, className = '' }: { src: string; poster: string; alt: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const still = useReducedMotion()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.35 })
    io.observe(v)
    return () => io.disconnect()
  }, [still, failed])

  if (still || failed) return <FadeImg src={poster} alt={alt} loading="lazy" className={className} />
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={`${alt} (screen recording)`}
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
