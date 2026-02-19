import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'How long does a brand build take?',
    a: 'Most brand builds take 4 to 6 weeks from kickoff to final delivery. We work in focused sprints with clear milestones so you always know where we are and what is coming next.',
  },
  {
    q: 'Do you work with businesses at any stage?',
    a: 'We work best with established businesses that have market traction but feel their brand does not yet reflect how good they actually are. We also work with founders launching for the first time who want to get it right from day one.',
  },
  {
    q: 'What do I actually get at the end?',
    a: 'You receive a complete brand system: positioning strategy, messaging framework, visual identity (logo, colour, typography), and a brand guidelines document your whole team can use. Everything is delivered in a format your designers, marketing team, and partners can work with immediately.',
  },
  {
    q: 'How involved do I need to be?',
    a: 'We make it as easy as possible for you. We run a structured discovery session at the start, then present work for your feedback at defined review points. We do not need daily input, but we do need clear decisions when we ask for them.',
  },
  {
    q: 'Can you help with just one part, like the logo or the messaging?',
    a: 'In most cases, no. Brand elements work because they are connected. A new logo without a positioning strategy looks different but does not perform differently. We build complete systems because that is what actually moves the needle.',
  },
  {
    q: 'What if I already have a brand and just need it refreshed?',
    a: 'We start with a brand audit regardless. Sometimes a refresh is all that is needed. Other times, the audit surfaces a positioning or messaging problem that a coat of paint will not fix. We will tell you honestly which one you have.',
  },
  {
    q: 'What happens after the brand is delivered?',
    a: 'We offer a 60-day post-launch support period where we answer questions and make small refinements as you roll out. If you need ongoing strategic support, our monthly retainer keeps Milktree in your corner as a brand partner.',
  },
];

export const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">

        <Reveal>
          <h2 className="faq__heading">Questions founders ask us</h2>
        </Reveal>

        <div className="faq__list">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              className="faq__row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98], delay: i * 0.04 }}
            >
              {/* Yellow number circle */}
              <div className="faq__number">{i + 1}</div>

              {/* Pill */}
              <div className="faq__pill-outer">
                <button
                  className="faq__pill-inner"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="faq__question">{item.q}</span>

                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        className="faq__answer-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.44, 0, 0.56, 1] }}
                      >
                        <p className="faq__answer">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Plus/minus toggle circle */}
              <motion.div
                className="faq__toggle"
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.44, 0, 0.56, 1] }}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {open === i ? <Minus size={24} strokeWidth={2} /> : <Plus size={24} strokeWidth={2} />}
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
