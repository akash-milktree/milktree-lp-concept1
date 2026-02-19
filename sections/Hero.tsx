import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import { heroContent } from '../data/content';

// Brand showcase cards – varied widths like Supafast portfolio row
const showcaseCards = [
  { width: 400, bg: 'linear-gradient(140deg, #111827 0%, #1e1b4b 100%)', accent: '#6366f1', title: 'Luminary', sub: 'Brand Identity' },
  { width: 640, bg: 'linear-gradient(140deg, #0c1a2e 0%, #1e3a5f 100%)', accent: '#38bdf8', title: 'Oakfield Group', sub: 'Positioning' },
  { width: 400, bg: 'linear-gradient(140deg, #1a0a0a 0%, #3b0f0f 100%)', accent: '#f87171', title: 'Prism', sub: 'Visual Identity' },
  { width: 640, bg: 'linear-gradient(140deg, #0d1a0d 0%, #14532d 100%)', accent: '#4ade80', title: 'Northway', sub: 'Guidelines' },
  { width: 400, bg: 'linear-gradient(140deg, #1c1027 0%, #3b1f5e 100%)', accent: '#c084fc', title: 'Clearpath', sub: 'Messaging' },
  { width: 640, bg: 'linear-gradient(140deg, #1a1200 0%, #422006 100%)', accent: '#fb923c', title: 'Baseline', sub: 'Creative Direction' },
];

// Client/brand names for the logo marquee
const clientNames = [
  'Luminary Studios', 'Oakfield Group', 'Prism Consulting',
  'Northway Digital', 'Clearpath Advisory', 'Baseline Studio',
  'Meridian Co.', 'Atlas Partners', 'Crest Advisory', 'Summit Brand',
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.1 },
  }),
};

export const Hero: React.FC = () => {
  const scrollToProcess = () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToAudit = () => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' });

  const allCards = [...showcaseCards, ...showcaseCards];
  const allClients = [...clientNames, ...clientNames, ...clientNames];

  return (
    <section className="hero" id="hero">
      {/* Ambient orbs */}
      <div className="hero__orb hero__orb--yellow" />
      <div className="hero__orb hero__orb--purple" />

      {/* ── Text block ── */}
      <div className="hero__top">
        <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
          <div className="hero__badge">
            <span className="hero__badge-icon"><Sparkles size={14} /></span>
            <span className="hero__badge-text">200+ brands built</span>
            <span className="hero__badge-icon"><TrendingUp size={14} /></span>
            <span className="hero__badge-text">250% avg. enquiry increase</span>
          </div>
        </motion.div>

        <motion.h1
          className="hero__headline"
          custom={1} variants={itemVariants} initial="hidden" animate="visible"
        >
          {heroContent.headline}
        </motion.h1>

        <motion.p
          className="hero__subheadline"
          custom={2} variants={itemVariants} initial="hidden" animate="visible"
        >
          {heroContent.subheadline}
        </motion.p>

        <motion.div
          className="hero__cta-group"
          custom={3} variants={itemVariants} initial="hidden" animate="visible"
        >
          <Button variant="primary" size="lg" onClick={scrollToAudit} icon={<Zap size={18} />}>
            {heroContent.primaryCta}
          </Button>
          <Button variant="secondary" size="lg" onClick={scrollToProcess}>
            {heroContent.secondaryCta}
          </Button>
        </motion.div>
      </div>

      {/* ── Showcase card row (above marquee, like Supafast) ── */}
      <motion.div
        className="hero__showcase"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <motion.div
          className="hero__showcase-track"
          animate={{ x: ['-3336px', '0px'] }}
          transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 50, ease: 'linear' } }}
        >
          {allCards.map((card, i) => (
            <div
              key={i}
              className="hero__showcase-card"
              style={{ width: card.width, background: card.bg }}
            >
              {/* Accent line */}
              <div className="hero__card-accent" style={{ background: card.accent }} />
              {/* Content */}
              <div className="hero__card-body">
                <span className="hero__card-title">{card.title}</span>
                <span className="hero__card-sub">{card.sub}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Client name marquee (below showcase, like Supafast) ── */}
      <motion.div
        className="hero__marquee-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.div
          className="hero__marquee-track"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 28, ease: 'linear' } }}
        >
          {allClients.map((name, i) => (
            <div key={i} className="hero__marquee-item">
              <span className="hero__marquee-dot" />
              <span className="hero__marquee-name">{name}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
