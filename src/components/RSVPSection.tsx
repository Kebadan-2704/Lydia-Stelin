import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isRsvpConfigured, submitRsvpToGoogleSheets } from '../services/rsvpService';
import type { RSVPFormData } from '../services/rsvpService';
import { useLanguage } from '../context/LanguageContext';

type RSVPStatus = 'idle' | 'loading' | 'success' | 'error';

export default function RSVPSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    phone: '',
    attending: 'yes',
    guests: '1',
    accommodation: 'no',
    message: '',
  });
  const [status, setStatus] = useState<RSVPStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!isRsvpConfigured()) {
      setStatus('error');
      setErrorMessage('RSVP is not connected yet. Add your Google Apps Script URL to VITE_RSVP_ENDPOINT.');
      return;
    }

    setStatus('loading');

    try {
      await submitRsvpToGoogleSheets(formData);
      setSubmitted(true);
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('We could not send your RSVP. Please try again in a moment.');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  return (
    <section className="rsvp-section section" id="rsvp" style={{ background: '#ffffff', padding: '100px 20px', position: 'relative' }}>
      
      {/* Header */}
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '50px' }}
      >
        <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          {t('rsvp.title')}
        </h2>
        <div className="section-ornament" style={{ width: '80px', height: '2px', background: 'var(--champagne)', margin: '12px auto' }} />
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 12 }}>
          Kindly respond before July 10, 2026
        </p>
      </motion.div>

      <div className="rsvp-content" style={{ maxWidth: '650px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              className="rsvp-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                background: 'var(--ivory-warm)',
                padding: '40px 30px',
                borderRadius: '24px',
                border: '1.5px solid var(--champagne)',
                boxShadow: '0 20px 40px rgba(107, 45, 62, 0.03)'
              }}
            >
              <input
                className="rsvp-input"
                type="text"
                name="name"
                placeholder={t('rsvp.name')}
                value={formData.name}
                onChange={handleChange}
                required
                style={{ padding: '14px', borderRadius: '8px', border: '1px solid rgba(107,45,62,0.2)', fontFamily: 'var(--font-serif)', outline: 'none' }}
              />

              <input
                className="rsvp-input"
                type="tel"
                name="phone"
                placeholder={t('rsvp.phone')}
                value={formData.phone}
                onChange={handleChange}
                style={{ padding: '14px', borderRadius: '8px', border: '1px solid rgba(107,45,62,0.2)', fontFamily: 'var(--font-serif)', outline: 'none' }}
              />

              <select
                className="rsvp-select"
                name="attending"
                value={formData.attending}
                onChange={handleChange}
                style={{ padding: '14px', borderRadius: '8px', border: '1px solid rgba(107,45,62,0.2)', fontFamily: 'var(--font-serif)', outline: 'none', background: '#fff', cursor: 'pointer' }}
              >
                <option value="yes">{t('rsvp.attending.yes')}</option>
                <option value="no">{t('rsvp.attending.no')}</option>
              </select>

              <select
                className="rsvp-select"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                style={{ padding: '14px', borderRadius: '8px', border: '1px solid rgba(107,45,62,0.2)', fontFamily: 'var(--font-serif)', outline: 'none', background: '#fff', cursor: 'pointer' }}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>

              <textarea
                className="rsvp-input"
                name="message"
                placeholder={t('rsvp.assistance')}
                value={formData.message}
                onChange={handleChange}
                rows={3}
                style={{ padding: '14px', borderRadius: '8px', border: '1px solid rgba(107,45,62,0.2)', fontFamily: 'var(--font-serif)', outline: 'none', resize: 'none' }}
              />

              {status === 'error' && (
                <p style={{ color: 'var(--wine)', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>
                  {errorMessage}
                </p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
                style={{
                  background: 'var(--wine)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(107,45,62,0.2)'
                }}
              >
                {status === 'loading' ? 'Confirming Attendance...' : t('rsvp.submit')}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'center' }}
            >
              
              {/* Gold Confirmation Card */}
              <div
                style={{
                  background: 'var(--ivory-warm)',
                  border: '3px double var(--champagne)',
                  borderRadius: '24px',
                  padding: '40px 30px',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
                  textAlign: 'center',
                  width: '100%',
                  position: 'relative'
                }}
              >
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '4px', color: 'var(--champagne-dark)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Invitation Confirmed
                </span>
                <h3 style={{ fontFamily: 'var(--font-script)', fontSize: '2.8rem', color: 'var(--wine)', fontWeight: 400, margin: '0 0 16px' }}>
                  Lydia & Stelin
                </h3>

                <div style={{ background: '#ffffff', border: '1px solid rgba(212,165,116,0.25)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-serif)' }}>Guest Name</span>
                  <h4 style={{ fontFamily: 'var(--font-elegant)', fontSize: '1.4rem', color: 'var(--wine)', margin: '4px 0 16px' }}>
                    {formData.name}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Status</span>
                      <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontWeight: 'bold', color: 'var(--wine-light)' }}>Joining ✓</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Total Guests</span>
                      <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontWeight: 'bold' }}>{formData.guests}</span>
                    </div>
                  </div>
                </div>

                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  "We look forward to praising God and celebrating with you in Coimbatore!"
                </p>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
