import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { AlertTriangle, Zap, ArrowRight } from 'lucide-react';

const painPoints = [
  'Your brand looks different depending on where someone finds you.',
  'Your message changes depending on who writes it.',
  'Your team asks you to approve every brand decision.',
  'Your brand feels polished but is not converting.',
];

const milktreeWay = [
  'A clear positioning that your whole team understands.',
  'Consistent messaging across every channel and touchpoint.',
  'A visual system that works without you in the room.',
  'A brand that drives enquiries, not just recognition.',
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.15 },
  }),
};

export const Problem: React.FC = () => {
  const scrollToAudit = () => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="prob-section" id="problem">
      <div className="container">

        <div className="prob-cards">
          {/* Left card – before */}
          <motion.div
            className="prob-card prob-card--dark"
            custom={0} variants={cardVariants} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="prob-card__inner">
              <div className="prob-card__header">
                <h3 className="prob-card__heading">Before working with us</h3>
                <p className="prob-card__subheading">Most brands we meet are stuck here:</p>
              </div>
              <ul className="prob-card__list">
                {painPoints.map((text, i) => (
                  <li key={i} className="prob-list-item prob-list-item--bad">
                    <span className="prob-list-item__badge prob-list-item__badge--bad">
                      <AlertTriangle size={20} />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right card – with Milktree */}
          <motion.div
            className="prob-card prob-card--warm"
            custom={1} variants={cardVariants} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="prob-card__inner">
              <div className="prob-card__header">
                <h3 className="prob-card__heading">With Milktree</h3>
                <p className="prob-card__subheading">What brand clarity actually looks like:</p>
              </div>
              <ul className="prob-card__list">
                {milktreeWay.map((text, i) => (
                  <li key={i} className="prob-list-item prob-list-item--good">
                    <span className="prob-list-item__badge prob-list-item__badge--good">
                      <Zap size={20} />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* CTA below both cards */}
        <Reveal>
          <div className="prob-cta">
            <Button variant="primary" size="lg" onClick={scrollToAudit} icon={<Zap size={18} />}>
              Book Your Free Brand Audit
            </Button>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
