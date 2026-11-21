import type { Project } from '../data/profile'

const src = (path: string) => `${import.meta.env.BASE_URL}${path}`

/**
 * A project's real screenshots on a soft panel.
 * Wide: one desktop/web view in a thin window frame. Phone: the app's tall windows side by side, gently staggered.
 */
export function Shots({ project, caption, eager = false, className = '' }: { project: Project; caption?: string; eager?: boolean; className?: string }) {
  const loading = eager ? 'eager' : 'lazy'
  return (
    <figure className={`group relative overflow-hidden rounded-[22px] bg-panel ${className}`}>
      {project.shotLayout === 'wide' ? (
        <div className="p-3 sm:p-5">
          <div className="overflow-hidden rounded-xl border border-line bg-sheet shadow-[0_18px_40px_-20px_rgb(0_0_0/0.35)]">
            <div aria-hidden="true" className="flex h-7 items-center gap-1.5 border-b border-line px-3">
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
              <span className="size-2 rounded-full bg-line-strong" />
            </div>
            <img
              src={src(project.shots[0].src)}
              alt={project.shots[0].alt}
              loading={loading}
              fetchPriority={eager ? 'high' : undefined}
              className="block aspect-[16/9] w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.015]"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-center gap-3 px-4 pb-0 pt-6 sm:gap-5 sm:px-8 sm:pt-8">
          {project.shots.map((s, i) => (
            <img
              key={s.src}
              src={src(s.src)}
              alt={s.alt}
              loading={loading}
              width={385}
              height={640}
              className={`w-[31%] max-w-[210px] rounded-t-xl border border-b-0 border-line shadow-[0_18px_40px_-20px_rgb(0_0_0/0.45)] transition-transform duration-700 ease-out-expo ${i === 1 ? 'translate-y-0 group-hover:-translate-y-2' : 'translate-y-6 group-hover:translate-y-4'}`}
            />
          ))}
        </div>
      )}
      {caption && <figcaption className="sr-only">{caption}</figcaption>}
    </figure>
  )
}
