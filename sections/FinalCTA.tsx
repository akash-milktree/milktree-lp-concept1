import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '../components/animations/Reveal';
import { Zap, ArrowRight } from 'lucide-react';
import { trackContact } from '../utils/meta-tracking';

const BUDGET_OPTIONS = [
  'Under £1,000',
  '£1,000 – £2,000',
  '£2,000 – £5,000',
  '£5,000+',
];

const SERVICE_OPTIONS = [
  'Brand strategy & positioning',
  'Visual identity (logo, type, colour)',
  'Website design & development',
  'Ongoing brand partner (retainer)',
  'Something else',
];

export const FinalCTA: React.FC = () => {
  const [state, handleSubmit] = useForm('auditForm');
  const [step, setStep] = useState(0); // 0 = info, 1 = details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [goal, setGoal] = useState('');
  const navigate = useNavigate();

  const canProceed = name.trim() !== '' && email.trim() !== '' && email.includes('@');
  const canSubmit = services.length > 0;

  // Redirect to thank you page on successful submission
  useEffect(() => {
    if (state.succeeded) {
      navigate('/thank-you');
    }
  }, [state.succeeded, navigate]);

  const onStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed) return;

    // GA4 — form start / micro-conversion
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'form_start', {
        event_category: 'Audit Form',
        event_label: 'Step 1 Complete',
        send_to: 'G-9GHX9JVN9S',
      });
    }

    // Meta Contact (Pixel + CAPI) with email for match rate
    trackContact({ eventSource: 'Audit Form Step 1', userData: { email } });
    setStep(1);
  };

  const onFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // GA4 — primary conversion event
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'Audit Form',
        event_label: services.join(', '),
        value: 1,
        currency: 'GBP',
        send_to: 'G-9GHX9JVN9S',
      });
    }

    handleSubmit(e);
  };

  return (
    <section className="finalcta-section" id="audit">
      <div className="finalcta__container">

        <Reveal>
          <h2 className="finalcta__heading">
            See what your brand<br />is really saying.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="finalcta__subtext">
            Request your free brand audit. We'll book a call to understand your brand, then deliver a personalised audit within 48 hours.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="finalcta__time-hint">Takes 30 seconds. No commitment.</p>
          <div className="finalcta__form-wrap">

            {/* Progress indicator */}
            <div className="finalcta__steps">
              <div className={`finalcta__step ${step >= 0 ? 'finalcta__step--active' : ''}`}>
                <span className="finalcta__step-num">1</span>
                <span className="finalcta__step-label">Your info</span>
              </div>
              <div className="finalcta__step-line" />
              <div className={`finalcta__step ${step >= 1 ? 'finalcta__step--active' : ''}`}>
                <span className="finalcta__step-num">2</span>
                <span className="finalcta__step-label">Your brand</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.form
                  key="step-0"
                  className="finalcta__form"
                  onSubmit={onStep1}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="finalcta__field">
                    <label className="finalcta__label" htmlFor="audit-name">Name *</label>
                    <input
                      id="audit-name"
                      name="name"
                      type="text"
                      className="finalcta__input"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </div>

                  <div className="finalcta__field">
                    <label className="finalcta__label" htmlFor="audit-email">Email *</label>
                    <input
                      id="audit-email"
                      name="email"
                      type="email"
                      className="finalcta__input"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="finalcta__error" />
                    <span className="finalcta__hint">We'll only use this to send your audit results.</span>
                  </div>

                  <div className="finalcta__field">
                    <label className="finalcta__label" htmlFor="audit-website">Website</label>
                    <input
                      id="audit-website"
                      name="website"
                      type="text"
                      className="finalcta__input"
                      placeholder="yourcompany.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      autoComplete="url"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="finalcta__btn"
                    disabled={!canProceed}
                    whileHover={canProceed ? { scale: 1.02 } : {}}
                    whileTap={canProceed ? { scale: 0.98 } : {}}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Continue</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </motion.form>
              ) : (
                <motion.form
                  key="step-1"
                  className="finalcta__form"
                  onSubmit={onFinalSubmit}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hidden fields to include step 1 data in submission */}
                  <input type="hidden" name="name" value={name} />
                  <input type="hidden" name="email" value={email} />
                  <input type="hidden" name="website" value={website} />

                  <div className="finalcta__field">
                    <label className="finalcta__label">What do you need help with? *</label>
                    <div className="finalcta__chips">
                      {SERVICE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`finalcta__chip ${services.includes(opt) ? 'finalcta__chip--selected' : ''}`}
                          onClick={() => setServices(prev =>
                            prev.includes(opt) ? prev.filter(s => s !== opt) : [...prev, opt]
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="service" value={services.join(', ')} />
                  </div>

                  <div className="finalcta__field">
                    <label className="finalcta__label">Approximate budget</label>
                    <div className="finalcta__chips">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className={`finalcta__chip ${budget === opt ? 'finalcta__chip--selected' : ''}`}
                          onClick={() => setBudget(budget === opt ? '' : opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="budget" value={budget} />
                  </div>

                  <div className="finalcta__field">
                    <label className="finalcta__label" htmlFor="audit-goal">What's the #1 thing you want to fix?</label>
                    <textarea
                      id="audit-goal"
                      name="goal"
                      className="finalcta__input finalcta__textarea"
                      placeholder="e.g. Our website doesn't convert, our brand looks outdated..."
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="finalcta__form-actions">
                    <button
                      type="button"
                      className="finalcta__back-btn"
                      onClick={() => setStep(0)}
                    >
                      Back
                    </button>

                    <motion.button
                      type="submit"
                      className="finalcta__btn finalcta__btn--submit"
                      disabled={!canSubmit || state.submitting}
                      whileHover={canSubmit ? { scale: 1.02 } : {}}
                      whileTap={canSubmit ? { scale: 0.98 } : {}}
                      transition={{ duration: 0.2 }}
                    >
                      <Zap size={20} fill="rgb(0,0,0)" stroke="none" />
                      <span>{state.submitting ? 'Sending...' : 'Get My Free Audit'}</span>
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <p className="finalcta__note">Spots are limited. We take on 4 new brand builds per month.</p>

            {/* Social proof */}
            <div className="finalcta__proof">
              <p className="finalcta__proof-quote">"The audit alone gave us more clarity than 6 months of trying to figure it out ourselves."</p>
              <p className="finalcta__proof-attr">Chris, Director, Police Mortgages</p>
              <p className="finalcta__proof-stat">Join 200+ brands who started with a free audit</p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
