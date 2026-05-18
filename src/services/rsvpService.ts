export interface RSVPFormData {
  name: string;
  phone: string;
  attending: 'yes' | 'no';
  guests: string;
  accommodation: 'yes' | 'no' | 'maybe';
  message: string;
}

const RSVP_ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT?.trim();
const WEBHOOK_ALERT_URL = import.meta.env.VITE_RSVP_WEBHOOK_URL?.trim() || 'https://discord.com/api/webhooks/1111222233334444555/sample'; // Fallback alert simulation path

export function isRsvpConfigured() {
  return Boolean(RSVP_ENDPOINT);
}

export async function submitRsvpToGoogleSheets(formData: RSVPFormData) {
  if (!RSVP_ENDPOINT) {
    throw new Error('RSVP is not connected to Google Sheets yet.');
  }

  const payload = new URLSearchParams();
  payload.append('name', formData.name.trim());
  payload.append('phone', formData.phone.trim());
  payload.append('attending', formData.attending);
  payload.append('guests', formData.guests);
  payload.append('accommodation', formData.accommodation);
  payload.append('message', formData.message.trim());
  payload.append('submittedAt', new Date().toISOString());
  payload.append('pageUrl', window.location.href);
  payload.append('userAgent', navigator.userAgent);

  // Parallel execute: POST to Google Sheets and fire instant Webhook Alert
  const sheetSubmitPromise = fetch(RSVP_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    body: payload,
  });

  const webhookPromise = (async () => {
    if (WEBHOOK_ALERT_URL && !WEBHOOK_ALERT_URL.includes('sample')) {
      try {
        await fetch(WEBHOOK_ALERT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: "Lydia & Stelin Wedding Concierge",
            avatar_url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=200",
            embeds: [{
              title: "🔔 Holy Matrimony RSVP Notification",
              description: `**${formData.name}** has submitted their confirmation status.`,
              color: formData.attending === 'yes' ? 65280 : 16711680,
              fields: [
                { name: "Name", value: formData.name, inline: true },
                { name: "Phone", value: formData.phone || "Not Provided", inline: true },
                { name: "Attendance Status", value: formData.attending === 'yes' ? "Joyfully Attending ✓" : "Regretfully Declining", inline: false },
                { name: "Total Guests", value: formData.guests, inline: true },
                { name: "Need Accommodation?", value: formData.accommodation === 'yes' ? "🏨 Yes, Required" : formData.accommodation === 'maybe' ? "🏨 To be confirmed" : "No", inline: true },
                { name: "Special Assistance Requested", value: formData.message || "None", inline: false }
              ],
              footer: { text: "Lydia & Stelin's Eternal Keepsake • Coimbatore 2026" },
              timestamp: new Date().toISOString()
            }]
          })
        });
      } catch (err) {
        console.warn('Real-time RSVP Webhook Alert failed:', err);
      }
    }
  })();

  await Promise.all([sheetSubmitPromise, webhookPromise]);
}
