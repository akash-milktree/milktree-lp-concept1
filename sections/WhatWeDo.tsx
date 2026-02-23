import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { ArrowRight } from 'lucide-react';

const serviceGroups = [
  {
    category: 'Strategy',
    description: 'Direction and clarity before a single pixel moves.',
    items: [
      'Brand strategy',
      'Design systems',
      'Product strategy',
      'Project management',
      'Long-term roadmaps',
      'SEO & content strategy',
    ],
  },
  {
    category: 'Design',
    description: 'Craft that earns attention and builds recognition.',
    items: [
      'Branding',
      'Social media design',
      'Generative AI for visuals',
      'Content strategy',
      'Social post design',
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.14 },
  }),
};

export const WhatWeDo: React.FC = () => {
  return (
    <section className="whatwedo-section section" id="services">
      <div className="container whatwedo-container">

        {/* Split header */}
        <Reveal>
          <div className="whatwedo__header">
            <h2 className="whatwedo__heading">What We Build</h2>
            <p className="whatwedo__subtext">
              Everything a growing business needs to become clear, trusted, and chosen.
            </p>
          </div>
        </Reveal>

        {/* Two service group cards */}
        <div className="whatwedo__service-grid">
          {serviceGroups.map((group, i) => (
            <motion.div
              key={group.category}
              className="whatwedo__service-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              {/* Category label */}
              <div className="whatwedo__cat-label">{group.category}</div>

              {/* Short description */}
              <p className="whatwedo__cat-desc">{group.description}</p>

              {/* Divider */}
              <div className="whatwedo__cat-divider" />

              {/* Service list */}
              <ul className="whatwedo__service-list">
                {group.items.map((item) => (
                  <li key={item} className="whatwedo__service-item">
                    <ArrowRight size={13} className="whatwedo__service-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
