import { Toaster as Sonner } from './ui/sonner'
import { TooltipProvider } from './ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import Layout from './components/Layout'
import Home from './pages/Home'
import Packages from './pages/Packages'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import RefundPolicy from './pages/RefundPolicy'
import NotFound from './pages/NotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
})

const RouteTitleManager = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    const titles = {
      '/':         'DealFlow | Affordable Web & Digital Services in Kenya',
      '/packages': 'Website Packages | DealFlow',
      '/services': 'Other Services | DealFlow',
      '/about':    'About Us | DealFlow',
      '/contact':  'Get a Quote | DealFlow',
      '/privacy':  'Privacy Policy | DealFlow',
      '/terms':    'Terms of Service | DealFlow',
      '/refund':   'Refund Policy | DealFlow',
    }
    document.title = titles[pathname] || 'DealFlow | Digital Solutions Kenya'
  }, [pathname])
  return null
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <RouteTitleManager />
      <HelmetProvider>
        <TooltipProvider>
          <Sonner />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="packages" element={<Packages />} />
              <Route path="services" element={<Services />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfService />} />
              <Route path="refund" element={<RefundPolicy />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </HelmetProvider>
    </BrowserRouter>
  </QueryClientProvider>
)

export default App
