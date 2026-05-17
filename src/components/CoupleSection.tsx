import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CoupleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const imageFrame = section.querySelector('.couple-image-frame');
      const verse = section.querySelector('.couple-verse');
      const verseRef = section.querySelector('.couple-verse-ref');
      if (!imageFrame || !verse || !verseRef) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });

      tl.fromTo(
        imageFrame,
        { opacity: 0, scale: 0.8, y: 60, rotateY: 15 },
        { opacity: 1, scale: 1, y: 0, rotateY: 0, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo(
        verse,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        verseRef,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="couple-section section" ref={sectionRef} id="couple">
      <div className="couple-content">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="section-label"
            initial={{ opacity: 0, letterSpacing: '12px' }}
            whileInView={{ opacity: 1, letterSpacing: '6px' }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            The Couple
          </motion.p>
          <h2 className="section-title">Lydia & Stelin</h2>
          <motion.div
            className="section-ornament"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        <motion.div
          className="couple-image-frame"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: '1000px' }}
        >
          <img src="/images/couple.png" alt="Lydia and Stelin" loading="lazy" decoding="async" />
        </motion.div>

        <motion.p
          className="couple-verse"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          "And above all these put on love, which binds everything together in perfect harmony."
        </motion.p>
        <motion.p
          className="couple-verse-ref"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          — Colossians 3:14
        </motion.p>
      </div>
    </section>
  );
}
