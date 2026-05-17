import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SoundCloudWidget {
  bind: (eventName: string, callback: () => void) => void;
  setVolume: (volume: number) => void;
  seekTo: (milliseconds: number) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

interface SoundCloudWidgetFactory {
  (iframe: HTMLIFrameElement): SoundCloudWidget;
  Events: {
    READY: string;
    FINISH: string;
    PLAY: string;
    PAUSE: string;
  };
}

interface SoundCloudApi {
  Widget: SoundCloudWidgetFactory;
}

declare global {
  interface Window {
    SC?: SoundCloudApi;
  }
}

let soundCloudApiPromise: Promise<SoundCloudApi> | null = null;

function loadSoundCloudApi() {
  if (window.SC) {
    return Promise.resolve(window.SC);
  }

  if (soundCloudApiPromise) {
    return soundCloudApiPromise;
  }

  soundCloudApiPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>('script[data-soundcloud-widget-api]');

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        if (window.SC) resolve(window.SC);
      }, { once: true });
      existingScript.addEventListener('error', () => reject(new Error('SoundCloud API failed to load.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    script.dataset.soundcloudWidgetApi = 'true';
    script.onload = () => {
      if (window.SC) {
        resolve(window.SC);
      } else {
        reject(new Error('SoundCloud API was unavailable after loading.'));
      }
    };
    script.onerror = () => reject(new Error('SoundCloud API failed to load.'));

    document.body.appendChild(script);
  });

  return soundCloudApiPromise;
}

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SoundCloudWidget | null>(null);

  useEffect(() => {
    let isCancelled = false;

    loadSoundCloudApi()
      .then((api) => {
        if (isCancelled || !iframeRef.current) return;

        const widget = api.Widget(iframeRef.current);
        widgetRef.current = widget;

        widget.bind(api.Widget.Events.READY, () => {
          widget.setVolume(50);
          widget.seekTo(74000);
          widget.play();
          setIsPlaying(true);
        });

        widget.bind(api.Widget.Events.FINISH, () => {
          widget.seekTo(74000);
          widget.play();
        });

        widget.bind(api.Widget.Events.PLAY, () => setIsPlaying(true));
        widget.bind(api.Widget.Events.PAUSE, () => setIsPlaying(false));
      })
      .catch(() => {
        setIsPlaying(false);
      });

    return () => {
      isCancelled = true;
      widgetRef.current?.pause();
      widgetRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    widgetRef.current?.toggle();
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 999
    }}>
      <iframe
        ref={iframeRef}
        title="Wedding background music"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/tiethenote/bethel-goodness-of-god-207-wedding-bridal-march&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />

      <motion.button
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        onClick={togglePlay}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.85 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, rgba(107, 45, 62, 0.95), rgba(74, 21, 37, 0.98))',
          border: '1.5px solid rgba(212, 165, 116, 0.6)',
          color: '#D4A574',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(212, 165, 116, 0.1)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ rotate: { duration: 3, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.3 } }}
              style={{
                position: 'absolute', inset: '-3px',
                borderRadius: '50%',
                border: '1.5px solid transparent',
                borderTopColor: '#D4A574',
                borderRightColor: 'rgba(212, 165, 116, 0.3)',
              }}
            />
          )}
        </AnimatePresence>

        {isPlaying ? (
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
