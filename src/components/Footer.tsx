import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../config/assets'
import { InstagramIcon, XIcon, YouTubeIcon } from './icons'

function SocialItem({
  href,
  label,
  network,
  children,
}: {
  href: string
  label: string
  network: 'instagram' | 'x' | 'youtube'
  children: ReactNode
}) {
  const className = `footer__social-link footer__social-link--${network}`

  if (!href) {
    return (
      <span
        className={className}
        aria-disabled="true"
        title={`${label} — URL not configured yet`}
      >
        {children}
        <span className="sr-only">{label} (coming soon)</span>
      </span>
    )
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  )
}

export default function Footer() {
  const location = useLocation()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <nav className="footer__nav" aria-label="Footer">
          {site.nav.map((item) => {
            const current =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                to={item.href}
                className="footer__link"
                aria-current={current ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="footer__social">
          <SocialItem href={site.social.instagram} label="Instagram" network="instagram">
            <InstagramIcon aria-hidden />
          </SocialItem>
          <SocialItem href={site.social.x} label="X" network="x">
            <XIcon aria-hidden />
          </SocialItem>
          <SocialItem href={site.social.youtube} label="YouTube" network="youtube">
            <YouTubeIcon aria-hidden />
          </SocialItem>
        </div>
      </div>
    </footer>
  )
}
