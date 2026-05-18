import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CrewMember {
  name: string;
  role: string;
  story: string;
  image: string;
}

const bridesmaids: CrewMember[] = [
  {
    name: 'Sarah Grace',
    role: 'Maid of Honor',
    story: 'Lydia\'s beloved sister and lifelong best friend. From late-night secrets in their childhood bedroom to matching harmonies in the church choir, Sarah has been Lydia\'s anchor. She is overjoyed to stand by her side as she walks into this holy covenant.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Diya Rachel',
    role: 'Bridesmaid',
    story: 'Lydia\'s college roommate and partner-in-crime. They survived late-night engineering submissions and shared endless pots of Maggi while dreaming about their future weddings. Diya brings the energy, joy, and organizing magic to the crew.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Hannah Thomas',
    role: 'Bridesmaid',
    story: 'Lydia\'s fellow church youth group leader. Bonding over gospel jam sessions, volunteering, and mutual love for Coimbatore\'s quiet hills, Hannah has been a constant source of spiritual support, wisdom, and warm hugs throughout Lydia\'s journey.',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=600'
  }
];

const groomsmen: CrewMember[] = [
  {
    name: 'Daniel Stelin',
    role: 'Best Man',
    story: 'Stelin\'s younger brother and forever confidant. Daniel has walked every path of Stelin\'s life—sharing sports matches, chaotic family trips, and deep midnight conversations. There is no one else Stelin would rather have hold the covenant rings.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Kevin Joshua',
    role: 'Groomsman',
    story: 'Stelin\'s school best buddy since grade 6. From riding bicycles through Coimbatore\'s quiet lanes to conquering university together, Kevin has been Stelin\'s most reliable pillar of support, always ready with a joke or helpful advice.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Jerome Wesley',
    role: 'Groomsman',
    story: 'Stelin\'s technical partner and college roommate. They spent years co-authoring coding scripts, mapping out startup ideas, and sharing endless conversations about theology, music, and love. Jerome brings the perfect blend of logic and celebration.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600'
  }
];

export default function MeetTheCrew() {
  const [activeTab, setActiveTab] = useState<'bridesmaids' | 'groomsmen'>('bridesmaids');
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null);

  const members = activeTab === 'bridesmaids' ? bridesmaids : groomsmen;

  return (
    <section className="crew-section section" id="crew" style={{ background: '#ffffff', position: 'relative', overflow: 'hidden', padding: '100px 20px' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        
        {/* Section Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <p className="section-label" style={{ letterSpacing: '6px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '8px' }}>
            The Fellowship
          </p>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            Meet the Crew
          </h2>
          <div className="section-ornament" style={{ width: '80px', height: '2px', background: 'var(--champagne)', margin: '12px auto' }} />
        </motion.div>

        {/* Tab Swinger */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            background: 'var(--ivory-warm)',
            border: '1px solid rgba(107, 45, 62, 0.1)',
            borderRadius: '30px',
            padding: '4px',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveTab('bridesmaids')}
              style={{
                padding: '10px 28px',
                borderRadius: '25px',
                border: 'none',
                background: activeTab === 'bridesmaids' ? 'var(--wine)' : 'transparent',
                color: activeTab === 'bridesmaids' ? 'var(--ivory)' : 'var(--text-muted)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Bridesmaids
            </button>
            <button
              onClick={() => setActiveTab('groomsmen')}
              style={{
                padding: '10px 28px',
                borderRadius: '25px',
                border: 'none',
                background: activeTab === 'groomsmen' ? 'var(--wine)' : 'transparent',
                color: activeTab === 'groomsmen' ? 'var(--ivory)' : 'var(--text-muted)',
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Groomsmen
            </button>
          </div>
        </div>

        {/* Members Grid/Slideshow */}
        <motion.div
          layout
          className="grid grid-3"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginTop: '20px'
          }}
        >
          <AnimatePresence mode="popLayout">
            {members.map((member, i) => (
              <motion.div
                key={member.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedMember(member)}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(107, 45, 62, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(107, 45, 62, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Photo frame */}
                <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="crew-image"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(107,45,62,0.4) 0%, transparent 60%)'
                  }} />
                </div>

                {/* Info details */}
                <div style={{ padding: '24px', textAlign: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: '1.2rem', marginBottom: '4px' }}>
                    {member.name}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: 'var(--champagne-dark)',
                    fontWeight: 600
                  }}>
                    {member.role}
                  </p>
                  
                  <span style={{
                    display: 'inline-block',
                    marginTop: '16px',
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '0.8rem',
                    color: 'var(--wine)',
                    textDecoration: 'underline',
                    opacity: 0.8
                  }}>
                    Read their story ✦
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Gold-lined Editorial Modal Details */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(44, 20, 29, 0.65)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'var(--ivory-warm)',
                  borderRadius: '24px',
                  border: '1.5px solid var(--champagne)',
                  maxWidth: '720px',
                  width: '100%',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  position: 'relative'
                }}
              >
                {/* Modal close button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(107, 45, 62, 0.1)',
                    border: 'none',
                    color: 'var(--wine)',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10
                  }}
                >
                  ✕
                </button>

                {/* Left Side: Photo */}
                <div style={{ height: '400px', overflow: 'hidden' }}>
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Right Side: Editorial text */}
                <div style={{ padding: '40px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: 'var(--champagne-dark)',
                    fontWeight: 600,
                    marginBottom: '8px',
                    display: 'block'
                  }}>
                    {selectedMember.role}
                  </span>
                  
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--wine)',
                    fontSize: '1.8rem',
                    marginBottom: '20px',
                    borderBottom: '1px solid rgba(107, 45, 62, 0.15)',
                    paddingBottom: '10px'
                  }}>
                    {selectedMember.name}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-body)',
                    fontSize: '0.95rem',
                    lineHeight: 1.7,
                    fontStyle: 'italic'
                  }}>
                    "{selectedMember.story}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
