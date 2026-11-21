import { ArrowUpRight, FileText, MapPin } from 'lucide-react'
import { profile } from '../data/profile'
import { Logo, SectionTitle, SocialLinks, resumeHref } from '../components/Chrome'
import { Reveal } from '../components/Reveal'

/** "Keep in touch": one clear way to reach me, then the footer. */
export function Contact() {
  return (
    <footer aria-labelledby="contact" className="pt-16 md:pt-24">
      <SectionTitle id="contact" title="Keep in Touch" subtitle="Open to software engineering internships. Email is the quickest way to reach me." />
      <Reveal>
        <div className="rounded-[28px] bg-panel px-6 py-12 sm:px-12 md:py-16">
          <p className="eyebrow">Say hello</p>
          <a href={`mailto:${profile.email}`} className="group mt-4 inline-flex flex-wrap items-center gap-x-4 break-all text-[28px] font-bold leading-tight tracking-[-0.02em] text-ink sm:text-[44px] lg:text-[56px]">
            <span className="link-draw">{profile.email}</span>
            <ArrowUpRight className="size-8 shrink-0 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:size-10" aria-hidden="true" />
          </a>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={resumeHref} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-on-accent transition-[filter,transform] hover:brightness-110 active:scale-[.97]">
              <FileText className="size-4" aria-hidden="true" /> View résumé
            </a>
            <SocialLinks />
            <span className="inline-flex items-center gap-1.5 text-[15px] text-muted"><MapPin className="size-4" aria-hidden="true" />{profile.location}</span>
          </div>
        </div>
      </Reveal>

      <div className="mt-14 flex flex-col gap-6 border-t border-line py-8 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <nav aria-label="Footer">
          <ul className="flex gap-6">
            <li><a href="#work" className="transition-colors hover:text-ink">Work</a></li>
            <li><a href="#about" className="transition-colors hover:text-ink">About</a></li>
            <li><a href={resumeHref} target="_blank" rel="noopener" className="transition-colors hover:text-ink">Résumé</a></li>
          </ul>
        </nav>
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  )
}
