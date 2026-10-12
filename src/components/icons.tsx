type IconProps = {
  size?: number
  className?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

export function SearchIcon({ size = 16, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function FilterIcon({ size = 16, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  )
}

export function MenuIcon({ size = 22, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
      {...rest}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon({ size = 22, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className={className}
      {...rest}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  )
}

export function InstagramIcon({ size = 18, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function XIcon({ size = 18, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...rest}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.854 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  )
}

export function YouTubeIcon({ size = 18, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      {...rest}
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z" />
    </svg>
  )
}

/** RGB XYZ axis gizmo — used to enter the interactive 3D model */
export function View3DIcon({ size = 66, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      {...rest}
    >
      {/* Origin */}
      <circle cx="28" cy="36" r="3.2" fill="#2c2420" />

      {/* X axis — red (right) */}
      <line x1="28" y1="36" x2="54" y2="36" stroke="#e53935" strokeWidth="3.2" strokeLinecap="round" />
      <polygon points="58,36 50,31.5 50,40.5" fill="#e53935" />
      <text x="52" y="30" fill="#e53935" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">
        X
      </text>

      {/* Y axis — green (up) */}
      <line x1="28" y1="36" x2="28" y2="10" stroke="#43a047" strokeWidth="3.2" strokeLinecap="round" />
      <polygon points="28,6 23.5,14 32.5,14" fill="#43a047" />
      <text x="33" y="14" fill="#43a047" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">
        Y
      </text>

      {/* Z axis — blue (depth / down-left) */}
      <line x1="28" y1="36" x2="12" y2="52" stroke="#1e88e5" strokeWidth="3.2" strokeLinecap="round" />
      <polygon points="9,55 16.5,50.2 12.2,46" fill="#1e88e5" />
      <text x="4" y="50" fill="#1e88e5" fontSize="11" fontFamily="system-ui, sans-serif" fontWeight="700">
        Z
      </text>
    </svg>
  )
}
