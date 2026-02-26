import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MilktreeLogo } from './MilktreeLogo';
import { Button } from './Button';

const sectionLinks = [
  { label: "Services", target: "services" },
  { label: "Pricing", target: "pricing" },
  { label: "Reviews", target: "testimonials" },
  { label: "FAQs", target: "faq" },
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
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (target: string) => {
    setIsMobileMenuOpen(false);
    if (isHome) {
      scrollToSection(target);
    } else {
      navigate('/');
      // After navigation, scroll to the section
      setTimeout(() => scrollToSection(target), 300);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
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
            href="/"
            className="navbar__logo"
            onClick={handleLogoClick}
          >
            <MilktreeLogo variant="full" color="light" />
          </a>

          <div className="navbar__divider" />

          <div className="navbar__links">
            {sectionLinks.map((link) => (
              <a
                key={link.target}
                href={`/#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.target);
                }}
              >
                {link.label}
              </a>
            ))}
            <Link to="/work" className={location.pathname.startsWith('/work') ? 'navbar__link--active' : ''}>
              Case Studies
            </Link>
          </div>

          <div className="navbar__divider" />

          <div className="navbar__desktop-cta">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (isHome) {
                  scrollToSection('audit');
                } else {
                  window.open('https://cal.com/milktreeagency/brand-audit', '_blank', 'noopener,noreferrer');
                }
              }}
            >
              Free Audit
            </Button>
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
              {sectionLinks.map((link) => (
                <a
                  key={link.target}
                  href={`/#${link.target}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.target);
                  }}
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/work"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Case Studies
              </Link>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <Button
                size="lg"
                variant="primary"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (isHome) {
                    scrollToSection('audit');
                  } else {
                    window.open('https://cal.com/milktreeagency/brand-audit', '_blank', 'noopener,noreferrer');
                  }
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
