import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const events = [
  {
    icon: '⛪',
    time: '5:00 PM',
    nameEn: 'Holy Matrimony',
    nameTa: 'புனிதத் திருமணம்',
    descEn: 'The holy matrimony solemnized in the presence of God, family, and friends.',
    descTa: 'தேவன், குடும்பத்தினர் மற்றும் நண்பர்கள் முன்னிலையில் புனிதத் திருமணம் நடைபெறும்.',
    googleUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lydia+%26+Stelin+-+Holy+Matrimony&dates=20260722T113000Z/20260722T130000Z&details=Witness+our+holy+union+in+love!&location=Lotus+Mahal,+Coimbatore',
    startTime: '20260722T113000Z',
    endTime: '20260722T130000Z'
  },
  {
    icon: '🥂',
    time: '6:30 PM',
    nameEn: 'Grand Reception',
    nameTa: 'வரவேற்பு நிகழ்ச்சி',
    descEn: 'Join us for a joyful evening celebration of love, music, and congratulations.',
    descTa: 'இசை, கொண்டாட்டம் மற்றும் வாழ்த்துகளுடன் கூடிய எங்களது திருமண வரவேற்பு நிகழ்வில் கலந்து கொள்ளுங்கள்.',
    googleUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Lydia+%26+Stelin+-+Grand+Reception&dates=20260722T130000Z/20260722T133000Z&details=Join+us+for+Grand+Reception!&location=Lotus+Mahal,+Coimbatore',
    startTime: '20260722T130000Z',
    endTime: '20260722T133000Z'
  },
  {
    icon: '🍽️',
    time: '7:00 PM',
    nameEn: 'Wedding Dinner',
    nameTa: 'திருமண விருந்து',
    descEn: 'Celebrate with us over a grand feast and delicious wedding dinner.',
    descTa: 'எங்களது பிரத்யேக திருமண விருந்தில் இணைந்து மகிழுங்கள்.',
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
  const { language } = useLanguage();
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
          {language === 'ta' ? 'நிகழ்ச்சி நிரல்' : 'Schedule'}
        </motion.p>
        <h2 className="section-title">
          {language === 'ta' ? 'திருமணத் திருநாள்' : 'Wedding Day'}
        </h2>
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
            key={event.nameEn}
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
            <p className="event-name">
              {language === 'ta' ? event.nameTa : event.nameEn}
            </p>
            <p className="event-desc">
              {language === 'ta' ? event.descTa : event.descEn}
            </p>
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
              📅 {language === 'ta' ? 'நாள்காட்டியில் சேர்க்க' : 'Add to Calendar'}
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
              📹 {language === 'ta' ? 'நேரடி ஒளிபரப்பில் இணையுங்கள்' : 'Join Live Stream'}
            </motion.a>
          ) : (
            <span className="venue-map-btn venue-map-btn-disabled" aria-disabled="true" style={{ padding: '12px 24px', fontSize: '0.65rem', opacity: 0.6 }}>
              📹 {language === 'ta' ? 'நேரடி ஒளிபரப்பு விரைவில்' : 'Live Stream Scheduled'}
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
  const { language } = useLanguage();
  const [showHurryMessage, setShowHurryMessage] = useState(false);

  const handleYoutubeClick = (e: React.MouseEvent) => {
    const weddingDate = new Date('2026-07-22T00:00:00+05:30');
    const isWeddingDayOrLater = new Date() >= weddingDate;

    if (!isWeddingDayOrLater) {
      e.preventDefault();
      setShowHurryMessage(true);
      setTimeout(() => setShowHurryMessage(false), 5000);
    } else if (liveStreamUrl) {
      window.open(liveStreamUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.open('https://youtube.com', '_blank', 'noopener,noreferrer');
    }
  };

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
        padding: '45px 30px',
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
          {language === 'ta' ? 'இணைய வழி ஒளிபரப்பு' : 'VIRTUAL ATTENDANCE PORTAL'}
        </span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: '1.4rem', marginBottom: '12px' }}>
        {language === 'ta' ? 'எங்கிருந்தும் எங்களுடன் இணைந்து கொண்டாடுங்கள்' : 'Celebrate with us from anywhere'}
      </h3>
      <p style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto 30px', lineHeight: 1.6 }}>
        {language === 'ta' 
          ? 'நீங்கள் இணையம் வழியாக எங்களது திருமணத்தில் கலந்துகொண்டு எங்களை ஆசீர்வதிக்க அன்புடன் அழைக்கிறோம்!'
          : 'We warmly invite you to join our wedding virtually and shower your blessings from the comfort of your home!'}
      </p>

      {/* Pulsing red YouTube symbol / play button */}
      <motion.div
        onClick={handleYoutubeClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ['0 10px 25px rgba(255, 0, 0, 0.05)', '0 10px 30px rgba(255, 0, 0, 0.2)', '0 10px 25px rgba(255, 0, 0, 0.05)'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '100px',
          height: '100px',
          background: 'rgba(255, 0, 0, 0.08)',
          border: '2px solid rgba(255, 0, 0, 0.3)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <svg viewBox="0 0 24 24" width="50" height="50" fill="#FF0000" style={{ filter: 'drop-shadow(0 4px 8px rgba(255, 0, 0, 0.25))' }}>
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </motion.div>

      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', height: '40px' }}>
        <AnimatePresence mode="wait">
          {!showHurryMessage ? (
            <motion.span
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {language === 'ta'
                ? 'இணைய வழி நேரடி ஒளிபரப்பைக் காண YouTube குறியீட்டை அழுத்தவும்.'
                : 'Click the YouTube icon to join our virtual broadcast.'}
            </motion.span>
          ) : (
            <motion.span
              key="warning"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              style={{ color: 'var(--wine)', fontWeight: 'bold', display: 'block' }}
            >
              ⏳ {language === 'ta'
                ? 'அவசரப்பட வேண்டாம், திருமணத்திற்கு இன்னும் நாட்கள் உள்ளன! ⏳'
                : "Don't be in a hurry, we have more days! ⏳"}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
