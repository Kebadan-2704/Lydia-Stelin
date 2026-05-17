interface Particle {
  left: string;
  animationDelay: string;
  animationDuration: string;
  size: string;
  background: string;
}

const particleColors = [
  'rgba(212, 165, 116, 0.4)',
  'rgba(160, 73, 90, 0.3)',
  'rgba(124, 140, 92, 0.3)',
  'rgba(232, 201, 155, 0.3)',
];

const particles: Particle[] = Array.from({ length: 30 }, (_, i) => {
  const size = `${2 + Math.random() * 4}px`;

  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${6 + Math.random() * 6}s`,
    size,
    background: particleColors[i % particleColors.length],
  };
});

export default function FloatingParticles() {
  return (
    <div className="particles-container" aria-hidden="true">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: particle.left,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
            width: particle.size,
            height: particle.size,
            background: particle.background,
          }}
        />
      ))}
    </div>
  );
}
