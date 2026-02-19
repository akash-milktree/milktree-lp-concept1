import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';

const services = [
  {
    title: 'Brand Positioning',
    // Strategy / planning / workshop table
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80&auto=format&fit=crop',
  },
  {
    title: 'Messaging Framework',
    // Writing / copywriting / words on screen
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=700&q=80&auto=format&fit=crop',
  },
  {
    title: 'Visual Identity System',
    // Colour swatches / design work
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80&auto=format&fit=crop',
  },
  {
    title: 'Brand Guidelines',
    // Design book / editorial layout
    img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&q=80&auto=format&fit=crop',
  },
  {
    title: 'Creative Direction',
    // Mood board / editorial shoot
    img: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=700&q=80&auto=format&fit=crop',
  },
  {
    title: 'Launch Support',
    // Team collaborating / presenting
    img: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=700&q=80&auto=format&fit=crop',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.07 },
  }),
};

export const WhatWeDo: React.FC = () => {
  return (
    <section className="whatwedo-section section" id="services">
      <div className="container whatwedo-container">

        {/* Split header: big title left, subtext right */}
        <Reveal>
          <div className="whatwedo__header">
            <h2 className="whatwedo__heading">What We Build</h2>
            <p className="whatwedo__subtext">
              Everything a growing business needs to become clear, trusted, and chosen.
            </p>
          </div>
        </Reveal>

        {/* 3-col image cards – Supafast style */}
        <div className="whatwedo__grid">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="whatwedo__card"
              custom={i} variants={cardVariants} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ scale: 1.015, transition: { duration: 0.25 } }}
            >
              {/* Background photo */}
              <img
                src={service.img}
                alt={service.title}
                className="whatwedo__card-img"
              />
              {/* Dark gradient overlay */}
              <div className="whatwedo__card-overlay" />
              {/* Label at bottom-left */}
              <div className="whatwedo__card-label">{service.title}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
