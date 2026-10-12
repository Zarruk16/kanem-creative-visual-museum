import ExteriorGallerySection from '../components/ExteriorGallerySection'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import NewsletterSection from '../components/NewsletterSection'
import StorySection from '../components/StorySection'

export default function HomePage() {
  return (
    <div className="app-shell">
      <main className="main-content">
        <HeroSection />
        <ExteriorGallerySection />
        <StorySection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
