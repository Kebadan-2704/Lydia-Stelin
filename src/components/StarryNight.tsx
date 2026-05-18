import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StarNode {
  x: number;
  y: number;
  size: number;
  name: string;
  blessing: string;
  scripture: string;
}

const coimbatoreStars: StarNode[] = [
  { x: 30, y: 25, size: 4, name: 'Sirius', scripture: '1 Corinthians 13:13', blessing: 'And now these three remain: faith, hope and love. But the greatest of these is love.' },
  { x: 45, y: 40, size: 5, name: 'Canopus', scripture: 'Ephesians 4:2', blessing: 'Be completely humble and gentle; be patient, bearing with one another in love.' },
  { x: 65, y: 20, size: 3.5, name: 'Rigel', scripture: 'Song of Solomon 8:7', blessing: 'Many waters cannot quench love; rivers cannot sweep it away.' },
  { x: 80, y: 55, size: 4.5, name: 'Betelgeuse', scripture: 'Colossians 3:14', blessing: 'And over all these virtues put on love, which binds them all together in perfect unity.' },
  { x: 20, y: 65, size: 3, name: 'Alpha Centauri', scripture: '1 John 4:19', blessing: 'We love because He first loved us.' },
  { x: 55, y: 70, size: 5, name: 'Procyon', scripture: 'Genesis 2:24', blessing: 'That is why a man leaves his father and mother and is united to his wife, and they become one flesh.' },
  { x: 70, y: 80, size: 4, name: 'Capella', scripture: 'Ecclesiastes 4:12', blessing: 'A cord of three strands is not quickly broken.' }
];

export default function StarryNight() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStar, setActiveStar] = useState<StarNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 450);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = 450;
    };
    window.addEventListener('resize', handleResize);

    // Create floating nebula/dust background
    const drawMap = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep sky gradient
      const skyGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width);
      skyGrad.addColorStop(0, '#100b1a');
      skyGrad.addColorStop(1, '#050209');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw faint grid rings (astronomical map style)
      ctx.strokeStyle = 'rgba(212, 165, 116, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 120, 0, Math.PI * 2);
      ctx.arc(width / 2, height / 2, 200, 0, Math.PI * 2);
      ctx.stroke();

      // Connecting Constellation Lines
      ctx.strokeStyle = 'rgba(212, 165, 116, 0.12)';
      ctx.beginPath();
      coimbatoreStars.forEach((star, idx) => {
        const x1 = (star.x / 100) * width;
        const y1 = (star.y / 100) * height;

        // Draw dynamic connection to next star
        const nextStar = coimbatoreStars[(idx + 1) % coimbatoreStars.length];
        const x2 = (nextStar.x / 100) * width;
        const y2 = (nextStar.y / 100) * height;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
      });
      ctx.stroke();

      // Draw tiny background glittering stars
      for (let i = 0; i < 60; i++) {
        const sx = (Math.sin(i + Date.now() * 0.0005) * 0.5 + 0.5) * width;
        const sy = (Math.cos(i * 1.5 + Date.now() * 0.0003) * 0.5 + 0.5) * height;
        const size = Math.abs(Math.sin(i * 3 + Date.now() * 0.001)) * 1.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + size * 0.3})`;
        ctx.fillRect(sx, sy, size, size);
      }

      // Draw Coimbatore Constellation Star Nodes
      coimbatoreStars.forEach((star) => {
        const starX = (star.x / 100) * width;
        const starY = (star.y / 100) * height;

        // Calculate proximity to mouse for interactive line drawing
        const dist = Math.hypot(starX - mousePos.x, starY - mousePos.y);
        if (dist < 150) {
          ctx.strokeStyle = `rgba(212, 165, 116, ${1 - dist / 150})`;
          ctx.beginPath();
          ctx.moveTo(starX, starY);
          ctx.lineTo(mousePos.x, mousePos.y);
          ctx.stroke();
        }

        // Star Outer Glow
        const starGlow = ctx.createRadialGradient(starX, starY, 0, starX, starY, star.size * 3.5);
        starGlow.addColorStop(0, 'rgba(212, 165, 116, 0.8)');
        starGlow.addColorStop(0.3, 'rgba(212, 165, 116, 0.3)');
        starGlow.addColorStop(1, 'rgba(212, 165, 116, 0)');
        ctx.fillStyle = starGlow;
        ctx.beginPath();
        ctx.arc(starX, starY, star.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Star Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(starX, starY, star.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(drawMap);
    };

    drawMap();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;

    // Check if clicked close to any star node
    let foundStar = null;
    for (const star of coimbatoreStars) {
      const starX = (star.x / 100) * width;
      const starY = (star.y / 100) * height;
      const dist = Math.hypot(starX - clickX, starY - clickY);
      if (dist < 20) {
        foundStar = star;
        break;
      }
    }
    setActiveStar(foundStar);
  };

  return (
    <section className="starry-section section" style={{ background: '#050209', padding: '100px 20px', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <p className="section-label" style={{ color: 'var(--champagne)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.7rem' }}>
            Celestial Keepsake
          </p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--ivory-warm)', fontSize: 'clamp(2rem, 5vw, 2.8rem)' }}>
            Coimbatore's Starry Canopy
          </h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', marginTop: '8px', fontSize: '0.9rem' }}>
            The exact constellation map over Lotus Mahal at 7:00 PM on July 22, 2026—the sacred moment they tie the knot.
          </p>
        </motion.div>

        {/* Constellation Map Canvas Box */}
        <div
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
          style={{
            position: 'relative',
            borderRadius: '24px',
            border: '2px solid rgba(212, 165, 116, 0.25)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5), 0 0 50px rgba(212, 165, 116, 0.08)',
            overflow: 'hidden',
            cursor: 'crosshair',
            background: '#050209'
          }}
        >
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '450px' }} />

          {/* Map Compass details overlay */}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', pointerEvents: 'none', color: 'rgba(212, 165, 116, 0.5)', fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '2px' }}>
            LAT: 10.9572° N • LNG: 76.9068° E
          </div>
          <div style={{ position: 'absolute', bottom: '20px', right: '20px', pointerEvents: 'none', color: 'rgba(212, 165, 116, 0.5)', fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '2px' }}>
            7:00 PM • COIMBATORE, TN
          </div>

          {/* Interactive Help Hint */}
          <div style={{ position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-serif)', fontSize: '0.75rem', fontStyle: 'italic' }}>
            ✨ Hover to draw connection lines • Tap any star node to reveal its blessing ✨
          </div>

          {/* Glassmorphic Star Blessing overlay modal */}
          <AnimatePresence>
            {activeStar && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: 'spring', damping: 20 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(26, 14, 23, 0.85)',
                  border: '1.5px solid var(--champagne)',
                  borderRadius: '20px',
                  padding: '30px 24px',
                  maxWidth: '380px',
                  width: 'calc(100% - 40px)',
                  textAlign: 'center',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(16px)',
                  zIndex: 10
                }}
              >
                <button
                  onClick={() => setActiveStar(null)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--champagne)',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  ✕
                </button>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '3px', color: 'var(--champagne)', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  CONSTELLATION BLESSING • {activeStar.name}
                </span>
                <h4 style={{ fontFamily: 'var(--font-elegant)', fontSize: '1.3rem', color: '#ffffff', margin: '0 0 16px' }}>
                  {activeStar.scripture}
                </h4>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ivory-warm)', lineHeight: 1.6, margin: 0 }}>
                  "{activeStar.blessing}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
