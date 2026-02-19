import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { MilktreeLogo } from './MilktreeLogo';
import { Button } from './Button';

const navLinks = [
  { label: "Services", target: "services" },
  { label: "Pricing", target: "pricing" },
  { label: "FAQs", target: "faq" },
  { label: "Case Studies", target: "process" },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setScrolled(latest > 50);
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleNavClick = (target: string) => {
    setIsMobileMenuOpen(false);
    scrollToSection(target);
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-120%" },
        }}
        animate={hidden && !isMobileMenuOpen ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="navbar"
      >
        <div className={`navbar__pill ${scrolled ? 'navbar__pill--scrolled' : ''}`}>
          <a
            href="#"
            className="navbar__logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <MilktreeLogo variant="full" color="light" />
          </a>

          <div className="navbar__divider" />

          <div className="navbar__links">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.target);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar__divider" />

          <div className="navbar__desktop-cta">
            <button
              className="navbar__cta-btn"
              onClick={() => scrollToSection('audit')}
            >
              Free Audit
            </button>
          </div>

          <button
            className="navbar__mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="navbar__mobile-overlay"
          >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map((link) => (
                <a
                  key={link.target}
                  href={`#${link.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.target);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div style={{ marginTop: 'auto' }}>
              <Button
                size="lg"
                variant="primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToSection('audit');
                }}
              >
                Book Your Free Brand Audit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
