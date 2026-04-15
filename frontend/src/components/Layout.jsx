import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import NewsletterPopup from './NewsletterPopup'

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <div key={pathname} className="animate-fade-in">
          <Outlet />
        </div>
      </main>
      <Footer />
      <NewsletterPopup />
    </div>
  )
}
