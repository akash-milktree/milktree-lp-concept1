import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../sections/Footer';
import { Reveal } from '../components/animations/Reveal';
import { caseStudies } from '../data/content';
import { trackViewContent } from '../utils/meta-tracking';

export const CaseStudiesPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Track ViewContent for the portfolio page (Meta + GA4)
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'view_item_list', {
        item_list_name: 'Case Studies Portfolio',
        send_to: 'G-9GHX9JVN9S',
      });
    }
    trackViewContent({
      contentName: 'Case Studies Portfolio',
      contentCategory: 'Portfolio',
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Work | Milktree Agency</title>
        <meta name="description" content="Real brands, real results. See how we've helped 200+ businesses build brand identities that drive growth across finance, hospitality, tech, and more." />
        <link rel="canonical" href="https://milktreeagency.com/work" />
        <meta property="og:title" content="Our Work | Milktree Agency" />
        <meta property="og:description" content="Real brands, real results. See how we've helped 200+ businesses build brand identities that drive growth." />
        <meta property="og:url" content="https://milktreeagency.com/work" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <main>

        {/* ── Hero header ── */}
        <section className="cs-page__hero">
          <div className="cs-page__hero-inner container">
            <Reveal>
              <p className="cs-page__label">Our Work</p>
              <h1 className="cs-page__heading">Real brands.<br />Real results.</h1>
              <p className="cs-page__subtext">
                Every client below came to us wanting more than a pretty logo. Here's what we built, and what happened next.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ── Case study grid ── */}
        <section className="cs-page__grid-section">
          <div className="container cs-page__grid-container">
            <div className="cs-page__grid">
              {caseStudies.map((study, i) => (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.08 }}
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
                      <div className="cs-card__arrow">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                    <div className="cs-card__body">
                      <div className="cs-card__meta">
                        <span className="cs-card__industry">{study.tags[0]}</span>
                        {study.tags[1] && (
                          <span className="cs-card__location">{study.tags[1]}</span>
                        )}
                      </div>
                      <h2 className="cs-card__title">{study.title}</h2>
                      <p className="cs-card__subtitle">{study.services}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
};
