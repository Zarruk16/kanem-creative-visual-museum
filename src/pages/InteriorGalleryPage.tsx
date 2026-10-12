import { Link } from 'react-router-dom'
import { assets, site } from '../config/assets'

/**
 * Interior gallery experience.
 *
 * When the interior GLB is ready:
 * 1. Place the file at `assets.interiorModelGlb` (see src/config/assets.ts)
 * 2. Replace the placeholder stage below with an R3F Canvas + useGLTF loader
 *    similar to ExteriorModelViewer — keep this route and navigation intact.
 */
export default function InteriorGalleryPage() {
  return (
    <div className="interior">
      <header className="interior__bar">
        <Link to="/" className="interior__back">
          ← Back to museum
        </Link>
        <p className="interior__brand">{site.name}</p>
        <span aria-hidden style={{ width: '7rem' }} />
      </header>

      <div className="interior__stage">
        <div className="interior__card">
          <p className="eyebrow">Immersive interior</p>
          <h1>The gallery is being prepared</h1>
          <p>
            Step into a dedicated interior space designed for quiet looking. The interactive
            interior model will live here — the same architectural language as the exterior,
            experienced from within.
          </p>
          <p>
            This route is ready. When the interior GLB arrives, drop it into the assets folder
            and wire it into this page without changing the homepage or Enter Gallery flow.
          </p>
          <code className="interior__code">
            {`// Integration point
import { useGLTF } from '@react-three/drei'
useGLTF('${assets.interiorModelGlb}')
// Render inside a Canvas on this page.`}
          </code>
          <div className="interior__actions">
            <Link to="/" className="primary">
              Return home
            </Link>
            <Link to="/exhibitions">Browse exhibitions</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
