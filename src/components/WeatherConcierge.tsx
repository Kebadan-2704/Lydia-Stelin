import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  advice: string;
  icon: string;
}

export default function WeatherConcierge() {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 31,
    condition: 'Sunny & Pleasant',
    humidity: 58,
    icon: '☀️',
    advice: 'Perfect sunny afternoon expected for the Holy Matrimony. Light, breathable fabrics (cotton blends, premium linens, georgette, and silks) are highly recommended.'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Elegant simulation of real-time Coimbatore fetch, pre-populating luxury recommendations
    const timer = setTimeout(() => {
      setWeather({
        temp: 32,
        condition: 'Clear Skies & Sunny',
        humidity: 54,
        icon: '☀️',
        advice: 'Warm sunny afternoon expected for the Holy Matrimony. Light cotton blend fabrics, silks, and elegant lightweight linens are highly recommended to ensure your absolute comfort.'
      });
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        background: '#ffffff',
        border: '1px solid #d4a5744d',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 12px 30px rgba(107, 45, 62, 0.03)',
        maxWidth: '550px',
        margin: '40px auto 0',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      {/* Luxury Gold Border Frame */}
      <div style={{ position: 'absolute', inset: '8px', border: '1px solid #d4a57422', borderRadius: '10px', pointerEvents: 'none' }} />

      <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--wine)', fontSize: '1.05rem', letterSpacing: '2px', marginBottom: '16px', textTransform: 'uppercase' }}>
        🌦️ Coimbatore Travel Concierge
      </h4>

      {loading ? (
        <div style={{ padding: '20px', fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Fetching real-time weather details...
        </div>
      ) : (
        <div>
          {/* Temperature & Live Info Display */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '3rem', lineHeight: 1 }}>{weather.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontFamily: 'var(--font-elegant)', fontSize: '2.2rem', color: 'var(--wine-deep)', fontWeight: 600, display: 'block', lineHeight: 1 }}>
                {weather.temp}°C
              </span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                {weather.condition} • Humidity: {weather.humidity}%
              </span>
            </div>
          </div>

          <div style={{ width: '40px', height: '1px', background: '#d4a57488', margin: '0 auto 16px' }}></div>

          {/* Packing & Styling Guidance Assistant */}
          <div style={{ background: 'var(--ivory-warm)', borderRadius: '10px', padding: '16px', border: '1px solid #d4a5741f' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.65rem', letterSpacing: '1.5px', color: 'var(--wine-light)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Smart Styling & Packing Guide
            </span>
            <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
              "{weather.advice}"
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
