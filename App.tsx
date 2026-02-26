import React, { useEffect } from 'react';
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
import { Problem } from './sections/Problem';
import { WhatWeDo } from './sections/WhatWeDo';
import { WhyMilktree } from './sections/WhyMilktree';
import { Results } from './sections/Results';
import { Pricing } from './sections/Pricing';
import { TrustedBy } from './sections/TrustedBy';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { Footer } from './sections/Footer';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';

const HomePage: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Problem />
      <WhatWeDo />
      <WhyMilktree />
      <Results />
      <Pricing />
      <TrustedBy />
      <FAQ />
      <FinalCTA />
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
        <Route path="/work" element={<CaseStudiesPage />} />
        <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
