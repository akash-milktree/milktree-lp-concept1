import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from 'react-router-dom';
import { Reveal } from '../components/animations/Reveal';
import { Zap } from 'lucide-react';
import { trackContact } from '../utils/meta-tracking';

export const FinalCTA: React.FC = () => {
  const [state, handleSubmit] = useForm('auditForm');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const navigate = useNavigate();

  const canSubmit = name.trim() !== '' && email.trim() !== '' && email.includes('@');

  // Redirect to thank you page on successful submission
  useEffect(() => {
    if (state.succeeded) {
      navigate('/thank-you');
    }
  }, [state.succeeded, navigate]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    // GA4 — form submission
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'Audit Form',
        event_label: 'Single Step Submit',
        value: 1,
        currency: 'GBP',
        send_to: 'G-9GHX9JVN9S',
      });
    }

    // Meta Contact (Pixel + CAPI) with email for match rate
    trackContact({ eventSource: 'Audit Form Submit', userData: { email } });

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
          <p className="finalcta__time-hint">Takes 15 seconds. No commitment.</p>
          <div className="finalcta__form-wrap">

            <motion.form
              className="finalcta__form"
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Formspree requires 'service' — default for the simplified single-step form */}
              <input type="hidden" name="service" value="Brand Audit Request" />

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
                <label className="finalcta__label" htmlFor="audit-website">Website (optional)</label>
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
                className="finalcta__btn finalcta__btn--submit"
                disabled={!canSubmit || state.submitting}
                whileHover={canSubmit ? { scale: 1.02 } : {}}
                whileTap={canSubmit ? { scale: 0.98 } : {}}
                transition={{ duration: 0.2 }}
              >
                <Zap size={20} fill="rgb(0,0,0)" stroke="none" />
                <span>{state.submitting ? 'Sending...' : 'Get My Free Audit'}</span>
              </motion.button>
            </motion.form>

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
