import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Reveal } from '../components/animations/Reveal';
import { caseStudies } from '../data/content';

export const CaseStudies: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 517 + 24; // card width + gap

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, caseStudies.length - 1));
    setCurrentIndex(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: clamped * cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="cs-section" id="work">
      {/* Heading + "View all" link */}
      <div className="cs-container">
        <Reveal>
          <div className="cs-header">
            <h2 className="cs-heading">Real businesses.<br />Real results.</h2>
            <Link to="/work" className="cs-view-all">
              View all work <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Full-width bleed card track */}
      <div className="cs-track-wrap">
        <div className="cs-track" ref={trackRef}>
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.06 }}
            >
              <Link to={`/work/${study.slug}`} className="cs-card">
                <div className="cs-card__img-wrap">
                  <img
                    src={study.coverImage}
                    alt={study.title}
                    className="cs-card__img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="cs-card__arrow"><ArrowRight size={18} /></div>
                </div>
                <div className="cs-card__body">
                  <div className="cs-card__meta">
                    <span className="cs-card__industry">{study.tags[0]}</span>
                  </div>
                  <h4 className="cs-card__title">{study.title}</h4>
                  <p className="cs-card__services">{study.services}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Arrow navigation */}
      <div className="cs-container">
        <div className="cs-arrows">
          <button
            className="cs-arrow-btn"
            onClick={() => scrollTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="cs-arrow-btn"
            onClick={() => scrollTo(currentIndex + 1)}
            disabled={currentIndex >= caseStudies.length - 1}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
