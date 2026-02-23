import React from 'react';
import { motion } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import {
  Target, Layers, Compass, ClipboardList,
  Map, Search, Feather, Share2,
  Sparkles, FileText, Image,
} from 'lucide-react';

const services = [
  { title: 'Brand strategy',              Icon: Target       },
  { title: 'Design systems',              Icon: Layers       },
  { title: 'Product strategy',            Icon: Compass      },
  { title: 'Project management',          Icon: ClipboardList },
  { title: 'Long-term roadmaps',          Icon: Map          },
  { title: 'SEO & content strategy',      Icon: Search       },
  { title: 'Branding',                    Icon: Feather      },
  { title: 'Social media design',         Icon: Share2       },
  { title: 'Generative AI for visuals',   Icon: Sparkles     },
  { title: 'Content strategy',            Icon: FileText     },
  { title: 'Social post design',          Icon: Image        },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.055 },
  }),
};

export const WhatWeDo: React.FC = () => {
  return (
    <section className="whatwedo-section section" id="services">
      <div className="container whatwedo-container">

        <Reveal>
          <div className="whatwedo__header">
            <h2 className="whatwedo__heading">What We Build</h2>
            <p className="whatwedo__subtext">
              Everything a growing business needs to become clear, trusted, and chosen.
            </p>
          </div>
        </Reveal>

        <div className="whatwedo__grid">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="whatwedo__card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -4, transition: { duration: 0.22 } }}
            >
              <div className="whatwedo__card-icon">
                <service.Icon size={22} />
              </div>
              <div className="whatwedo__card-title">{service.title}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
