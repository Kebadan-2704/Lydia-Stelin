# Lydia & Stelin Wedding Invitation

React + TypeScript + Vite wedding invitation for Lydia and Stelin.

## Local setup

```bash
npm install
npm run dev
```

For a production check:

```bash
npm run build
npm run preview
```

If the folder path contains `&`, Windows command shims can be awkward. These direct commands also work:

```bash
node .\node_modules\typescript\bin\tsc -b
node .\node_modules\vite\bin\vite.js build
```

## Google Sheets RSVP

The RSVP form posts to a Google Apps Script web app. Supabase is no longer used.

1. Create a Google Sheet.
2. Open `Extensions > Apps Script`.
3. Paste the contents of `scripts/google-sheets-rsvp.gs`.
4. Click `Deploy > New deployment`.
5. Choose `Web app`.
6. Set `Execute as` to `Me`.
7. Set `Who has access` to `Anyone`.
8. Deploy and copy the web app URL ending in `/exec`.
9. Create a local `.env` file from `.env.example`.
10. Put the deployment URL in `VITE_RSVP_ENDPOINT`.

Example:

```env
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_LIVE_STREAM_URL=
VITE_REGISTRY_QR_IMAGE=
VITE_REGISTRY_UPI=
```

Google Apps Script submissions use `no-cors`, so the browser cannot read the script response. For this wedding RSVP use case, that is acceptable: the form sends data to the sheet and shows success if the request is accepted by the browser.

## Optional content

- `VITE_LIVE_STREAM_URL`: enables the live stream button.
- `VITE_REGISTRY_QR_IMAGE`: image path or URL for a real payment QR code.
- `VITE_REGISTRY_UPI`: UPI ID shown in the blessing modal.

If registry values are blank, the site avoids fake payment details and shows a polite family-contact message instead.
