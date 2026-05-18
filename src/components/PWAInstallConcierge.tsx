import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PWAInstallConcierge() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'other'>('other');

  useEffect(() => {
    // Detect mobile platform
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    // Check if app is already running in standalone mode (PWA active)
    const isStandalone = 
      (window.navigator as any).standalone || 
      window.matchMedia('(display-mode: standalone)').matches;

    if (!isStandalone) {
      if (isIos) {
        setPlatform('ios');
        // Delay display slightly to wow the user after first interactions
        setTimeout(() => setShowPrompt(true), 8000);
      } else if (isAndroid) {
        setPlatform('android');
        setTimeout(() => setShowPrompt(true), 8000);
      }
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            right: '20px',
            maxWidth: '420px',
            margin: '0 auto',
            zIndex: 99999,
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid var(--champagne)',
            borderRadius: '20px',
            padding: '24px 20px',
            boxShadow: '0 25px 50px rgba(107, 45, 62, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>📲</span>
              <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: '0.95rem', margin: 0 }}>
                Install Invitation App
              </h4>
            </div>
            <button
              onClick={handleDismiss}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '0 4px'
              }}
              aria-label="Close installation concierge"
            >
              ✕
            </button>
          </div>

          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.8rem', color: 'var(--text-body)', lineHeight: 1.5, margin: 0 }}>
            Add Lydia & Stelin's wedding card to your home screen for quick offline access, local map routing, and RSVP notifications!
          </p>

          <div style={{
            background: 'var(--ivory-warm)',
            borderRadius: '12px',
            padding: '12px 14px',
            border: '1px dashed rgba(212, 165, 116, 0.4)'
          }}>
            {platform === 'ios' ? (
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.75rem', color: 'var(--wine-light)', display: 'block', lineHeight: 1.5 }}>
                Tap the <strong>Share 📤</strong> button at the bottom of Safari, scroll down, and select <strong>Add to Home Screen ➕</strong>.
              </span>
            ) : (
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.75rem', color: 'var(--wine-light)', display: 'block', lineHeight: 1.5 }}>
                Tap Chrome's <strong>Menu ⚙️/⋮</strong> button at the top right, and select <strong>Install App</strong> or <strong>Add to Home Screen</strong>.
              </span>
            )}
          </div>

          <button
            onClick={handleDismiss}
            style={{
              background: 'var(--wine)',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: '8px',
              padding: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(107,45,62,0.1)'
            }}
          >
            Got it, thank you!
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
