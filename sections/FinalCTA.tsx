import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { Zap } from 'lucide-react';


export const FinalCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const initCal = () => {
      if ((window as any).Cal?.loaded) return; // already loaded

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
        Cal("init", "free-brand-digital-presence-audit-30-minutes", {origin:"https://app.cal.com"});
        Cal.ns["free-brand-digital-presence-audit-30-minutes"]("inline", {
          elementOrSelector: "#my-cal-inline-free-brand-digital-presence-audit-30-minutes",
          config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true"},
          calLink: "milktree-agency/free-brand-digital-presence-audit-30-minutes",
        });
        Cal.ns["free-brand-digital-presence-audit-30-minutes"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      `;
      document.body.appendChild(script);
    };

    // If the section is already in or near the viewport when mounted, init immediately.
    // This handles the case where the lazy-loaded component mounts while already visible.
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight + 300) {
      initCal();
      return;
    }

    // Otherwise wait until it scrolls into range
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        initCal();
      },
      { rootMargin: '200px' }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section className="finalcta-section" id="audit" ref={sectionRef}>
      <div className="finalcta__container">

        <Reveal>
          <h2 className="finalcta__heading">
            See what your brand<br />is really saying.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="finalcta__subtext">
            Book a free brand audit and get an honest view of where you stand.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <motion.button
            className="finalcta__btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.44, 0, 0.56, 1] }}
            onClick={() => {
              if (typeof window.gtag === 'function') {
                window.gtag('event', 'cta_click', { event_category: 'Final CTA', event_label: 'Book Your Free Brand Audit', send_to: 'G-9GHX9JVN9S' });
              }
              window.open('https://cal.com/milktree-agency/free-brand-digital-presence-audit-30-minutes', '_blank', 'noopener,noreferrer');
            }}
          >
            <motion.span
              className="finalcta__btn-icon"
              whileHover={{ rotate: 20 }}
              transition={{ duration: 0.25 }}
            >
              <Zap size={36} fill="rgb(251,230,77)" stroke="none" />
            </motion.span>
            <span>Book Your Free Brand Audit</span>
          </motion.button>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="finalcta__note">Spots are limited — we work with select clients each month.</p>
        </Reveal>

        {/* Cal.com inline embed */}
        <Reveal delay={0.32}>
          <div className="finalcta__cal-wrap">
            <div id="my-cal-inline-free-brand-digital-presence-audit-30-minutes" className="finalcta__cal" />
          </div>
        </Reveal>

      </div>
    </section>
  );
};
