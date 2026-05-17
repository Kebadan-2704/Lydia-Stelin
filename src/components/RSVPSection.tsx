import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isRsvpConfigured, submitRsvpToGoogleSheets } from '../services/rsvpService';
import type { RSVPFormData } from '../services/rsvpService';

type RSVPStatus = 'idle' | 'loading' | 'success' | 'error';

export default function RSVPSection() {
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
    <section className="rsvp-section section" id="rsvp">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="section-label" style={{ color: '#C4707F' }}>Respond</p>
        <h2 className="section-title" style={{ color: '#E8C99B' }}>RSVP</h2>
        <div className="section-ornament" />
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          color: 'rgba(251,248,241,0.6)',
          fontStyle: 'italic',
          marginTop: 12,
        }}>
          Kindly respond before July 10, 2026
        </p>
      </motion.div>

      <div className="rsvp-content">
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
            >
              <label className="sr-only" htmlFor="rsvp-name">Your full name</label>
              <input
                id="rsvp-name"
                className="rsvp-input"
                type="text"
                name="name"
                placeholder="Your Full Name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label className="sr-only" htmlFor="rsvp-phone">Phone number</label>
              <input
                id="rsvp-phone"
                className="rsvp-input"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
              />

              <label className="sr-only" htmlFor="rsvp-attending">Attendance response</label>
              <select
                id="rsvp-attending"
                className="rsvp-select"
                name="attending"
                value={formData.attending}
                onChange={handleChange}
              >
                <option value="yes">Joyfully Attending ✓</option>
                <option value="no">Regretfully Declining</option>
              </select>

              <label className="sr-only" htmlFor="rsvp-guests">Number of guests</label>
              <select
                id="rsvp-guests"
                className="rsvp-select"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5+">5+ Guests</option>
              </select>

              <label className="sr-only" htmlFor="rsvp-accommodation">Need accommodation</label>
              <select
                id="rsvp-accommodation"
                className="rsvp-select"
                name="accommodation"
                value={formData.accommodation}
                onChange={handleChange}
              >
                <option value="no">No Accommodation Needed</option>
                <option value="yes">Yes, Need a Room 🏨</option>
                <option value="maybe">Maybe, Will Confirm Later</option>
              </select>

              <label className="sr-only" htmlFor="rsvp-message">Blessing or message</label>
              <textarea
                id="rsvp-message"
                className="rsvp-input"
                name="message"
                placeholder="A blessing or message for the couple..."
                value={formData.message}
                onChange={handleChange}
                rows={3}
                style={{ resize: 'none' }}
              />

              {status === 'error' && (
                <p className="rsvp-error" role="alert">
                  {errorMessage}
                </p>
              )}

              <motion.button
                className="rsvp-submit"
                type="submit"
                whileHover={{ scale: status === 'loading' ? 1 : 1.03 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.97 }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending RSVP...' : 'Send RSVP'}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', padding: '40px 0' }}
            >
              <motion.span
                aria-hidden="true"
                style={{ fontSize: '4rem', display: 'block', marginBottom: 20 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                💌
              </motion.span>
              <h3 style={{
                fontFamily: 'var(--font-script)',
                fontSize: '2.5rem',
                color: '#E8C99B',
                marginBottom: 12,
              }}>
                Thank You!
              </h3>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.1rem',
                color: 'rgba(251,248,241,0.7)',
                lineHeight: 1.6,
              }}>
                Your response has been sent.<br />
                We look forward to celebrating with you!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
