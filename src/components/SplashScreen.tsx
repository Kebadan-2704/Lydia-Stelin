import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface SplashScreenProps {
  onEnter: () => void;
  visible: boolean;
}

// Staggered letter animation
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: 0.8 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  })
};

function AnimatedText({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) {
  return (
    <span className={className} style={{ ...style, display: 'inline-block', perspective: '600px' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Generate random particle properties outside component to ensure pure rendering
const particles = Array.from({ length: 20 }).map(() => ({
  size: 3 + Math.random() * 4,
  opacity: 0.2 + Math.random() * 0.4,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  yEnd: -80 - Math.random() * 120,
  xEnd: (Math.random() - 0.5) * 60,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 5
}));

export default function SplashScreen({ onEnter, visible }: SplashScreenProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. Web Audio API synthesized wax seal snap cracking sound
  const playWaxCrackSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // High-frequency crack noise
      const bufferSize = audioCtx.sampleRate * 0.05; // 50ms click
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i * 0.005);
      }

      const noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = buffer;

      // Low-frequency envelope thump
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, audioCtx.currentTime);

      noiseNode.connect(filter);
      osc.connect(gain);
      
      filter.connect(audioCtx.destination);
      gain.connect(audioCtx.destination);

      noiseNode.start();
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.warn('Web Audio Crack synthesis not supported:', e);
    }
  };

  const handleOpen = () => {
    playWaxCrackSound();
    // Soft haptic crunch if mobile
    if (navigator.vibrate) {
      navigator.vibrate([45]);
    }
    setIsOpening(true);
    setTimeout(() => onEnter(), 1200);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="splash-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: '#2c141d', perspective: '1000px', overflow: 'hidden' }}
        >
          {/* Background Video */}
          {!isMobile ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.4,
                zIndex: 0,
                pointerEvents: 'none',
                filter: 'blur(2px) brightness(0.8)'
              }}
            >
              <source src="/videos/balloon.mp4" type="video/mp4" />
            </video>
          ) : (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundImage: 'url(/images/hero-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.4,
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Wine-tinted overlay for richness */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'radial-gradient(ellipse at center, rgba(44, 20, 29, 0.3) 0%, rgba(44, 20, 29, 0.85) 100%)'
          }} />

          {/* Floating golden particles */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
            {particles.map((p, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  background: `rgba(212, 165, 116, ${p.opacity})`,
                  left: p.left,
                  top: p.top,
                }}
                animate={{
                  y: [0, p.yEnd],
                  x: [0, p.xEnd],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0.5]
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>

          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(86vw, 620px)',
              aspectRatio: '3 / 2',
              maxHeight: '68vh',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Envelope Container */}
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.85 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                width: '100%',
                height: '100%',
                minHeight: 280,
              }}
            >
            {/* Envelope Back (Inside Pocket) */}
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(145deg, #8f653f 0%, #bc8958 42%, #94673e 100%)',
                borderRadius: '10px',
                boxShadow: '0 28px 70px rgba(0,0,0,0.45), 0 0 90px rgba(212, 165, 116, 0.18)',
                position: 'relative',
                border: '1px solid rgba(232, 201, 155, 0.35)',
              }}
              animate={isOpening ? { y: 200, opacity: 0, scale: 0.9, rotateX: 20 } : {}}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              {/* The Card */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '94%',
                  height: 'calc(100% - 40px)',
                  background: 'linear-gradient(180deg, #FDFBF7 0%, #F8F4EC 100%)',
                  top: '20px',
                  left: '3%',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(0,0,0,0.3)',
                  padding: '40px 20px',
                  border: '2px solid rgba(212, 165, 116, 0.4)',
                  zIndex: 1
                }}
                animate={isOpening ? { y: -600, scale: 1.1, opacity: 0 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                {/* Decorative top line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: '80px', height: '2px', margin: '0 auto 20px auto',
                    background: 'linear-gradient(90deg, transparent, var(--champagne), transparent)'
                  }}
                />

                {/* Names with letter-by-letter reveal */}
                <div className="splash-names gold-foil-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontFamily: 'var(--font-script)', lineHeight: 1.1, textAlign: 'center' }}>
                  <AnimatedText text="Lydia" />
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.6, type: 'spring' }}
                    style={{ display: 'block', fontSize: '0.4em', color: '#D4A574', margin: '-10px 0' }}
                  >
                    &
                  </motion.span>
                  <AnimatedText text="Stelin" />
                </div>

                {/* Date with typewriter reveal */}
                <motion.div
                  className="splash-date"
                  initial={{ opacity: 0, letterSpacing: '20px' }}
                  animate={{ opacity: 1, letterSpacing: '6px' }}
                  transition={{ duration: 1.2, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
                  style={{ color: '#6b2d3e', marginTop: '20px', fontSize: '0.9rem', fontWeight: 600 }}
                >
                  22 / 07 / 2026
                </motion.div>

                {/* Decorative bottom line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    width: '80px', height: '2px', margin: '20px auto 0 auto',
                    background: 'linear-gradient(90deg, transparent, var(--champagne), transparent)'
                  }}
                />
              </motion.div>

              {/* Envelope Front (Bottom Pocket) */}
              <motion.div
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%',
                  background: 'linear-gradient(135deg, #c99762 0%, #e5bb84 48%, #c58f59 100%)',
                  borderRadius: '0 0 10px 10px',
                  clipPath: 'polygon(0 100%, 100% 100%, 100% 35%, 50% 70%, 0 35%)',
                  zIndex: 2,
                  boxShadow: 'inset 0 -18px 28px rgba(82, 45, 25, 0.12)',
                }}
              />

              {/* Envelope Top Flap (Animates Open) */}
              <motion.div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '65%',
                  background: 'linear-gradient(180deg, #edc28e 0%, #d6a46d 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformOrigin: 'top center',
                  zIndex: 3,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                }}
                animate={isOpening ? { rotateX: -180, zIndex: 0 } : { rotateX: 0, zIndex: 3 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />

              {/* Gold Foiled Monogrammed 3D Wax Seal */}
              <div
                style={{
                  position: 'absolute', top: '55%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 4,
                }}
              >
                <motion.button
                  aria-label="Open wedding invitation"
                  onClick={handleOpen}
                  disabled={isOpening}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={isOpening ? { opacity: 0, scale: 0, rotate: 180 } : { opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: isOpening ? 0 : 2.8, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.12, boxShadow: '0 0 35px rgba(212, 165, 116, 0.7)' }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '95px', height: '95px',
                    background: 'radial-gradient(circle at 30% 30%, #a21b36 0%, #6b2d3e 50%, #441421 100%)',
                    borderRadius: '50%',
                    border: '4px solid var(--champagne)',
                    color: 'var(--ivory)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.15)',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: '6px',
                    border: '1.5px dashed rgba(212,165,116,0.5)',
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.8rem', color: 'var(--champagne)', margin: '0 0 -5px', fontWeight: 'bold' }}>L</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--champagne-light)', opacity: 0.85 }}>&</span>
                    <span style={{ fontFamily: 'var(--font-script)', fontSize: '1.8rem', color: 'var(--champagne)', margin: '-5px 0 0', fontWeight: 'bold' }}>S</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
            </motion.div>
          </div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 3.5, duration: 1 }}
            style={{
              position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
              fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '4px',
              textTransform: 'uppercase', color: 'var(--champagne-light)', zIndex: 4
            }}
          >
            You're Invited
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
