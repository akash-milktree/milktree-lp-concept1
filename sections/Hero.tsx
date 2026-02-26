import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { Button } from '../components/ui/Button';
import { ArrowRight, Sparkles, TrendingUp, Zap, Globe } from 'lucide-react';
import { heroContent } from '../data/content';

// Brand showcase cards – real project photos
const showcaseCards = [
  { width: 400, img: '/photos/hero carousel/1.png',    title: 'Luminary',      sub: 'Brand Identity' },
  { width: 640, img: '/photos/hero carousel/2.png',    title: 'Oakfield Group', sub: 'Positioning' },
  { width: 400, img: '/photos/hero carousel/3.png',    title: 'Prism',          sub: 'Visual Identity' },
  { width: 640, img: '/photos/hero carousel/4.png',    title: 'Northway',       sub: 'Guidelines' },
  { width: 400, img: '/photos/hero carousel/5.png',    title: 'Clearpath',      sub: 'Messaging' },
  { width: 640, img: '/photos/hero carousel/6.png',    title: 'Baseline',       sub: 'Creative Direction' },
  { width: 400, img: '/photos/hero carousel/7.png',    title: 'Meridian',       sub: 'Brand Strategy' },
  { width: 640, img: '/photos/hero carousel/8.png',    title: 'Atlas',          sub: 'Visual System' },
  { width: 400, img: '/photos/hero carousel/9.png',    title: 'Crest',          sub: 'Identity' },
  { width: 640, img: '/photos/hero carousel/10.png',   title: 'Summit',         sub: 'Rebranding' },
  { width: 400, img: '/photos/hero carousel/10-1.png', title: 'Vantage',        sub: 'Brand Identity' },
  { width: 640, img: '/photos/hero carousel/11.png',   title: 'Harbour',        sub: 'Guidelines' },
  { width: 400, img: '/photos/hero carousel/12.png',   title: 'Finch',          sub: 'Messaging' },
  { width: 640, img: '/photos/hero carousel/13.png',   title: 'Solaris',        sub: 'Visual Identity' },
  { width: 400, img: '/photos/hero carousel/14.png',   title: 'Ember',          sub: 'Creative Direction' },
  { width: 640, img: '/photos/hero carousel/14-1.png', title: 'Grove',          sub: 'Brand Strategy' },
];

// Client logos for the marquee
const clientLogos = [
  '/logos/logo-1.png',
  '/logos/logo-2.png',
  '/logos/logo-3.png',
  '/logos/logo-4.png',
  '/logos/logo-5.png',
  '/logos/logo-6.png',
  '/logos/logo-7.png',
  '/logos/logo-8.png',
  '/logos/logo-9.png',
  '/logos/logo-10.png',
  '/logos/logo-11.png',
  '/logos/logo-12.png',
  '/logos/logo-13.png',
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

  const allCards = [...showcaseCards, ...showcaseCards, ...showcaseCards];
  const allLogos = [...clientLogos, ...clientLogos, ...clientLogos];

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
            <span className="hero__badge-sep" />
            <span className="hero__badge-icon"><Globe size={14} /></span>
            <span className="hero__badge-text">Trusted across 15+ industries</span>
            <span className="hero__badge-sep" />
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
          animate={{ x: ['-9088px', '0px'] }}
          transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 114, ease: 'linear' } }}
        >
          {allCards.map((card, i) => (
            <div
              key={i}
              className="hero__showcase-card"
            >
              {/* Photo */}
              <img
                src={card.img}
                alt={card.title}
                className="hero__card-img"
                loading="lazy"
                decoding="async"
              />
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
          animate={{ x: ['0%', '-50%'] }}
          transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 40, ease: 'linear' } }}
        >
          {allLogos.map((src, i) => (
            <div key={i} className="hero__marquee-item">
              <img src={src} alt="client logo" className="hero__marquee-logo" />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
