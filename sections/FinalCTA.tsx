import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { Zap } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
            onClick={scrollToTop}
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

        <Reveal delay={0.24}>
          <p className="finalcta__note">No cost. No commitment. Just clarity.</p>
        </Reveal>

      </div>
    </section>
  );
};
