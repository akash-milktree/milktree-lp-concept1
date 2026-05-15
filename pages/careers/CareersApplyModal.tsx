import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { roles, roleTitleById } from './roles';
import { trackContact, trackCustom } from '../../utils/meta-tracking';

interface CareersApplyModalProps {
  open: boolean;
  onClose: () => void;
  preselectedRole?: string;
}

type StepNumber = 1 | 2 | 3 | 4;

const STEPS: Array<{ label: string }> = [
  { label: 'About' },
  { label: 'Role' },
  { label: 'Work' },
  { label: 'Why us' },
];

const experienceOptions = ['0-2', '3-5', '5-10', '10+'];
const availabilityOptions = ['Full-time', 'Part-time', 'Freelance', 'Contract'];
const referencesOptions = ['Yes', 'No'];
const heardFromOptions = ['LinkedIn', 'Instagram', 'Referral', 'Google', 'Other'];
const aiUsageOptions = ['Daily user', 'Weekly', 'Experimenting', 'Curious / learning'];

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xrejwdnk';

const stepVariants = {
  initial: { opacity: 0, x: 16 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

export const CareersApplyModal: React.FC<CareersApplyModalProps> = ({
  open,
  onClose,
  preselectedRole = '',
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [step, setStep] = useState<StepNumber>(1);
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');
  const [role, setRole] = useState(preselectedRole);
  const [experienceYears, setExperienceYears] = useState('');
  const [availability, setAvailability] = useState('');
  const [rate, setRate] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [experience, setExperience] = useState('');
  const [aiUsage, setAiUsage] = useState('');
  const [references, setReferences] = useState('');
  const [whyMilktree, setWhyMilktree] = useState('');
  const [heardFrom, setHeardFrom] = useState('');

  // Reset when modal opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setRole(preselectedRole);
      setSucceeded(false);
      setSubmitError('');
      setSubmitting(false);
    }
  }, [open, preselectedRole]);

  // Body scroll lock + focus management
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 80);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Funnel step tracking
  useEffect(() => {
    if (!open) return;
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'careers_step_view', {
        event_category: 'Careers',
        event_label: `Step ${step}`,
        send_to: 'G-9GHX9JVN9S',
      });
    }
    trackCustom('CareersStepView', { customData: { step, role: role || 'unspecified' } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step]);

  const canAdvanceStep1 = name.trim() !== '' && email.trim() !== '' && email.includes('@');
  const canAdvanceStep2 = role !== '';
  const canAdvance =
    (step === 1 && canAdvanceStep1) ||
    (step === 2 && canAdvanceStep2) ||
    step === 3;
  const canSubmit = canAdvanceStep1 && canAdvanceStep2;

  const goNext = () => {
    if (!canAdvance) return;
    setStep((s) => (Math.min(s + 1, 4) as StepNumber));
  };
  const goBack = () => setStep((s) => (Math.max(s - 1, 1) as StepNumber));

  const onFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== 'Enter') return;
    if ((e.target as HTMLElement).tagName === 'TEXTAREA') return;
    if (step < 4) {
      e.preventDefault();
      goNext();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 4 || !canSubmit || submitting) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: 'Careers Application',
          name,
          email,
          phone: phone || undefined,
          location: location || undefined,
          timezone: timezone || undefined,
          role,
          experience_years: experienceYears || undefined,
          availability: availability || undefined,
          rate: rate || undefined,
          portfolio: portfolio || undefined,
          linkedin: linkedin || undefined,
          experience: experience || undefined,
          ai_usage: aiUsage || undefined,
          references: references || undefined,
          why_milktree: whyMilktree || undefined,
          heard_from: heardFrom || undefined,
        }),
      });

      if (res.ok) {
        setSucceeded(true);

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            event_category: 'Careers',
            event_label: role || 'unspecified',
            value: 1,
            currency: 'GBP',
            send_to: 'G-9GHX9JVN9S',
          });
        }

        const nameParts = name.trim().split(/\s+/);
        trackContact({
          eventSource: 'Careers Application',
          userData: {
            email,
            phone: phone || undefined,
            firstName: nameParts[0] || undefined,
            lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined,
          },
        });
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = (data?.errors as Array<{ message?: string }>)?.[0]?.message;
        setSubmitError(msg || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Could not send application. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="careers-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="careers-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="careers-modal__sheet"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {succeeded ? (
              <div className="careers-modal__success">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <CheckCircle size={52} color="var(--color-accent)" strokeWidth={1.5} />
                </motion.div>
                <motion.h2
                  className="careers-modal__success-heading"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  Application received.
                </motion.h2>
                <motion.p
                  className="careers-modal__success-text"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                >
                  Thanks for applying{role ? ` for ${roleTitleById(role)}` : ''}. We read every application personally and will be in touch within 7 days.
                </motion.p>
                <motion.button
                  type="button"
                  className="careers-modal__success-close"
                  onClick={onClose}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  Close
                </motion.button>
              </div>
            ) : (
              <>
                <header className="careers-modal__header">
                  <div className="careers-modal__heading-wrap">
                    <p className="careers-modal__eyebrow">Apply to Milktree</p>
                    <h2 id="careers-modal-title" className="careers-modal__heading">
                      {role ? roleTitleById(role) : 'Tell us about you'}
                    </h2>
                  </div>
                  <button
                    type="button"
                    className="careers-modal__close"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </header>

                {/* Desktop step indicator */}
                <div className="careers-modal__steps" aria-label="Application progress">
                  {STEPS.map((s, i) => {
                    const n = i + 1;
                    const active = step >= n;
                    return (
                      <React.Fragment key={s.label}>
                        <div
                          className={`careers-modal__step ${active ? 'careers-modal__step--active' : ''}`}
                          aria-current={step === n ? 'step' : undefined}
                        >
                          <span className="careers-modal__step-num">{n}</span>
                          <span className="careers-modal__step-label">{s.label}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <span className="careers-modal__step-line" aria-hidden="true" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Mobile compact progress */}
                <div className="careers-modal__steps-mobile" aria-hidden="true">
                  <div className="careers-modal__progress-bar">
                    {STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={`careers-modal__progress-seg ${step >= i + 1 ? 'careers-modal__progress-seg--filled' : ''}`}
                      />
                    ))}
                  </div>
                  <p className="careers-modal__progress-label">
                    Step {step} of 4 · {STEPS[step - 1].label}
                  </p>
                </div>

                <form
                  className="careers-modal__form"
                  onSubmit={onSubmit}
                  onKeyDown={onFormKeyDown}
                  noValidate
                >
                  <div className="careers-modal__body">
                    <AnimatePresence mode="wait" initial={false}>
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          className="careers-modal__step-pane"
                          variants={stepVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                          <p className="careers-modal__group-title">About you</p>

                          <div className="careers-modal__row">
                            <div className="careers-modal__field">
                              <label className="careers-modal__label" htmlFor="cr-name">Full name *</label>
                              <input
                                ref={firstInputRef}
                                id="cr-name"
                                type="text"
                                className="careers-modal__input"
                                placeholder="Your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                              />
                            </div>
                            <div className="careers-modal__field">
                              <label className="careers-modal__label" htmlFor="cr-email">Email *</label>
                              <input
                                id="cr-email"
                                type="email"
                                className="careers-modal__input"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                              />
                            </div>
                          </div>

                          <div className="careers-modal__row">
                            <div className="careers-modal__field">
                              <label className="careers-modal__label" htmlFor="cr-phone">Phone</label>
                              <input
                                id="cr-phone"
                                type="tel"
                                className="careers-modal__input"
                                placeholder="Optional"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                autoComplete="tel"
                              />
                            </div>
                            <div className="careers-modal__field">
                              <label className="careers-modal__label" htmlFor="cr-location">Location</label>
                              <input
                                id="cr-location"
                                type="text"
                                className="careers-modal__input"
                                placeholder="City, Country"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="careers-modal__field">
                            <label className="careers-modal__label" htmlFor="cr-timezone">Timezone / working hours</label>
                            <input
                              id="cr-timezone"
                              type="text"
                              className="careers-modal__input"
                              placeholder="e.g. GMT, or 9-6 UK overlap"
                              value={timezone}
                              onChange={(e) => setTimezone(e.target.value)}
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          className="careers-modal__step-pane"
                          variants={stepVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                          <p className="careers-modal__group-title">Role &amp; fit</p>

                          <div className="careers-modal__field">
                            <label className="careers-modal__label">Role you're applying for *</label>
                            <div className="careers-modal__chips">
                              {roles.map((r) => (
                                <button
                                  key={r.id}
                                  type="button"
                                  className={`careers-modal__chip ${role === r.id ? 'careers-modal__chip--selected' : ''}`}
                                  onClick={() => setRole(r.id)}
                                  aria-pressed={role === r.id}
                                >
                                  {r.title}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="careers-modal__field">
                            <label className="careers-modal__label">Years of experience</label>
                            <div className="careers-modal__chips">
                              {experienceOptions.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  className={`careers-modal__chip ${experienceYears === opt ? 'careers-modal__chip--selected' : ''}`}
                                  onClick={() => setExperienceYears(opt)}
                                  aria-pressed={experienceYears === opt}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="careers-modal__field">
                            <label className="careers-modal__label">Availability</label>
                            <div className="careers-modal__chips">
                              {availabilityOptions.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  className={`careers-modal__chip ${availability === opt ? 'careers-modal__chip--selected' : ''}`}
                                  onClick={() => setAvailability(opt)}
                                  aria-pressed={availability === opt}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="careers-modal__field">
                            <label className="careers-modal__label" htmlFor="cr-rate">Day rate / salary expectation</label>
                            <input
                              id="cr-rate"
                              type="text"
                              className="careers-modal__input"
                              placeholder="e.g. £400/day or £55k full-time"
                              value={rate}
                              onChange={(e) => setRate(e.target.value)}
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          className="careers-modal__step-pane"
                          variants={stepVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                          <p className="careers-modal__group-title">Your work</p>

                          <div className="careers-modal__row">
                            <div className="careers-modal__field">
                              <label className="careers-modal__label" htmlFor="cr-portfolio">Portfolio URL</label>
                              <input
                                id="cr-portfolio"
                                type="url"
                                className="careers-modal__input"
                                placeholder="https://"
                                value={portfolio}
                                onChange={(e) => setPortfolio(e.target.value)}
                                autoComplete="url"
                              />
                            </div>
                            <div className="careers-modal__field">
                              <label className="careers-modal__label" htmlFor="cr-linkedin">LinkedIn URL</label>
                              <input
                                id="cr-linkedin"
                                type="url"
                                className="careers-modal__input"
                                placeholder="https://linkedin.com/in/..."
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="careers-modal__field">
                            <label className="careers-modal__label" htmlFor="cr-experience">Tell us about your experience</label>
                            <textarea
                              id="cr-experience"
                              className="careers-modal__input careers-modal__textarea"
                              placeholder="A few sentences on the kind of work you do best and your standout projects."
                              value={experience}
                              onChange={(e) => setExperience(e.target.value)}
                              rows={5}
                            />
                          </div>
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div
                          key="step4"
                          className="careers-modal__step-pane"
                          variants={stepVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                        >
                          <p className="careers-modal__group-title">Why Milktree</p>

                          <div className="careers-modal__field">
                            <label className="careers-modal__label">How comfortable are you using AI in your work?</label>
                            <div className="careers-modal__chips">
                              {aiUsageOptions.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  className={`careers-modal__chip ${aiUsage === opt ? 'careers-modal__chip--selected' : ''}`}
                                  onClick={() => setAiUsage(opt)}
                                  aria-pressed={aiUsage === opt}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="careers-modal__field">
                            <label className="careers-modal__label">Can you provide references?</label>
                            <div className="careers-modal__chips">
                              {referencesOptions.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  className={`careers-modal__chip ${references === opt ? 'careers-modal__chip--selected' : ''}`}
                                  onClick={() => setReferences(opt)}
                                  aria-pressed={references === opt}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="careers-modal__field">
                            <label className="careers-modal__label" htmlFor="cr-why">Why Milktree?</label>
                            <textarea
                              id="cr-why"
                              className="careers-modal__input careers-modal__textarea"
                              placeholder="What about the work or the studio resonates with you."
                              value={whyMilktree}
                              onChange={(e) => setWhyMilktree(e.target.value)}
                              rows={3}
                            />
                          </div>

                          <div className="careers-modal__field">
                            <label className="careers-modal__label">How did you hear about us?</label>
                            <div className="careers-modal__chips">
                              {heardFromOptions.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  className={`careers-modal__chip ${heardFrom === opt ? 'careers-modal__chip--selected' : ''}`}
                                  onClick={() => setHeardFrom(opt)}
                                  aria-pressed={heardFrom === opt}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <footer className="careers-modal__footer">
                    <div className="careers-modal__footer-left">
                      <p className="careers-modal__footer-hint">Step {step} of 4 · Takes ~3 minutes</p>
                      {submitError && (
                        <p className="careers-modal__submit-error">
                          <AlertCircle size={13} />
                          {submitError}
                        </p>
                      )}
                    </div>
                    <div className="careers-modal__actions">
                      {step > 1 && (
                        <button
                          type="button"
                          className="careers-modal__back"
                          onClick={goBack}
                        >
                          <ArrowLeft size={16} />
                          <span>Back</span>
                        </button>
                      )}
                      {step < 4 ? (
                        <motion.button
                          type="button"
                          className="careers-modal__submit"
                          onClick={goNext}
                          disabled={!canAdvance}
                          whileHover={canAdvance ? { scale: 1.02 } : {}}
                          whileTap={canAdvance ? { scale: 0.98 } : {}}
                          transition={{ duration: 0.2 }}
                        >
                          <span>Next</span>
                          <ArrowRight size={16} />
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          className="careers-modal__submit"
                          disabled={!canSubmit || submitting}
                          whileHover={canSubmit && !submitting ? { scale: 1.02 } : {}}
                          whileTap={canSubmit && !submitting ? { scale: 0.98 } : {}}
                          transition={{ duration: 0.2 }}
                        >
                          <Send size={18} />
                          <span>{submitting ? 'Sending…' : 'Send application'}</span>
                        </motion.button>
                      )}
                    </div>
                  </footer>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CareersApplyModal;
