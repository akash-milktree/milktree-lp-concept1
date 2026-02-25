import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/content';

const StarRating: React.FC = () => (
  <div className="tcard__stars">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FFDC04" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

export const Testimonials: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 680 + 24; // card + gap

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
    setCurrentIndex(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: clamped * cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section className="tSection" id="testimonials">
      <div className="tSection__container">

        <Reveal>
          <h2 className="tSection__heading">What founders are saying</h2>
        </Reveal>

        {/* Carousel track */}
        <div className="tSection__track-wrap">
          <div className="tSection__track" ref={trackRef}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="tcard"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.05 }}
              >
                {/* Text content */}
                <div className="tcard__content">
                  <StarRating />
                  <p className="tcard__quote">"{t.quote}"</p>
                  <div className="tcard__attribution">
                    <span className="tcard__name">{t.name}</span>
                    <span className="tcard__role">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="tSection__arrows">
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
            disabled={currentIndex >= testimonials.length - 1}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
};
