import { motion } from 'framer-motion';

interface Particle {
  left: string;
  animationDelay: string;
  animationDuration: string;
  size: string;
  background: string;
  horizontalDrift: number;
}

const particleColors = [
  'rgba(212, 165, 116, 0.6)',
  'rgba(160, 73, 90, 0.4)',
  'rgba(124, 140, 92, 0.4)',
  'rgba(232, 201, 155, 0.5)',
];

const particles: Particle[] = Array.from({ length: 40 }, (_, i) => {
  const size = `${3 + Math.random() * 5}px`;

  return {
    left: `${Math.random() * 100}vw`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${12 + Math.random() * 10}s`,
    size,
    background: particleColors[i % particleColors.length],
    horizontalDrift: (Math.random() - 0.5) * 100, // drift between -50px and +50px
  };
});

export default function FloatingParticles() {
  return (
    <div 
      className="particles-overlay" 
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50, // Between background and content
        overflow: 'hidden'
      }}
    >
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          initial={{ y: '-10vh', x: 0, opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            x: particle.horizontalDrift,
            opacity: [0, 1, 1, 0],
            rotate: 360
          }}
          transition={{
            duration: parseFloat(particle.animationDuration),
            delay: parseFloat(particle.animationDelay),
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: particle.left,
            width: particle.size,
            height: particle.size,
            background: particle.background,
            borderRadius: Math.random() > 0.5 ? '50%' : '30% 70% 70% 30% / 30% 30% 70% 70%', // some petals, some dust
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
}
