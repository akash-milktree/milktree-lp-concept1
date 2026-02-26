import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { caseStudies } from '../data/content';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../sections/Footer';
import { Button } from '../components/ui/Button';

const CAL_LINK = 'milktreeagency/brand-audit';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find(c => c.slug === slug);

  if (!cs) {
    return (
      <>
        <Navbar />
        <main className="cs-notfound">
          <p>Case study not found.</p>
          <Link to="/work">← Back to work</Link>
        </main>
        <Footer />
      </>
    );
  }

  const gallery = cs.galleryImages || [];
  const [img0, img1, img2, img3] = gallery;
  const others = caseStudies.filter(c => c.slug !== cs.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="cs-detail">

        {/* ── 1. HERO: full-viewport, starts at y=0, navbar floats over ── */}
        <section className="cs-detail__hero">
          {/* Background image with gradient overlay */}
          <div className="cs-detail__hero-bg">
            <img src={cs.coverImage} alt="" className="cs-detail__hero-bg-img" />
            <div className="cs-detail__hero-overlay" />
          </div>

          {/* Content sits above the bg */}
          <div className="cs-detail__hero-content">

            {/* Upper: tags + client name */}
            <motion.div
              className="cs-detail__hero-brand"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
            >
              <div className="cs-detail__hero-tags">
                {cs.tags.map(tag => (
                  <span key={tag} className="cs-card__tag">{tag}</span>
                ))}
              </div>
              <h1 className="cs-detail__client-name">{cs.title}</h1>
            </motion.div>

            {/* Lower: headline + description + scope */}
            <motion.div
              className="cs-detail__hero-info"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.2 }}
            >
              <h2 className="cs-detail__headline">{cs.headline}</h2>
              <p className="cs-detail__description">{cs.description}</p>
              <div className="cs-detail__scope">
                <span className="cs-detail__scope-label">Scope of work</span>
                <strong className="cs-detail__scope-text">{cs.scopeOfWork}</strong>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── 2. GALLERY ── */}
        {gallery.length > 0 && (
          <div className="cs-detail__gallery">

            {/* Full-width tile */}
            {img0 && (
              <motion.div
                className="cs-gallery-tile"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <img src={img0} alt={`${cs.title} — 1`} />
              </motion.div>
            )}

            {/* 2-col pair */}
            {(img1 || img2) && (
              <motion.div
                className="cs-gallery-pair"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                {img1 && (
                  <div className="cs-gallery-tile">
                    <img src={img1} alt={`${cs.title} — 2`} />
                  </div>
                )}
                {img2 && (
                  <div className="cs-gallery-tile">
                    <img src={img2} alt={`${cs.title} — 3`} />
                  </div>
                )}
              </motion.div>
            )}

            {/* Full-width tile */}
            {img3 && (
              <motion.div
                className="cs-gallery-tile"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.05 }}
              >
                <img src={img3} alt={`${cs.title} — 4`} />
              </motion.div>
            )}

          </div>
        )}

        {/* ── 3. MORE PROJECTS ── */}
        {others.length > 0 && (
          <div className="cs-detail__more">
            <div className="cs-detail__more-inner">
              <h2 className="cs-detail__more-heading">More Projects</h2>
              <div className="cs-detail__more-grid">
                {others.map((other, i) => (
                  <motion.div
                    key={other.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.07 }}
                  >
                    <Link to={`/work/${other.slug}`} className="cs-more-card">
                      <div className="cs-more-card__img">
                        <img src={other.coverImage} alt={other.title} />
                      </div>
                      <div className="cs-more-card__body">
                        <div className="cs-more-card__tags">
                          {other.tags.map(t => (
                            <span key={t} className="cs-card__tag">{t}</span>
                          ))}
                        </div>
                        <span className="cs-more-card__title">{other.title}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── 4. CTA ── */}
        <motion.div
          className="cs-detail__cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="cs-detail__cta-inner">
            <h2 className="cs-detail__cta-heading">
              Ready to move faster<br />and convert more?
            </h2>
            <p className="cs-detail__cta-sub">Let's build a brand that does the heavy lifting.</p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => window.open(`https://cal.com/${CAL_LINK}`, '_blank', 'noopener,noreferrer')}
            >
              Book Your Free Brand Audit
            </Button>
          </div>
        </motion.div>

      </main>
      <Footer />
    </>
  );
};
