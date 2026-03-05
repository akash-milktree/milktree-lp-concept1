import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, CalendarCheck, Phone, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    icon: <CalendarCheck size={24} />,
    title: 'Book your audit call',
    desc: 'Check your inbox — we\'ll send you a link to schedule a 30-minute call at a time that suits you.',
  },
  {
    icon: <Phone size={24} />,
    title: 'We take your brief on the call',
    desc: 'On the call, we\'ll dig into your brand, goals, and where you\'re stuck — so the audit is tailored to you.',
  },
  {
    icon: <FileText size={24} />,
    title: 'Receive your audit in 48 hours',
    desc: 'Within 48 hours of the call, you\'ll get a personalised brand audit with clear, actionable next steps.',
  },
];

export const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="thankyou">
      <div className="thankyou__container">

        {/* Success icon */}
        <motion.div
          className="thankyou__icon-wrap"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <CheckCircle size={64} color="#63cc79" strokeWidth={1.5} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="thankyou__heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          You're in. Here's what happens next.
        </motion.h1>

        <motion.p
          className="thankyou__subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Thanks for requesting your free brand audit. We just need one more thing — a quick call to understand your brand before we get to work.
        </motion.p>

        {/* What happens next steps */}
        <motion.div
          className="thankyou__steps"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {steps.map((step, i) => (
            <div key={i} className="thankyou__step">
              <div className="thankyou__step-icon">
                <span className="thankyou__step-num">{i + 1}</span>
                {step.icon}
              </div>
              <div className="thankyou__step-content">
                <h3 className="thankyou__step-title">{step.title}</h3>
                <p className="thankyou__step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA back to home */}
        <motion.button
          className="thankyou__btn"
          onClick={() => navigate('/')}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Back to homepage</span>
          <ArrowRight size={18} />
        </motion.button>

      </div>
    </div>
  );
};
