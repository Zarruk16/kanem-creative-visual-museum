import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGLTF } from '@react-three/drei'
import { assets } from '../config/assets'
import { View3DIcon } from './icons'
import ExteriorModelViewer from './ExteriorModelViewer'

export default function ExteriorGallerySection() {
  const [active3D, setActive3D] = useState(false)
  const [modelReady, setModelReady] = useState(false)

  useEffect(() => {
    try {
      useGLTF.preload(assets.exteriorModelGlb)
    } catch {
      // handled in the viewer
    }
  }, [])

  const onReadyChange = useCallback((ready: boolean) => {
    setModelReady(ready)
  }, [])

  return (
    <section className="exterior" id="gallery" aria-labelledby="exterior-heading">
      <header className="exterior__header">
        <h2 id="exterior-heading" className="display exterior__heading">
          Different Voice, A Shared Humanity
        </h2>
      </header>

      <div className="exterior__inner">
        <div className="exterior__copy">
          <Link to="/gallery" className="exterior__enter">
            Enter Gallery
          </Link>
        </div>

        <ExteriorModelViewer active={active3D} onReadyChange={onReadyChange} />
      </div>

      <div className="exterior__controls">
        {active3D && modelReady ? (
          <p className="exterior__hint">Drag to explore</p>
        ) : !active3D ? (
          <p className="exterior__hint exterior__hint--cue">Click to explore in 3D</p>
        ) : null}

        {!active3D ? (
          <button
            type="button"
            className="exterior__3d-trigger"
            onClick={() => setActive3D(true)}
            aria-label="View interactive 3D model"
            aria-busy={!modelReady}
            title={modelReady ? 'Open 3D view' : 'Preparing 3D model…'}
          >
            <View3DIcon size={66} aria-hidden />
          </button>
        ) : (
          <button
            type="button"
            className="exterior__3d-trigger exterior__3d-trigger--exit"
            onClick={() => setActive3D(false)}
            aria-label="Show photo"
          >
            Show photo
          </button>
        )}
      </div>
    </section>
  )
}
