import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FormspreeProvider } from '@formspree/react';
import { trackPageView } from './utils/meta-tracking';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// ── Analytics tracker (GA4 + Meta Pixel + CAPI) ─────────────────────────────
// Fires page_view on every route change
const AnalyticsTracker: React.FC = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  // Page view on route change (skip first render — Pixel base code handles initial PageView)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // GA4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        send_to: 'G-9GHX9JVN9S',
      });
    }

    // Meta Pixel + CAPI (SPA route change)
    trackPageView();
  }, [location]);

  return null;
};
import { Navbar } from './components/ui/Navbar';
import { Hero } from './sections/Hero';
import { Footer } from './sections/Footer';
import { HomepageSchema } from './components/SchemaMarkup';

// Below-fold sections — code-split so they don't block initial render
const Problem    = lazy(() => import('./sections/Problem').then(m => ({ default: m.Problem })));
const WhatWeDo   = lazy(() => import('./sections/WhatWeDo').then(m => ({ default: m.WhatWeDo })));
const WhyMilktree = lazy(() => import('./sections/WhyMilktree').then(m => ({ default: m.WhyMilktree })));
const Results    = lazy(() => import('./sections/Results').then(m => ({ default: m.Results })));
const CaseStudies = lazy(() => import('./sections/CaseStudies').then(m => ({ default: m.CaseStudies })));
const Pricing    = lazy(() => import('./sections/Pricing').then(m => ({ default: m.Pricing })));
const TrustedBy  = lazy(() => import('./sections/TrustedBy').then(m => ({ default: m.TrustedBy })));
const FAQ        = lazy(() => import('./sections/FAQ').then(m => ({ default: m.FAQ })));
const FinalCTA   = lazy(() => import('./sections/FinalCTA').then(m => ({ default: m.FinalCTA })));
const CaseStudiesPage    = lazy(() => import('./pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then(m => ({ default: m.CaseStudyDetailPage })));
const ThankYouPage       = lazy(() => import('./pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));

const HomePage: React.FC = () => (
  <>
    <Helmet>
      <title>Milktree Agency | Brand Identity That Sells For You</title>
      <meta name="description" content="We build brand identities that make businesses clear, trusted, and the obvious choice. 200+ brands built across 15+ industries. Book your free brand audit." />
      <link rel="canonical" href="https://milktreeagency.com/" />
      <meta property="og:title" content="Milktree Agency | Brand Identity That Sells For You" />
      <meta property="og:description" content="We build brand identities that make businesses clear, trusted, and the obvious choice. 200+ brands built. Book your free brand audit." />
      <meta property="og:url" content="https://milktreeagency.com/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://milktreeagency.com/logos/favicon.svg" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Milktree Agency | Brand Identity That Sells For You" />
      <meta name="twitter:description" content="We build brand identities that make businesses clear, trusted, and the obvious choice. 200+ brands built." />
    </Helmet>
    <HomepageSchema />
    <Navbar />
    <main>
      <Hero />
      <Suspense fallback={null}>
        <Problem />
        <WhatWeDo />
        <CaseStudies />
        <WhyMilktree />
        <Results />
        <Pricing />
        <TrustedBy />
        <FAQ />
        <FinalCTA />
      </Suspense>
    </main>
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <FormspreeProvider project="2950084415100813029">
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<Suspense fallback={null}><CaseStudiesPage /></Suspense>} />
          <Route path="/work/:slug" element={<Suspense fallback={null}><CaseStudyDetailPage /></Suspense>} />
          <Route path="/thank-you" element={<Suspense fallback={null}><ThankYouPage /></Suspense>} />
        </Routes>
      </BrowserRouter>
    </FormspreeProvider>
  );
};

export default App;
