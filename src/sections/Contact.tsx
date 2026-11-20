import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { formspreeId, profile } from '../data/profile'

type Fields = { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = { kind: 'idle' | 'sending' | 'sent' | 'mail' | 'error'; text?: string }

const empty: Fields = { name: '', email: '', subject: '', message: '' }

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Write your name.'
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Write an email address like name@company.com.'
  if (!f.subject.trim()) e.subject = 'Add a short subject.'
  if (f.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.'
  return e
}

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked: the mailto link still works */ }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-[color,border-color,transform] hover:border-ink hover:text-ink active:scale-95"
    >
      {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
      <span role="status" className="sr-only">{copied ? 'Copied' : ''}</span>
    </button>
  )
}

const fieldBase = 'mt-2 w-full border-0 border-b bg-transparent px-0 pb-2.5 pt-1 text-base text-ink transition-colors placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-0'

/**
 * With VITE_FORMSPREE_ID set, the form posts to Formspree and the message arrives in your inbox.
 * Without it, the form opens the visitor's own email app with everything filled in. Nothing is faked.
 */
export function Contact() {
  const [values, setValues] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setValues(v => ({ ...v, [k]: e.target.value }))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const keys = Object.keys(found)
    if (keys.length) {
      document.getElementById(`c-${keys[0]}`)?.focus()
      setStatus({ kind: 'error', text: keys.length === 1 ? 'One field needs a fix.' : `${keys.length} fields need a fix.` })
      return
    }
    if (!formspreeId) {
      const body = `${values.message}\n\n${values.name}\n${values.email}`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
      setStatus({ kind: 'mail', text: 'Your email app should open with the message ready. Press send there.' })
      return
    }
    setStatus({ kind: 'sending', text: 'Sending…' })
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(String(res.status))
      setValues(empty)
      setStatus({ kind: 'sent', text: 'Message sent. I usually reply within a few days.' })
    } catch {
      setStatus({ kind: 'error', text: `It didn't send. Try again, or write to ${profile.email}.` })
    }
  }

  const field = (k: keyof Fields, label: string, opts: { type?: string; auto?: string; area?: boolean } = {}) => {
    const props = {
      id: `c-${k}`, name: k, value: values[k], onChange: set(k),
      'aria-invalid': !!errors[k] || undefined,
      'aria-describedby': errors[k] ? `c-${k}-err` : undefined,
      className: `${fieldBase} ${errors[k] ? 'border-red-400' : 'border-line-strong'}`,
    }
    return (
      <div>
        <label htmlFor={`c-${k}`} className="text-sm text-muted">{label}</label>
        {opts.area
          ? <textarea {...props} rows={4} className={`${props.className} resize-none`} />
          : <input {...props} type={opts.type ?? 'text'} autoComplete={opts.auto} />}
        {errors[k] && <p id={`c-${k}-err`} className="mt-1.5 text-sm text-red-400">{errors[k]}</p>}
      </div>
    )
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <p className="text-sm text-muted">Contact</p>
          <h2 id="contact-title" className="mt-6 max-w-[16ch] text-4xl font-medium leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            Have an internship or a project in mind?
          </h2>
          <p className="mt-6 max-w-[44ch] text-base leading-relaxed text-body">
            I'm looking for a software engineering internship and I'm open to collaborations. Email is the fastest way to reach me.
          </p>
          <div className="mt-10 flex items-center gap-3">
            <a href={`mailto:${profile.email}`} className="link-draw break-all text-xl font-medium text-ink hover:text-accent sm:text-2xl">
              {profile.email}
            </a>
            <CopyEmail />
          </div>
          <div className="mt-8 flex gap-6 text-sm">
            <a href={profile.github} className="link-draw inline-flex items-center gap-1 text-body hover:text-ink">GitHub <ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
            <a href={profile.linkedin} className="link-draw inline-flex items-center gap-1 text-body hover:text-ink">LinkedIn <ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
          </div>
        </div>

        <form noValidate onSubmit={onSubmit} aria-label="Send a message" className="space-y-7 lg:pt-12">
          <div className="grid gap-7 sm:grid-cols-2">
            {field('name', 'Name', { auto: 'name' })}
            {field('email', 'Email', { type: 'email', auto: 'email' })}
          </div>
          {field('subject', 'Subject')}
          {field('message', 'Message', { area: true })}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
            <button
              type="submit"
              disabled={status.kind === 'sending'}
              className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-bg transition-[background-color,color,transform] hover:bg-accent hover:text-on-accent active:scale-[.97] disabled:opacity-60"
            >
              {formspreeId ? 'Send message' : 'Send with my email app'}
            </button>
            <p role="status" className={`text-sm ${status.kind === 'error' ? 'text-red-400' : 'text-muted'}`}>{status.text}</p>
          </div>
        </form>
      </div>
    </section>
  )
}
