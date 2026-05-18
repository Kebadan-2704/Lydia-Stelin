import React, { createContext, useContext, useState } from 'react';

type Language = 'en';

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.story': 'Our Story',
    'nav.events': 'Schedule',
    'nav.venue': 'Venue',
    'nav.rsvp': 'RSVP',
    'nav.gallery': 'Gallery',
    'nav.blessings': 'Wall of Blessing',
    
    // Splash / Hero
    'hero.invite': 'Save The Date',
    'hero.title': 'Holy Matrimony',
    'hero.date': 'July 22, 2026',
    'hero.location': 'Lotus Mahal, Coimbatore',
    'hero.welcome': 'You are lovingly invited to celebrate the union of',
    
    // Countdown
    'countdown.days': 'Days',
    'countdown.hours': 'Hours',
    'countdown.minutes': 'Minutes',
    'countdown.seconds': 'Seconds',
    'countdown.anniversary': 'Holy Marriage Anniversary',
    'countdown.celebrating': 'Celebrating the journey of their covenant!',
    
    // Couple
    'couple.title': 'The Couple',
    'couple.bride': 'The Bride',
    'couple.groom': 'The Groom',
    
    // Events
    'events.title': 'Holy Union Schedule',
    'events.subtitle': 'The Celebration Schedule',
    'events.matrimony': 'Holy Matrimony',
    'events.teatime': 'High Tea & Fellowship',
    'events.reception': 'Grand Reception',
    'events.addGoogle': '+ Google',
    'events.addApple': '+ Apple',
    'events.addItinerary': 'Add Itinerary to Calendar',
    
    // Venue
    'venue.title': 'Lotus Mahal',
    'venue.directions': 'Get Directions',
    'venue.rideshare': 'Book Ride directly to Venue',
    
    // Dress Code
    'dresscode.title': 'Dress Code Palette',
    'dresscode.subtitle': 'Harmonious Wedding Aesthetics',
    'dresscode.disclaimer': 'We would love to see our guests embrace the above palette. But please remember that your comfort is what matters the most to us! Feel free to wear whatever makes you feel fantastic!',
    
    // Officiant
    'officiant.title': 'With the Blessings of',
    
    // RSVP
    'rsvp.title': 'RSVP Confirmation',
    'rsvp.subtitle': 'Holy Matrimony Confirmation',
    'rsvp.name': 'Your Name',
    'rsvp.phone': 'Phone Number',
    'rsvp.attending': 'Will you be attending?',
    'rsvp.attending.yes': 'Yes, gladly attending',
    'rsvp.attending.no': 'Regretfully declining',
    'rsvp.guests': 'Number of Guests',
    'rsvp.accommodation': 'Do you require accommodation assistance?',
    'rsvp.assistance': 'Any other assistance required',
    'rsvp.submit': 'Confirm RSVP',
    'rsvp.keepsake': 'Here is your custom RSVP invitation confirmation',
    
    // Gallery
    'gallery.title': 'Photo Gallery',
    'gallery.soon': 'Coming Soon',
    'gallery.capture': 'Help Us Capture the Moments',
    'gallery.capture.desc': 'We would absolutely love to see our wedding day through your eyes! Please share any candid photos, sweet snapshots, and memories you capture on your phones during the celebration.',
    'gallery.share': 'Share Your Photos',
    
    // Blessings
    'blessings.title': 'Wall of Blessing',
    'blessings.relationship': 'Your Relationship',
    'blessings.placeholder': 'Write your sweet scriptural blessing or words of wisdom...',
    'blessings.submit': 'Send Blessing',

    // Registry & Return Gift
    'registry.giftRegistry': 'Gift Registry',
    'registry.digitalShagun': 'Digital Shagun',
    'registry.returnGift': 'Return Gift',
    'gift.title': 'Special Return Gift',
    'gift.desc': 'As a token of our deepest love and gratitude for blessing our union, we have curated a special traditional gift box for you. Please collect it at the counter before you leave!',
    'gift.counterLabel': 'Collection Counter',
    'gift.counterLocation': 'Return Gift Counter, Main Entrance Lobby'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
