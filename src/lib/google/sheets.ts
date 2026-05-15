import { getSheetsClient } from './client';

export interface NewHireSheetRow {
  prijmeni: string;
  jmeno: string;
  birth_date: string;
  personal_email: string;
  phone: string;
  nastup: string;
  department: string;
  pozice: string;
  company?: string;
  address?: string;
  linkedin?: string;
  ico?: string;
  bank_account?: string;
  dietary_restrictions?: string;
  food_allergies?: string;
  tshirt_size?: string;
}

export async function appendNewHireRow(data: NewHireSheetRow): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID env var is not set');
  }

  const sheets = getSheetsClient();

  // 1. Get all values in column A to find the "PŘED NÁSTUPEM" section header
  const colA = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Přehled EXPANDO!A:A',
  });

  const colAValues = colA.data.values ?? [];
  const headerRowIndex = colAValues.findIndex(
    (r) => typeof r[0] === 'string' && r[0].includes('PŘED NÁSTUPEM')
  );
  if (headerRowIndex === -1) {
    throw new Error('Could not find "PŘED NÁSTUPEM" row in column A');
  }

  // Sheets API uses 0-based indexes; the new row goes right after the header
  const insertAfterIndex = headerRowIndex; // 0-based row index of "PŘED NÁSTUPEM"
  const targetRow = insertAfterIndex + 2;  // 1-based row number of the new row

  // 2. Resolve the sheetId for batchUpdate (different from the spreadsheet ID)
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === 'Přehled EXPANDO'
  );
  if (!sheet || sheet.properties?.sheetId == null) {
    throw new Error('Could not find sheet "Přehled EXPANDO"');
  }
  const sheetId = sheet.properties.sheetId;

  // Build row here so formulas can reference the resolved targetRow
  const n = targetRow;
  const row = [
    data.prijmeni.toUpperCase(),                              // A  PŘÍJMENÍ
    data.jmeno,                                             // B  JMÉNO
    '',                                                     // C  POHLAVÍ (manual)
    `=TEXT(DATEVALUE(F${n});"D. M. ")`,                     // D  DATUM
    `=YEAR(DATEVALUE(F${n}))`,                             // E  ROČNÍK
    data.birth_date,                                        // F  date of birth (YYYY-MM-DD)
    `=DATEDIF(DATEVALUE(F${n});TODAY();"Y")`,              // G  věk
    data.personal_email,                                    // H  SOUKROMÝ MAIL
    data.phone,                                             // I  TELEFON
    '',                                                     // J  PRACOVNÍ MAIL (manual)
    '',                                                     // K  MÍSTO VÝKONU (manual)
    '',                                                     // L  ÚVAZEK (manual)
    '',                                                     // M  FTE (manual)
    '',                                                     // N  FORMA ÚVAZKU (manual)
    new Date(data.nastup).toLocaleDateString('cs-CZ', { day: '2-digit', month: '2-digit', year: 'numeric' }), // O  NÁSTUP
    `=DATEDIF(O${n};TODAY();"Y")`,                         // P  počet let
    data.department,                                        // Q  DEPARTMENT
    data.pozice,                                            // R  POZICE
    data.company ?? 'AGENCY',                               // S  COMPANY
    '',                                                     // T  POZNÁMKY (manual)
    '',                                                     // U  DATUM UKONČENÍ (manual)
    '',                                                     // V  ZOHO (manual)
    '',                                                     // W  BOZP (manual)
    '',                                                     // X  SML (manual)
    '',                                                     // Y  (empty)
    '',                                                     // Z  měsíců (formula)
    '',                                                     // AA kancelář (manual)
    data.address ?? '',                                     // AB address
    data.linkedin ?? '',                                    // AC linkedin
    data.ico ?? '',                                         // AD ico
    data.bank_account ?? '',                                // AE bank_account
    data.dietary_restrictions ?? '',                        // AF dietary_restrictions
    data.food_allergies ?? '',                              // AG food_allergies
    data.tshirt_size ?? '',                                 // AH tshirt_size
  ];

  // 3. Insert a blank row after "PŘED NÁSTUPEM"
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          insertDimension: {
            range: {
              sheetId,
              dimension: 'ROWS',
              startIndex: insertAfterIndex + 1, // 0-based, insert after header row
              endIndex: insertAfterIndex + 2,
            },
            inheritFromBefore: false,
          },
        },
      ],
    },
  });

  // 4. Write data and formulas into the newly inserted row
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Přehled EXPANDO!A${targetRow}:AH${targetRow}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  });

  // 5. Apply formatting to the new row
  const rowStart = targetRow - 1; // 0-based
  const rowEnd = targetRow;

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        // Yellow background (#FFE598) across A–BE (cols 0–56)
        {
          repeatCell: {
            range: { sheetId, startRowIndex: rowStart, endRowIndex: rowEnd, startColumnIndex: 0, endColumnIndex: 57 },
            cell: { userEnteredFormat: { backgroundColor: { red: 1.0, green: 0.898, blue: 0.596 } } },
            fields: 'userEnteredFormat.backgroundColor',
          },
        },
        // Bold on A (PŘÍJMENÍ, col 0)
        {
          repeatCell: {
            range: { sheetId, startRowIndex: rowStart, endRowIndex: rowEnd, startColumnIndex: 0, endColumnIndex: 1 },
            cell: { userEnteredFormat: { textFormat: { bold: true } } },
            fields: 'userEnteredFormat.textFormat.bold',
          },
        },
        // Remove bold from B–P (cols 1–15)
        {
          repeatCell: {
            range: { sheetId, startRowIndex: rowStart, endRowIndex: rowEnd, startColumnIndex: 1, endColumnIndex: 16 },
            cell: { userEnteredFormat: { textFormat: { bold: false } } },
            fields: 'userEnteredFormat.textFormat.bold',
          },
        },
        // Bold on Q (DEPARTMENT, col 16)
        {
          repeatCell: {
            range: { sheetId, startRowIndex: rowStart, endRowIndex: rowEnd, startColumnIndex: 16, endColumnIndex: 17 },
            cell: { userEnteredFormat: { textFormat: { bold: true } } },
            fields: 'userEnteredFormat.textFormat.bold',
          },
        },
        // Remove bold from R–BE (cols 17–56)
        {
          repeatCell: {
            range: { sheetId, startRowIndex: rowStart, endRowIndex: rowEnd, startColumnIndex: 17, endColumnIndex: 57 },
            cell: { userEnteredFormat: { textFormat: { bold: false } } },
            fields: 'userEnteredFormat.textFormat.bold',
          },
        },
        // Clip overflow on AC (LINKEDIN, col 28)
        {
          repeatCell: {
            range: { sheetId, startRowIndex: rowStart, endRowIndex: rowEnd, startColumnIndex: 28, endColumnIndex: 29 },
            cell: { userEnteredFormat: { wrapStrategy: 'CLIP' } },
            fields: 'userEnteredFormat.wrapStrategy',
          },
        },
      ],
    },
  });
}
