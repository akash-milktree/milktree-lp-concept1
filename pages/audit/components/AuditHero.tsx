/**
 * AuditHero — paid-traffic LP hero with the proven message-match.
 *
 * AUDIT FIXES applied (per /audits/META-CREATIVE-FUNNEL-AUDIT-APR-2026.md §4.3):
 *   - Hero rewritten from "Brands that earn attention. Systems that scale it."
 *     to "Nobody knows what you do. We fix that." (matches the proven
 *     `your_brand_looks_v2` ad winner: 4.31% CTR, £0.33 CPC).
 *   - Deliverable standardised everywhere → "Free Brand Audit · 48 hours".
 *   - Hero CTAs simplified: primary "Get my free audit", secondary "View case studies".
 *   - BookingCard: real Formspree wiring + Meta Pixel + CAPI on submit,
 *     navigates to /thank-you (consistent with the existing milktreeagency.com flow).
 */
import React, { useEffect, useState } from 'react';
import { useForm } from '@formspree/react';
import { useNavigate } from 'react-router-dom';
import { Button, Eyebrow, Icon } from './AuditPrimitives';
import { trackContact } from '../../../utils/meta-tracking';

const CLIENT_LOGOS = Array.from({ length: 13 }, (_, i) => `/audit-assets/client-logos/logo-${i + 1}.png`);

const HERO_STATS = [
  { n: '200+',   l: 'brands built' },
  { n: '250%',   l: 'avg. enquiry lift' },
  { n: '15+',    l: 'industries served' },
  { n: '48 hr',  l: 'audit turnaround' }, // AUDIT FIX: was "4–6 wk launch window" — now reinforces the deliverable
];

export const AuditHero: React.FC = () => {
  return (
    <section id="top" className="section" style={{ paddingTop: 160, paddingBottom: 64, position: 'relative', overflow: 'hidden' }}>
      <BackgroundOrbits />

      <div className="container" style={{ position: 'relative' }}>
        {/* Eyebrow chip */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,220,4,0.06)', border: '1px solid rgba(255,220,4,0.22)', borderRadius: 9999, padding: '8px 14px', marginBottom: 36 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFDC04', animation: 'audit-blink 2s infinite' }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFDC04' }}>
            Free Brand Audit · 48-hour turnaround · No commitment
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 420px)',
          gap: 'clamp(32px, 5vw, 96px)',
          alignItems: 'end',
        }} className="hero-grid">
          {/* LEFT — Headline + body + stats */}
          <div>
            {/* AUDIT FIX: Hero rewritten to the proven message-match */}
            <h1 style={{ fontSize: 'clamp(44px, 7.2vw, 104px)', fontWeight: 700, letterSpacing: '-0.045em', lineHeight: 0.98, margin: 0, color: '#fff', textWrap: 'balance' }}>
              Nobody knows<br />
              <span style={{ fontStyle: 'italic', fontWeight: 500, fontFamily: 'AuditGelasio, serif' }}>what you do.</span><br />
              We <span style={{ color: '#FFDC04' }}>fix that.</span>
            </h1>

            {/*
              AUDIT FIX (§4.5 #1): "Clarity problem" line woven into the hero subhead.
              This is the most-shared theme between the proven ad winner and the LP.
              Em dash removed; sentence split into two for Grade-7 UK English readability.
            */}
            <p className="fg-2" style={{ fontSize: 'clamp(17px, 1.4vw, 21px)', lineHeight: 1.55, maxWidth: 580, marginTop: 32 }}>
              It's not a design problem. It's a <span style={{ color: '#fff', fontWeight: 600 }}>clarity problem</span>. We build brand identities that make you the obvious choice. The right clients come to you, and your team knows exactly how to represent the business.
            </p>
            <p className="fg-3" style={{ fontSize: 14, marginTop: 14, letterSpacing: '0.02em' }}>
              200+ brands built · Average enquiry lift 250% · 4–6 week delivery
            </p>

            <div style={{ display: 'flex', gap: 10, marginTop: 34, flexWrap: 'wrap' }}>
              <Button href="#start" size="lg">Get my free audit</Button>
              <Button href="#work" variant="secondary" size="lg" icon={false}>View case studies</Button>
            </div>

            <div style={{ display: 'flex', gap: 40, marginTop: 56, flexWrap: 'wrap' }}>
              {HERO_STATS.map((s, i) => (
                <div key={i} style={{ minWidth: 100 }}>
                  <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>{s.n}</div>
                  <div className="fg-3" style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Booking card (Formspree-wired) */}
          <div id="start" style={{ position: 'relative' }}>
            <BookingCard />
          </div>
        </div>

        {/* Logo marquee strip
            AUDIT FIX: removed redundant outer top border. The label dividers
            on either side of "Trusted by..." already provide a top edge,
            and stacking another full-width line above looked like a double
            divider. borderBottom kept for separation from the next section. */}
        <div style={{ marginTop: 96, padding: '28px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
            <span>Trusted by 200+ brands across 15 industries</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)', maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
            <div className="marquee">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((src, i) => (
                <img key={i} src={src} alt="" style={{ height: 28, maxWidth: 130, filter: 'brightness(0) invert(1)', opacity: 0.55, transition: 'opacity 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.95')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.55')}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile breakpoint — stack hero columns */}
      <style>{`
        @media (max-width: 900px) {
          .audit-lp .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

// ── Decorative orbits behind the hero ─────────────────────────────
const BackgroundOrbits: React.FC = () => {
  const [rot, setRot] = useState(0);
  useEffect(() => {
    let raf = 0;
    let t0 = 0;
    const tick = (t: number) => {
      if (!t0) t0 = t;
      setRot(((t - t0) / 60) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div aria-hidden style={{ position: 'absolute', top: '-10%', right: '-25%', width: 900, height: 900, pointerEvents: 'none', opacity: 0.5, transform: `rotate(${rot * 0.15}deg)` }}>
      <svg viewBox="0 0 900 900" width="100%" height="100%">
        {[180, 260, 340, 420].map((r, i) => (
          <circle key={i} cx="450" cy="450" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="1 4" />
        ))}
        <circle cx="450" cy="270" r="4" fill="#FFDC04" />
        <circle cx="710" cy="450" r="3" fill="rgba(255,255,255,0.45)" />
        <circle cx="260" cy="610" r="2.5" fill="rgba(255,255,255,0.3)" />
      </svg>
    </div>
  );
};

// ── BookingCard — Formspree-wired audit request form ──────────────
// AUDIT FIX (May 2): replaced "What's the focus?" chip-picker with two
// qualifying fields (Company name + Website). May 2 v2: added a service
// dropdown so the call has agenda before it starts. Hidden source-tracking
// field dropped — the user-selected service IS the value Levi sees.
// 5 fields total (3 required, 2 optional) — still under the typical
// "drop conversion ~10% per extra field" threshold for B2B paid traffic.
const SERVICE_OPTIONS = [
  'Brand strategy',
  'Brand identity',
  'Website / landing page',
  'Design system',
  'Content strategy',
  'Social media design',
  'Generative AI visuals',
  'Not sure yet',
] as const;

const BookingCard: React.FC = () => {
  const [state, handleSubmit] = useForm('auditLpForm');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [service, setService] = useState<string>('');
  const navigate = useNavigate();

  // Redirect to LP-isolated thank-you on success.
  // Path differs by host: on audit.milktreeagency.com it's /thank-you (subdomain root = /audit),
  // on the main domain it's /audit/thank-you.
  useEffect(() => {
    if (state.succeeded) {
      const isAuditSubdomain =
        typeof window !== 'undefined' && window.location.hostname === 'audit.milktreeagency.com';
      const path = isAuditSubdomain ? '/thank-you' : '/audit/thank-you';
      navigate(`${path}?card=hero`);
    }
  }, [state.succeeded, navigate]);

  const canSubmit =
    name.trim() !== '' &&
    email.trim() !== '' && email.includes('@') &&
    service !== '';

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    // GA4 — generate_lead event
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'Audit Form',
        event_label: 'Hero BookingCard',
        value: 1,
        currency: 'GBP',
        send_to: 'G-9GHX9JVN9S',
      });
    }

    // Meta Contact event (Pixel + CAPI) with email + name → high EMQ
    const nameParts = name.trim().split(/\s+/);
    trackContact({
      eventSource: 'Audit LP Hero Card',
      userData: {
        email,
        firstName: nameParts[0] || undefined,
        lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined,
      },
    });

    handleSubmit(e);
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 28,
        padding: 28,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ position: 'absolute', top: -1, left: 24, right: 24, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,220,4,0.5), transparent)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#63CC79', boxShadow: '0 0 10px rgba(99,204,121,0.8)' }} />
        <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>Free · 48-hour turnaround</span>
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em', color: '#fff', margin: 0, lineHeight: 1.2 }}>
        Get your free brand audit.
      </h3>
      <p className="fg-2" style={{ fontSize: 14, lineHeight: 1.55, marginTop: 8 }}>
        Tell us a bit about your business. We'll send a personalised audit within 48 hours.
      </p>

      <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
        <input
          className="field"
          name="name"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
        <input
          className="field"
          name="email"
          required
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className="field"
          name="company"
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          autoComplete="organization"
        />
        <input
          className="field"
          name="website"
          placeholder="Website (optional)"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          autoComplete="url"
        />
        <select
          className="field"
          name="service"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          style={{
            // Native select needs the appearance + arrow tweaks to match
            // the .field input styling (which is in audit-lp.css).
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='none' stroke='%23ffffff80' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M1 1l5 5 5-5'/></svg>\")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 16px center',
            paddingRight: 40,
            color: service === '' ? 'rgba(255,255,255,0.35)' : '#fff',
          }}
        >
          <option value="" disabled style={{ color: 'rgba(255,255,255,0.35)', background: '#0A0A0A' }}>
            What service do you need?
          </option>
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} style={{ color: '#fff', background: '#0A0A0A' }}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" size="md" style={{ marginTop: 22, width: '100%', justifyContent: 'center', opacity: state.submitting ? 0.6 : 1 }}>
        {state.submitting ? 'Submitting…' : 'Get my free audit'}
      </Button>

      {state.errors && state.errors.getAllFieldErrors().length > 0 && (
        <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: 'rgba(239,136,105,0.1)', border: '1px solid rgba(239,136,105,0.3)', color: '#EF8869', fontSize: 13 }}>
          Couldn't submit. Please check your details and try again.
        </div>
      )}

      <div className="fg-3" style={{ fontSize: 12, marginTop: 12, textAlign: 'center' }}>
        No pitch decks. No obligation. Reply in under 48h.
      </div>

      {/* Honeypot REMOVED (May 2): browser password managers / autofill
          extensions were filling the hidden `_gotcha` field, causing
          Formspree to silently reject submissions as spam (returns 200
          OK so the JS thinks it succeeded but no email is sent).
          Spam risk is near-zero anyway — /audit is noindex and only
          reachable from ad clicks. Formspree's built-in Akismet
          protection is enough at this volume. */}
    </form>
  );
};

// Small leaf icon usage (so tree-shaker keeps Icon if needed elsewhere)
void Icon.check;
