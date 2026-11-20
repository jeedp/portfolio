import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/** A small circle that appears after the second screen and returns to the top. */
export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 grid size-10 place-items-center rounded-full border border-line-strong bg-bg/80 text-muted backdrop-blur transition-colors hover:border-ink hover:text-ink"
        >
          <ArrowUp className="size-4" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
