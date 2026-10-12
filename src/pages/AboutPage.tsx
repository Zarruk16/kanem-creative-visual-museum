import PageLayout from './PageLayout'

export default function AboutPage() {
  return (
    <PageLayout
      title="About"
      lead="Kanem Creative Visual Museum is a digital museum for contemporary photography, film, writing and poetry from the North-East and beyond."
    >
      <div className="content-placeholder">
        <p>
          Rooted in place and open to the world, the museum brings together contemporary voices to
          explore memory, identity, displacement, resilience and hope.
        </p>
        <p>
          People. Place. Stories. — these anchors guide how exhibitions, stories, and artist
          practices are presented across this site.
        </p>
        <div className="content-note">
          Additional institutional history, partnerships, or awards can be added here when
          verified. Avoid unverified claims.
        </div>
      </div>
    </PageLayout>
  )
}
