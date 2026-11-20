import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/** Appears after the first screen and returns to the top. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.18 }}
          className="fixed bottom-5 right-5 z-40 grid size-11 place-items-center rounded-full border border-line bg-surface/90 text-ink shadow-lg backdrop-blur transition-colors hover:border-accent hover:text-accent active:scale-95"
        >
          <ArrowUp className="size-5" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
