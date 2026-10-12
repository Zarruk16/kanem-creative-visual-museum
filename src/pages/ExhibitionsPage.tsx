import { Link } from 'react-router-dom'
import PageLayout from './PageLayout'

export default function ExhibitionsPage() {
  return (
    <PageLayout
      title="Exhibitions"
      lead="A foundation for current and upcoming exhibitions presented by Kanem Creative Visual Museum."
    >
      <div className="content-placeholder">
        <p>
          Exhibition listings will appear here. Titles, dates, and curatorial notes can be added
          as content is confirmed — nothing on this page invents schedules or programmes.
        </p>
        <p>
          From the homepage, <strong>Explore Our Work</strong> leads here. The exterior model’s{' '}
          <Link to="/gallery">Enter Gallery</Link> experience opens the immersive interior route.
        </p>
        <div className="content-note">
          Placeholder — replace with exhibition records when ready. Suggested fields: title,
          status (current / upcoming), short description, related story links.
        </div>
      </div>
    </PageLayout>
  )
}
