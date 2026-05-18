const SHEET_NAME = 'RSVPs';
const PARENT_FOLDER_NAME = 'Lydia & Stelin Wedding Vault';

const HEADERS = [
  'Timestamp',
  'Name',
  'Phone',
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
  lock.waitLock(15000);

  try {
    // Parse the JSON request body
    let requestData;
    try {
      requestData = JSON.parse(e.postData.contents);
    } catch (err) {
      // Fallback for standard URL-encoded form parameters
      requestData = e.parameter || {};
    }

    const action = requestData.action || 'rsvp';

    if (action === 'upload_photo') {
      return handlePhotoUpload_(requestData);
    }

    // Default action: RSVP Sheet Logging
    const sheet = getSheet_();
    ensureHeaders_(sheet);

    sheet.appendRow([
      new Date(),
      clean_(requestData.name),
      clean_(requestData.phone),
      clean_(requestData.attending),
      clean_(requestData.guests),
      clean_(requestData.accommodation),
      clean_(requestData.message),
      clean_(requestData.submittedAt),
      clean_(requestData.pageUrl),
      clean_(requestData.userAgent),
    ]);

    return json_({ ok: true, message: 'RSVPs updated successfully!' });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: 'Lydia and Stelin Wedding backend active!' });
}

/**
 * Handle Base64 Photo Upload directly to organized Google Drive folders
 */
function handlePhotoUpload_(data) {
  const guestName = clean_(data.guestName || 'Anonymous Guest');
  const fileName = clean_(data.fileName || 'wedding_photo.jpg');
  const fileType = clean_(data.fileType || 'image/jpeg');
  const base64Data = data.fileData; // Raw base64 string

  if (!base64Data) {
    return json_({ ok: false, error: 'No file data received' });
  }

  // 1. Get or Create the main parent folder in Google Drive
  let parentFolder = getFolder_(PARENT_FOLDER_NAME);

  // 2. Get or Create the personalized subfolder named "From - [Guest Name]"
  const subFolderName = `From - ${guestName}`;
  let guestFolder = getSubFolder_(parentFolder, subFolderName);

  // 3. Convert base64 data to blob
  const decodedData = Utilities.base64Decode(base64Data);
  const blob = Utilities.newBlob(decodedData, fileType, fileName);

  // 4. Save the file inside the guest folder
  const file = guestFolder.createFile(blob);

  return json_({
    ok: true,
    message: 'Memory saved successfully!',
    fileUrl: file.getUrl(),
    folderName: guestFolder.getName()
  });
}

function getFolder_(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}

function getSubFolder_(parentFolder, subFolderName) {
  const folders = parentFolder.getFoldersByName(subFolderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return parentFolder.createFolder(subFolderName);
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
