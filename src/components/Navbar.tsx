import { FormEvent, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { contentIndex, site } from '../config/assets'
import { CloseIcon, FilterIcon, MenuIcon, SearchIcon } from './icons'

type NavbarProps = {
  variant?: 'hero' | 'page'
}

export default function Navbar({ variant = 'hero' }: NavbarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const searchId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return contentIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q)) ||
        item.type.includes(q),
    )
  }, [query])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
    setQuery('')
  }, [location.pathname])

  useEffect(() => {
    if (!searchOpen && !menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen, menuOpen])

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (results[0]) {
      navigate(results[0].path)
      setSearchOpen(false)
      setQuery('')
      setMenuOpen(false)
    } else {
      setSearchOpen(true)
    }
  }

  const isCurrent = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  const searchField = (
    <form className="navbar__search" role="search" onSubmit={onSearchSubmit}>
      <label htmlFor={searchId} className="sr-only">
        Search exhibitions, stories, and artists
      </label>
      <input
        id={searchId}
        type="search"
        placeholder="Hinted search text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setSearchOpen(true)
        }}
        onFocus={() => setSearchOpen(true)}
        autoComplete="off"
      />
      <button type="submit" className="navbar__search-btn" aria-label="Search">
        <SearchIcon aria-hidden />
      </button>
      <button type="button" className="navbar__icon-btn" aria-label="Filter results">
        <FilterIcon aria-hidden />
      </button>
    </form>
  )

  const resultsPanel =
    searchOpen && query.trim() ? (
      <div className="navbar__search-panel" ref={panelRef} role="listbox" aria-label="Search results">
        {results.length === 0 ? (
          <p className="navbar__search-empty">No matches for “{query.trim()}”.</p>
        ) : (
          <ul>
            {results.map((item) => (
              <li key={item.path + item.title}>
                <Link
                  to={item.path}
                  onClick={() => {
                    setSearchOpen(false)
                    setQuery('')
                    setMenuOpen(false)
                  }}
                >
                  <span className="navbar__search-type">{item.type}</span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    ) : null

  const links = (
    <ul className="navbar__links">
      {site.nav.map((item) => (
        <li key={item.href}>
          <Link
            to={item.href}
            className="navbar__link"
            aria-current={isCurrent(item.href) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <nav
      className="navbar"
      aria-label="Primary"
      data-variant={variant}
      style={
        variant === 'page'
          ? {
              position: 'relative',
              top: 0,
              left: 'auto',
              right: 'auto',
              width: '70%',
              maxWidth: 'calc(100% - 2 * var(--page-gutter))',
              margin: '1rem var(--page-gutter) 0 auto',
              background: 'rgba(44, 36, 32, 0.88)',
              borderColor: 'rgba(255,255,255,0.12)',
            }
          : undefined
      }
    >
      {links}
      <div style={{ position: 'relative', marginLeft: 'auto' }}>
        {searchField}
        {resultsPanel}
      </div>
      <button
        type="button"
        className="navbar__menu-toggle"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((o) => !o)}
      >
        {menuOpen ? <CloseIcon aria-hidden /> : <MenuIcon aria-hidden />}
      </button>
      {menuOpen ? (
        <div className="navbar__mobile" id="mobile-nav">
          {links}
          <div style={{ position: 'relative' }}>
            {searchField}
            {resultsPanel}
          </div>
        </div>
      ) : null}
    </nav>
  )
}
