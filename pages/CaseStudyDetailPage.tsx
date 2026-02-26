import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../sections/Footer';
import { Reveal } from '../components/animations/Reveal';
import { caseStudies } from '../data/content';

const CAL_LINK = 'https://cal.com/milktree-agency/free-brand-digital-presence-audit-30-minutes';

export const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = caseStudies.find((s) => s.slug === slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!study) return <Navigate to="/work" replace />;

  const currentIdx = caseStudies.indexOf(study);
  const prevStudy = currentIdx > 0 ? caseStudies[currentIdx - 1] : null;
  const nextStudy = currentIdx < caseStudies.length - 1 ? caseStudies[currentIdx + 1] : null;
  const moreStudies = caseStudies.filter((s) => s.slug !== study.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero image ── */}
        <section className="cs-detail__hero">
          <motion.div
            className="cs-detail__hero-img-wrap"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <img src={study.coverImage} alt={study.title} className="cs-detail__hero-img" />
            <div className="cs-detail__hero-overlay" />
          </motion.div>

          {/* Back link + title overlay */}
          <div className="container cs-detail__hero-content">
            <Reveal>
              <Link to="/work" className="cs-detail__back">
                <ArrowLeft size={16} /> All work
              </Link>
              <div className="cs-detail__tags">
                {study.tags.map((tag) => (
                  <span key={tag} className="cs-card__tag">{tag}</span>
                ))}
              </div>
              <h1 className="cs-detail__heading">{study.title}</h1>
              <p className="cs-detail__subtitle">{study.headline}</p>
            </Reveal>
          </div>
        </section>

        {/* ── Scope of work bar ── */}
        <Reveal>
          <section className="cs-detail__scope-bar">
            <div className="container cs-detail__scope-inner">
              <span className="cs-detail__scope-label">Scope of work</span>
              <span className="cs-detail__scope-text">{study.scopeOfWork}</span>
            </div>
          </section>
        </Reveal>

        {/* ── Body content ── */}
        <article className="cs-detail__body">
          <div className="container cs-detail__body-inner">

            {/* Overview */}
            <Reveal>
              <section className="cs-detail__section">
                <h2 className="cs-detail__section-heading">Overview</h2>
                <p className="cs-detail__text">{study.description}</p>
              </section>
            </Reveal>

            {/* Gallery images */}
            {study.galleryImages && study.galleryImages.length > 0 && (
              <Reveal>
                <div className="cs-detail__gallery">
                  {study.galleryImages.map((img, i) => (
                    <div key={i} className="cs-detail__gallery-img-wrap">
                      <img
                        src={img}
                        alt={`${study.title} ${i + 1}`}
                        className="cs-detail__gallery-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* CTA block */}
            <Reveal>
              <div className="cs-detail__cta-block">
                <p className="cs-detail__cta-heading">Ready for results like these?</p>
                <p className="cs-detail__cta-sub">
                  Book a free brand audit — we'll give you an honest view of where you stand.
                </p>
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-detail__cta-btn"
                  onClick={() => {
                    if (typeof window.gtag === 'function') {
                      window.gtag('event', 'cta_click', { event_category: 'Case Study CTA', event_label: 'Book Free Brand Audit', send_to: 'G-9GHX9JVN9S' });
                    }
                  }}
                >
                  Book Your Free Brand Audit
                </a>
              </div>
            </Reveal>

          </div>
        </article>

        {/* ── More Projects ── */}
        {moreStudies.length > 0 && (
          <section className="cs-more">
            <div className="container">
              <Reveal>
                <h2 className="cs-more__heading">More Projects</h2>
              </Reveal>
              <div className="cs-more__grid">
                {moreStudies.map((s, i) => (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Link to={`/work/${s.slug}`} className="cs-card">
                      <div className="cs-card__img-wrap">
                        <img src={s.coverImage} alt={s.title} className="cs-card__img" loading="lazy" decoding="async" />
                        <div className="cs-card__arrow"><ArrowRight size={20} /></div>
                      </div>
                      <div className="cs-card__body">
                        <div className="cs-card__meta">
                          <span className="cs-card__industry">{s.tags[0]}</span>
                        </div>
                        <h3 className="cs-card__title">{s.title}</h3>
                        <p className="cs-card__subtitle">{s.services}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Prev / Next ── */}
        {(prevStudy || nextStudy) && (
          <nav className="cs-detail__nav">
            <div className="container cs-detail__nav-inner">
              {prevStudy ? (
                <Link to={`/work/${prevStudy.slug}`} className="cs-detail__nav-item cs-detail__nav-item--prev">
                  <span className="cs-detail__nav-label">← Previous</span>
                  <span className="cs-detail__nav-title">{prevStudy.title}</span>
                </Link>
              ) : <div />}
              {nextStudy ? (
                <Link to={`/work/${nextStudy.slug}`} className="cs-detail__nav-item cs-detail__nav-item--next">
                  <span className="cs-detail__nav-label">Next →</span>
                  <span className="cs-detail__nav-title">{nextStudy.title}</span>
                </Link>
              ) : <div />}
            </div>
          </nav>
        )}

      </main>
      <Footer />
    </>
  );
};
