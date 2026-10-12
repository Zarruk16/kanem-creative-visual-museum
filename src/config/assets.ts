/**
 * Central asset map — paths match files in /public/assets.
 * Update paths here if assets are renamed or relocated.
 */
export const assets = {
  heroImage: '/assets/hero.png',
  heroVideo: '/assets/hero.webm',
  exteriorModelGlb: '/assets/3dmodel-6mb.glb',
  exteriorModelThumb: '/assets/3dmodel-thumb.png',
  documentaryPhoto: '/assets/documentry.png',
  newsletterBackground: '/assets/newsletter.png',
  /**
   * Future interior gallery GLB — place the file at this path when ready.
   * InteriorGalleryPage will load it automatically once available.
   */
  interiorModelGlb: '/assets/interior-gallery.glb',
} as const

export const site = {
  name: 'Kanem Creative Visual Museum',
  nav: [
    { label: 'Home', href: '/', hash: undefined },
    { label: 'Exhibitions', href: '/exhibitions', hash: undefined },
    { label: 'Stories', href: '/stories', hash: undefined },
    { label: 'Artists', href: '/artists', hash: undefined },
    { label: 'About', href: '/about', hash: undefined },
  ],
  /**
   * Social URLs — leave empty until official accounts are confirmed.
   * Empty hrefs render as disabled icons with accessible labels.
   */
  social: {
    instagram: '',
    x: '',
    youtube: '',
  },
} as const

export const contentIndex = [
  {
    type: 'exhibition' as const,
    title: 'A Fairer Tomorrow',
    path: '/exhibitions',
    keywords: ['exhibition', 'photography', 'fairer', 'tomorrow', 'north-east'],
  },
  {
    type: 'story' as const,
    title: 'Art Can Document',
    path: '/stories',
    keywords: ['story', 'memory', 'identity', 'document', 'resilience'],
  },
  {
    type: 'artist' as const,
    title: 'Voices of Place',
    path: '/artists',
    keywords: ['artist', 'voice', 'place', 'photography', 'poetry'],
  },
  {
    type: 'page' as const,
    title: 'About the Museum',
    path: '/about',
    keywords: ['about', 'mission', 'museum', 'kanem', 'culture'],
  },
  {
    type: 'page' as const,
    title: 'Interior Gallery',
    path: '/gallery',
    keywords: ['gallery', 'interior', '3d', 'immersive', 'enter'],
  },
]
