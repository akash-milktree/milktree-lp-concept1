import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { Reveal } from '../components/animations/Reveal';
import { Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { trackContact, trackLead } from '../utils/meta-tracking';

const BUDGET_OPTIONS = [
  'Under $5K',
  '$5K – $15K',
  '$15K – $30K',
  '$30K+',
  'Not sure yet',
];

const SERVICE_OPTIONS = [
  'Brand strategy & positioning',
  'Visual identity (logo, type, colour)',
  'Website design & development',
  'Ongoing brand partner (retainer)',
  'Something else',
];

export const FinalCTA: React.FC = () => {
  const [state, handleSubmit] = useForm('audit-form');
  const [step, setStep] = useState(0); // 0 = info, 1 = details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [goal, setGoal] = useState('');

  const canProceed = name.trim() !== '' && email.trim() !== '' && email.includes('@');
  const canSubmit = service !== '';

  const onStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canProceed) return;
    trackContact({ eventSource: 'Audit Form Step 1', userData: { email } });
    setStep(1);
  };

  const onFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // GA4 event
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'Audit Form',
        event_label: service,
        send_to: 'G-9GHX9JVN9S',
      });
    }

    // Meta Lead event with email for CAPI matching
    trackLead({ eventSource: 'Audit Form Submit', userData: { email } });

    handleSubmit(e);
  };

  if (state.succeeded) {
    return (
      <section className="finalcta-section" id="audit">
        <div className="finalcta__container">
          <motion.div
            className="finalcta__success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={56} color="#63cc79" strokeWidth={1.5} />
            <h2 className="finalcta__heading">You're in.</h2>
            <p className="finalcta__subtext">
              We'll review your brand and get back to you within 24 hours with a personalized audit.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

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
            Get a free brand audit — we'll review your positioning, identity, and digital presence, then send you actionable insights within 24 hours.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
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
                    <label className="finalcta__label" htmlFor="audit-email">Work email *</label>
                    <input
                      id="audit-email"
                      name="email"
                      type="email"
                      className="finalcta__input"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="finalcta__error" />
                  </div>

                  <div className="finalcta__field">
                    <label className="finalcta__label" htmlFor="audit-website">Website</label>
                    <input
                      id="audit-website"
                      name="website"
                      type="url"
                      className="finalcta__input"
                      placeholder="https://yourcompany.com"
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
                          className={`finalcta__chip ${service === opt ? 'finalcta__chip--selected' : ''}`}
                          onClick={() => setService(opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="service" value={service} />
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

            <p className="finalcta__note">Spots are limited — we work with select clients each month.</p>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
