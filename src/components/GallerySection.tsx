import { motion } from 'framer-motion';

const photoUploadUrl = import.meta.env.VITE_PHOTO_UPLOAD_URL?.trim() || 'https://photos.google.com';

export default function GallerySection() {
  const letters = Array.from("Coming Soon");

  return (
    <section className="gallery-section section" id="gallery" style={{ background: '#ffffff', position: 'relative' }}>
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

      <div style={{ textAlign: 'center', padding: '40px 20px 80px', position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
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
            letterSpacing: '1px',
            marginBottom: '60px'
          }}
        >
          Beautiful moments will be shared here.
        </motion.p>

        {/* Guest Candid Photo Upload Portal Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            background: 'var(--ivory-warm)',
            border: '1px solid #d4a5744d',
            borderRadius: '16px',
            padding: '40px 30px',
            boxShadow: '0 12px 30px rgba(107, 45, 62, 0.04)',
            maxWidth: '550px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle gold bokeh circles for premium depth */}
          <div 
            style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'var(--champagne-light)',
              opacity: 0.2,
              filter: 'blur(10px)'
            }}
          />

          <motion.div 
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '3rem', marginBottom: '16px', display: 'inline-block' }}
          >
            📸
          </motion.div>

          <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--wine)', fontSize: '1.2rem', letterSpacing: '1px', marginBottom: '10px', textTransform: 'uppercase' }}>
            Help Us Capture the Moments
          </h4>
          
          <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
            We would absolutely love to see our wedding day through your eyes! Please share any candid photos, sweet snapshots, and memories you capture on your phones during the celebration.
          </p>

          <motion.a
            href={photoUploadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rsvp-submit"
            style={{ 
              display: 'inline-block', 
              textDecoration: 'none', 
              margin: 0, 
              padding: '12px 36px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Share Your Photos
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}
