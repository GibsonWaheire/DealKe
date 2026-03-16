# DraftIt TODO

## Vercel Deployment
- [x] Add vercel.json with SPA rewrite rule (fixes 404 on page refresh/direct URL)
- [ ] Push to git → Vercel auto-redeploys

## SEO & Crawlability
- [x] Fix robots.txt — update domain to draftit.co.ke, block admin routes
- [x] Fix sitemap.xml — update all URLs to draftit.co.ke, add /order page
- [ ] Submit sitemap to Google Search Console (`https://draftit.co.ke/sitemap.xml`)
- [ ] Verify site on Google Search Console (add DNS TXT record)
- [ ] Add og-image.jpg to /public (used in Open Graph / social previews)

## Email Setup
- [ ] Sign up at zoho.com/mail (free plan)
- [ ] Add domain `draftit.co.ke` and verify via DNS records
- [ ] Create professional email e.g. `info@draftit.co.ke`
- [ ] Update contact email in index.html and App.jsx (currently `iknus.xmc@gmail.com`)

## Email List / Marketing Popup
- [x] Build newsletter popup component (NewsletterPopup.jsx)
- [x] Add popup to Layout — shows after 12s, once per visitor
- [ ] Sign up at brevo.com (free — 300 emails/day)
- [ ] Create a contact list in Brevo (note the List ID)
- [ ] Generate Brevo API key
- [ ] Add to `.env`:
  ```
  VITE_BREVO_API_KEY=your_key_here
  VITE_BREVO_LIST_ID=1
  ```
- [ ] Create welcome email automation in Brevo (auto-sends when someone subscribes)

## M-Pesa Sandbox (test payments without real money)
- [ ] Sign up at developer.safaricom.co.ke
- [ ] Create an app — get sandbox Consumer Key + Consumer Secret
- [ ] Set `MPESA_ENV=sandbox` in backend .env for testing
- [ ] Switch to production credentials when going live

## Google Business Profile (local search / Maps)
- [ ] Go to business.google.com
- [ ] Add "Draft-It" → Nairobi → list your services
- [ ] Verify via postcard or phone call
- [ ] Add photos, opening hours, and WhatsApp link

## Other Marketing
- [ ] Share blog posts on Facebook/Instagram linking back to site
- [ ] Ask satisfied clients to leave a Google Review on your Business Profile
- [ ] Add site to Kenya business directories (BizKenya, Yellow Pages KE)
