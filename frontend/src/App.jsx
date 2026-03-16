import { Toaster as Sonner } from './ui/sonner'
import { TooltipProvider } from './ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'

import Layout from './components/Layout'
import Home from './pages/Home'
import Packages from './pages/Packages'
import Services from './pages/Services'
import Shop from './pages/Shop'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import RefundPolicy from './pages/RefundPolicy'
import AdminLogin from './pages/AdminLogin'
import AdminBlog from './pages/AdminBlog'
import NotFound from './pages/NotFound'

const SITE = 'https://dealflow.co.ke'

const pageMeta = {
  '/': {
    title: 'DealFlow | Websites, Digital Services & Tools in Kenya',
    description: 'Websites, KRA registration, IT support, POS systems, templates, calculators and more for Kenyan businesses. From KES 6,000. WhatsApp +254 726 899 113.',
  },
  '/packages': {
    title: 'Website Packages & Pricing | DealFlow',
    description: 'Website packages from KES 6,000. Landing pages, business sites, and e-commerce stores built for Kenyan businesses with fixed pricing and fast turnaround.',
  },
  '/services': {
    title: 'Digital Services in Kenya | DealFlow',
    description: 'KRA PIN, eTIMS, NHIF/NSSF, social media, CCTV, home & office networking, POS systems, Odoo ERP and more — all services in one place.',
  },
  '/shop': {
    title: 'Shop | DealFlow — Software, Hardware & Digital Products',
    description: 'Buy POS software, barcode scanners, digital templates, office equipment, and more. Order via WhatsApp, pay via M-Pesa.',
  },
  '/blog': {
    title: 'Blog | DealFlow — Business & Tech Tips for Kenya',
    description: 'Articles on running a business in Kenya, KRA tips, tech guides, and DealFlow updates.',
  },
  '/about': {
    title: 'About DealFlow | Nairobi Digital Agency',
    description: 'DealFlow is a Nairobi-based digital agency helping small businesses get online, stay KRA-compliant, and run better with the right tools.',
  },
  '/contact': {
    title: 'Get a Quote | DealFlow',
    description: 'Contact DealFlow for websites, KRA services, IT support, and more. WhatsApp +254 726 899 113 or email iknus.xmc@gmail.com.',
  },
  '/privacy':  { title: 'Privacy Policy | DealFlow', description: 'How DealFlow collects, uses, and protects your personal information.' },
  '/terms':    { title: 'Terms of Service | DealFlow', description: 'Terms and conditions for using DealFlow services.' },
  '/refund':   { title: 'Refund Policy | DealFlow', description: 'DealFlow refund and cancellation policy for digital services.' },
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2, staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 } },
})

const SeoManager = () => {
  const { pathname } = useLocation()
  const meta = pageMeta[pathname] || { title: 'DealFlow | Digital Services Kenya', description: 'Affordable digital services for Kenyan businesses.' }
  const canonical = `${SITE}${pathname}`
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </Helmet>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BrowserRouter>
        <SeoManager />
        <TooltipProvider>
          <Sonner />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="packages" element={<Packages />} />
              <Route path="services" element={<Services />} />
              <Route path="shop" element={<Shop />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogPost />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfService />} />
              <Route path="refund" element={<RefundPolicy />} />
            </Route>
            {/* Admin routes — outside Layout (no navbar/footer) */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-blog" element={<AdminBlog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </HelmetProvider>
  </QueryClientProvider>
)

export default App
