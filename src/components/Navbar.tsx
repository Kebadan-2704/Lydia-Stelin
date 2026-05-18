import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const links = [
  { labelKey: 'nav.home', href: '#home' },
  { labelKey: 'nav.story', href: '#couple' },
  { labelKey: 'nav.gallery', href: '#gallery' },
  { labelKey: 'nav.events', href: '#events' },
  { labelKey: 'nav.venue', href: '#venue' },
  { labelKey: 'nav.rsvp', href: '#rsvp' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    const onResize = () => setIsMobile(window.innerWidth < 960);
    
    onScroll();
    onResize();
    
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <motion.nav
        className={`wedding-nav ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          position: 'fixed',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: scrolled ? '0 30px' : '0 40px',
          maxWidth: scrolled ? '1200px' : '100%',
          margin: '0 auto',
          left: scrolled ? '16px' : '0px',
          right: scrolled ? '16px' : '0px',
          height: scrolled ? '64px' : '75px',
          borderRadius: scrolled ? '32px' : '0px',
          top: scrolled ? '15px' : '0px',
          boxShadow: scrolled ? '0 10px 30px rgba(107, 45, 62, 0.2)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212, 165, 116, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
          background: scrolled ? 'rgba(74, 21, 37, 0.94)' : 'rgba(74, 21, 37, 0.75)',
          backdropFilter: 'blur(20px)',
          zIndex: 100000,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Monogram / Brand mark */}
        <motion.div
          className="nav-brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: '1.8rem',
            color: 'var(--champagne)',
            fontWeight: 400,
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          L & S
        </motion.div>

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {links.map((link, i) => (
              <motion.a
                key={link.labelKey}
                href={link.href}
                className="nav-link"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.68rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'var(--ivory-warm)',
                  textDecoration: 'none',
                  transition: 'color 0.25s',
                  fontWeight: 500
                }}
              >
                {t(link.labelKey)}
              </motion.a>
            ))}
          </div>
        )}

        {/* Desktop Luxury Bilingual Toggle Switch */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '2px',
              position: 'relative',
              cursor: 'pointer',
              width: '88px',
              height: '28px',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            {/* Animated active pill */}
            <motion.div
              layout
              style={{
                position: 'absolute',
                top: '2px',
                bottom: '2px',
                left: language === 'en' ? '2px' : '44px',
                right: language === 'en' ? '44px' : '2px',
                background: 'var(--champagne)',
                borderRadius: '16px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                zIndex: 1
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />

            {/* Buttons */}
            <button
              onClick={() => setLanguage('en')}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: language === 'en' ? 'var(--wine)' : 'var(--ivory-warm)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.55rem',
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                zIndex: 2,
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.25s'
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: language === 'ta' ? 'var(--wine)' : 'var(--ivory-warm)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.55rem',
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                zIndex: 2,
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.25s'
              }}
            >
              தமிழ்
            </button>
          </motion.div>
        )}

        {/* Mobile Hamburger Button */}
        {isMobile && (
          <motion.button
            onClick={toggleMenu}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--champagne)',
              fontSize: '1.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              zIndex: 100001
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </motion.button>
        )}
      </motion.nav>

      {/* Glassmorphic Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: scrolled ? '90px' : '85px',
              left: '16px',
              right: '16px',
              background: 'rgba(74, 21, 37, 0.96)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid var(--champagne)',
              borderRadius: '24px',
              padding: '30px 24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              alignItems: 'center'
            }}
          >
            {/* Mobile Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%', alignItems: 'center' }}>
              {links.map((link, i) => (
                <motion.a
                  key={link.labelKey}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'var(--ivory)',
                    textDecoration: 'none',
                    padding: '10px 0',
                    width: '100%',
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(212, 165, 116, 0.15)'
                  }}
                >
                  {t(link.labelKey)}
                </motion.a>
              ))}
            </div>

            {/* Mobile Luxury Bilingual Toggle Switch */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '2px',
                position: 'relative',
                cursor: 'pointer',
                width: '110px',
                height: '34px',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                marginTop: '10px'
              }}
            >
              {/* Animated active pill */}
              <motion.div
                layout
                style={{
                  position: 'absolute',
                  top: '2px',
                  bottom: '2px',
                  left: language === 'en' ? '2px' : '54px',
                  right: language === 'en' ? '54px' : '2px',
                  background: 'var(--champagne)',
                  borderRadius: '16px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  zIndex: 1
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />

              {/* Buttons */}
              <button
                onClick={() => setLanguage('en')}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  color: language === 'en' ? 'var(--wine)' : 'var(--ivory-warm)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  zIndex: 2,
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.25s'
                }}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  color: language === 'ta' ? 'var(--wine)' : 'var(--ivory-warm)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.65rem',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  zIndex: 2,
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.25s'
                }}
              >
                தமிழ்
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
