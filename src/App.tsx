import { useState, lazy, Suspense } from 'react';
import SplashScreen from './components/SplashScreen';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import { LanguageProvider } from './context/LanguageContext';

const CountdownSection = lazy(() => import('./components/CountdownSection'));
const CoupleSection = lazy(() => import('./components/CoupleSection'));
const EventsSection = lazy(() => import('./components/EventsSection'));
const VenueSection = lazy(() => import('./components/VenueSection'));
const DressCodeSection = lazy(() => import('./components/DressCodeSection'));
const OfficiantSection = lazy(() => import('./components/OfficiantSection'));
const RSVPSection = lazy(() => import('./components/RSVPSection'));
const FooterSection = lazy(() => import('./components/FooterSection'));
const FloatingParticles = lazy(() => import('./components/FloatingParticles'));
const NoteSection = lazy(() => import('./components/NoteSection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const GuestbookSection = lazy(() => import('./components/GuestbookSection'));
const QuoteTicker = lazy(() => import('./components/QuoteTicker'));
const MeetTheCrew = lazy(() => import('./components/MeetTheCrew'));


export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <LanguageProvider>
      <SplashScreen visible={showSplash} onEnter={() => setShowSplash(false)} />

      {!showSplash && (
        <>
          <Navbar />
          <AudioPlayer />
          <HeroSection />
          
          <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
            <FloatingParticles />
            <CountdownSection />
            <NoteSection />
            <CoupleSection />
            <MeetTheCrew />
            <EventsSection />
            <QuoteTicker />
            <OfficiantSection />
            <DressCodeSection />
            <VenueSection />
            <RSVPSection />
            <GallerySection />
            <GuestbookSection />
            <FooterSection />
          </Suspense>
        </>
      )}
    </LanguageProvider>
  );
}
