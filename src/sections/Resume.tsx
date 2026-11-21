import { ArrowUpRight, Download } from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'

/** A distinct band: the one place on the page with a filled background, so the résumé is easy to find. */
export function Resume() {
  const pdf = `${import.meta.env.BASE_URL}${profile.resume}`
  return (
    <section id="resume" aria-labelledby="resume-title" className="py-12 md:py-20">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface px-6 py-14 sm:px-14 md:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-accent/15 blur-[100px]" />
            <div className="relative grid items-end gap-10 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="label"><span className="text-accent">06</span> <span aria-hidden="true" className="mx-2 inline-block h-px w-6 bg-line-strong align-middle" /> Résumé</p>
                <h2 id="resume-title" className="mt-6 text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[56px]">Want the full picture?</h2>
                <p className="mt-5 max-w-[50ch] text-lg leading-relaxed">
                  Explore my academic background, technical skills and project experience in my résumé. Updated {profile.updated}.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:col-span-4 md:flex-col md:items-end">
                <Button href={pdf} download><Download className="size-4" aria-hidden="true" /> Download PDF</Button>
                <Button href={pdf} target="_blank" rel="noopener" variant="secondary">View résumé <ArrowUpRight className="size-4" aria-hidden="true" /></Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
