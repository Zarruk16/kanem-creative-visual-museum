import { assets } from '../config/assets'

export default function StorySection() {
  return (
    <section className="story" id="stories-preview" aria-labelledby="story-heading">
      <div className="story__inner">
        <figure className="story__figure">
          <img
            src={assets.documentaryPhoto}
            alt="Elderly woman in a vivid patterned headscarf seated on a woven mat"
            loading="lazy"
            decoding="async"
          />
        </figure>
        <div className="story__copy">
          <h2 id="story-heading" className="quote story__quote">
            Art can document.
            <br />
            It can also imagine a fairer world
          </h2>
          <p className="story__body">
            The Kanem Creative Visual Museum brings together contemporary voice to explore
            memory, identity, displacement, resilience and hope.
          </p>
        </div>
      </div>
    </section>
  )
}
