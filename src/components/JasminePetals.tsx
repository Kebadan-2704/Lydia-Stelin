import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  r: number; // rotation
  d: number; // density / speed factor
  size: number;
  color: string;
  horizontalDrift: number;
  rotationSpeed: number;
  vx: number; // velocity x
  vy: number; // velocity y
}

export default function JasminePetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let petals: Petal[] = [];
    let animationFrameId: number;

    const drawPetal = (ctx: CanvasRenderingContext2D, petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.r);
      ctx.fillStyle = petal.color;

      // Draw elegant soft pink organic rose petal shape
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-petal.size * 0.5, -petal.size * 0.5, -petal.size, -petal.size * 0.2, 0, -petal.size);
      ctx.bezierCurveTo(petal.size, -petal.size * 0.2, petal.size * 0.5, -petal.size * 0.5, 0, 0);
      ctx.closePath();
      ctx.fill();

      // Delicate leaf spine
      ctx.strokeStyle = 'rgba(107, 45, 62, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -petal.size * 0.95);
      ctx.stroke();

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, width, height);

      if (petals.length > 0) {
        // Filter out petals that have gone off-screen to save resources
        petals = petals.filter((petal) => {
          // Base falling velocities
          const baseVy = petal.d * 0.85;
          const baseVx = petal.horizontalDrift + Math.sin(Date.now() * 0.001 + petal.d) * 0.25;

          // Apply velocities
          petal.y += baseVy + petal.vy;
          petal.x += baseVx + petal.vx;
          petal.r += petal.rotationSpeed;

          // Draw the petal
          drawPetal(ctx, petal);

          // Return true to keep the petal if it's still inside viewport boundaries
          return petal.y <= height + 20 && petal.x >= -30 && petal.x <= width + 30;
        });
      }

      animationFrameId = requestAnimationFrame(update);
    };

    // Listen to Bell Ringer rose petal burst window event
    const handleBurstRosePetals = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 25 : 55; // Optimization for mobile screens

      const newPetals: Petal[] = [];
      for (let i = 0; i < count; i++) {
        const isGold = Math.random() > 0.65;
        newPetals.push({
          x: Math.random() * width,
          y: -50 - Math.random() * 150,
          r: Math.random() * Math.PI,
          d: 0.9 + Math.random() * 1.6,
          size: isGold ? 4 + Math.random() * 5 : 9 + Math.random() * 10,
          color: isGold
            ? `rgba(212, 165, 116, ${0.6 + Math.random() * 0.4})` // Gilded glitter gold
            : `rgba(235, 120, 150, ${0.75 + Math.random() * 0.25})`, // Royal rose pink
          horizontalDrift: -1.2 + Math.random() * 2.4,
          rotationSpeed: -0.05 + Math.random() * 0.1,
          vx: -1 + Math.random() * 2,
          vy: 0
        });
      }

      petals.push(...newPetals);
    };

    window.addEventListener('burst_rose_petals', handleBurstRosePetals);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('burst_rose_petals', handleBurstRosePetals);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999, // Floating elegantly above all contents
        width: '100vw',
        height: '100vh'
      }}
    />
  );
}
