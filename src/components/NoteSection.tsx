import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const ctx = gsap.context(() => {
      const card = section.querySelector('.note-card');
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: 0.3 + i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    })
  };

  const noteText = "We are so incredibly excited to celebrate our beloved daughter's special day with our dearest family and friends. Thank you for your continued love, prayers, and support throughout our lives. We truly cannot wait to share this beautiful and holy moment with all of you as they begin their new journey together.";
  const words = noteText.split(' ');

  return (
    <section className="section" ref={sectionRef} style={{ background: 'var(--ivory)', padding: '80px 20px' }}>
      <div className="note-card" style={{
        maxWidth: '700px',
        margin: '0 auto',
        textAlign: 'center',
        padding: '50px 40px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(253,251,247,0.6) 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(212, 165, 116, 0.3)',
        boxShadow: '0 20px 60px rgba(107, 45, 62, 0.06), 0 0 80px rgba(212, 165, 116, 0.05)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Top ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '60px', height: '2px', margin: '0 auto 25px',
            background: 'linear-gradient(90deg, transparent, var(--champagne), transparent)'
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-script)', fontSize: '2.8rem', color: 'var(--wine)', marginBottom: '25px' }}
        >
          A Little Note
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-body)', lineHeight: 2 }}
        >
          {words.map((word, i) => (
            <motion.span key={i} custom={i} variants={wordVariants} style={{ display: 'inline-block', marginRight: '0.3em' }}>
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Bottom ornament */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '60px', height: '2px', margin: '25px auto',
            background: 'linear-gradient(90deg, transparent, var(--champagne), transparent)'
          }}
        />

        <motion.div
          initial={{ opacity: 0, letterSpacing: '8px' }}
          whileInView={{ opacity: 1, letterSpacing: '2px' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-display)', color: 'var(--champagne-dark)', fontSize: '0.75rem', textTransform: 'uppercase' }}
        >
          With Love from the families of Mrs and Mr Ebinezer Nehamiah
        </motion.div>
      </div>
    </section>
  );
}
