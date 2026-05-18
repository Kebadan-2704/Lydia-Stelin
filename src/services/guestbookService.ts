import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

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

// Helper to extract base64 data and upload
async function uploadBase64(base64String: string, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadString(storageRef, base64String, 'data_url');
  return await getDownloadURL(storageRef);
}

// Function to upload audio blob url
async function uploadAudioBlobUrl(blobUrl: string, path: string): Promise<string> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  
  // Convert blob to base64 data url
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      try {
        const base64data = reader.result as string;
        const url = await uploadBase64(base64data, path);
        resolve(url);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function submitWish(
  name: string,
  relation: string,
  message: string,
  audioUrl?: string, // Actually a local blob URL
  imageUrl?: string, // Actually a base64 data URL
  signatureData?: string // Actually a base64 data URL
): Promise<GuestWish> {
  
  const wishId = 'w_' + Date.now();
  let uploadedAudioUrl = '';
  let uploadedImageUrl = '';
  let uploadedSignatureUrl = '';

  try {
    if (audioUrl) {
      uploadedAudioUrl = await uploadAudioBlobUrl(audioUrl, `wishes/${wishId}_audio.webm`);
    }
    if (imageUrl) {
      uploadedImageUrl = await uploadBase64(imageUrl, `wishes/${wishId}_image.jpg`);
    }
    if (signatureData) {
      uploadedSignatureUrl = await uploadBase64(signatureData, `wishes/${wishId}_signature.png`);
    }

    const wishData = {
      name: name.trim(),
      relation: relation.trim() || 'Guest',
      message: message.trim(),
      date: new Date().toISOString(),
      createdAt: serverTimestamp(),
      audioUrl: uploadedAudioUrl || null,
      imageUrl: uploadedImageUrl || null,
      signatureData: uploadedSignatureUrl || null
    };

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

    // Google Sheets Backup (Optional)
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
