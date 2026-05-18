import { useRef } from 'react';
import { motion } from 'framer-motion';

interface ColorTheme {
  name: string;
  className: string;
  hex: string;
}

const colors: ColorTheme[] = [
  { name: 'Wine Red', className: 'swatch-wine', hex: '#6B2D3E' },
  { name: 'Ivory', className: 'swatch-ivory', hex: '#F5EFE0' },
  { name: 'Champagne', className: 'swatch-champagne', hex: '#D4A574' }
];

export default function DressCodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="dresscode-section section" ref={sectionRef} id="dresscode" style={{ background: 'var(--ivory)', position: 'relative', padding: '80px 20px' }}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '40px' }}
      >
        <motion.p
          className="section-label"
          initial={{ opacity: 0, letterSpacing: '12px' }}
          whileInView={{ opacity: 1, letterSpacing: '6px' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Attire
        </motion.p>
        <h2 className="section-title">Dress Code</h2>
        <motion.div
          className="section-ornament"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
        {/* Color Swatches Grid */}
        <div className="dresscode-grid" style={{ marginBottom: '30px', justifyContent: 'center', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {colors.map((color, i) => (
            <motion.div
              className="dresscode-item"
              key={color.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
              whileHover={{ y: -6 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <div
                className={`dresscode-swatch ${color.className}`}
                style={{
                  border: '3px solid #fff',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s'
                }}
              />
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                  marginTop: '12px',
                  color: 'var(--text-body)'
                }}
              >
                {color.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Warm Personal Comfort Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: '550px',
            margin: '0 auto',
            borderTop: '1px solid #d4a5744d',
            paddingTop: '24px'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
              lineHeight: 1.7,
              color: 'var(--wine)',
              fontStyle: 'italic',
              margin: 0
            }}
          >
            "We would love to see our guests embrace the above palette. But please remember that your comfort is what matters the most to us! Feel free to wear whatever makes you feel fantastic!"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
