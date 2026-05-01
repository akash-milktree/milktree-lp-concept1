/**
 * AuditClosing — sections 7, 8, 9 + sticky mobile CTA + footer.
 *
 * AUDIT FIXES applied:
 *   - FinalCTA form wired to Formspree → /thank-you (was a fake form).
 *   - FinalCTA bullets standardised: removed "30-minute discovery call",
 *     replaced with "48-hour written audit" everywhere.
 *   - Form CTA "Get my free audit" (was already correct, kept it).
 *   - StickyMobileCTA href + label aligned with hero CTA.
 *   - FAQ updated: removed the "We don't do paid media" line (we now do
 *     run paid for our own pipeline; that line could confuse a paid-traffic
 *     visitor). Replaced with a "Do you only work with UK clients?" item.
 *   - Footer nav simplified: paid traffic shouldn't be invited to wander.
 */
import React, { useEffect, useState } from 'react';
import { useForm } from '@formspree/react';
import { useNavigate } from 'react-router-dom';
import { Eyebrow, Icon, Logo, Button } from './AuditPrimitives';
import { trackContact } from '../../../utils/meta-tracking';

// ── FINAL CTA (bottom audit form) ────────────────────────────────
export const FinalCTA: React.FC = () => {
  const [state, handleSubmit] = useForm('auditLpForm');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const navigate = useNavigate();

  // Redirect to LP-isolated thank-you on success — host-aware path.
  useEffect(() => {
    if (state.succeeded) {
      const isAuditSubdomain =
        typeof window !== 'undefined' && window.location.hostname === 'audit.milktreeagency.com';
      const path = isAuditSubdomain ? '/thank-you' : '/audit/thank-you';
      navigate(`${path}?card=final`);
    }
  }, [state.succeeded, navigate]);

  const canSubmit = name.trim() !== '' && email.trim() !== '' && email.includes('@');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'Audit Form',
        event_label: 'LP Final CTA',
        value: 1,
        currency: 'GBP',
        send_to: 'G-9GHX9JVN9S',
      });
    }

    const nameParts = name.trim().split(/\s+/);
    trackContact({
      eventSource: 'Audit LP Final CTA',
      userData: {
        email,
        firstName: nameParts[0] || undefined,
        lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined,
      },
    });

    handleSubmit(e);
  };

  return (
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

        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'center' }} className="cta-grid">
          <div>
            <Eyebrow num="06 / Start">Begin</Eyebrow>
            <h2 style={{ fontSize: 'clamp(36px, 5.4vw, 84px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.98, color: '#fff', marginTop: 20, textWrap: 'balance' }}>
              See what your brand is <span style={{ color: '#FFDC04' }}>really</span> <span style={{ fontStyle: 'italic', fontFamily: 'AuditGelasio, serif', fontWeight: 500 }}>saying.</span>
            </h2>
            <p className="fg-2" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.55, marginTop: 20, maxWidth: 520 }}>
              Drop your email. We'll come back within 48 hours with a short, honest read on your brand — and whether we're the right studio to fix it.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: 10, maxWidth: 480 }}>
              {[
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

          <form
            onSubmit={onSubmit}
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 28,
              padding: 28,
              backdropFilter: 'blur(12px)',
            }}
          >
            <input type="hidden" name="service" value="Audit LP — Final CTA" />

            <div className="fg-3" style={{ fontSize: 11, letterSpacing: '0.14em', fontWeight: 700, textTransform: 'uppercase' }}>Free · 48h turnaround</div>
            <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', margin: '10px 0 0', lineHeight: 1.15 }}>Request your brand audit</h3>
            <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
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
                type="email"
                required
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <input
                className="field"
                name="website"
                placeholder="Website or brand name (optional)"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                autoComplete="url"
              />
            </div>

            <Button type="submit" size="lg" style={{ marginTop: 18, width: '100%', justifyContent: 'center', opacity: state.submitting ? 0.6 : 1 }}>
              {state.submitting ? 'Submitting…' : 'Get my free audit'}
            </Button>

            {state.errors && state.errors.getAllFieldErrors().length > 0 && (
              <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: 'rgba(239,136,105,0.1)', border: '1px solid rgba(239,136,105,0.3)', color: '#EF8869', fontSize: 13 }}>
                Couldn't submit — please check your details and try again.
              </div>
            )}

            <div className="fg-3" style={{ fontSize: 12, marginTop: 14, textAlign: 'center' }}>No cost. No commitment. Just clarity.</div>

            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
          </form>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .audit-lp .cta-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
};

// ── FAQ ──────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: 'How long does a typical engagement take?',                a: 'Most identity + site builds ship in 4–6 weeks. Design systems and content ops run on retainer. You\'ll get a fixed scope and a written timeline after the audit.' },
  { q: 'What does it cost?',                                      a: 'Brand builds start from around £6,000. Websites and landing pages from around £3,500. Retainers are quoted per quarter. We share a clear number after we understand the scope.' },
  { q: 'Do you work with early-stage / pre-launch brands?',       a: 'Yes — half our work is zero-to-one. We help you decide what to build before we build it.' },
  { q: 'How does the generative AI side actually work?',          a: 'We train on your brand assets to produce on-brand imagery, then hand over pipelines, prompts, and a template library your team can run without us.' },
  { q: 'Can we keep working with you after launch?',              a: 'Most clients do. After the initial build we move into a content + design retainer or hand everything over with full guidelines — your call.' },
  { q: 'Do you only work with UK clients?',                       a: 'No — we\'re London-based but work across the UK, Europe, and the US. Most engagements run remotely with one or two on-sites if it helps the work.' },
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

// ── FOOTER (simplified — no nav noise for paid traffic) ─────────
export const AuditFooter: React.FC = () => (
  <footer style={{ position: 'relative', zIndex: 3, borderTop: '1px solid rgba(255,255,255,0.08)', padding: '56px clamp(20px, 4vw, 48px) 40px' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 380 }}>
          <Logo size={18} />
          <p className="fg-3" style={{ fontSize: 14, lineHeight: 1.55, marginTop: 16 }}>
            A design-led studio building brands, systems, and content for the next generation of category leaders.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[Icon.linkedin, Icon.instagram, Icon.mail].map((Ic, i) => (
            <a
              key={i}
              href={i === 2 ? 'mailto:hello@milktreeagency.com' : '#'}
              style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#FFDC04'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = '#FFDC04'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              {Ic(16)}
            </a>
          ))}
        </div>
      </div>

      <div aria-hidden style={{ marginTop: 64, fontSize: 'clamp(80px, 20vw, 280px)', fontWeight: 700, letterSpacing: '-0.06em', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.08)', lineHeight: 0.85, overflow: 'hidden' }}>
        milktree
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap', gap: 12 }}>
        <div className="fg-3" style={{ fontSize: 12 }}>© 2026 Milktree Agency. All rights reserved.</div>
        <div className="fg-3" style={{ fontSize: 12 }}>Made in London · Working worldwide</div>
      </div>
    </div>
  </footer>
);

// ── STICKY MOBILE CTA (only shown on small screens past the fold) ─
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
