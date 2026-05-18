import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function RegistrySection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'registry' | 'shagun' | 'gift'>('registry');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('lydiastelin@okaxis');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const registryItems = [
    {
      id: 1,
      title: 'Luxury Dinnerware Set',
      description: 'Elegant fine china porcelain plates and bowls for our future home dinners.',
      imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=300&auto=format&fit=crop',
      link: 'https://www.amazon.in'
    },
    {
      id: 2,
      title: 'Honeymoon Travel Fund',
      description: 'Help us build lifelong memories on our romantic post-wedding honeymoon escape.',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=300&auto=format&fit=crop',
      link: 'https://www.makemytrip.com'
    },
    {
      id: 3,
      title: 'Bespoke Home Decor',
      description: 'Artisanal decorative vases, golden brass frames, and warm textiles.',
      imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300&auto=format&fit=crop',
      link: 'https://www.pepperfry.com'
    }
  ];

  return (
    <section className="registry-section section" id="registry" style={{ background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
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
          Blessings
        </motion.p>
        <h2 className="section-title">Registry & Shagun</h2>
        <motion.div
          className="section-ornament"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '12px' }}>
          Your presence at our wedding is the greatest gift. Should you wish to honor us, we have prepared options below.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', position: 'relative', zIndex: 2 }}>
        
        {/* Tab Selectors */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <button
            onClick={() => setActiveTab('registry')}
            style={{
              padding: '10px 20px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              letterSpacing: '1px',
              borderRadius: '30px',
              border: activeTab === 'registry' ? '1px solid var(--wine)' : '1px solid #d4a57444',
              background: activeTab === 'registry' ? 'var(--wine)' : 'transparent',
              color: activeTab === 'registry' ? '#ffffff' : 'var(--wine)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontWeight: 600,
              transition: 'all 0.3s'
            }}
          >
            🎁 {t('registry.giftRegistry')}
          </button>
          <button
            onClick={() => setActiveTab('shagun')}
            style={{
              padding: '10px 20px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              letterSpacing: '1px',
              borderRadius: '30px',
              border: activeTab === 'shagun' ? '1px solid var(--wine)' : '1px solid #d4a57444',
              background: activeTab === 'shagun' ? 'var(--wine)' : 'transparent',
              color: activeTab === 'shagun' ? '#ffffff' : 'var(--wine)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontWeight: 600,
              transition: 'all 0.3s'
            }}
          >
            💌 {t('registry.digitalShagun')}
          </button>
          <button
            onClick={() => setActiveTab('gift')}
            style={{
              padding: '10px 20px',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              letterSpacing: '1px',
              borderRadius: '30px',
              border: activeTab === 'gift' ? '1px solid var(--wine)' : '1px solid #d4a57444',
              background: activeTab === 'gift' ? 'var(--wine)' : 'transparent',
              color: activeTab === 'gift' ? '#ffffff' : 'var(--wine)',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontWeight: 600,
              transition: 'all 0.3s'
            }}
          >
            💝 {t('registry.returnGift')}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'registry' ? (
            /* Gift Registry Layout */
            <motion.div
              key="registry-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '24px'
              }}
            >
              {registryItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #d4a57433',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 30px rgba(107, 45, 62, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-elegant)', fontSize: '1.2rem', color: 'var(--wine)', margin: '0 0 8px' }}>
                        {item.title}
                      </h4>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.5, margin: '0 0 20px' }}>
                        {item.description}
                      </p>
                    </div>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        textDecoration: 'none',
                        background: 'var(--ivory-warm)',
                        color: 'var(--wine)',
                        padding: '10px',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        border: '1px solid #d4a57455',
                        transition: 'background 0.3s'
                      }}
                    >
                      View Registry Item
                    </a>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : activeTab === 'shagun' ? (
            /* Digital Shagun Envelope Layout */
            <motion.div
              key="shagun-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', padding: '20px 0' }}
            >
              <div style={{ maxWidth: '450px', margin: '0 auto', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  {!isEnvelopeOpen ? (
                    /* Sealed Gilded Red/Gold Envelope */
                    <motion.div
                      key="closed-envelope"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => setIsEnvelopeOpen(true)}
                      style={{
                        background: 'linear-gradient(135deg, #a2384a 0%, #6B2D3E 100%)',
                        border: '2px solid #E8C99B',
                        borderRadius: '16px',
                        padding: '60px 30px',
                        cursor: 'pointer',
                        boxShadow: '0 20px 50px rgba(107, 45, 62, 0.25)',
                        position: 'relative',
                        color: '#ffffff'
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Gilded Envelope flap shapes in CSS */}
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40px', borderBottom: '1px solid #E8C99B33', background: '#a2384a33' }} />

                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #E8C99B 0%, #d4a574 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 20px',
                          boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                        }}
                      >
                        <span style={{ fontSize: '1.8rem', color: '#6B2D3E' }}>🧧</span>
                      </motion.div>

                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#E8C99B', marginBottom: '8px' }}>
                        Digital Shagun Envelope
                      </h4>
                      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'rgba(251,248,241,0.8)', fontSize: '0.9rem' }}>
                        Click the wax seal to open our wedding blessing envelope
                      </p>
                    </motion.div>
                  ) : (
                    /* Open Envelope displaying UPI QR Code card */
                    <motion.div
                      key="open-envelope"
                      initial={{ scale: 0.9, opacity: 0, y: 30 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        background: '#ffffff',
                        border: '3px double #d4a574',
                        borderRadius: '16px',
                        padding: '40px 30px',
                        boxShadow: '0 25px 60px rgba(0,0,0,0.1)',
                        color: 'var(--wine-deep)'
                      }}
                    >
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '3px', color: 'var(--wine-light)', textTransform: 'uppercase', marginBottom: '6px' }}>
                        Blessings Envelope
                      </h4>
                      <h3 style={{ fontFamily: 'var(--font-script)', fontSize: '2.8rem', color: 'var(--wine)', margin: '0 0 16px', fontWeight: 400 }}>
                        Lydia & Stelin
                      </h3>

                      <div style={{ width: '40px', height: '1px', background: '#d4a574', margin: '0 auto 20px' }}></div>

                      {/* QR Placeholder code for G-Pay/PhonePe scan */}
                      <div 
                        style={{ 
                          width: '160px', 
                          height: '160px', 
                          background: '#fbf8f1', 
                          border: '1px solid #d4a57455', 
                          borderRadius: '12px', 
                          margin: '0 auto 20px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}
                      >
                        {/* High-fidelity Vector QR Symbol simulation */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', width: '80px', height: '80px', opacity: 0.7 }}>
                          <div style={{ border: '4px solid var(--wine)', width: '20px', height: '20px' }}></div>
                          <div style={{ background: 'var(--wine)', width: '20px', height: '10px', alignSelf: 'center' }}></div>
                          <div style={{ border: '4px solid var(--wine)', width: '20px', height: '20px' }}></div>
                          <div style={{ background: 'var(--wine)', width: '10px', height: '20px' }}></div>
                          <div style={{ border: '2px solid var(--wine)', width: '12px', height: '12px', margin: 'auto' }}></div>
                          <div style={{ background: 'var(--wine)', width: '20px', height: '10px' }}></div>
                          <div style={{ border: '4px solid var(--wine)', width: '20px', height: '20px' }}></div>
                          <div style={{ background: 'var(--wine)', width: '10px', height: '10px' }}></div>
                          <div style={{ background: 'var(--wine)', width: '20px', height: '20px' }}></div>
                        </div>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.5rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '12px' }}>
                          Scan to Send Blessings
                        </span>
                      </div>

                      {/* Copy UPI Option details */}
                      <div style={{ background: 'var(--ivory-warm)', border: '1px solid #d4a57433', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <div style={{ textAlign: 'left' }}>
                          <span style={{ fontSize: '0.55rem', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>
                            UPI Address
                          </span>
                          <span style={{ fontSize: '0.9rem', fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--wine-deep)' }}>
                            lydiastelin@okaxis
                          </span>
                        </div>
                        <button
                          onClick={handleCopyUpi}
                          style={{
                            background: 'var(--wine)',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 14px',
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.65rem',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            letterSpacing: '1px'
                          }}
                        >
                          {copied ? 'Copied! ✓' : 'Copy'}
                        </button>
                      </div>

                      <button
                        onClick={() => setIsEnvelopeOpen(false)}
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
                        Close Envelope
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* Special Return Gift Layout */
            <motion.div
              key="gift-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', padding: '20px 0' }}
            >
              <div style={{
                background: '#ffffff',
                border: '1.5px solid var(--champagne)',
                borderRadius: '24px',
                padding: '40px 30px',
                boxShadow: '0 20px 50px rgba(107, 45, 62, 0.05)',
                maxWidth: '500px',
                margin: '0 auto'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--champagne-light) 0%, var(--champagne) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  boxShadow: '0 8px 20px rgba(212,165,116,0.2)'
                }}>
                  <span style={{ fontSize: '2.2rem' }}>💝</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-elegant)', fontSize: '1.8rem', color: 'var(--wine)', marginBottom: '12px' }}>
                  {t('gift.title')}
                </h3>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {t('gift.desc')}
                </p>
                <div style={{
                  background: 'var(--ivory-warm)',
                  border: '1px dashed rgba(107, 45, 62, 0.2)',
                  borderRadius: '12px',
                  padding: '16px',
                  marginBottom: '10px'
                }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-display)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '4px' }}>
                    {t('gift.counterLabel')}
                  </span>
                  <span style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', fontWeight: 'bold', color: 'var(--wine-deep)' }}>
                    📍 {t('gift.counterLocation')}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
