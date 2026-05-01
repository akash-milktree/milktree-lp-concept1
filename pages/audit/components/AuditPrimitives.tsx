/**
 * AuditPrimitives — Shared low-level building blocks for the /audit landing page.
 * Ported from Claude Design export. Keeps inline-style approach (matches the export's
 * design fidelity) while becoming a real React module instead of Babel-in-browser.
 */
import React, { CSSProperties, ReactNode, useState } from 'react';

// ── Mark (yellow square) + Logo ─────────────────────────────────
export const Mark: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <div style={{ width: size, height: size, background: '#FFDC04', borderRadius: 3, flexShrink: 0 }} />
);

export const Logo: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <a href="#top" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#fff', fontWeight: 700, fontSize: size, letterSpacing: '-0.02em' }}>
    <Mark size={size - 2} />
    <span>milktree</span>
  </a>
);

// ── Eyebrow ─────────────────────────────────────────────────────
export const Eyebrow: React.FC<{ num?: string; children: ReactNode; style?: CSSProperties }> = ({ num, children, style }) => (
  <span className="eyebrow-row" style={style}>
    {num !== undefined && <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em' }}>{num}</span>}
    <span className="eyebrow-dot" />
    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFDC04' }}>{children}</span>
  </span>
);

// ── Button ──────────────────────────────────────────────────────
export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: CSSProperties;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  children, variant = 'primary', icon = true, onClick, style = {}, href, size = 'md', type,
}) => {
  const [hover, setHover] = useState(false);
  const pad = size === 'lg' ? '18px 30px' : size === 'sm' ? '10px 18px' : '15px 26px';
  const fs = size === 'lg' ? 16 : size === 'sm' ? 13 : 15;
  const base: CSSProperties = {
    fontFamily: 'inherit', fontSize: fs, fontWeight: 600, borderRadius: 9999,
    padding: pad, cursor: 'pointer', border: 'none', letterSpacing: '-0.01em',
    display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none',
    transition: 'transform 0.2s cubic-bezier(0.21,0.47,0.32,0.98), box-shadow 0.2s, background 0.2s, color 0.2s, border-color 0.2s',
    transform: hover ? 'scale(1.02)' : 'scale(1)',
    whiteSpace: 'nowrap',
  };
  const variants: Record<string, CSSProperties> = {
    primary:   { background: hover ? '#FFE84D' : '#FFDC04', color: '#000', boxShadow: hover ? '0 0 30px rgba(251,230,77,0.35)' : '0 0 0 rgba(0,0,0,0)' },
    secondary: { background: 'rgba(255,255,255,0.03)', color: '#fff', border: `1px solid rgba(255,255,255,${hover ? 0.35 : 0.16})` },
    ghost:     { background: 'transparent', color: hover ? '#FFDC04' : '#fff' },
  };
  const merged = { ...base, ...variants[variant], ...style };
  const inner = (
    <>
      {children}
      {icon && (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
             style={{ transform: hover ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 0.25s' }}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      )}
    </>
  );
  if (href) {
    return (
      <a href={href} style={merged} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick as any}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type ?? 'button'} style={merged} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onClick}>
      {inner}
    </button>
  );
};

// ── Lucide-ish inline icons (stroke-based, currentColor) ────────
type IconFn = (s?: number) => JSX.Element;
export const Icon: Record<string, IconFn> = {
  compass:   (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  layers:    (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  monitor:   (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  sparkles:  (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/><path d="M19 14l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"/></svg>,
  grid:      (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  type:      (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>,
  share:     (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  plus:      (s = 22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  check:     (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrow:     (s = 16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  linkedin:  (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>,
  instagram: (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  mail:      (s = 18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};
