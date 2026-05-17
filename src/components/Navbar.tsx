import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Couple', href: '#couple' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Venue', href: '#venue' },
  { label: 'RSVP', href: '#rsvp' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`wedding-nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {links.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.href}
          className="nav-link"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1 }}
        >
          {link.label}
        </motion.a>
      ))}
    </motion.nav>
  );
}
