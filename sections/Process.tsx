import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { SectionLabel } from '../components/ui/SectionLabel';
import { processSteps } from '../data/content';

export const Process: React.FC = () => {
  return (
    <section className="process-section" id="process">
      <div className="process-container">
        <Reveal>
          <SectionLabel>{processSteps.label}</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="process__heading">{processSteps.headline}</h2>
        </Reveal>

        <div className="process__grid">
          {processSteps.steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="process__step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.08 }}
            >
              <span className="process__step-number">{step.number}</span>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
