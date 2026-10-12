import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../config/assets'
import Navbar from './Navbar'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [imageReady, setImageReady] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [allowVideo, setAllowVideo] = useState(true)
  /** Hold video fetch until the still is on screen so LCP wins the network */
  const [loadVideo, setLoadVideo] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setAllowVideo(false)
      return
    }
    if (!imageReady) return

    // Small delay lets the still finish decode/paint before contending for bandwidth
    const id = window.setTimeout(() => setLoadVideo(true), 120)
    return () => window.clearTimeout(id)
  }, [imageReady])

  useEffect(() => {
    if (!allowVideo || !loadVideo) return

    const video = videoRef.current
    if (!video) return

    let cancelled = false

    const tryPlay = async () => {
      try {
        video.muted = true
        await video.play()
        if (!cancelled) setVideoReady(true)
      } catch {
        if (!cancelled) setVideoReady(false)
      }
    }

    const onCanPlay = () => {
      void tryPlay()
    }

    if (video.readyState >= 3) {
      void tryPlay()
    } else {
      video.addEventListener('canplaythrough', onCanPlay)
      video.addEventListener('loadeddata', onCanPlay)
    }

    const onError = () => {
      if (!cancelled) setVideoReady(false)
    }
    video.addEventListener('error', onError)

    return () => {
      cancelled = true
      video.removeEventListener('canplaythrough', onCanPlay)
      video.removeEventListener('loadeddata', onCanPlay)
      video.removeEventListener('error', onError)
    }
  }, [allowVideo, loadVideo])

  return (
    <header className="hero" aria-label="Kanem Creative Visual Museum">
      <div className="hero__media" aria-hidden={!videoReady}>
        <picture className="hero__picture">
          <source srcSet={assets.heroImage} type="image/webp" />
          <img
            className={`hero__image${videoReady ? ' is-faded' : ''}`}
            src={assets.heroImageFallback}
            alt="Kanem Creative Visual Museum building at sunset"
            fetchPriority="high"
            decoding="sync"
            width={1915}
            height={1078}
            onLoad={() => setImageReady(true)}
          />
        </picture>
        {allowVideo && loadVideo ? (
          <video
            ref={videoRef}
            className={`hero__video${videoReady ? ' is-ready' : ''}`}
            src={assets.heroVideo}
            poster={assets.heroImage}
            muted
            playsInline
            loop
            preload="auto"
            aria-hidden
            tabIndex={-1}
          />
        ) : null}
        <div className="hero__overlay" />
      </div>

      <Navbar />

      <div className="hero__content">
        <div className="hero__text">
          <p className="eyebrow hero__eyebrow">People. Place. Stories.</p>
          <h1 className="display hero__title">
            A Fairer
            <br />
            Tomorrow
          </h1>
          <p className="hero__lead">
            A digital museum for contemporary photography, film writing and poetry from the
            North-East and beyond.
          </p>
          <Link to="/exhibitions" className="hero__cta">
            Explore Our Work
          </Link>
        </div>
        <p className="eyebrow hero__motto">
          Rooted in place
          <br />
          Open to the world
        </p>
      </div>
    </header>
  )
}
