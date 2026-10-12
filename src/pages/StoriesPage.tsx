import { assets } from '../config/assets'
import PageLayout from './PageLayout'

export default function StoriesPage() {
  return (
    <PageLayout
      title="Stories"
      lead="Editorial and photographic stories exploring memory, identity, and place."
    >
      <div className="content-placeholder">
        <figure style={{ maxWidth: '28rem', marginBottom: '1.5rem' }}>
          <img
            src={assets.documentaryPhoto}
            alt="Elderly woman in a vivid patterned headscarf seated on a woven mat"
            loading="lazy"
            style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
          />
        </figure>
        <p className="quote" style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text)' }}>
          Art can document. It can also imagine a fairer world.
        </p>
        <p>
          Story features will expand here. Until additional editorial content is provided, this
          page holds the museum’s documentary framing without inventing biographies or reports.
        </p>
        <div className="content-note">
          Placeholder — add story entries (headline, byline if confirmed, body, imagery) as they
          become available.
        </div>
      </div>
    </PageLayout>
  )
}
