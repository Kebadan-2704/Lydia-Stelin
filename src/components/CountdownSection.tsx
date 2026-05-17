import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WEDDING_DATE = new Date('2026-07-22T17:00:00+05:30').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Flip animation for each digit change
function FlipNumber({ value, label }: { value: string; label: string }) {
  return (
    <div className="countdown-item">
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            className="countdown-number"
            initial={{ y: -30, opacity: 0, rotateX: -60 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 30, opacity: 0, rotateX: 60 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block', perspective: '200px' }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="countdown-unit">{label}</span>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = WEDDING_DATE - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('.countdown-item'),
        { opacity: 0, y: 40, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="countdown-section" ref={sectionRef} id="countdown">
      <motion.h2
        className="countdown-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Counting Down to Forever
      </motion.h2>

      <div className="countdown-grid">
        <FlipNumber value={pad(timeLeft.days)} label="Days" />
        <span className="countdown-separator">:</span>
        <FlipNumber value={pad(timeLeft.hours)} label="Hours" />
        <span className="countdown-separator">:</span>
        <FlipNumber value={pad(timeLeft.minutes)} label="Minutes" />
        <span className="countdown-separator">:</span>
        <FlipNumber value={pad(timeLeft.seconds)} label="Seconds" />
      </div>
    </section>
  );
}
