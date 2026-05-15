import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Sparkles, MessageSquare, Eye, Award, Zap, Cpu } from 'lucide-react';
import { Navbar } from '../components/ui/Navbar';
import { Footer } from '../sections/Footer';
import { Reveal } from '../components/animations/Reveal';
import { roles } from './careers/roles';
import { trackCustom } from '../utils/meta-tracking';

const CareersApplyModal = lazy(() =>
  import('./careers/CareersApplyModal').then((m) => ({ default: m.CareersApplyModal }))
);

const values = [
  {
    icon: <Eye size={20} />,
    title: 'Taste',
    desc: 'You can tell why something works, not just that it does. Your portfolio shows the restraint of someone who chooses what to leave out.',
  },
  {
    icon: <Award size={20} />,
    title: 'Ownership',
    desc: 'You take a brief from blank canvas to shipped without needing to be handheld through every step.',
  },
  {
    icon: <Zap size={20} />,
    title: 'Pace',
    desc: 'Boutique studio, agency-scale output. We move fast on tight briefs and ship without committee.',
  },
  {
    icon: <Cpu size={20} />,
    title: 'AI-native curiosity',
    desc: 'You already use AI across your craft and you are excited about where it goes next. We are moving toward AI-first delivery and want collaborators along for the ride.',
  },
  {
    icon: <MessageSquare size={20} />,
    title: 'Async communication',
    desc: 'You write clearly, leave a trail, and do not need real-time meetings to make progress.',
  },
  {
    icon: <Sparkles size={20} />,
    title: 'Evidence',
    desc: 'Portfolio links, referenceable clients, measurable outcomes. Show, then tell.',
  },
];

export const CareersPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [preselectedRole, setPreselectedRole] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModal = (roleId: string, source: string) => {
    setPreselectedRole(roleId);
    setModalOpen(true);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'careers_modal_open', {
        event_category: 'Careers',
        event_label: roleId || 'no-role',
        send_to: 'G-9GHX9JVN9S',
      });
    }
    trackCustom('CareersModalOpen', {
      customData: { role: roleId || 'unspecified', source },
    });
  };

  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Helmet>
        <title>Careers | Milktree Agency</title>
        <meta
          name="description"
          content="Designers, developers and growth specialists. Join the team building brand identities for 200+ businesses."
        />
        <link rel="canonical" href="https://milktreeagency.com/careers" />
        <meta property="og:title" content="Careers | Milktree Agency" />
        <meta
          property="og:description"
          content="Designers, developers and growth specialists. Join the team behind 200+ brands."
        />
        <meta property="og:url" content="https://milktreeagency.com/careers" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://milktreeagency.com/logos/favicon.svg" />
      </Helmet>

      <Navbar />

      <main className="careers-page">
        {/* ── Hero ── */}
        <section className="careers-page__hero">
          <div className="careers-page__container">
            <Reveal>
              <p className="careers-page__label">Careers</p>
              <h1 className="careers-page__heading">
                Build the brands<br />that move things.
              </h1>
              <p className="careers-page__subtext">
                Milktree is a forward-thinking boutique agency. We ship identity, web and growth work for 200+ brands in a fast-paced environment. We are moving toward becoming an AI-first studio and we hire on craft, not location.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="careers-page__hero-cta">
                <button
                  type="button"
                  className="careers-page__cta-btn"
                  onClick={() => openModal('', 'Hero CTA')}
                >
                  <span>See all open roles</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="careers-page__proof-strip" role="list">
                <div className="careers-page__proof-stat" role="listitem">
                  <strong>25,000+</strong>
                  <span>followers across social</span>
                </div>
                <div className="careers-page__proof-stat" role="listitem">
                  <strong>200+</strong>
                  <span>brands built</span>
                </div>
                <div className="careers-page__proof-stat" role="listitem">
                  <strong>10+</strong>
                  <span>industries</span>
                </div>
                <div className="careers-page__proof-stat" role="listitem">
                  <strong>AI-first</strong>
                  <span>direction</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Roles grid ── */}
        <section className="careers-page__roles-section" id="roles">
          <div className="careers-page__container">
            <Reveal>
              <p className="careers-page__section-label">Open roles</p>
              <h2 className="careers-page__section-heading">Who we're looking for</h2>
              <p className="careers-page__roles-note">Every role at Milktree requires an openness to using AI. We are moving toward AI-first delivery and the whole team is on that journey together.</p>
            </Reveal>

            <div className="careers-page__roles-grid">
              {roles.map((role, i) => (
                <Reveal key={role.id} delay={i * 0.06}>
                  <article className="careers-role-card">
                    <div className="careers-role-card__body">
                      <h3 className="careers-role-card__title">{role.title}</h3>
                      <p className="careers-role-card__blurb">{role.blurb}</p>
                      <ul className="careers-role-card__tags">
                        {role.tags.map((t) => (
                          <li key={t} className="careers-role-card__tag">{t}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      className="careers-role-card__btn"
                      onClick={() => openModal(role.id, `Role Card: ${role.title}`)}
                      aria-label={`Apply for ${role.title}`}
                    >
                      <span>Apply</span>
                      <ArrowRight size={16} />
                    </button>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── What we look for ── */}
        <section className="careers-page__values-section">
          <div className="careers-page__container">
            <Reveal>
              <p className="careers-page__section-label">What we look for</p>
              <h2 className="careers-page__section-heading">
                Six things, regardless of role.
              </h2>
            </Reveal>

            <div className="careers-page__values-grid">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="careers-value">
                    <div className="careers-value__icon">{v.icon}</div>
                    <h3 className="careers-value__title">{v.title}</h3>
                    <p className="careers-value__desc">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="careers-page__final-cta">
          <div className="careers-page__container">
            <Reveal>
              <h2 className="careers-page__final-heading">
                Think you're a fit?
              </h2>
              <p className="careers-page__final-subtext">
                Tell us about yourself. We read every application personally.
              </p>
              <button
                type="button"
                className="careers-page__cta-btn careers-page__cta-btn--lg"
                onClick={() => openModal('', 'Bottom CTA')}
              >
                <span>Apply now</span>
                <ArrowRight size={20} />
              </button>
              <p className="careers-page__final-note">
                Usually a 5-minute form. We reply within 7 days.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />

      <Suspense fallback={null}>
        {modalOpen && (
          <CareersApplyModal
            open={modalOpen}
            onClose={closeModal}
            preselectedRole={preselectedRole}
          />
        )}
      </Suspense>
    </>
  );
};

export default CareersPage;
