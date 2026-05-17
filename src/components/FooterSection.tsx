import { motion } from 'framer-motion';

export default function FooterSection() {
  return (
    <footer className="wedding-footer">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.p
          className="footer-names gold-foil-text"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', lineHeight: 1.2 }}
        >
          With Compliments from<br/>Richy and Suzanne
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '80px', height: '1px', margin: '16px auto',
            background: 'linear-gradient(90deg, transparent, var(--champagne), transparent)'
          }}
        />

        <motion.p
          className="footer-date"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          July 22, 2026 / Coimbatore
        </motion.p>

        <motion.p
          className="footer-hashtag"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          #LydiaAndStelin2026
        </motion.p>

        <motion.div
          className="footer-contact"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p className="footer-contact-label">Additional Information</p>
          <div className="footer-contact-links">
            <a href="tel:+919791737727">+91 97917 37727</a>
            <a href="tel:+919894718056">+91 98947 18056</a>
          </div>
        </motion.div>

        <motion.p
          className="footer-made"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.25 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
        >
          Made with love for a blessed union
        </motion.p>
      </motion.div>
    </footer>
  );
}
