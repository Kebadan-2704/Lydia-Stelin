import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  '/images/gallery-1.png',
  '/images/gallery-2.png',
  '/images/gallery-3.png'
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const ctx = gsap.context(() => {
      const marquee = section.querySelector('.gallery-marquee-container');
      if (!marquee) return;

      gsap.fromTo(
        marquee,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery-section section" ref={sectionRef} id="gallery">
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

      <div className="gallery-marquee-container">
        <div className="gallery-marquee">
          {[...images, ...images, ...images, ...images].map((src, index) => (
            <div className="gallery-image" key={index}>
              <img src={src} alt={`Gallery ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
