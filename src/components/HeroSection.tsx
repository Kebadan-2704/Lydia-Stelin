import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Letter-by-letter stagger animation
const nameLetterVariants: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: 0.6 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
};

function StaggeredName({ text, fromLeft }: { text: string; fromLeft?: boolean }) {
  return (
    <span style={{ display: 'inline-block', perspective: '800px' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={fromLeft ? i : text.length - 1 - i}
          variants={nameLetterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home">
      <div className="hero-bg" ref={bgRef}>
        <video
          autoPlay loop muted playsInline
          poster="/images/hero-bg.png"
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '100vw', height: '100vh',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover', opacity: 0.8, zIndex: 0
          }}
        >
          <source src="/videos/189020-884234925_medium.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero-content">
        <motion.p
          className="hero-invitation-text"
          initial={{ opacity: 0, y: 20, letterSpacing: '16px' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '8px' }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Together with their families
        </motion.p>

        <motion.h1 className="hero-names gold-foil-text">
          <span style={{ display: 'block' }}>
            <StaggeredName text="Lydia" fromLeft />
          </span>

          <motion.span
            className="hero-ampersand"
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 1.2, type: 'spring', stiffness: 200 }}
          >
            &
          </motion.span>

          <span style={{ display: 'block' }}>
            <StaggeredName text="Stelin" />
          </span>
        </motion.h1>

        {/* Ornamental line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '120px', height: '1px', margin: '20px auto',
            background: 'linear-gradient(90deg, transparent, var(--champagne), transparent)'
          }}
        />

        <motion.div
          className="hero-date-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <div className="hero-date-ornament" />
          <p className="hero-date">July 22, 2026 · Wednesday</p>
          <div className="hero-date-ornament" />
        </motion.div>

        <motion.p
          className="hero-venue-text"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Lotus Mahal, Coimbatore
        </motion.p>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <span className="scroll-text">Scroll</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}
