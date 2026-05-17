import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const registryQrImage = import.meta.env.VITE_REGISTRY_QR_IMAGE?.trim();
const registryUpi = import.meta.env.VITE_REGISTRY_UPI?.trim();

export default function BlessingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const card = section.querySelector('.blessings-card');
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section className="blessings-section section" ref={sectionRef} id="blessings" style={{ background: 'var(--ivory-warm)' }}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-label">Gifts & Registry</p>
        <h2 className="section-title">Blessings</h2>
        <div className="section-ornament" />
      </motion.div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }} className="blessings-card">
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(107, 45, 62, 0.08)',
          border: '1px solid rgba(212, 165, 116, 0.2)'
        }}>
          <span aria-hidden="true" style={{ fontSize: '3rem', display: 'block', marginBottom: '20px' }}>🎁</span>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
            Your presence at our wedding is the greatest gift of all. If you wish to bless us with a gift, the details can be viewed below.
          </p>

          <button className="venue-map-btn" onClick={() => setIsModalOpen(true)}>
            View Blessing Details
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="registry-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="registry-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close blessing details"
              onClick={() => setIsModalOpen(false)}
              className="modal-close-btn"
            >
              ×
            </button>
            <h3 id="registry-title" style={{ fontFamily: 'var(--font-display)', color: 'var(--wine)', marginBottom: '20px' }}>Blessing Details</h3>
            {registryQrImage || registryUpi ? (
              <>
                <p style={{ fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>
                  Scan the QR code or use the UPI ID below.
                </p>
                {registryQrImage && (
                  <img
                    src={registryQrImage}
                    alt="Payment QR code"
                    style={{ width: 200, height: 200, objectFit: 'contain', border: '2px solid var(--champagne)', background: '#fff', padding: 8 }}
                  />
                )}
                {registryUpi && (
                  <p style={{ marginTop: '20px', fontFamily: 'var(--font-serif)', fontWeight: 'bold', wordBreak: 'break-word' }}>
                    UPI: {registryUpi}
                  </p>
                )}
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-serif)', lineHeight: 1.7 }}>
                Gift details will be shared personally by the families. Thank you for blessing Lydia and Stelin with your love and prayers.
              </p>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
