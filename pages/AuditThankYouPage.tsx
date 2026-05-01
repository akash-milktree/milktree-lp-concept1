/**
 * AuditThankYouPage — post-submit success page for the /audit landing page.
 *
 * Critical difference vs the main /thank-you page:
 *   - NO main-site navbar or footer (paid-traffic visitors should not be
 *     able to wander into / / /work / /pricing — that defeats the purpose
 *     of a single-funnel LP).
 *   - LP-styled minimal chrome: logo + thank-you content + Cal.com CTA only.
 *   - Fires the same Lead + Schedule pixel + CAPI events as the main
 *     /thank-you page so attribution stays consistent for the Andromeda
 *     campaign optimisation.
 *
 * Reachable at:
 *   - milktreeagency.com/audit/thank-you  (when ad lands on /audit on root)
 *   - audit.milktreeagency.com/thank-you   (when ad lands on subdomain root)
 */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { trackLead, trackSchedule, trackCustom } from '../utils/meta-tracking';
import './audit/styles/audit-lp.css';
import { Logo, Button, Icon } from './audit/components/AuditPrimitives';

// Same Cal.com slot the main thank-you page uses — battle-tested
const CAL_LINK = 'https://cal.com/milktree-agency/free-brand-digital-presence-audit-30-minutes';

export const AuditThankYouPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Lock the page bg to black while this page is mounted (matches LP).
    const prevHtmlBg = document.documentElement.style.backgroundColor;
    const prevBodyBg = document.body.style.backgroundColor;
    document.documentElement.style.backgroundColor = '#000';
    document.body.style.backgroundColor = '#000';

    // GA4 — thank-you page view (use as conversion goal in Google Ads)
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        event_category: 'Lead',
        event_label: 'Audit LP Thank You',
        value: 1,
        currency: 'GBP',
        send_to: 'G-9GHX9JVN9S',
      });
    }

    // Meta Lead event (Pixel + CAPI) — primary conversion
    trackLead({ eventSource: 'Audit LP Thank You' });

    // Meta Schedule event (Pixel + CAPI) — high-intent signal
    trackSchedule({ eventSource: 'Audit LP Thank You' });

    return () => {
      document.documentElement.style.backgroundColor = prevHtmlBg;
      document.body.style.backgroundColor = prevBodyBg;
    };
  }, []);

  const handleBookCall = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'book_call_click', {
        event_category: 'Audit LP Thank You',
        event_label: 'Book My Free Call',
        send_to: 'G-9GHX9JVN9S',
      });
    }
    trackCustom('BookCallClick', { customData: { source: 'Audit LP Thank You' } });
  };

  return (
    <div className="audit-lp">
      <Helmet>
        <title>You're in · Free Brand Audit | Milktree</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      {/* Minimal nav — logo only, no links anywhere */}
      <div style={{ position: 'fixed', top: 18, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', pointerEvents: 'none', padding: '0 16px' }}>
        <div style={{
          pointerEvents: 'auto',
          background: 'rgba(6,6,6,0.72)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 9999,
          padding: '11px 22px',
          display: 'flex', alignItems: 'center',
        }}>
          <Logo />
        </div>
      </div>

      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 64px', position: 'relative', zIndex: 3 }}>
        <div style={{ maxWidth: 720, width: '100%', textAlign: 'center' }}>
          {/* Success icon */}
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'rgba(99,204,121,0.12)',
            border: '1px solid rgba(99,204,121,0.4)',
            color: '#63CC79',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px',
          }}>
            {Icon.check(40)}
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 'clamp(36px, 5.4vw, 64px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#fff', margin: 0, textWrap: 'balance' }}>
            You're in. Here's what <span style={{ color: '#FFDC04' }}>happens next.</span>
          </h1>

          <p className="fg-2" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, marginTop: 20, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            Thanks for requesting your free brand audit. We just need one more thing: a quick 30-minute call to understand your brand before we put the audit together.
          </p>

          {/* 3-step "what happens next" */}
          <div style={{
            marginTop: 48,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 24,
            padding: 'clamp(24px, 3vw, 36px)',
            textAlign: 'left',
          }}>
            {[
              { n: '01', title: 'Book your audit call', desc: 'Pick a 30-minute slot below at a time that suits you. Same week if possible.' },
              { n: '02', title: 'We take your brief on the call', desc: 'On the call we\'ll dig into your brand, goals, and where you\'re stuck — so the audit is tailored to you.' },
              { n: '03', title: 'Receive your audit in 48 hours', desc: 'Within 48 hours of the call you get a personalised brand audit with clear, actionable next steps.' },
            ].map((step, i) => (
              <div key={step.n} style={{ display: 'flex', gap: 18, padding: i > 0 ? '20px 0 0' : '0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none', marginTop: i > 0 ? 20 : 0 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,220,4,0.12)',
                  border: '1px solid rgba(255,220,4,0.35)',
                  color: '#FFDC04',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, flexShrink: 0,
                }}>{step.n}</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>{step.title}</h3>
                  <p className="fg-2" style={{ fontSize: 14.5, lineHeight: 1.55, marginTop: 6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Primary CTA — Cal.com */}
          <div style={{ marginTop: 40 }}>
            <Button href={CAL_LINK} size="lg" onClick={handleBookCall}>
              Book my free call
            </Button>
          </div>

          {/* Fallback note */}
          <p className="fg-3" style={{ fontSize: 13, marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            Can't book now? Check your inbox — we've sent the booking link there too.
          </p>
        </div>
      </main>

      {/* Subtle footer — no nav, just a copyright line so the page doesn't look unfinished */}
      <footer style={{ position: 'relative', zIndex: 3, padding: '32px clamp(20px, 4vw, 48px)', textAlign: 'center' }}>
        <div className="fg-3" style={{ fontSize: 12 }}>© 2026 Milktree Agency · hello@milktreeagency.com</div>
      </footer>
    </div>
  );
};

export default AuditThankYouPage;
