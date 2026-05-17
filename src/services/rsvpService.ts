export interface RSVPFormData {
  name: string;
  email: string;
  attending: 'yes' | 'no';
  guests: string;
  accommodation: 'yes' | 'no' | 'maybe';
  message: string;
}

const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT?.trim();

export function isRsvpConfigured() {
  return Boolean(RSVP_ENDPOINT);
}

export async function submitRsvpToGoogleSheets(formData: RSVPFormData) {
  if (!RSVP_ENDPOINT) {
    throw new Error('RSVP is not connected to Google Sheets yet.');
  }

  const payload = new URLSearchParams();
  payload.append('name', formData.name.trim());
  payload.append('email', formData.email.trim());
  payload.append('attending', formData.attending);
  payload.append('guests', formData.guests);
  payload.append('accommodation', formData.accommodation);
  payload.append('message', formData.message.trim());
  payload.append('submittedAt', new Date().toISOString());
  payload.append('pageUrl', window.location.href);
  payload.append('userAgent', navigator.userAgent);

  await fetch(RSVP_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    body: payload,
  });
}
