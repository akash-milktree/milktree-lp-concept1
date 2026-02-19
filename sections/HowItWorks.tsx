import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { caseStudies } from '../data/content';

export const HowItWorks: React.FC = () => {
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
    <section className="results-section" id="process">
      {/* Heading inside container */}
      <div className="results-container">
        <Reveal>
          <h2 className="results__heading">Real Brand Results</h2>
        </Reveal>
      </div>

      {/* Card track — true full-width bleed, outside container */}
      <div className="results__track-wrap">
        <div className="results__track" ref={trackRef}>
          {caseStudies.map((study, i) => (
            <motion.div
              key={i}
              className="results__card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.06 }}
            >
              {/* Image */}
              <div className="results__card-img-wrap">
                <img
                  src={study.img}
                  alt={study.title}
                  className="results__card-img"
                />
              </div>

              {/* Text block */}
              <div className="results__card-body">
                <h4 className="results__card-title">{study.title}</h4>
                <p className="results__card-services">{study.services}</p>
                <div className="results__card-tags">
                  {study.tags.map((tag) => (
                    <span key={tag} className="results__card-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Arrow navigation back inside container */}
      <div className="results-container">
        <div className="results__arrows">
          <button
            className="results__arrow-btn"
            onClick={() => scrollTo(currentIndex - 1)}
            disabled={currentIndex === 0}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="results__arrow-btn"
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
