import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'The Couple', href: '#couple' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Events', href: '#events' },
    { name: 'Venue', href: '#venue' },
    { name: 'Blessings', href: '#blessings' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  const handleScroll = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.button
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 998,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(212, 165, 116, 0.4)',
          color: 'var(--champagne)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}
      >
        <div style={{ width: '20px', height: '2px', background: 'currentColor' }} />
        <div style={{ width: '20px', height: '2px', background: 'currentColor' }} />
        <div style={{ width: '20px', height: '2px', background: 'currentColor' }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Wedding navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--wine-deep)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              aria-label="Close navigation menu"
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                background: 'transparent',
                border: 'none',
                color: 'var(--champagne)',
                fontSize: '2rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', textAlign: 'center' }}>
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleScroll(link.href); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    color: 'var(--ivory)',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '4px'
                  }}
                  whileHover={{ color: 'var(--champagne)', scale: 1.1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
