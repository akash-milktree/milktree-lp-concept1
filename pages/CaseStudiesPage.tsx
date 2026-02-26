import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { caseStudies } from '../data/content';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../sections/Footer';
import { ArrowUpRight } from 'lucide-react';

export const CaseStudiesPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="cs-archive">
        <div className="cs-archive__container">

          <motion.div
            className="cs-archive__header"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="cs-archive__label">Our work</span>
            <h1 className="cs-archive__heading">Built for real results.</h1>
            <p className="cs-archive__subheading">
              A selection of brands and digital experiences we've built for founders who wanted more than a pretty website.
            </p>
          </motion.div>

          <div className="cs-archive__grid">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.slug}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.07 }}
              >
                <Link to={`/work/${cs.slug}`} className="cs-card">
                  <div className="cs-card__img-wrap">
                    <img src={cs.coverImage} alt={cs.title} className="cs-card__img" />
                    <div className="cs-card__overlay">
                      <span className="cs-card__view">
                        View project <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                  <div className="cs-card__body">
                    <div className="cs-card__tags">
                      {cs.tags.map(tag => (
                        <span key={tag} className="cs-card__tag">{tag}</span>
                      ))}
                    </div>
                    <h2 className="cs-card__title">{cs.title}</h2>
                    <p className="cs-card__services">{cs.services}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
};
