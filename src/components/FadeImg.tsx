import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react'

/** An <img> that fades in once it has loaded, so screenshots never pop in half-drawn. Styles: img[data-fade] in index.css. */
export function FadeImg({ onLoad, onError, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => { if (ref.current?.complete) setShown(true) }, [])
  return (
    <img
      ref={ref}
      {...props}
      data-fade={shown ? 'in' : 'out'}
      onLoad={e => { setShown(true); onLoad?.(e) }}
      onError={e => { setShown(true); onError?.(e) }}
    />
  )
}
