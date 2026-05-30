import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToWishes, submitWish } from '../services/guestbookService';
import type { GuestWish } from '../services/guestbookService';
import { useLanguage } from '../context/LanguageContext';

const relations = [
  { value: 'Aunt', labelEn: 'Aunt', labelTa: 'அத்தை' },
  { value: 'Brother', labelEn: 'Brother', labelTa: 'சகோதரன்' },
  { value: 'Church Member', labelEn: 'Church Member', labelTa: 'சபை உறுப்பினர்' },
  { value: 'Colleague', labelEn: 'Colleague', labelTa: 'உடன் பணிபுரிபவர்' },
  { value: 'Cousin', labelEn: 'Cousin', labelTa: 'உறவினர் (Cousin)' },
  { value: 'Extended Family', labelEn: 'Extended Family', labelTa: 'நெருங்கிய உறவினர்' },
  { value: 'Friend', labelEn: 'Friend', labelTa: 'நண்பர்' },
  { value: 'Grandparents', labelEn: 'Grandparents', labelTa: 'தாத்தா / பாட்டி' },
  { value: 'Guest', labelEn: 'Guest', labelTa: 'விருந்தினர்' },
  { value: 'Nephew', labelEn: 'Nephew', labelTa: 'மருமகன்' },
  { value: 'Niece', labelEn: 'Niece', labelTa: 'மருமகள்' },
  { value: 'Parents', labelEn: 'Parents', labelTa: 'பெற்றோர்' },
  { value: 'Sister', labelEn: 'Sister', labelTa: 'சகோதரி' },
  { value: 'Uncle', labelEn: 'Uncle', labelTa: 'மாமா' },
  { value: 'Well Wisher', labelEn: 'Well Wisher', labelTa: 'நலவிரும்பி' },
];

export default function GuestbookSection() {
  const { t } = useLanguage();
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Friend');
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
    const unsubscribe = subscribeToWishes(setWishes);
    return () => unsubscribe();
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
      await submitWish(name, relation, message, recordedAudio, uploadedImg, signatureImg);
      setName('');
      setMessage('');
      setRelation('Friend');
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

  // Small random rotations for pinned-to-wall feel
  const getCardRotation = (index: number) => {
    const rotations = [-1.5, 0.8, -0.5, 1.2, -1, 0.3, 1.5, -0.8, 0.6, -1.2];
    return rotations[index % rotations.length];
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
        <h2 className="section-title" style={{ fontFamily: 'var(--font-script)', color: 'var(--wine)', fontSize: 'clamp(3rem, 6vw, 4rem)' }}>
          Wall of Blessing
        </h2>
        <div className="section-ornament" style={{ width: '80px', height: '2px', background: 'var(--champagne)', margin: '12px auto' }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* ── 3-Column Wall: Blessings surround the Form ── */}
        <div className="blessing-wall-grid">

          {/* LEFT COLUMN — Blessing cards */}
          <div className="blessing-wall-col">
            {wishes.slice(0, 30).filter((_, i) => i % 3 === 0).map((wish, idx) => {
              const originalIndex = idx * 3;
              return renderBlessingCard(wish, originalIndex);
            })}
          </div>

          {/* CENTER COLUMN — Form at top, then blessing cards below */}
          <div className="blessing-wall-col blessing-wall-col-center">
            {/* Centered Submission Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                background: '#ffffff',
                borderRadius: '24px',
                padding: '36px 30px',
                border: '1.5px solid var(--champagne)',
                boxShadow: '0 20px 50px rgba(107, 45, 62, 0.05)',
                marginBottom: '24px'
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
                      background: 'var(--ivory-warm)',
                      width: '100%',
                      boxSizing: 'border-box'
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
                      cursor: 'pointer',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    {relations.map((rel) => (
                      <option key={rel.value} value={rel.value}>
                        {rel.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  placeholder={t('blessings.placeholder')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={3}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    border: '1px solid rgba(107, 45, 62, 0.15)',
                    fontFamily: 'var(--font-serif)',
                    outline: 'none',
                    background: 'var(--ivory-warm)',
                    resize: 'none',
                    width: '100%',
                    boxSizing: 'border-box'
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
                  {isSubmitting ? 'Syncing Blessing...' : t('blessings.submit')}
                </button>
              </form>
            </motion.div>

            {/* Center column blessing cards (below the form) */}
            {wishes.slice(0, 30).filter((_, i) => i % 3 === 1).map((wish, idx) => {
              const originalIndex = idx * 3 + 1;
              return renderBlessingCard(wish, originalIndex);
            })}
          </div>

          {/* RIGHT COLUMN — Blessing cards */}
          <div className="blessing-wall-col">
            {wishes.slice(0, 30).filter((_, i) => i % 3 === 2).map((wish, idx) => {
              const originalIndex = idx * 3 + 2;
              return renderBlessingCard(wish, originalIndex);
            })}
          </div>

        </div>

        {/* Empty state when no blessings yet */}
        {wishes.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              marginTop: '20px'
            }}
          >
            Be the first to leave a blessing on the wall ✨
          </motion.p>
        )}

      </div>

      {/* Responsive wall grid CSS */}
      <style>{`
        .blessing-wall-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr 1fr;
          gap: 24px;
          align-items: start;
        }
        .blessing-wall-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        @media (max-width: 900px) {
          .blessing-wall-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .blessing-wall-col-center {
            order: -1;
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 580px) {
          .blessing-wall-grid {
            grid-template-columns: 1fr !important;
          }
          .blessing-wall-col-center {
            order: -1;
          }
        }
      `}</style>
    </section>
  );

  // ── Reusable blessing card renderer ──
  function renderBlessingCard(wish: GuestWish, index: number) {
    return (
      <motion.div
        key={wish.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, rotate: getCardRotation(index) }}
        whileHover={{ rotate: 0, scale: 1.03, zIndex: 10, boxShadow: '0 25px 60px rgba(107, 45, 62, 0.15)' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        style={{
          background: '#ffffff',
          padding: '20px 20px 28px',
          borderRadius: '6px',
          boxShadow: '0 8px 28px rgba(0,0,0,0.08), 0 0 1px rgba(212,165,116,0.3)',
          border: '1px solid rgba(212,165,116,0.15)',
          position: 'relative',
          cursor: 'default',
          transformOrigin: 'center center',
        }}
      >
        {/* Decorative pin dot at top center */}
        <div style={{
          position: 'absolute',
          top: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--champagne), var(--wine))',
          boxShadow: '0 2px 6px rgba(107, 45, 62, 0.3)',
          zIndex: 2
        }} />

        {/* Polaroid guest photo container */}
        {wish.imageUrl ? (
          <div style={{ overflow: 'hidden', background: '#e5e5e5', marginBottom: '16px', borderRadius: '3px' }}>
            <img src={wish.imageUrl} alt={wish.name} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
          </div>
        ) : null}

        {/* Message body */}
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '0.9rem',
          color: 'var(--text-body)',
          lineHeight: 1.65,
          marginBottom: '16px',
          wordBreak: 'break-word',
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
          <h4 style={{ fontFamily: 'var(--font-script)', color: 'var(--wine)', fontSize: '1.6rem', margin: 0, fontWeight: 400 }}>
            {wish.name}
          </h4>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.55rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            {wish.relation}
          </span>
        </div>
      </motion.div>
    );
  }
}

