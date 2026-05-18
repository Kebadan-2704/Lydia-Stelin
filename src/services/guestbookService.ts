import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface GuestWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
  audioUrl?: string;
  imageUrl?: string;
  signatureData?: string;
}

const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT?.trim();

export function subscribeToWishes(callback: (wishes: GuestWish[]) => void) {
  const q = query(collection(db, 'wishes'), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (snapshot) => {
    const wishes: GuestWish[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      wishes.push({
        id: doc.id,
        name: data.name,
        relation: data.relation,
        message: data.message,
        date: data.date,
        audioUrl: data.audioUrl,
        imageUrl: data.imageUrl,
        signatureData: data.signatureData
      });
    });
    callback(wishes);
  });
}

// Automatically compress guest images using HTML5 Canvas to keep Firestore documents tiny (< 100KB)
async function compressImage(base64Str: string, maxWidth = 500, quality = 0.5): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio while resizing
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Output compressed JPEG
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => resolve(base64Str);
  });
}

// Convert local voice recording blob to base64 string for direct database storage
async function blobUrlToBase64(blobUrl: string): Promise<string> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function submitWish(
  name: string,
  relation: string,
  message: string,
  audioUrl?: string, // Local blob URL
  imageUrl?: string, // Uploaded polaroid base64
  signatureData?: string // Handwritten signature base64
): Promise<GuestWish> {
  
  let finalAudio = '';
  let finalImage = '';
  let finalSignature = signatureData || '';

  try {
    // 1. Process voice note to base64 if present
    if (audioUrl) {
      finalAudio = await blobUrlToBase64(audioUrl);
    }
    
    // 2. Compress guest photo to ensure it fits perfectly in Firestore
    if (imageUrl) {
      finalImage = await compressImage(imageUrl);
    }

    const wishData = {
      name: name.trim(),
      relation: relation.trim() || 'Guest',
      message: message.trim(),
      date: new Date().toISOString(),
      createdAt: serverTimestamp(),
      audioUrl: finalAudio || null,
      imageUrl: finalImage || null,
      signatureData: finalSignature || null
    };

    // 3. Save directly to Cloud Firestore
    const docRef = await addDoc(collection(db, 'wishes'), wishData);

    const newWish: GuestWish = {
      id: docRef.id,
      name: wishData.name,
      relation: wishData.relation,
      message: wishData.message,
      date: wishData.date,
      audioUrl: wishData.audioUrl || undefined,
      imageUrl: wishData.imageUrl || undefined,
      signatureData: wishData.signatureData || undefined
    };

    // Optional Google Sheets Backup
    if (RSVP_ENDPOINT) {
      try {
        const payload = new URLSearchParams();
        payload.append('name', `${newWish.name} (${newWish.relation})`);
        payload.append('phone', 'WISH');
        payload.append('attending', 'wish');
        payload.append('guests', '0');
        payload.append('accommodation', 'no');
        payload.append('message', `${newWish.message} ${newWish.audioUrl ? '[Audio]' : ''} ${newWish.imageUrl ? '[Image]' : ''} ${newWish.signatureData ? '[Signature]' : ''}`);
        payload.append('submittedAt', newWish.date);
        payload.append('pageUrl', window.location.href);
        payload.append('userAgent', navigator.userAgent);

        await fetch(RSVP_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          body: payload,
        });
      } catch (err) {
        console.warn('Google Sheets wish sync paused:', err);
      }
    }

    return newWish;

  } catch (error) {
    console.error("Error saving wish:", error);
    throw error;
  }
}
