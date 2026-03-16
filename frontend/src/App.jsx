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
import OrderPage from './pages/OrderPage'
import NotFound from './pages/NotFound'

const SITE = 'https://draftit.co.ke'

const pageMeta = {
  '/': {
    title: 'Draft-It | Websites, KRA Registration & Digital Services in Kenya',
    description: 'Draft-It — websites from KES 6,000, KRA PIN registration, eTIMS, NTSA, business registration, IT support, CCTV, POS & ERP for Kenyan businesses. WhatsApp +254 726 899 113.',
  },
  '/packages': {
    title: 'Website Packages Kenya | Affordable Web Design — Draft-It',
    description: 'Website packages from KES 6,000. Landing pages, business websites, and e-commerce stores built for Kenyan businesses. Fixed pricing, fast turnaround, personal service.',
  },
  '/services': {
    title: 'KRA Registration, eCitizen & Digital Services in Kenya | Draft-It',
    description: 'KRA PIN registration, eTIMS, NTSA services, eCitizen, NSSF & SHA, business registration, CCTV installation, IT support, POS & Odoo ERP — Nairobi, Kenya.',
  },
  '/shop': {
    title: 'Shop | POS Software, Hardware & Digital Products Kenya — Draft-It',
    description: 'Buy POS software, barcode scanners, receipt printers, digital templates and office equipment in Kenya. Order via WhatsApp, pay via M-Pesa.',
  },
  '/blog': {
    title: 'Blog | Business & Tech Tips for Kenya — Draft-It',
    description: 'Guides on KRA registration, running a business in Kenya, web design tips, eCitizen services, and Draft-It updates.',
  },
  '/about': {
    title: 'About Draft-It | Nairobi Digital Services Agency',
    description: 'Draft-It is a Nairobi-based digital agency helping Kenyan small businesses get online, stay KRA-compliant, and run better with affordable tech solutions.',
  },
  '/contact': {
    title: 'Get a Quote | Draft-It — Digital Services Kenya',
    description: 'Contact Draft-It for website design, KRA registration, IT support, CCTV, and more. WhatsApp +254 726 899 113 or email iknus.xmc@gmail.com.',
  },
  '/privacy':  { title: 'Privacy Policy | Draft-It', description: 'How Draft-It collects, uses, and protects your personal information.' },
  '/terms':    { title: 'Terms of Service | Draft-It', description: 'Terms and conditions for using Draft-It digital services in Kenya.' },
  '/refund':   { title: 'Refund Policy | Draft-It', description: 'Draft-It refund and cancellation policy for digital services.' },
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2, staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 } },
})

const SeoManager = () => {
  const { pathname } = useLocation()
  const meta = pageMeta[pathname] || { title: 'Draft-It | Digital Services Kenya', description: 'Affordable digital services for Kenyan businesses.' }
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
              <Route path="order" element={<OrderPage />} />
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
