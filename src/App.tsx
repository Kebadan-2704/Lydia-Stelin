import { useState, lazy, Suspense } from 'react';
import SplashScreen from './components/SplashScreen';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';

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


export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
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
            <EventsSection />
            <OfficiantSection />
            <DressCodeSection />
            <VenueSection />
            <RSVPSection />
            <GallerySection />
            <FooterSection />
          </Suspense>
        </>
      )}
    </>
  );
}
