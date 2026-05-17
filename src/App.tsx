import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import CoupleSection from './components/CoupleSection';
import EventsSection from './components/EventsSection';
import VenueSection from './components/VenueSection';
import DressCodeSection from './components/DressCodeSection';
import OfficiantSection from './components/OfficiantSection';
import RSVPSection from './components/RSVPSection';
import FooterSection from './components/FooterSection';
import FloatingParticles from './components/FloatingParticles';
import NoteSection from './components/NoteSection';
import GallerySection from './components/GallerySection';
import Navbar from './components/Navbar';
import BlessingsSection from './components/BlessingsSection';
import AudioPlayer from './components/AudioPlayer';


export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <SplashScreen visible={showSplash} onEnter={() => setShowSplash(false)} />

      {!showSplash && (
        <>
          <FloatingParticles />
          <Navbar />
          <AudioPlayer />
          <HeroSection />
          <CountdownSection />
          <NoteSection />
          <CoupleSection />
          <GallerySection />
          <EventsSection />
          <VenueSection />
          <DressCodeSection />
          <OfficiantSection />
          <RSVPSection />
          <BlessingsSection />
          <FooterSection />
        </>
      )}
    </>
  );
}
