import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VenueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const venueImage = section.querySelector('.venue-image-wrapper');
      const venueInfo = section.querySelector('.venue-info');
      if (!venueImage || !venueInfo) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });

      tl.fromTo(
        venueImage,
        { opacity: 0, x: -80, scale: 0.9, rotateY: 10 },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 1.2, ease: 'power3.out' }
      ).fromTo(
        venueInfo,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="venue-section section" ref={sectionRef} id="venue">
      <div className="venue-content">
        <motion.div
          className="venue-image-wrapper"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/images/venue.png" alt="Lotus Mahal, Coimbatore" />
        </motion.div>

        <div className="venue-info">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p
              className="section-label"
              initial={{ opacity: 0, letterSpacing: '12px' }}
              whileInView={{ opacity: 1, letterSpacing: '6px' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              The Venue
            </motion.p>
            <motion.div
              className="section-ornament"
              style={{ margin: '12px 0' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>

          <motion.h3
            className="venue-name"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Lotus Mahal
          </motion.h3>
          <motion.p
            className="venue-location"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Coimbatore, Tamil Nadu
          </motion.p>

          <motion.a
            href="https://maps.google.com/?q=Lotus+Mahal+Coimbatore"
            target="_blank"
            rel="noopener noreferrer"
            className="venue-map-btn"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Get Directions
          </motion.a>
        </div>
      </div>
    </section>
  );
}
