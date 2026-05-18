import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VenueSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const venueImage = section.querySelector('.venue-image-wrapper');
      const venueInfo = section.querySelector('.venue-info');
      if (!venueImage || !venueInfo) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });

      tl.fromTo(
        venueImage,
        { opacity: 0, x: -80, scale: 0.9, rotateY: 10 },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 1.2, ease: 'power3.out' }
      ).fromTo(
        venueInfo,
        { opacity: 0, x: 80 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Destination coordinates for Lotus Mahal (Kalampalayam, Coimbatore)
  const destLat = '10.9572';
  const destLng = '76.9068';
  const destName = 'Lotus Mahal, Coimbatore';

  const uberUrl = `https://m.uber.com/ul/?action=setPickup&pickup[latitude]=my_location&pickup[longitude]=my_location&dropoff[latitude]=${destLat}&dropoff[longitude]=${destLng}&dropoff[nickname]=${encodeURIComponent(destName)}`;
  const olaUrl = `https://book.olacabs.com/?pickup_name=Current%20Location&drop_lat=${destLat}&drop_lng=${destLng}&drop_name=${encodeURIComponent(destName)}`;
  // Dynamic Rapido URL routing using client-side platform detection
  const getRapidoUrl = () => {
    if (typeof window === 'undefined') return 'https://www.rapido.bike';
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/android/i.test(ua)) {
      return 'https://play.google.com/store/apps/details?id=com.rapido.passenger';
    }
    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) {
      return 'https://apps.apple.com/in/app/rapido-bike-taxi-auto-cabs/id1198464606';
    }
    return 'https://www.rapido.bike';
  };
  const rapidoUrl = getRapidoUrl();

  return (
    <section className="venue-section section" ref={sectionRef} id="venue">
      <div className="venue-content">
        <motion.div
          className="venue-image-wrapper"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5 }}
        >
          <img src="/images/venue.png" alt="Lotus Mahal, Coimbatore" loading="lazy" decoding="async" />
        </motion.div>

        <div className="venue-info">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p
              className="section-label"
              initial={{ opacity: 0, letterSpacing: '12px' }}
              whileInView={{ opacity: 1, letterSpacing: '6px' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              The Venue
            </motion.p>
            <motion.div
              className="section-ornament"
              style={{ margin: '12px 0' }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.div>

          <motion.h3
            className="venue-name"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Lotus Mahal
          </motion.h3>
          <motion.p
            className="venue-location"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: '24px' }}
          >
            Coimbatore, Tamil Nadu
          </motion.p>

          <motion.a
            href="https://maps.google.com/?q=Lotus+Mahal+Coimbatore"
            target="_blank"
            rel="noopener noreferrer"
            className="venue-map-btn"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginBottom: '30px' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Get Directions
          </motion.a>

          {/* Minimalist Rideshare Bookings bottom alignment */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{ 
              borderTop: '1px solid rgba(251,248,241,0.15)', 
              paddingTop: '20px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '12px' 
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '2px', color: 'rgba(251,248,241,0.5)', textTransform: 'uppercase' }}>
              Book Ride directly to Venue
            </span>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {/* Uber Rideshare Icon */}
              <motion.a
                href={uberUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.18, y: -3, boxShadow: '0 8px 25px rgba(0,0,0,0.5)' }}
                whileTap={{ scale: 0.95 }}
                title="Uber"
                style={{
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transition: 'transform 0.25s'
                }}
              >
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="black"/>
                  <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: '800', fontSize: '7.2px', letterSpacing: '0.2px' }}>Uber</text>
                </svg>
              </motion.a>

              {/* Ola Rideshare Icon */}
              <motion.a
                href={olaUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.18, y: -3, boxShadow: '0 8px 25px rgba(163,198,57,0.4)' }}
                whileTap={{ scale: 0.95 }}
                title="Ola"
                style={{
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transition: 'transform 0.25s'
                }}
              >
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Ola's official bright green and dark crescent circle badge */}
                  <circle cx="12" cy="12" r="12" fill="#A3C639"/>
                  <circle cx="12" cy="12" r="8" fill="black"/>
                  <circle cx="10.2" cy="12" r="4.2" fill="#A3C639"/>
                </svg>
              </motion.a>

              {/* Rapido Rideshare Icon */}
              <motion.a
                href={rapidoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.18, y: -3, boxShadow: '0 8px 25px rgba(246,196,0,0.4)' }}
                whileTap={{ scale: 0.95 }}
                title="Rapido"
                style={{
                  borderRadius: '50%',
                  width: '46px',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  transition: 'transform 0.25s'
                }}
              >
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Rapido's official vibrant yellow and black winged R badge */}
                  <circle cx="12" cy="12" r="12" fill="#F6C400"/>
                  <path d="M12 5.5C8.4 5.5 5.5 8.4 5.5 12S8.4 18.5 12 18.5 18.5 15.6 18.5 12 15.6 5.5 12 5.5ZM9.5 9.5H12.5C13.3 9.5 14 10.2 14 11C14 11.8 13.3 12.5 12.5 12.5H11V15H9.5V9.5ZM11 11H12.5C12.8 11 13 10.8 13 10.5C13 10.2 12.8 10 12.5 10H11V11Z" fill="black"/>
                  <path d="M13.5 12.5L15.5 15H17L14.7 12.2C14.3 12.4 13.9 12.5 13.5 12.5Z" fill="black"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
