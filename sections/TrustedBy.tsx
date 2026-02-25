import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { testimonials } from '../data/content';

const StarRow = () => (
  <div className="tby__stars">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#FFDC04">
        <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.4l-3.7 2 .7-4.1-3-2.9 4.2-.8z" />
      </svg>
    ))}
  </div>
);

const INITIAL_SHOW = 6;

export const TrustedBy: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? testimonials : testimonials.slice(0, INITIAL_SHOW);

  return (
    <section className="tby-section" id="testimonials">
      <div className="tby-container">

        <Reveal delay={0.05}>
          <h2 className="tby__heading">
            Founders who made the switch
          </h2>
        </Reveal>

        <div className="tby__grid">
          <AnimatePresence>
            {visible.map((t, i) => (
              <motion.div
                key={t.name}
                className="tby__card"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98], delay: i < INITIAL_SHOW ? i * 0.06 : 0 }}
                viewport={{ once: true, margin: '-40px' }}
              >
                <StarRow />
                <p className="tby__quote">"{t.quote}"</p>
                <div className="tby__attribution">
                  <div className="tby__person">
                    <span className="tby__name">{t.name}</span>
                    <span className="tby__role">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!showAll && testimonials.length > INITIAL_SHOW && (
          <Reveal delay={0.1}>
            <div className="tby__loadmore-wrap">
              <button
                className="tby__loadmore"
                onClick={() => setShowAll(true)}
              >
                Load more
              </button>
            </div>
          </Reveal>
        )}

      </div>
    </section>
  );
};
