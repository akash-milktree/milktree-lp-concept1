import React, { useRef, useEffect, useState } from 'react';
import { useInView, motion, useSpring, useMotionValue } from 'framer-motion';
import { Reveal } from '../components/animations/Reveal';
import { SectionLabel } from '../components/ui/SectionLabel';
import { resultsContent } from '../data/content';

interface CountUpProps {
  target: number;
  suffix: string;
  isInView: boolean;
}

const CountUp: React.FC<CountUpProps> = ({ target, suffix, isInView }) => {
  const [display, setDisplay] = useState("0");
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.round(latest).toString());
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span className="results__stat-number">
      {display}{suffix}
    </span>
  );
};

export const Results: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section results" id="results" ref={ref}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-64)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-20)' }}>
          <Reveal>
            <SectionLabel>{resultsContent.label}</SectionLabel>
          </Reveal>
        </div>

        <div className="results__stats">
          {resultsContent.stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <div className="results__divider" />}
              <div className="results__stat">
                <CountUp target={stat.number} suffix={stat.suffix} isInView={isInView} />
                <span className="results__stat-label">{stat.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="results__tagline">{resultsContent.tagline}</p>
        </Reveal>
      </div>
    </section>
  );
};
