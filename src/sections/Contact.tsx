import { useState, type FormEvent } from 'react'
import { Check, Copy, Send } from 'lucide-react'
import { formspreeId, profile } from '../data/profile'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { EmailIcon, GitHubIcon, LinkedInIcon } from '../components/SocialIcons'

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
      className="grid size-10 shrink-0 place-items-center rounded-full text-muted ring-1 ring-line-strong transition-[color,box-shadow,transform] hover:text-ink hover:ring-ink active:scale-95"
    >
      {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
      <span role="status" className="sr-only">{copied ? 'Copied' : ''}</span>
    </button>
  )
}

const inputBase = 'mt-2 w-full rounded-xl bg-bg/60 px-4 py-3 text-base text-ink ring-1 transition-shadow placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-accent'

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
      setStatus({ kind: 'sent', text: "Message sent. Thank you, I'll get back to you." })
    } catch {
      setStatus({ kind: 'error', text: `It didn't send. Try again, or write to ${profile.email}.` })
    }
  }

  const field = (k: keyof Fields, label: string, opts: { type?: string; auto?: string; area?: boolean } = {}) => {
    const props = {
      id: `c-${k}`, name: k, value: values[k], onChange: set(k),
      'aria-invalid': !!errors[k] || undefined,
      'aria-describedby': errors[k] ? `c-${k}-err` : undefined,
      className: `${inputBase} ${errors[k] ? 'ring-red-500' : 'ring-line-strong'}`,
    }
    return (
      <div>
        <label htmlFor={`c-${k}`} className="text-sm font-medium text-ink">{label}</label>
        {opts.area
          ? <textarea {...props} rows={5} className={`${props.className} resize-y`} />
          : <input {...props} type={opts.type ?? 'text'} autoComplete={opts.auto} />}
        {errors[k] && <p id={`c-${k}-err`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors[k]}</p>}
      </div>
    )
  }

  return (
    <Section
      id="contact"
      label="Contact"
      title="Let's build something that works."
      intro="I'm looking for a software engineering internship and I'm open to collaborations. Email is the fastest way to reach me."
    >
      <div className="grid gap-3 lg:grid-cols-[1fr_1.35fr]">
        <Card className="flex flex-col gap-6 p-6 sm:p-8">
          <div>
            <p className="text-sm text-muted">Email</p>
            <div className="mt-2 flex items-center gap-3">
              <a href={`mailto:${profile.email}`} className="link-draw min-w-0 break-all text-xl font-semibold text-ink">{profile.email}</a>
              <CopyEmail />
            </div>
          </div>
          <div className="grid gap-2">
            {[
              { href: profile.github, label: 'GitHub', sub: `github.com/${profile.githubUser}`, Icon: GitHubIcon },
              { href: profile.linkedin, label: 'LinkedIn', sub: 'Jed Padro', Icon: LinkedInIcon },
              { href: `mailto:${profile.email}`, label: 'Email', sub: profile.email, Icon: EmailIcon },
            ].map(({ href, label, sub, Icon }) => (
              <a key={label} href={href} className="group flex items-center gap-4 rounded-xl border border-line bg-bg/40 p-4 transition-colors hover:border-line-strong">
                <Icon className="size-5 text-muted group-hover:text-ink" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">{label}</span>
                  <span className="block truncate text-xs text-muted">{sub}</span>
                </span>
              </a>
            ))}
          </div>
          <p className="mt-auto text-sm text-muted">Based in Southern Leyte, Philippines (UTC+8).</p>
        </Card>

        <Card className="p-6 sm:p-8">
          <form noValidate onSubmit={onSubmit} aria-label="Send a message" className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {field('name', 'Name', { auto: 'name' })}
              {field('email', 'Email', { type: 'email', auto: 'email' })}
            </div>
            {field('subject', 'Subject')}
            {field('message', 'Message', { area: true })}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
              <button
                type="submit"
                disabled={status.kind === 'sending'}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-bg transition-[background-color,color,transform] hover:bg-accent hover:text-on-accent active:scale-[.97] disabled:opacity-60"
              >
                <Send className="size-4" aria-hidden="true" /> {formspreeId ? 'Send message' : 'Send with my email app'}
              </button>
              <p role="status" className={`text-sm ${status.kind === 'error' ? 'text-red-500 dark:text-red-400' : 'text-muted'}`}>{status.text}</p>
            </div>
          </form>
        </Card>
      </div>
    </Section>
  )
}
