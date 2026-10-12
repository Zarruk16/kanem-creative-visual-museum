import { FormEvent, useId, useState } from 'react'
import { assets } from '../config/assets'

/**
 * Frontend-ready newsletter hook.
 * Replace `subscribeEmail` with a real mailing-list API when configured.
 */
async function subscribeEmail(email: string): Promise<{ ok: boolean; message: string }> {
  const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined

  if (!endpoint) {
    return {
      ok: true,
      message:
        'Newsletter service is not configured yet. Your email was validated locally and is ready to connect when a mailing list endpoint is added.',
    }
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    return { ok: false, message: 'Subscription failed. Please try again later.' }
  }

  return { ok: true, message: 'Thank you — you are subscribed.' }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default function NewsletterSection() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'info'>('idle')
  const [message, setMessage] = useState('')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()

    if (!trimmed) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }

    if (!isValidEmail(trimmed)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const result = await subscribeEmail(trimmed)
      const hasEndpoint = Boolean(import.meta.env.VITE_NEWSLETTER_ENDPOINT)
      setStatus(result.ok ? (hasEndpoint ? 'success' : 'info') : 'error')
      setMessage(result.message)
      if (result.ok && hasEndpoint) setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-heading">
      <img
        className="newsletter__bg"
        src={assets.newsletterBackground}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="newsletter__overlay" aria-hidden />
      <div className="newsletter__content">
        <div className="newsletter__copy">
          <h2 id="newsletter-heading" className="newsletter__title">
            Be Part of the Journey
          </h2>
          <p className="newsletter__desc">
            Join our mailing list for updates on new exhibitions and stories.
          </p>
        </div>

        <div className="newsletter__aside">
          <form className="newsletter__form" onSubmit={onSubmit} noValidate>
            <label htmlFor={id} className="sr-only">
              Email address
            </label>
            <input
              id={id}
              type="email"
              name="email"
              placeholder="your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={status === 'loading'}
              aria-invalid={status === 'error'}
              aria-describedby={`${id}-msg`}
            />
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
          <p
            id={`${id}-msg`}
            className="newsletter__message"
            data-type={status === 'idle' || status === 'loading' ? undefined : status}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        </div>
      </div>
    </section>
  )
}
