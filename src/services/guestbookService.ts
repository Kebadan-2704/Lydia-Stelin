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

export function getWishes(): GuestWish[] {
  const local = localStorage.getItem('wedding_wishes');
  if (!local) {
    return [];
  }
  try {
    const parsed = JSON.parse(local) as GuestWish[];
    return [...parsed].reverse();
  } catch {
    return [];
  }
}

export async function submitWish(
  name: string,
  relation: string,
  message: string,
  audioUrl?: string,
  imageUrl?: string,
  signatureData?: string
): Promise<GuestWish> {
  const newWish: GuestWish = {
    id: 'w_user_' + Date.now(),
    name: name.trim(),
    relation: relation.trim() || 'Guest',
    message: message.trim(),
    date: new Date().toISOString(),
    audioUrl,
    imageUrl,
    signatureData
  };

  // 1. Save to LocalStorage for instant visual presence
  const currentLocal = localStorage.getItem('wedding_wishes');
  let wishesList: GuestWish[] = [];
  if (currentLocal) {
    try {
      wishesList = JSON.parse(currentLocal);
    } catch {
      wishesList = [];
    }
  }
  wishesList.push(newWish);
  localStorage.setItem('wedding_wishes', JSON.stringify(wishesList));

  // 2. Synchronize to Google Sheets via the RSVP endpoint (if configured)
  if (RSVP_ENDPOINT) {
    try {
      const payload = new URLSearchParams();
      payload.append('name', `${newWish.name} (${newWish.relation})`);
      payload.append('phone', 'WISH');
      payload.append('attending', 'wish'); // Tells sheet this is a Guestbook Entry
      payload.append('guests', '0');
      payload.append('accommodation', 'no');
      payload.append('message', `${newWish.message} ${newWish.audioUrl ? '[Audio Attached]' : ''} ${newWish.signatureData ? '[Signature Attached]' : ''}`);
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
}
