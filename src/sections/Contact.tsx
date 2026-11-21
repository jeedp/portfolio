import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { Reveal } from '../components/Reveal'
import { Button } from '../components/Button'

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked: the email link still works */ }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] font-medium text-ink transition-[border-color,background-color,transform] hover:border-ink/50 hover:bg-surface active:scale-[.97]"
    >
      {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      {copied ? 'Copied' : 'Copy email'}
      <span role="status" className="sr-only">{copied ? 'Email address copied' : ''}</span>
    </button>
  )
}

/**
 * The close. Email is the one way in: a large link, a button that opens the visitor's email app,
 * and a copy button for people on webmail. No form, so nothing can silently fail to send.
 */
export function Contact() {
  const links = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'LinkedIn', value: 'in/jed-padro', href: profile.linkedin },
    { label: 'GitHub', value: `github.com/${profile.githubUser}`, href: profile.github },
    { label: 'Website', value: 'jeedp.github.io/portfolio', href: 'https://jeedp.github.io/portfolio/' },
  ]
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-22 md:py-32">
      <div className="shell">
        <Reveal className="grid gap-5 md:grid-cols-12 md:gap-8">
          <p className="label flex items-center gap-3 self-start md:col-span-3 md:pt-4">
            <span className="text-accent">07</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            Contact
          </p>
          <div className="md:col-span-9">
            <h2 id="contact-title" className="max-w-[16ch] text-[40px] font-semibold leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-[72px]">
              Have a project or opportunity in mind?
            </h2>
            <p className="mt-6 max-w-[50ch] text-lg leading-relaxed">
              I’m always open to connecting, collaborating and exploring opportunities in technology.
            </p>
            <a href={`mailto:${profile.email}`} className="link-draw mt-10 inline-block break-all text-2xl font-medium tracking-[-0.02em] text-ink hover:text-accent sm:text-4xl">
              {profile.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${profile.email}`}><Mail className="size-4" aria-hidden="true" /> Send an email</Button>
              <CopyEmail />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <ul className="mt-16 grid border-t border-line sm:grid-cols-2 md:ml-[25%] lg:grid-cols-4">
            {links.map(l => (
              <li key={l.label}>
                <a href={l.href} className="group flex items-start justify-between gap-3 border-b border-line py-5 pr-4 transition-colors hover:text-ink lg:border-b-0">
                  <span>
                    <span className="label block">{l.label}</span>
                    <span className="mt-2 block break-all text-[15px] text-ink">{l.value}</span>
                  </span>
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
