// Google Apps Script: write to Sheets with CORS support
// 1) Create a Google Sheet with tabs: "EmailSubscriptions" and "ContactMessages"
// 2) Put the Sheet ID below
// 3) Deploy: New deployment -> Web app -> Execute as Me -> Anyone
// 4) Copy the deployment URL and paste into js/script.js

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById('YOUR_SHEET_ID'); // Replace with your Sheet ID
    const source = data.source || 'unknown';

    if (data.email && !data.name && !data.message) {
      const sheet = ss.getSheetByName('EmailSubscriptions');
      sheet.appendRow([new Date(), data.email, source]);
    } else {
      const sheet = ss.getSheetByName('ContactMessages');
      sheet.appendRow([new Date(), data.name, data.email, data.phone || '', data.message, source]);
    }

    return buildResponse({ ok: true });
  } catch (err) {
    return buildResponse({ ok: false, error: err.message });
  }
}

function doOptions() {
  return buildResponse('', ContentService.MimeType.TEXT);
}

function buildResponse(payload, mime) {
  const output = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const outMime = mime || ContentService.MimeType.JSON;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  return ContentService.createTextOutput(output).setMimeType(outMime).setHeaders(headers);
}
