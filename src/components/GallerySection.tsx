import { motion } from 'framer-motion';

export default function GallerySection() {
  const letters = Array.from("Coming Soon");

  return (
    <section className="gallery-section section" id="gallery">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.p
          className="section-label"
          initial={{ opacity: 0, letterSpacing: '12px' }}
          whileInView={{ opacity: 1, letterSpacing: '6px' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Moments
        </motion.p>
        <h2 className="section-title">Photo Gallery</h2>
        <motion.div
          className="section-ornament"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      <div style={{ textAlign: 'center', padding: '60px 20px', position: 'relative', zIndex: 1 }}>
        <h3 
          style={{ 
            fontFamily: 'var(--font-script)', 
            fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', 
            marginBottom: '4px', 
            color: 'var(--wine)', 
            fontWeight: 400, 
            letterSpacing: 'normal',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(3px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.04,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </h3>

        {/* Elegant gold/wine divider that expands smoothly */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '60px',
            height: '1px',
            background: 'var(--wine)',
            margin: '16px auto',
            transformOrigin: 'center'
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.85, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', 
            fontStyle: 'italic', 
            color: 'var(--text-muted)', 
            letterSpacing: '1px' 
          }}
        >
          Beautiful moments will be shared here.
        </motion.p>
      </div>
    </section>
  );
}
