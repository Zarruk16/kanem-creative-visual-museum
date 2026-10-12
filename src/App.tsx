import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ExhibitionsPage from './pages/ExhibitionsPage'
import StoriesPage from './pages/StoriesPage'
import ArtistsPage from './pages/ArtistsPage'
import AboutPage from './pages/AboutPage'

const InteriorGalleryPage = lazy(() => import('./pages/InteriorGalleryPage'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/exhibitions" element={<ExhibitionsPage />} />
      <Route path="/stories" element={<StoriesPage />} />
      <Route path="/artists" element={<ArtistsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route
        path="/gallery"
        element={
          <Suspense
            fallback={
              <div className="interior" role="status" aria-live="polite">
                <div className="interior__stage">
                  <p>Preparing gallery…</p>
                </div>
              </div>
            }
          >
            <InteriorGalleryPage />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default App
