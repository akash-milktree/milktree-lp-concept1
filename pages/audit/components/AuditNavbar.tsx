/**
 * AuditNavbar — minimal nav for the paid-traffic LP.
 * AUDIT FIX: Removed all nav links (Services / Process / Work / FAQ).
 * Paid traffic gets logo + single CTA only — no exploration paths.
 */
import React, { useEffect, useState } from 'react';
import { Logo, Button } from './AuditPrimitives';

interface AuditNavbarProps {
  onCTAClick: () => void;
}

export const AuditNavbar: React.FC<AuditNavbarProps> = ({ onCTAClick }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 18, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', pointerEvents: 'none', padding: '0 16px' }}>
      <div style={{
        pointerEvents: 'auto',
        background: 'rgba(6,6,6,0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 9999,
        // AUDIT FIX: padding bumped to give the (bigger) logo more breathing room
        padding: '9px 9px 9px 24px',
        display: 'flex', alignItems: 'center', gap: 22,
        boxShadow: scrolled ? '0 12px 40px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.3s, border-color 0.3s',
        maxWidth: '100%',
      }}>
        {/* AUDIT FIX: logo upsized 16 → 22 (~38% bigger) for better recognition.
            Mark scales with the wordmark. */}
        <Logo size={22} />
        <Button size="sm" onClick={onCTAClick}>Get my free audit</Button>
      </div>
    </div>
  );
};
