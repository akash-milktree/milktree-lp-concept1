/**
 * AuditClosing — sections 6, 7 + sticky mobile CTA + footer.
 *
 * AUDIT FIXES applied:
 *   - FinalCTA: form REMOVED, replaced with a Cal.com inline embed
 *     (May 2 v2). Hypothesis being tested: do paid-traffic visitors
 *     book a call directly more readily than they fill a form? The
 *     hero form is the primary capture path; the bottom Cal.com is
 *     the secondary "skip the form" path.
 *   - Cal.com defer-loaded per CLAUDE.md Rule 3 (embed.js is ~400KB;
 *     loading it eagerly would tank LCP on mobile).
 *   - bookingSuccessful event fires Schedule pixel + CAPI + GA4
 *     conversion so the call attribution flows the same way the
 *     /audit/thank-you page does.
 *   - StickyMobileCTA href + label aligned with hero CTA.
 *   - FAQ: removed "We don't do paid media" line.
 *   - Footer (May 2 v2): wordmark made visible (was outline-only),
 *     body text bumped to fg-2 + size 16, logo size 18 → 22.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Eyebrow, Icon, Logo } from './AuditPrimitives';
import { trackSchedule } from '../../../utils/meta-tracking';

declare global {
  interface Window {
    Cal?: any;
  }
}

// ── CAL.COM INLINE EMBED ─────────────────────────────────────────
// Defer-loaded per CLAUDE.md Rule 3. embed.js (~400KB) only fetches
// when the user is within 200px of this section. The IIFE bootstrap
// is the official Cal pattern (https://cal.com/docs/core-features/embed).
const CAL_LINK = 'milktree-agency/free-brand-digital-presence-audit-30-minutes';
const CAL_NAMESPACE = 'audit-lp';

const CalcomInline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const initialisedRef = useRef(false);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const init = () => {
      if (initialisedRef.current) return;
      initialisedRef.current = true;

      // Cal.com embed bootstrap — namespaced so multiple embeds don't collide.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (function (C: any, A: string, L: string) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = (a: any, ar: any) => a.q.push(ar);
        const d = C.document;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        C.Cal = C.Cal || function (...args: any[]) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const cal: any = C.Cal;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (args[0] === L) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const api: any = function (...inner: any[]) { p(api, inner); };
            const namespace = args[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], args);
              p(cal, ['initNamespace', namespace]);
            } else {
              p(cal, args);
            }
            return;
          }
          p(cal, args);
        };
      })(window, 'https://app.cal.com/embed/embed.js', 'init');

      const Cal = window.Cal;
      Cal('init', CAL_NAMESPACE, { origin: 'https://cal.com' });
      Cal.ns[CAL_NAMESPACE]('inline', {
        elementOrSelector: '#cal-audit-inline',
        config: { layout: 'month_view', theme: 'dark' },
        calLink: CAL_LINK,
      });
      Cal.ns[CAL_NAMESPACE]('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
        cssVarsPerTheme: {
          dark: { 'cal-brand': '#FFDC04' },
        },
      });
      // Fire pixel + analytics on confirmed booking.
      Cal.ns[CAL_NAMESPACE]('on', {
        action: 'bookingSuccessful',
        callback: () => {
          trackSchedule({ eventSource: 'Audit LP Cal.com Inline' });
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'conversion', {
              event_category: 'Schedule',
              event_label: 'Audit LP Cal.com Booking',
              value: 1,
              currency: 'GBP',
              send_to: 'G-9GHX9JVN9S',
            });
          }
        },
      });
    };

    // If the section is already in/near viewport (user scrolled past
    // while the lazy chunk loaded), initialise immediately.
    if (section.getBoundingClientRect().top < window.innerHeight + 300) {
      init();
      return;
    }

    // Otherwise defer until the user scrolls within 200px of it.
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      init();
    }, { rootMargin: '200px' });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      id="cal-audit-inline"
      style={{
        width: '100%',
        minHeight: 720,
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24,
        overflow: 'hidden',
      }}
    />
  );
};

// ── FINAL CTA (Cal.com inline calendar — replaces the previous form) ─
export const FinalCTA: React.FC = () => (
  <section id="cta" className="section" style={{ padding: '0 clamp(20px, 4vw, 48px) clamp(72px, 9vw, 128px)' }}>
    <div style={{
      position: 'relative',
      maxWidth: 1400, margin: '0 auto',
      borderRadius: 48,
      padding: 'clamp(48px, 6vw, 96px)',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #050505 100%)',
      border: '1px solid rgba(255,220,4,0.22)',
      overflow: 'hidden',
    }}>
      <div aria-hidden style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,220,4,0.12), transparent 65%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: -150, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(125,93,255,0.08), transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'start' }} className="cta-grid">
        <div>
          <Eyebrow num="06 / Or book directly">Skip the form</Eyebrow>
          <h2 style={{ fontSize: 'clamp(36px, 5.4vw, 84px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.98, color: '#fff', marginTop: 20, textWrap: 'balance' }}>
            Pick a slot. <span style={{ color: '#FFDC04' }}>Book the call.</span>
          </h2>
          <p className="fg-2" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, marginTop: 20, maxWidth: 520 }}>
            Rather book direct than fill a form? Pick a 30-minute slot below. We'll come back within 48 hours of the call with a short, honest audit. And whether we're the right studio for you.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: 10, maxWidth: 480 }}>
            {[
              '30-minute discovery call',
              '48-hour written audit',
              'Positioning & messaging review',
              'Visual identity assessment',
              'Prioritised action plan',
            ].map((b, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: 'rgba(255,255,255,0.85)' }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#FFDC04', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{Icon.check(12)}</span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <CalcomInline />
      </div>
    </div>
    <style>{`@media (max-width: 900px) { .audit-lp .cta-grid { grid-template-columns: 1fr !important; } }`}</style>
  </section>
);

// ── FAQ ──────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: 'How long does a typical engagement take?',                a: 'Most identity + site builds ship in 4–6 weeks. Design systems and content ops run on retainer. You\'ll get a fixed scope and a written timeline after the audit.' },
  { q: 'What does it cost?',                                      a: 'Brand builds start from around £6,000. Websites and landing pages from around £3,500. Retainers are quoted per quarter. We share a clear number after we understand the scope.' },
  { q: 'Do you work with early-stage / pre-launch brands?',       a: 'Yes. Half our work is zero-to-one. We help you decide what to build before we build it.' },
  { q: 'How does the generative AI side actually work?',          a: 'We train on your brand assets to produce on-brand imagery, then hand over pipelines, prompts, and a template library your team can run without us.' },
  { q: 'Can we keep working with you after launch?',              a: 'Most clients do. After the initial build we move into a content + design retainer, or hand everything over with full guidelines. Your call.' },
  { q: 'Do you only work with UK clients?',                       a: 'No. We\'re London-based but work across the UK, Europe, and the US. Most engagements run remotely with one or two on-sites if it helps the work.' },
];

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section">
      <div className="container" style={{ maxWidth: 980 }}>
        <div style={{ marginBottom: 48 }}>
          <Eyebrow num="07 / Questions">FAQ</Eyebrow>
          <h2 style={{ fontSize: 'clamp(32px, 4.4vw, 64px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', marginTop: 18 }}>
            Questions founders <span className="fg-3">actually</span> ask us.
          </h2>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          {FAQ_ITEMS.map((it, i) => (
            <FAQItem
              key={i}
              {...it}
              num={i + 1}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{ q: string; a: string; num: number; isOpen: boolean; onToggle: () => void }> = ({ q, a, num, isOpen, onToggle }) => (
  <div style={{
    background: isOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
    border: `1px solid rgba(255,255,255,${isOpen ? 0.18 : 0.08})`,
    borderRadius: 24,
    overflow: 'hidden',
    transition: 'background 0.3s, border-color 0.3s',
  }}>
    <button onClick={onToggle} style={{
      width: '100%', border: 'none', background: 'transparent', color: '#fff',
      padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18,
      cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
    }}>
      <span style={{ width: 36, height: 36, borderRadius: '50%', background: isOpen ? '#FFDC04' : 'rgba(255,255,255,0.06)', color: isOpen ? '#000' : 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0, transition: 'all 0.3s' }}>
        {String(num).padStart(2, '0')}
      </span>
      <span style={{ flex: 1, fontSize: 'clamp(16px, 1.6vw, 19px)', fontWeight: 600, letterSpacing: '-0.01em' }}>{q}</span>
      <span style={{ color: isOpen ? '#FFDC04' : 'rgba(255,255,255,0.5)', transition: 'transform 0.3s, color 0.3s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
        {Icon.plus(20)}
      </span>
    </button>
    <div style={{ maxHeight: isOpen ? 240 : 0, transition: 'max-height 0.4s cubic-bezier(0.44,0,0.56,1)', overflow: 'hidden' }}>
      <div style={{ padding: '0 24px 24px 78px' }}>
        <p className="fg-2" style={{ fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 680 }}>{a}</p>
      </div>
    </div>
  </div>
);

// ── FOOTER (paid-traffic, no nav noise) ──────────────────────────
// May 2 v2: bigger logo (18 → 22), giant wordmark now solid white with
// yellow mark (was 8% outline only — invisible), body text bumped from
// fg-3 size 14 to fg-2 size 16, copyright row from 12 to 14.
export const AuditFooter: React.FC = () => (
  <footer style={{ position: 'relative', zIndex: 3, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '72px clamp(20px, 4vw, 48px) 48px' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 48, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 440 }}>
          <Logo size={22} />
          <p className="fg-2" style={{ fontSize: 16, lineHeight: 1.6, marginTop: 20 }}>
            A design-led studio building brands, systems, and content for the next generation of category leaders.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[Icon.linkedin, Icon.instagram, Icon.mail].map((Ic, i) => (
            <a
              key={i}
              href={i === 2 ? 'mailto:hello@milktreeagency.com' : '#'}
              style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.85)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#FFDC04'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = '#FFDC04'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
            >
              {Ic(18)}
            </a>
          ))}
        </div>
      </div>

      {/* Giant brand mark — solid white with yellow mark, mirrors the
          homepage footer treatment from the screenshot (yellow square +
          white wordmark). Mark sized to roughly match cap-height of the
          "m" in milktree. */}
      <div aria-hidden style={{ marginTop: 80, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(8px, 1.4vw, 24px)', lineHeight: 0.85 }}>
          <div style={{
            width: 'clamp(28px, 7vw, 96px)',
            height: 'clamp(28px, 7vw, 96px)',
            background: '#FFDC04',
            borderRadius: 'clamp(4px, 0.9vw, 12px)',
            flexShrink: 0,
            marginTop: 'clamp(8px, 2vw, 28px)',
          }} />
          <span style={{
            fontSize: 'clamp(80px, 20vw, 280px)',
            fontWeight: 700,
            letterSpacing: '-0.06em',
            color: '#fff',
          }}>
            milktree
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.10)', flexWrap: 'wrap', gap: 12 }}>
        <div className="fg-2" style={{ fontSize: 14 }}>© 2026 Milktree Agency. All rights reserved.</div>
        <div className="fg-2" style={{ fontSize: 14 }}>Made in London · Working worldwide</div>
      </div>
    </div>
  </footer>
);

// ── STICKY MOBILE CTA ────────────────────────────────────────────
export const StickyMobileCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="only-sm" style={{
      position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 99,
      transform: visible ? 'translateY(0)' : 'translateY(140%)',
      transition: 'transform 0.4s cubic-bezier(0.44,0,0.56,1)',
    }}>
      <a
        href="#start"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          width: '100%', padding: '16px 24px', borderRadius: 9999,
          background: '#FFDC04', color: '#000', fontWeight: 700, fontSize: 15,
          boxShadow: '0 12px 40px rgba(255,220,4,0.4)', textDecoration: 'none',
        }}
      >
        Get my free audit {Icon.arrow(14)}
      </a>
    </div>
  );
};
