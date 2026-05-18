import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
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
  },
  ta: {
    // Navbar
    'nav.home': 'முகப்பு',
    'nav.story': 'எங்கள் கதை',
    'nav.events': 'நிகழ்வுகள்',
    'nav.venue': 'இடம்',
    'nav.rsvp': 'பதிவு',
    'nav.gallery': 'புகைப்படங்கள்',
    'nav.blessings': 'வாழ்த்துச் சுவர்',
    
    // Splash / Hero
    'hero.invite': 'தேதியை சேமிக்கவும்',
    'hero.title': 'புனிதத் திருமணம்',
    'hero.date': 'ஜூலை 22, 2026',
    'hero.location': 'லோட்டஸ் மஹால், கோயம்புத்தூர்',
    'hero.welcome': 'இணை சேரும் திருமண விழாவிற்கு உங்களை அன்போடு அழைக்கிறோம்',
    
    // Countdown
    'countdown.days': 'நாட்கள்',
    'countdown.hours': 'மணிகள்',
    'countdown.minutes': 'நிமிடங்கள்',
    'countdown.seconds': 'நொடிகள்',
    'countdown.anniversary': 'புனித திருமண ஆண்டுவிழா',
    'countdown.celebrating': 'அவர்களின் உடன்படிக்கையின் பயணத்தை கொண்டாடுகிறோம்!',
    
    // Couple
    'couple.title': 'மணமக்கள்',
    'couple.bride': 'மணமகள்',
    'couple.groom': 'மணமகன்',
    
    // Events
    'events.title': 'திருமண நிகழ்வுகள்',
    'events.subtitle': 'கொண்டாட்டங்களின் அட்டவணை',
    'events.matrimony': 'புனிதத் திருமணம்',
    'events.teatime': 'மாலை தேநீர் & அரட்டை',
    'events.reception': 'வரவேற்பு நிகழ்ச்சி',
    'events.addGoogle': '+ கூகுள்',
    'events.addApple': '+ ஆப்பிள்',
    'events.addItinerary': 'நாட்காட்டியில் சேர்க்கவும்',
    
    // Venue
    'venue.title': 'லோட்டஸ் மஹால்',
    'venue.directions': 'வழித்தடம் காண்க',
    'venue.rideshare': 'வாகனம் முன்பதிவு செய்க',
    
    // Dress Code
    'dresscode.title': 'ஆடை நெறிமுறை',
    'dresscode.subtitle': 'இணக்கமான திருமண நிறங்கள்',
    'dresscode.disclaimer': 'எங்கள் விருந்தினர்கள் மேற்கண்ட வண்ண ஆடைகளை அணிந்து வருவதை நாங்கள் விரும்புகிறோம். ஆனால் உங்கள் வசதியே எங்களுக்கு மிகவும் முக்கியம்! உங்களுக்கு வசதியான எந்த ஒரு அழகான ஆடையையும் தாராளமாக அணியலாம்!',
    
    // Officiant
    'officiant.title': 'அன்பின் ஆசீர்வாதங்களுடன்',
    
    // RSVP
    'rsvp.title': 'திருமண உறுதிப்படுத்துதல்',
    'rsvp.subtitle': 'புனித திருமண வருகை உறுதி',
    'rsvp.name': 'உங்கள் பெயர்',
    'rsvp.phone': 'தொலைபேசி எண்',
    'rsvp.attending': 'திருமணத்திற்கு வருகை தருவீர்களா?',
    'rsvp.attending.yes': 'ஆம், மகிழ்ச்சியுடன் வருகிறேன்',
    'rsvp.attending.no': 'வர இயலாமைக்கு வருந்துகிறேன்',
    'rsvp.guests': 'விருந்தினர்களின் எண்ணிக்கை',
    'rsvp.accommodation': 'தங்கும் வசதி உதவி தேவையா?',
    'rsvp.assistance': 'வேறு ஏதேனும் உதவிகள் தேவைப்படின்',
    'rsvp.submit': 'வருகையை உறுதிசெய்',
    'rsvp.keepsake': 'உங்கள் வருகை உறுதிசெய்யப்பட்டது',
    
    // Gallery
    'gallery.title': 'புகைப்பட தொகுப்பு',
    'gallery.soon': 'விரைவில் வெளியிடப்படும்',
    'gallery.capture': 'நினைவுகளை சேகரிக்க உதவவும்',
    'gallery.capture.desc': 'எங்கள் திருமண நாளை உங்கள் கண்களின் வழியே காண ஆசைப்படுகிறோம்! விழாவின் போது நீங்கள் எடுக்கும் அழகான புகைப்படங்களை எங்களோடு பகிர்ந்து கொள்ளுங்கள்.',
    'gallery.share': 'புகைப்படங்களை பகிர்க',
    
    // Blessings
    'blessings.title': 'வாழ்த்துச் சுவர்',
    'blessings.relationship': 'உறவுமுறை',
    'blessings.placeholder': 'உங்கள் அன்பான ஆசீர்வாதம் அல்லது அறிவுரைகளை எழுதவும்...',
    'blessings.submit': 'வாழ்த்து அனுப்புக',

    // Registry & Return Gift
    'registry.giftRegistry': 'அன்பளிப்பு பட்டியல்',
    'registry.digitalShagun': 'டிஜிட்டல் ஷகுன்',
    'registry.returnGift': 'நன்றிப் பரிசு',
    'gift.title': 'சிறப்பு நன்றிப் பரிசு',
    'gift.desc': 'எங்கள் திருமணத்தை ஆசீர்வதித்தமைக்கு எங்கள் அன்பின் மற்றும் நன்றியின் அடையாளமாக, நாங்கள் உங்களுக்காக ஒரு சிறப்பு பாரம்பரிய நன்றிப் பரிசுப் பெட்டியைத் தயாரித்துள்ளோம். தயவுசெய்து கிளம்புவதற்கு முன் கவுண்டரில் பெற்றுக்கொள்ளவும்!',
    'gift.counterLabel': 'பெறுமிடம்',
    'gift.counterLocation': 'நன்றிப் பரிசு கவுண்டர், முக்கிய நுழைவாயில் மண்டபம்'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from local storage if available
  useEffect(() => {
    const savedLang = localStorage.getItem('wedding_lang') as Language;
    if (savedLang === 'en' || savedLang === 'ta') {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('wedding_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
