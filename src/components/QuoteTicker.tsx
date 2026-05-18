import { motion } from 'framer-motion';

const quotes = [
  "“Love is not looking at each other, but looking together in the same direction.” — Antoine de Saint-Exupéry",
  "“Grow old along with me! The best is yet to be.” — Robert Browning",
  "“Two souls with but a single thought, two hearts that beat as one.” — Friedrich Halm",
  "“To love and be loved is to feel the sun from both sides.” — David Viscott",
  "“Love is patient, love is kind. It always protects, always trusts, always hopes, always perseveres.” — 1 Corinthians 13:4-7",
  "“Where there is love there is life.” — Mahatma Gandhi"
];

export default function QuoteTicker() {
  // Duplicate the list of quotes to create a seamless infinite loop
  const duplicatedQuotes = [...quotes, ...quotes, ...quotes];

  return (
    <div 
      style={{ 
        background: 'var(--wine-deep)', 
        color: '#ffffff', 
        padding: '16px 0', 
        overflow: 'hidden', 
        whiteSpace: 'nowrap',
        borderTop: '1px solid rgba(251,248,241,0.1)',
        borderBottom: '1px solid rgba(251,248,241,0.1)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 5
      }}
    >
      {/* Decorative floral texture in background of ticker */}
      <div 
        style={{
          content: '""',
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          background: 'url(/images/floral-pattern.png) 50%/200px',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        animate={{ x: [0, -1800] }}
        transition={{
          ease: 'linear',
          duration: 40,
          repeat: Infinity
        }}
        style={{
          display: 'flex',
          gap: '50px',
          paddingRight: '50px',
          willChange: 'transform'
        }}
      >
        {duplicatedQuotes.map((quote, idx) => (
          <span 
            key={idx}
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '0.95rem', 
              fontStyle: 'italic', 
              color: 'rgba(251, 248, 241, 0.85)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '24px'
            }}
          >
            <span>{quote}</span>
            <span style={{ color: 'var(--champagne)', fontSize: '0.8rem' }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
