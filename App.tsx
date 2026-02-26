import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// ── Google Analytics tracker ──────────────────────────────────────────────────
// Fires a page_view on every route change and listens for cal.com booking events
const GATracker: React.FC = () => {
  const location = useLocation();

  // Page view on route change
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        send_to: 'G-9GHX9JVN9S',
      });
    }
  }, [location]);

  // Cal.com booking success → generate_lead conversion
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.action === 'bookingSuccessful') {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            event_category: 'Cal.com',
            event_label: 'Booking Confirmed',
            value: 1,
            send_to: 'G-9GHX9JVN9S',
          });
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return null;
};
import { Navbar } from './components/ui/Navbar';
import { Hero } from './sections/Hero';
import { Footer } from './sections/Footer';

// Below-fold sections — code-split so they don't block initial render
const Problem    = lazy(() => import('./sections/Problem').then(m => ({ default: m.Problem })));
const WhatWeDo   = lazy(() => import('./sections/WhatWeDo').then(m => ({ default: m.WhatWeDo })));
const WhyMilktree = lazy(() => import('./sections/WhyMilktree').then(m => ({ default: m.WhyMilktree })));
const Results    = lazy(() => import('./sections/Results').then(m => ({ default: m.Results })));
const Pricing    = lazy(() => import('./sections/Pricing').then(m => ({ default: m.Pricing })));
const TrustedBy  = lazy(() => import('./sections/TrustedBy').then(m => ({ default: m.TrustedBy })));
const FAQ        = lazy(() => import('./sections/FAQ').then(m => ({ default: m.FAQ })));
const FinalCTA   = lazy(() => import('./sections/FinalCTA').then(m => ({ default: m.FinalCTA })));
const CaseStudiesPage    = lazy(() => import('./pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then(m => ({ default: m.CaseStudyDetailPage })));

const HomePage: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Suspense fallback={null}>
        <Problem />
        <WhatWeDo />
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
    <BrowserRouter>
      <GATracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<Suspense fallback={null}><CaseStudiesPage /></Suspense>} />
        <Route path="/work/:slug" element={<Suspense fallback={null}><CaseStudyDetailPage /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
