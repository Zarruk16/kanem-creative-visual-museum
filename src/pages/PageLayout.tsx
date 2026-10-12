import { ReactNode } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

type PageLayoutProps = {
  title: string
  lead: string
  children: ReactNode
}

export default function PageLayout({ title, lead, children }: PageLayoutProps) {
  return (
    <div className="app-shell">
      <Navbar variant="page" />
      <main className="main-content">
        <header className="page-header">
          <h1>{title}</h1>
          <p>{lead}</p>
        </header>
        <div className="page-body">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
