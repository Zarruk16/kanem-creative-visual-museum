import PageLayout from './PageLayout'

export default function ArtistsPage() {
  return (
    <PageLayout
      title="Artists"
      lead="A space for artist profiles contributing to Kanem’s contemporary visual culture."
    >
      <div className="content-placeholder">
        <p>
          Artist profiles will be listed here. Names, biographies, and works will only appear once
          confirmed — this page does not invent attributions.
        </p>
        <div className="content-note">
          Placeholder — suggested fields: name, practice (photography / film / writing / poetry),
          short statement, linked works or exhibitions.
        </div>
      </div>
    </PageLayout>
  )
}
