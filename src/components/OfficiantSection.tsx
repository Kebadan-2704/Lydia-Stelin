import { motion } from 'framer-motion';

export default function OfficiantSection() {
  return (
    <section className="officiant-section section" id="officiant">
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
          Solemnized By
        </motion.p>
        <motion.div
          className="section-ornament"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      <div className="officiant-content">
        <motion.div
          className="officiant-detail"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="officiant-image-wrapper"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}
          >
            <img src="/images/vmain.jpeg" alt="Pr. Vasanth Sathyanathan" loading="lazy" decoding="async" />
          </motion.div>
          
          <div className="officiant-detail-text">
            <motion.p
              className="officiant-role"
              initial={{ opacity: 0, letterSpacing: '8px' }}
              whileInView={{ opacity: 1, letterSpacing: '4px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Wedding Solemnized By
            </motion.p>
            <motion.h3
              className="officiant-name"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Pr. Vasanth Sathyanathan
            </motion.h3>
            <motion.p
              className="officiant-title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Trinity Ministries, Madukkarai
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          style={{
            width: 60, height: 1,
            background: 'linear-gradient(90deg, transparent, #D4A574, transparent)',
            margin: '24px auto',
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        <motion.div
          className="officiant-detail row-reverse"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="officiant-image-wrapper"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.65, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}
          >
            <img src="/images/main.jpg" alt="Pr. Joseph Balachandran" loading="lazy" decoding="async" />
          </motion.div>
          
          <div className="officiant-detail-text">
            <motion.p
              className="officiant-role"
              initial={{ opacity: 0, letterSpacing: '8px' }}
              whileInView={{ opacity: 1, letterSpacing: '4px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              In the Presence of
            </motion.p>
            <motion.h3
              className="officiant-name"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Pr. Joseph Balachandran
            </motion.h3>
            <motion.p
              className="officiant-title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              President, Good Samaritan Fellowship, Madurai
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
