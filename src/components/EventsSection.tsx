import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

const events = [
  {
    icon: '⛪',
    time: '5:00 PM',
    name: 'Holy Matrimony',
    desc: 'The holy matrimony solemnized in the presence of God, family, and friends.',
    googleUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lydia+%26+Stelin+-+Holy+Matrimony&dates=20260722T113000Z/20260722T130000Z&details=Witness+our+holy+union+in+love!&location=Lotus+Mahal,+Coimbatore',
    startTime: '20260722T113000Z',
    endTime: '20260722T130000Z'
  },
  {
    icon: '🥂',
    time: '6:30 PM',
    name: 'Grand Reception',
    desc: 'Join us for a joyful evening celebration of love, music, and congratulations.',
    googleUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lydia+%26+Stelin+-+Grand+Reception&dates=20260722T130000Z/20260722T133000Z&details=Join+us+for+Grand+Reception!&location=Lotus+Mahal,+Coimbatore',
    startTime: '20260722T130000Z',
    endTime: '20260722T133000Z'
  },
  {
    icon: '🍽️',
    time: '7:00 PM',
    name: 'Wedding Dinner',
    desc: 'Celebrate with us over a grand feast and delicious wedding dinner.',
    googleUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lydia+%26+Stelin+-+Wedding+Dinner&dates=20260722T133000Z/20260722T163000Z&details=Celebrate+the+night+away+with+us!&location=Lotus+Mahal,+Coimbatore',
    startTime: '20260722T133000Z',
    endTime: '20260722T163000Z'
  },
];

const liveStreamUrl = import.meta.env.VITE_LIVE_STREAM_URL?.trim();

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.1 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const calendarMenuRef = useRef<HTMLDivElement>(null);

  // Handle outside click to close calendar dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarMenuRef.current && !calendarMenuRef.current.contains(event.target as Node)) {
        setShowCalendarMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Single event ICS downloader
  const downloadSingleIcs = (eventName: string, eventDesc: string, startTime: string, endTime: string) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lydia Stelin Wedding//iCal Event//EN',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '-' + eventName.replace(/\s+/g, '') + '@lydiastelin2026.com',
      'DTSTAMP:20260518T000000Z',
      'DTSTART:' + startTime,
      'DTEND:' + endTime,
      'SUMMARY:Lydia & Stelin - ' + eventName,
      'DESCRIPTION:' + eventDesc,
      'LOCATION:Lotus Mahal, Coimbatore, Tamil Nadu, India',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${eventName.replace(/\s+/g, '_')}_Lydia_Stelin.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Full day event ICS downloader
  const handleIcsDownload = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Lydia Stelin Wedding//iCal Event//EN',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@lydiastelin2026.com',
      'DTSTAMP:20260518T000000Z',
      'DTSTART:20260722T113000Z', // 5:00 PM IST is 11:30 AM UTC
      'DTEND:20260722T163000Z',   // 10:00 PM IST is 4:30 PM UTC
      'SUMMARY:Lydia & Stelin Wedding Ceremony',
      'DESCRIPTION:Join us to celebrate the beautiful holy matrimony of Lydia & Stelin at Coimbatore!',
      'LOCATION:Lotus Mahal, Coimbatore, Tamil Nadu, India',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Lydia_Stelin_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCalendarMenu(false);
  };

  return (
    <section className="events-section section" ref={sectionRef} id="events" style={{ overflow: 'visible' }}>
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

      <div className="events-grid" style={{ marginBottom: '50px' }}>
        {events.map((event, i) => (
          <motion.div
            className="event-card"
            key={event.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -12, boxShadow: '0 24px 60px rgba(107, 45, 62, 0.15)' }}
            transition={{ duration: 0.4 }}
          >
            <motion.span
              className="event-icon"
              initial={{ scale: 0, rotate: -30 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6, type: 'spring', stiffness: 300 }}
            >
              {event.icon}
            </motion.span>
            <p className="event-time">{event.time}</p>
            <p className="event-name">{event.name}</p>
            <p className="event-desc">{event.desc}</p>

            {/* Individual Minimalist Add-to-Calendar triggers */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '16px', borderTop: '1px dashed #d4a57433', paddingTop: '12px' }}>
              <a 
                href={event.googleUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ fontSize: '0.65rem', color: 'var(--wine-light)', textDecoration: 'none', fontFamily: 'var(--font-display)', letterSpacing: '1px', fontWeight: 600, textTransform: 'uppercase' }}
              >
                + Google
              </a>
              <span style={{ color: '#d4a57444', fontSize: '0.65rem' }}>|</span>
              <button 
                onClick={() => downloadSingleIcs(event.name, event.desc, event.startTime, event.endTime)} 
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.65rem', color: 'var(--wine-light)', fontFamily: 'var(--font-display)', letterSpacing: '1px', fontWeight: 600, textTransform: 'uppercase', padding: 0 }}
              >
                + Apple
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Controls & Live Stream Attendance Portal */}
      <div style={{ maxWidth: '750px', margin: '0 auto', padding: '0 20px', position: 'relative' }}>
        
        {/* Core Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '40px', position: 'relative' }}>
          
          {/* Add to Calendar Dropdown Button */}
          <div ref={calendarMenuRef} style={{ position: 'relative' }}>
            <motion.button
              onClick={() => setShowCalendarMenu(!showCalendarMenu)}
              className="venue-map-btn"
              style={{ padding: '12px 24px', fontSize: '0.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📅 Add Full Itinerary
            </motion.button>
 
            <AnimatePresence>
              {showCalendarMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 5, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 20,
                    width: '200px',
                    background: '#ffffff',
                    border: '1px solid #d4a57466',
                    borderRadius: '8px',
                    boxShadow: '0 10px 30px rgba(107, 45, 62, 0.15)',
                    padding: '8px 0',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <a
                    href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lydia+%26+Stelin+Wedding&dates=20260722T113000Z/20260722T163000Z&details=Join+us+for+our+wedding+celebration!&location=Lotus+Mahal,+Coimbatore"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowCalendarMenu(false)}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.9rem',
                      color: 'var(--text-dark)',
                      padding: '10px 16px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textAlign: 'left',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f5efe0')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    Google Calendar
                  </a>
                  <button
                    onClick={handleIcsDownload}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.9rem',
                      color: 'var(--text-dark)',
                      border: 'none',
                      background: 'transparent',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      width: '100%',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f5efe0')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    Apple Calendar (iCal)
                  </button>
                  <a
                    href="https://calendar.yahoo.com/?v=60&view=d&type=20&title=Lydia+%26+Stelin+Wedding&st=20260722T113000Z&et=20260722T163000Z&desc=Join+us+for+our+wedding+celebration!&in_loc=Lotus+Mahal,+Coimbatore"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowCalendarMenu(false)}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.9rem',
                      color: 'var(--text-dark)',
                      padding: '10px 16px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textAlign: 'left',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f5efe0')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    Yahoo Calendar
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
 
          {/* Quick Stream Button */}
          {liveStreamUrl ? (
            <motion.a
              href={liveStreamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="venue-map-btn"
              style={{ padding: '12px 24px', fontSize: '0.65rem' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📹 Join Live Stream
            </motion.a>
          ) : (
            <span className="venue-map-btn venue-map-btn-disabled" aria-disabled="true" style={{ padding: '12px 24px', fontSize: '0.65rem', opacity: 0.6 }}>
              📹 Live Stream Scheduled
            </span>
          )}
        </div>
 
        {/* Dedicated Live Stream Attendance Portal Card with Timezone Calculator */}
        <LiveStreamCard liveStreamUrl={liveStreamUrl} />
      </div>
    </section>
  );
}

interface LiveStreamCardProps {
  liveStreamUrl?: string;
}

function LiveStreamCard({ liveStreamUrl }: LiveStreamCardProps) {
  const [tz, setTz] = useState('IST');

  const tzSchedule: Record<string, { matrimony: string; reception: string; dinner: string; label: string }> = {
    IST: { matrimony: '5:00 PM', reception: '6:30 PM', dinner: '7:00 PM', label: 'Indian Standard Time (Asia/Kolkata)' },
    GMT: { matrimony: '12:30 PM', reception: '2:00 PM', dinner: '2:30 PM', label: 'Greenwich Mean Time (London)' },
    EST: { matrimony: '7:30 AM', reception: '9:00 AM', dinner: '9:30 AM', label: 'Eastern Standard Time (New York)' },
    SGT: { matrimony: '7:30 PM', reception: '9:00 PM', dinner: '9:30 PM', label: 'Singapore Time (Singapore)' },
    GST: { matrimony: '3:30 PM', reception: '5:00 PM', dinner: '5:30 PM', label: 'Gulf Standard Time (Dubai)' }
  };

  const currentTimes = tzSchedule[tz] || tzSchedule.IST;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'rgba(255, 255, 255, 0.85)',
        border: '1.5px solid var(--champagne)',
        borderRadius: '24px',
        padding: '40px 30px',
        boxShadow: '0 20px 40px rgba(107, 45, 62, 0.05)',
        backdropFilter: 'blur(10px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
        <span 
          style={{ 
            background: 'var(--ivory-warm)', 
            color: 'var(--wine-light)', 
            fontSize: '0.65rem', 
            fontFamily: 'var(--font-display)', 
            fontWeight: 600, 
            letterSpacing: '2px', 
            padding: '6px 16px', 
            borderRadius: '20px', 
            border: '1px solid #d4a57433'
          }}
        >
          GLOBAL VIRTUAL PORTAL
        </span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: '1.4rem', marginBottom: '12px' }}>
        Celebrate with us from anywhere
      </h3>
      <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto 24px', lineHeight: 1.6 }}>
        If you are attending virtually, choose your local timezone below to synchronize the wedding day schedule dynamically!
      </p>

      {/* Timezone Switcher Dropdown */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--text-body)' }}>Select Timezone:</span>
        <select
          value={tz}
          onChange={(e) => setTz(e.target.value)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1.5px solid var(--champagne)',
            background: '#ffffff',
            fontFamily: 'var(--font-serif)',
            fontSize: '0.85rem',
            color: 'var(--wine)',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          <option value="IST">IST (India)</option>
          <option value="GMT">GMT (UK)</option>
          <option value="EST">EST (US East)</option>
          <option value="SGT">SGT (Singapore)</option>
          <option value="GST">GST (Gulf)</option>
        </select>
      </div>

      {/* Localized Timing Schedule list */}
      <div style={{
        maxWidth: '450px',
        margin: '0 auto 30px',
        background: 'var(--ivory-warm)',
        border: '1px dashed rgba(107, 45, 62, 0.2)',
        borderRadius: '16px',
        padding: '20px',
        textAlign: 'left'
      }}>
        <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>
          🕒 Localized Schedule ({currentTimes.label})
        </span>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(212,165,116,0.2)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--wine)' }}>⛪ Holy Matrimony</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--wine-light)' }}>{currentTimes.matrimony}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(212,165,116,0.2)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--wine)' }}>🥂 Grand Reception</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--wine-light)' }}>{currentTimes.reception}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--wine)' }}>🍽️ Wedding Dinner</span>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--wine-light)' }}>{currentTimes.dinner}</span>
        </div>
      </div>

      {liveStreamUrl ? (
        <motion.a
          href={liveStreamUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            background: 'var(--wine)',
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '14px 40px',
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(107,45,62,0.2)'
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          📹 WATCH LIVE BROADCAST
        </motion.a>
      ) : (
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Live stream link will activate right here as the ceremony starts.
        </div>
      )}
    </motion.div>
  );
}
