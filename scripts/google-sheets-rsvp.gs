const SHEET_NAME = 'RSVPs';
const HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Attending',
  'Guests',
  'Accommodation',
  'Message',
  'Submitted At',
  'Page URL',
  'User Agent',
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = getSheet_();
    ensureHeaders_(sheet);

    const params = e.parameter || {};
    sheet.appendRow([
      new Date(),
      clean_(params.name),
      clean_(params.email),
      clean_(params.attending),
      clean_(params.guests),
      clean_(params.accommodation),
      clean_(params.message),
      clean_(params.submittedAt),
      clean_(params.pageUrl),
      clean_(params.userAgent),
    ]);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: 'Lydia and Stelin RSVP' });
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeaders_(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = firstRow.some(Boolean);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function clean_(value) {
  return String(value || '').trim();
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
