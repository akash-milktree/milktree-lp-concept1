import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

export const StickyMobileCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToAudit = () => {
    document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="sticky-cta">
      <button className="sticky-cta__btn" onClick={scrollToAudit}>
        <Zap size={16} fill="#000" stroke="none" />
        <span>Get My Free Brand Audit</span>
      </button>
    </div>
  );
};
