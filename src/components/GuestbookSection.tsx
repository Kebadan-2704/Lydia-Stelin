import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWishes, submitWish } from '../services/guestbookService';
import type { GuestWish } from '../services/guestbookService';
import { useLanguage } from '../context/LanguageContext';



export default function GuestbookSection() {
  const { t } = useLanguage();
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Guest');
  const [message, setMessage] = useState('');
  
  // Audio Blessings Voice Mailbox States
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | undefined>(undefined);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Handwritten Signature Canvas States
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [signatureImg, setSignatureImg] = useState<string | undefined>(undefined);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Photo Polaroid upload State
  const [uploadedImg, setUploadedImg] = useState<string | undefined>(undefined);



  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setWishes(getWishes());
  }, []);

  // 1. Audio Blessing Recording Logic
  const startRecording = async () => {
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.warn('Microphone access denied or not supported:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // Stop all tracks on the stream to turn off mic light
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  // 2. Handwritten Signature Logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#d4a574'; // Gold Ink
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureImg(undefined);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setSignatureImg(dataUrl);
    setShowSignaturePad(false);
  };

  // 3. Guest Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedImg(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 4. Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      const added = await submitWish(name, relation, message, recordedAudio, uploadedImg, signatureImg);
      setWishes((prev) => [...prev, added]);
      setName('');
      setMessage('');
      setRelation('Guest');
      setRecordedAudio(undefined);
      setUploadedImg(undefined);
      setSignatureImg(undefined);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="guestbook-section section" id="guestbook" style={{ background: 'var(--ivory-warm)', position: 'relative', overflow: 'hidden', padding: '100px 20px' }}>
      
      {/* Dynamic Gold Lettering Header */}
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0, letterSpacing: '12px' }}
          whileInView={{ opacity: 1, letterSpacing: '6px' }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ textTransform: 'uppercase', color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '8px' }}
        >
          {t('blessings.title')}
        </motion.p>
        <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          Guestbook & Blessings
        </h2>
        <div className="section-ornament" style={{ width: '80px', height: '2px', background: 'var(--champagne)', margin: '12px auto' }} />
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        


        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'start' }}>
          
          {/* B. The Rich Interactive Submission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '40px 30px',
              border: '1.5px solid var(--champagne)',
              boxShadow: '0 20px 50px rgba(107, 45, 62, 0.05)'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', fontSize: '1.3rem', marginBottom: '24px', textAlign: 'center' }}>
              Leave a Keepsake Blessing
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(107, 45, 62, 0.15)',
                    fontFamily: 'var(--font-serif)',
                    outline: 'none',
                    background: 'var(--ivory-warm)'
                  }}
                />
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(107, 45, 62, 0.15)',
                    fontFamily: 'var(--font-serif)',
                    outline: 'none',
                    background: 'var(--ivory-warm)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Friend">Friend</option>
                  <option value="Extended Family">Extended Family</option>
                  <option value="Church Member">Church Member</option>
                  <option value="Colleague">Colleague</option>
                  <option value="Parents">Parents</option>
                  <option value="Sister">Sister</option>
                  <option value="Brother">Brother</option>
                </select>
              </div>

              <textarea
                placeholder={t('blessings.placeholder')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(107, 45, 62, 0.15)',
                  fontFamily: 'var(--font-serif)',
                  outline: 'none',
                  background: 'var(--ivory-warm)',
                  resize: 'none'
                }}
              />

              {/* Media attachments console */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                
                {/* 1. Voice mailbox microphone button */}
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '20px',
                    border: '1px solid rgba(107, 45, 62, 0.15)',
                    background: isRecording ? 'var(--wine)' : '#ffffff',
                    color: isRecording ? '#ffffff' : 'var(--wine)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    letterSpacing: '1px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
                  }}
                >
                  🎙️ {isRecording ? 'Recording (Stop)' : 'Voice Note'}
                </button>

                {/* 2. Touch Signature gold pad trigger */}
                <button
                  type="button"
                  onClick={() => setShowSignaturePad(true)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '20px',
                    border: '1px solid rgba(107, 45, 62, 0.15)',
                    background: signatureImg ? 'var(--champagne)' : '#ffffff',
                    color: signatureImg ? '#ffffff' : 'var(--wine)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    letterSpacing: '1px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  ✍️ {signatureImg ? 'Signature Attached' : 'Draw Initial'}
                </button>

                {/* 3. Photo upload polaroid trigger */}
                <label
                  style={{
                    padding: '10px 16px',
                    borderRadius: '20px',
                    border: '1px solid rgba(107, 45, 62, 0.15)',
                    background: uploadedImg ? 'var(--champagne)' : '#ffffff',
                    color: uploadedImg ? '#ffffff' : 'var(--wine)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6rem',
                    letterSpacing: '1px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  📸 {uploadedImg ? 'Photo Attached' : 'Attach Photo'}
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                </label>
              </div>

              {/* Show recorded voice player preview */}
              {recordedAudio && (
                <div style={{ background: 'var(--ivory-warm)', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>🎙️ Playback Voice Blessing</span>
                  <audio src={recordedAudio} controls style={{ width: '100%', height: '36px' }} />
                </div>
              )}

              {/* Interactive Handwritten Calligraphy Pad Modal */}
              <AnimatePresence>
                {showSignaturePad && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'fixed',
                      inset: 0,
                      zIndex: 10000,
                      background: 'rgba(44, 20, 29, 0.65)',
                      backdropFilter: 'blur(6px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '20px'
                    }}
                  >
                    <div style={{ position: 'relative', background: '#ffffff', borderRadius: '20px', border: '1.5px solid var(--champagne)', padding: '24px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => setShowSignaturePad(false)}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'none',
                          border: 'none',
                          fontSize: '1.2rem',
                          color: 'var(--wine)',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          lineHeight: 1
                        }}
                      >
                        ✕
                      </button>
                      <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--wine)', marginBottom: '16px' }}>
                        Draw your Blessing Initial
                      </h4>
                      <canvas
                        ref={canvasRef}
                        width={300}
                        height={180}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        style={{
                          border: '2px solid rgba(212,165,116,0.3)',
                          borderRadius: '12px',
                          background: 'var(--ivory-warm)',
                          cursor: 'crosshair',
                          display: 'block',
                          margin: '0 auto 20px'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button type="button" onClick={clearCanvas} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid rgba(107,45,62,0.2)', background: 'none', cursor: 'pointer' }}>
                          Clear
                        </button>
                        <button type="button" onClick={saveSignature} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'var(--wine)', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
                          Save Signature
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {showSuccess && (
                <p style={{ color: 'var(--olive-dark)', fontSize: '0.8rem', textAlign: 'center', margin: 0 }}>
                  ✓ Your keepsake blessing has been placed on the Polaroid Wall!
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: 'var(--wine)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(107,45,62,0.2)'
                }}
              >
                {isSubmitting ? 'Syncing Blessing...' : 'Submit Blessing Pass'}
              </button>
            </form>
          </motion.div>

          {/* C. The Vintage Polaroid cascading guest wall */}
          <div style={{ display: 'grid', gap: '30px' }}>
            <AnimatePresence>
              {wishes.slice(0, 30).map((wish) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ rotate: 1 }}
                  style={{
                    background: '#ffffff',
                    padding: '20px 20px 30px',
                    borderRadius: '4px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1), 0 0 2px rgba(212,165,116,0.2)',
                    border: '1px solid rgba(212,165,116,0.15)',
                    position: 'relative'
                  }}
                >
                  {/* Polaroid guest photo container */}
                  {wish.imageUrl ? (
                    <div style={{ height: '240px', overflow: 'hidden', background: '#e5e5e5', marginBottom: '16px', borderRadius: '2px' }}>
                      <img src={wish.imageUrl} alt={wish.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : null}

                  {/* Message body */}
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '0.95rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.6,
                    marginBottom: '16px'
                  }}>
                    "{wish.message}"
                  </p>

                  {/* Gold ink signatures */}
                  {wish.signatureData && wish.signatureData !== 'gold_star' ? (
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                      <img src={wish.signatureData} alt="Handwritten initials" style={{ height: '50px', objectFit: 'contain' }} />
                    </div>
                  ) : wish.signatureData === 'gold_star' ? (
                    <div style={{ fontFamily: 'var(--font-script)', color: 'var(--champagne-dark)', fontSize: '1.2rem', textAlign: 'center', marginBottom: '12px' }}>
                      ✦ Gilded star ✦
                    </div>
                  ) : null}

                  {/* Play audio blessing */}
                  {wish.audioUrl && (
                    <div style={{ marginBottom: '16px' }}>
                      <audio src={wish.audioUrl} controls style={{ width: '100%', height: '32px' }} />
                    </div>
                  )}

                  {/* Gilded polaroid footer caption */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(212,165,116,0.15)', paddingTop: '12px' }}>
                    <h4 style={{ fontFamily: 'var(--font-script)', color: 'var(--wine)', fontSize: '1.8rem', margin: 0, fontWeight: 400 }}>
                      {wish.name}
                    </h4>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                      {wish.relation}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
