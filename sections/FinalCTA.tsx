import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { Zap } from 'lucide-react';

// ← UPDATE this to your actual Cal.com link (e.g. "akash-milktree/intro")
const CAL_LINK = 'milktree/intro';

export const FinalCTA: React.FC = () => {
  useEffect(() => {
    if ((window as any).Cal) return; // already loaded

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal; let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {}; cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["-al", namespace, api]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", { origin: "https://cal.com" });
      Cal("inline", {
        elementOrSelector: "#cal-embed",
        calLink: "${CAL_LINK}",
        layout: "month_view"
      });
      Cal("ui", {
        "styles": { "branding": { "brandColor": "#FFDC04" } },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    `;
    document.body.appendChild(script);
  }, []);

  return (
    <section className="finalcta-section" id="audit">
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
            onClick={() => document.getElementById('cal-embed')?.scrollIntoView({ behavior: 'smooth' })}
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
            <div id="cal-embed" className="finalcta__cal" />
            <p className="finalcta__cal-attr">Cal.com</p>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
