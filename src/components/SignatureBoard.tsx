import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuestSignature {
  id: string;
  dataUrl: string;
  x: number; // percentage coordinate
  y: number; // percentage coordinate
  scale: number;
}

export default function SignatureBoard() {
  const [signatures, setSignatures] = useState<GuestSignature[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  // Load preset simulated signatures to make the board look alive immediately
  useEffect(() => {
    const saved = localStorage.getItem('lydia_stelin_signatures');
    if (saved) {
      setSignatures(JSON.parse(saved));
    } else {
      // Add pre-loaded gorgeous golden signatures of the couple to initiate the board
      const initial: GuestSignature[] = [
        {
          id: 'stelin',
          dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="30"><path d="M10,15 C20,5 30,25 40,15 C50,5 60,25 70,15" fill="none" stroke="%23d4a574" stroke-width="2"/></svg>',
          x: 48,
          y: 40,
          scale: 0.95
        },
        {
          id: 'lydia',
          dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="30"><path d="M15,10 C20,25 40,10 45,25 C50,10 65,25 70,10" fill="none" stroke="%23d4a574" stroke-width="2"/></svg>',
          x: 52,
          y: 48,
          scale: 0.95
        }
      ];
      setSignatures(initial);
      localStorage.setItem('lydia_stelin_signatures', JSON.stringify(initial));
    }
  }, []);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawingRef.current = true;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#d4a574'; // Golden ink

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Prevent scrolling on mobile while drawing
    if (e.cancelable) e.preventDefault();

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const submitSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();
    
    // Calculate a semi-random coordinate clustered inside the gold silhouette outline (approx 35% to 65%)
    const x = Math.floor(Math.random() * 40) + 30;
    const y = Math.floor(Math.random() * 50) + 25;
    const scale = parseFloat((Math.random() * 0.3 + 0.65).toFixed(2));

    const newSig: GuestSignature = {
      id: String(Date.now()),
      dataUrl,
      x,
      y,
      scale
    };

    const updated = [...signatures, newSig];
    setSignatures(updated);
    localStorage.setItem('lydia_stelin_signatures', JSON.stringify(updated));
    setHasSigned(true);
    setIsModalOpen(false);
  };

  return (
    <section className="signature-section section" id="signatures" style={{ background: 'var(--ivory-warm)', position: 'relative', overflow: 'hidden' }}>
      {/* Delicate floral print background overlay */}
      <div 
        style={{ 
          content: '""', 
          opacity: 0.02, 
          background: 'url(/images/floral-pattern.png) 50%/400px', 
          position: 'absolute', 
          inset: 0, 
          pointerEvents: 'none' 
        }} 
      />

      <div className="section-header">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, letterSpacing: '12px' }}
          whileInView={{ opacity: 1, letterSpacing: '6px' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Collaborative Art
        </motion.p>
        <h2 className="section-title">Digital Signature Board</h2>
        <motion.div
          className="section-ornament"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '12px' }}>
          Leave your digital signature or draw a small heart on our interactive silhouette board!
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        
        {/* Silhouette Board Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: '#ffffff',
            border: '2px solid #d4a57466',
            borderRadius: '24px',
            padding: '40px 20px',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(107, 45, 62, 0.03)',
            height: '450px',
            maxWidth: '500px',
            margin: '0 auto 30px',
            overflow: 'hidden'
          }}
        >
          {/* Double thin border detail inside card */}
          <div style={{ position: 'absolute', inset: '10px', border: '1px solid #d4a5741f', borderRadius: '16px', pointerEvents: 'none' }} />

          {/* Golden couple silhouette outline SVG */}
          <svg 
            viewBox="0 0 100 100" 
            style={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '80%', 
              height: '80%', 
              opacity: 0.12, 
              fill: 'none', 
              stroke: 'var(--wine)', 
              strokeWidth: 0.35, 
              pointerEvents: 'none' 
            }}
          >
            {/* Elegant outline couple vector */}
            <path d="M35,90 C35,65 42,60 45,50 C48,40 45,30 48,22 C50,15 55,15 57,22 C60,30 57,40 60,50 C63,60 70,65 70,90 Z" />
            <path d="M42,20 C42,16 45,14 48,14 C51,14 54,16 54,20 C54,24 51,26 48,26 C45,26 42,24 42,20 Z" strokeDasharray="1 1" />
          </svg>

          {/* Scatter rendered guest signatures overlay */}
          {signatures.map((sig) => (
            <motion.img
              key={sig.id}
              src={sig.dataUrl}
              alt="Guest signature"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.75, scale: sig.scale }}
              style={{
                position: 'absolute',
                left: `${sig.x}%`,
                top: `${sig.y}%`,
                width: '60px',
                height: 'auto',
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}

          {signatures.length === 0 && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--text-muted)' }}>
              Be the first to sign the board...
            </div>
          )}
        </motion.div>

        {/* Action Button */}
        {!hasSigned ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="rsvp-submit"
            style={{
              background: 'var(--wine)',
              color: '#ffffff',
              padding: '14px 40px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(107, 45, 62, 0.2)'
            }}
          >
            ✏️ Sign the Board
          </motion.button>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--olive-dark)', fontWeight: 500 }}
          >
            ✓ Thank you for signing our collaborative keepsake board!
          </motion.p>
        )}
      </div>

      {/* Signature Pad Glassmorphic Modal overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(107, 45, 62, 0.4)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: '#ffffff',
                border: '1px solid #d4a57499',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '400px',
                width: '100%',
                boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
                textAlign: 'center'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--wine)', fontSize: '1.2rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Draw Your Signature
              </h3>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Use your finger or mouse to draw your initials or a heart below in luxury gold ink.
              </p>

              {/* Drawing Canvas */}
              <div style={{ background: '#fbf8f1', border: '1px dashed #d4a57499', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={200}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  style={{ display: 'block', cursor: 'crosshair', touchAction: 'none' }}
                />
              </div>

              {/* Action options */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <button
                  onClick={clearCanvas}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #d4a574',
                    background: 'transparent',
                    color: 'var(--wine)',
                    fontFamily: 'var(--font-serif)',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  Clear Pad
                </button>
                <button
                  onClick={submitSignature}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'var(--wine)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-serif)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  Confirm Sign
                </button>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-serif)'
                }}
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
