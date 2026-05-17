import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const colors = [
  { name: 'Wine Red', className: 'swatch-wine', hex: '#6B2D3E' },
  { name: 'Ivory', className: 'swatch-ivory', hex: '#F5EFE0' },
  { name: 'Champagne', className: 'swatch-champagne', hex: '#D4A574' },
];

const swatchVariants: Variants = {
  hidden: { opacity: 0, scale: 0, rotate: -90 },
  visible: (i: number) => ({
    opacity: 1, scale: 1, rotate: 0,
    transition: { delay: 0.3 + i * 0.2, duration: 0.8, type: 'spring', stiffness: 200, damping: 15 }
  })
};

export default function DressCodeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="dresscode-section section" ref={sectionRef} id="dresscode">
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

      <div className="dresscode-grid">
        {colors.map((color, i) => (
          <motion.div
            className="dresscode-item"
            key={color.name}
            custom={i}
            variants={swatchVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`dresscode-swatch ${color.className}`}
              whileHover={{
                boxShadow: `0 12px 40px ${color.hex}66`,
                scale: 1.2
              }}
              transition={{ duration: 0.4 }}
            />
            <p className="dresscode-name">{color.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
