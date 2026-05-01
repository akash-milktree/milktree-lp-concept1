/**
 * AuditEffects — small client-only visual effects.
 * CursorHalo: yellow glow following the cursor (desktop only, hidden via CSS).
 * Reveal: fade-up content on scroll (uses IntersectionObserver per CLAUDE.md Rule 3 patterns).
 */
import React, { useEffect, useRef } from 'react';

export const CursorHalo: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    window.addEventListener('mousemove', move, { passive: true });
    let raf = 0;
    const tick = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="cursor-halo hide-sm" aria-hidden />;
};

export const RevealOnScroll: React.FC = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.audit-lp .reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
};
