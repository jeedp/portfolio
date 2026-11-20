import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'
import { formspreeId, profile } from '../data/profile'
import { Section } from '../components/Section'
import { GitHubIcon, LinkedInIcon } from '../components/BrandIcons'

type Fields = { name: string; email: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = { kind: 'idle' | 'sending' | 'sent' | 'mail' | 'error'; text?: string }

const empty: Fields = { name: '', email: '', subject: '', message: '' }

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Write your name.'
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Write an email address like name@example.com.'
  if (!f.subject.trim()) e.subject = 'Add a short subject.'
  if (f.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.'
  return e
}

const field = 'mt-2 w-full rounded-xl border bg-bg px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none'

/**
 * With VITE_FORMSPREE_ID set, the form posts to Formspree and you receive the message by email.
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
    const first = Object.keys(found)[0]
    if (first) {
      document.getElementById(`c-${first}`)?.focus()
      setStatus({ kind: 'error', text: `Check ${Object.keys(found).length === 1 ? 'the highlighted field' : 'the highlighted fields'}.` })
      return
    }

    if (!formspreeId) {
      const body = `${values.message}\n\n${values.name}\n${values.email}`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
      setStatus({ kind: 'mail', text: 'Your email app should open with the message ready. Press send there to deliver it.' })
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
      setStatus({ kind: 'error', text: `The message didn't send. Please try again, or email ${profile.email} directly.` })
    }
  }

  const input = (k: keyof Fields, label: string, type = 'text', auto?: string) => (
    <div>
      <label htmlFor={`c-${k}`} className="text-sm font-medium text-ink">{label}</label>
      <input
        id={`c-${k}`} name={k} type={type} autoComplete={auto} value={values[k]} onChange={set(k)}
        aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `c-${k}-err` : undefined}
        className={`${field} ${errors[k] ? 'border-red-400' : 'border-line'}`}
      />
      {errors[k] && <p id={`c-${k}-err`} className="mt-1.5 text-sm text-red-400">{errors[k]}</p>}
    </div>
  )

  return (
    <Section id="contact" title="Let's talk" intro="I'm looking for a software engineering internship and open to collaborations. Send a message, or reach me directly.">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {[
            { href: `mailto:${profile.email}`, icon: <Mail className="size-5" aria-hidden="true" />, label: 'Email', value: profile.email },
            { href: profile.github, icon: <GitHubIcon />, label: 'GitHub', value: `github.com/${profile.githubUser}` },
            { href: profile.linkedin, icon: <LinkedInIcon />, label: 'LinkedIn', value: 'Jed Padro' },
          ].map(c => (
            <a key={c.label} href={c.href} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/50">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">{c.icon}</span>
              <span>
                <span className="block text-sm text-muted">{c.label}</span>
                <span className="block font-medium text-ink">{c.value}</span>
              </span>
            </a>
          ))}
          <p className="flex items-center gap-2 px-1 pt-2 text-muted">
            <MapPin className="size-4 text-accent" aria-hidden="true" /> {profile.location}
          </p>
        </div>

        <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {input('name', 'Name', 'text', 'name')}
            {input('email', 'Email', 'email', 'email')}
          </div>
          {input('subject', 'Subject')}
          <div>
            <label htmlFor="c-message" className="text-sm font-medium text-ink">Message</label>
            <textarea
              id="c-message" name="message" rows={5} value={values.message} onChange={set('message')}
              aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-message-err' : undefined}
              className={`${field} resize-y ${errors.message ? 'border-red-400' : 'border-line'}`}
            />
            {errors.message && <p id="c-message-err" className="mt-1.5 text-sm text-red-400">{errors.message}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status.kind === 'sending'}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-6 text-[15px] font-semibold text-on-accent transition-[transform,filter] duration-200 hover:brightness-110 active:scale-[.97] disabled:opacity-60"
            >
              <Send className="size-4" aria-hidden="true" /> {formspreeId ? 'Send message' : 'Send with my email app'}
            </button>
            <p role="status" className={`text-sm ${status.kind === 'error' ? 'text-red-400' : 'text-muted'}`}>{status.text}</p>
          </div>
        </form>
      </div>
    </Section>
  )
}
