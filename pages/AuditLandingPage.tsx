/**
 * AuditLandingPage — paid-traffic LP at /audit.
 *
 * Hidden from organic search (noindex) and from the main site nav.
 * Designed to be linked only from Meta/Google ads or direct URL share.
 *
 * Structure:
 *   Navbar  → Hero  → Problem → Services → Process → Work → Proof
 *           → FinalCTA → FAQ → Footer  + StickyMobileCTA
 *
 * All sections lazy-loaded below the hero per CLAUDE.md Rule 5.
 */
import React, { Suspense, lazy, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './audit/styles/audit-lp.css';
import { AuditNavbar } from './audit/components/AuditNavbar';
import { AuditHero } from './audit/components/AuditHero';
import { CursorHalo, RevealOnScroll } from './audit/components/AuditEffects';

// Below-fold sections — code-split per CLAUDE.md Rule 5 to keep initial JS payload tight
const Problem    = lazy(() => import('./audit/components/AuditProblemServices').then(m => ({ default: m.Problem })));
const Services   = lazy(() => import('./audit/components/AuditProblemServices').then(m => ({ default: m.Services })));
const Process    = lazy(() => import('./audit/components/AuditMiddle').then(m => ({ default: m.Process })));
const Work       = lazy(() => import('./audit/components/AuditMiddle').then(m => ({ default: m.Work })));
const Proof      = lazy(() => import('./audit/components/AuditMiddle').then(m => ({ default: m.Proof })));
const FinalCTA   = lazy(() => import('./audit/components/AuditClosing').then(m => ({ default: m.FinalCTA })));
const FAQ        = lazy(() => import('./audit/components/AuditClosing').then(m => ({ default: m.FAQ })));
const AuditFooter      = lazy(() => import('./audit/components/AuditClosing').then(m => ({ default: m.AuditFooter })));
const StickyMobileCTA  = lazy(() => import('./audit/components/AuditClosing').then(m => ({ default: m.StickyMobileCTA })));

export const AuditLandingPage: React.FC = () => {
  // Scroll to top on mount + lock the page bg to black for the LP visit only.
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    const prevBodyBg = document.body.style.backgroundColor;
    document.documentElement.style.backgroundColor = '#000';
    document.body.style.backgroundColor = '#000';
    return () => {
      document.documentElement.style.backgroundColor = prevHtmlBg;
      document.body.style.backgroundColor = prevBodyBg;
    };
  }, []);

  const scrollToStart = () =>
    document.getElementById('start')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <div className="audit-lp">
      <Helmet>
        <title>Free Brand Audit · 48-hour turnaround | Milktree</title>
        <meta name="description" content="Nobody knows what you do. We fix that. Free brand audit, 48-hour turnaround. 200+ brands built. Average enquiry lift: 250%." />
        {/* Hidden from organic search — paid traffic / direct link only */}
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <link rel="canonical" href="https://milktreeagency.com/audit" />
        {/* OG tags for sharing previews on Slack/Whatsapp/etc */}
        <meta property="og:title" content="Free Brand Audit · 48-hour turnaround | Milktree" />
        <meta property="og:description" content="Nobody knows what you do. We fix that." />
        <meta property="og:url" content="https://milktreeagency.com/audit" />
        <meta property="og:type" content="website" />
      </Helmet>

      <CursorHalo />
      <RevealOnScroll />
      <AuditNavbar onCTAClick={scrollToStart} />
      <AuditHero />

      <Suspense fallback={null}>
        <Problem />
        <Services />
        <Process />
        <Work />
        <Proof />
        <FinalCTA />
        <FAQ />
        <AuditFooter />
        <StickyMobileCTA />
      </Suspense>
    </div>
  );
};

export default AuditLandingPage;
