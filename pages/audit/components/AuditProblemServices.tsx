/**
 * AuditProblemServices — sections 2 + 3 of the audit LP.
 *   §2 Problem: "This is not a design problem. It's a clarity problem."
 *      (mirrors the proven `your_brand_looks_v2` ad thesis exactly)
 *   §3 Services: Seven disciplines / one operating system.
 */
import React, { useState } from 'react';
import { Eyebrow, Icon } from './AuditPrimitives';

// ── PROBLEM ──────────────────────────────────────────────────────
const PAINS = [
  'Your brand looks different everywhere it shows up.',
  'Your message changes every time someone new writes it.',
  'Every creative decision comes back to your inbox.',
  'You look polished — but never unmistakable.',
];
const FIXES = [
  'One identity system. Consistent across every surface.',
  'A messaging framework anyone can write in your voice.',
  'Rules and templates so your team ships without you.',
  'A brand that feels like a category leader, not a contender.',
];

export const Problem: React.FC = () => (
  <section id="problem" className="section">
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap', marginBottom: 56 }}>
        <div style={{ maxWidth: 720 }}>
          <Eyebrow num="01 / The problem">Sound familiar</Eyebrow>
          <h2 style={{ fontSize: 'clamp(32px, 4.4vw, 64px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', marginTop: 18 }}>
            This is not a design problem.<br />
            <span className="fg-3">It's a </span><span style={{ color: '#FFDC04' }}>clarity problem.</span>
          </h2>
        </div>
        <p className="fg-2" style={{ maxWidth: 380, fontSize: 17, lineHeight: 1.6 }}>
          Most brands don't fail because they look bad. They fail because nothing they say — or show — agrees with anything else they say or show.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="pg-grid">
        <ProblemCard label="Without a system" tone="coral" items={PAINS} />
        <ProblemCard label="With Milktree" tone="green" items={FIXES} />
      </div>

      {/*
        AUDIT FIX (§4.4): "Your hero line is your pitch" callout — carries the DES-02 ad
        hook ("Your homepage is one sentence from winning") onto the LP. Lifts DES-02
        message-match from 3/5 to 4-5/5 without per-ad LP variants.
      */}
      <div style={{
        marginTop: 32,
        position: 'relative',
        borderRadius: 28,
        padding: 'clamp(28px, 3.5vw, 44px)',
        background: 'linear-gradient(135deg, rgba(255,220,4,0.04) 0%, rgba(255,255,255,0.015) 100%)',
        border: '1px solid rgba(255,220,4,0.18)',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{ position: 'absolute', top: -1, left: 28, right: 28, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,220,4,0.5), transparent)' }} />
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 9999, background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,220,4,0.35)', color: '#FFDC04', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFDC04' }} />
          Start with the hero line
        </div>
        <p style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.02em', color: '#fff', margin: 0, fontFamily: 'AuditGelasio, serif', fontStyle: 'italic', maxWidth: 920 }}>
          "Your homepage is one sentence from winning. The hero line is the entire pitch — if it doesn't land, nothing below it will."
        </p>
        <p className="fg-3" style={{ fontSize: 13, marginTop: 14, letterSpacing: '0.02em' }}>
          We've rewritten the hero line for 200+ brands. Average enquiry lift: 250%.
        </p>
      </div>
    </div>
    <style>{`@media (max-width: 760px) { .audit-lp .pg-grid { grid-template-columns: 1fr !important; } }`}</style>
  </section>
);

interface ProblemCardProps { label: string; tone: 'coral' | 'green'; items: string[] }
const ProblemCard: React.FC<ProblemCardProps> = ({ label, tone, items }) => {
  const c = tone === 'coral' ? { rgb: '239,136,105', hex: '#EF8869' } : { rgb: '99,204,121', hex: '#63CC79' };
  return (
    <div style={{
      position: 'relative',
      borderRadius: 40,
      padding: 36,
      background: `linear-gradient(180deg, rgba(${c.rgb},0) 0%, rgba(${c.rgb},0.14) 100%)`,
      border: `1px solid rgba(${c.rgb},0.22)`,
      overflow: 'hidden',
      minHeight: 360,
    }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 9999, background: 'rgba(0,0,0,0.35)', border: `1px solid rgba(${c.rgb},0.35)`, color: c.hex, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.hex }} />
        {label}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: 18 }}>
        {items.map((t, i) => (
          <li key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: c.hex, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, marginTop: 2 }}>
              {tone === 'coral' ? '×' : '✓'}
            </span>
            <span style={{ fontSize: 17, lineHeight: 1.5, color: 'rgba(255,255,255,0.88)' }}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ── SERVICES ─────────────────────────────────────────────────────
type IconFn = (s?: number) => JSX.Element;
interface ServiceItem { title: string; desc: string; icon: IconFn; meta: string }

const SERVICES: ServiceItem[] = [
  { title: 'Brand Strategy',         desc: 'Positioning, audience, narrative. The commercial argument before the visual one.',                          icon: Icon.compass,  meta: 'Strategy · Workshop' },
  { title: 'Branding',               desc: 'Identity systems — logo, mark, colour, type, motion — built to scale, not for a deck.',                      icon: Icon.layers,   meta: 'Identity · Guidelines' },
  { title: 'Design System',          desc: 'Tokens, components, documentation. One source of truth for every designer, every channel.',                  icon: Icon.grid,     meta: 'Tokens · Components' },
  { title: 'UI / UX & Websites',     desc: 'High-conversion landing pages, one-pagers, and marketing sites. Shipped in weeks.',                          icon: Icon.monitor,  meta: 'Web · Landing pages' },
  { title: 'Content Strategy',       desc: 'Content pillars, editorial calendar, frameworks that give your team a clear lane.',                          icon: Icon.type,     meta: 'Editorial · Voice' },
  { title: 'Social Media Design',    desc: 'Templates and in-feed creative that looks native to every platform and unmistakably yours.',                 icon: Icon.share,    meta: 'Feeds · Templates' },
  { title: 'Generative AI Visuals',  desc: 'Custom models and pipelines for on-brand imagery at the speed your calendar actually needs.',                icon: Icon.sparkles, meta: 'AI · Production' },
];

export const Services: React.FC = () => (
  <section id="services" className="section" style={{ background: '#050505', position: 'relative' }}>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(255,220,4,0.03), transparent)', pointerEvents: 'none' }} />
    <div className="container" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap', marginBottom: 56 }}>
        <div style={{ maxWidth: 720 }}>
          <Eyebrow num="02 / What we do">Capabilities</Eyebrow>
          <h2 style={{ fontSize: 'clamp(32px, 4.4vw, 64px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.05, color: '#fff', marginTop: 18 }}>
            Seven disciplines.<br />
            <span className="fg-3">One</span> <span style={{ fontStyle: 'italic', fontFamily: 'AuditGelasio, serif', fontWeight: 500 }}>operating</span> <span className="fg-3">system.</span>
          </h2>
        </div>
        <p className="fg-2" style={{ maxWidth: 380, fontSize: 17, lineHeight: 1.6 }}>
          Each service stands alone — but they compound when you run them together. Most clients start with one and bring us in for the rest within a quarter.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }} className="svc-grid">
        {SERVICES.map((s, i) => {
          const span = i === 0 ? 6 : i === 1 ? 6 : 4;
          return <ServiceCard key={i} {...s} num={String(i + 1).padStart(2, '0')} colSpan={span} big={i === 0} />;
        })}
      </div>
    </div>
    <style>{`
      @media (max-width: 980px) { .audit-lp .svc-grid > div { grid-column: span 6 !important; } }
      @media (max-width: 600px) { .audit-lp .svc-grid > div { grid-column: span 12 !important; } }
    `}</style>
  </section>
);

interface ServiceCardProps extends ServiceItem { num: string; colSpan: number; big: boolean }
const ServiceCard: React.FC<ServiceCardProps> = ({ title, desc, icon, meta, num, colSpan, big }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridColumn: `span ${colSpan}`,
        position: 'relative',
        borderRadius: 24,
        padding: big ? 36 : 28,
        background: hover ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.022)',
        border: `1px solid rgba(255,255,255,${hover ? 0.18 : 0.08})`,
        transition: 'background 0.3s, border-color 0.3s, transform 0.3s',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        minHeight: big ? 280 : 220,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: hover ? '#FFDC04' : 'rgba(255,255,255,0.06)', color: hover ? '#000' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
          {icon(20)}
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)' }}>{num}</span>
      </div>
      <div style={{ marginTop: big ? 40 : 28 }}>
        <h3 style={{ fontSize: big ? 30 : 22, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', margin: 0, lineHeight: 1.15 }}>{title}</h3>
        <p className="fg-2" style={{ fontSize: big ? 16 : 14.5, lineHeight: 1.55, marginTop: 10, maxWidth: 440 }}>{desc}</p>
        <div className="fg-3" style={{ fontSize: 11, letterSpacing: '0.12em', fontWeight: 700, textTransform: 'uppercase', marginTop: 18 }}>{meta}</div>
      </div>
    </div>
  );
};
