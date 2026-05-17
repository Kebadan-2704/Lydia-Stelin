import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    icon: '⛪',
    time: '5:00 PM',
    name: 'Wedding Ceremony',
    desc: 'The holy matrimony solemnized in the presence of God, family, and friends.',
  },
  {
    icon: '🥂',
    time: '6:30 PM',
    name: 'Reception',
    desc: 'Join us for a joyful celebration of love, laughter, and blessings.',
  },
  {
    icon: '🍽️',
    time: '7:00 PM',
    name: 'Dinner',
    desc: 'A sumptuous feast to share, savor, and cherish together.',
  },
];

const liveStreamUrl = import.meta.env.VITE_LIVE_STREAM_URL?.trim();

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.2 + i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="events-section section" ref={sectionRef} id="events">
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
          Schedule
        </motion.p>
        <h2 className="section-title">Wedding Day</h2>
        <motion.div
          className="section-ornament"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      <div className="events-grid">
        {events.map((event, i) => (
          <motion.div
            className="event-card"
            key={event.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -12, boxShadow: '0 24px 60px rgba(107, 45, 62, 0.18)' }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="event-icon"
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.6, type: 'spring', stiffness: 300 }}
            >
              {event.icon}
            </motion.span>
            <p className="event-time">{event.time}</p>
            <p className="event-name">{event.name}</p>
            <p className="event-desc">{event.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ textAlign: 'center', marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}
      >
        <motion.a
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lydia+%26+Stelin+Wedding&dates=20260722T113000Z/20260722T163000Z&details=Join+us+for+our+wedding+celebration!&location=Lotus+Mahal,+Coimbatore"
          target="_blank"
          rel="noopener noreferrer"
          className="venue-map-btn"
          style={{ padding: '12px 24px', fontSize: '0.6rem' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📅 Add to Calendar
        </motion.a>
        {liveStreamUrl ? (
          <motion.a
            href={liveStreamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="venue-map-btn"
            style={{ padding: '12px 24px', fontSize: '0.6rem' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📹 Join Live Stream
          </motion.a>
        ) : (
          <span className="venue-map-btn venue-map-btn-disabled" aria-disabled="true" style={{ padding: '12px 24px', fontSize: '0.6rem' }}>
            📹 Live Stream Soon
          </span>
        )}
      </motion.div>
    </section>
  );
}
