import { getSheetsClient } from './client';

export interface NewHireSheetRow {
  prijmeni: string;
  jmeno: string;
  soukromyMail: string;
  telefon: string;
  datum: string;
  mistoVykonu: string;
  nastup: string;
  department: string;
  pozice: string;
  formaUvazku: string;
  dieta: string;
  alergie: string;
  velikostTricka: string;
  ico: string;
  cisloUctu: string;
  iban: string;
}

export async function appendNewHireRow(data: NewHireSheetRow): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID env var is not set');
  }

  const sheets = getSheetsClient();

  const row = [
    data.prijmeni,
    data.jmeno,
    data.soukromyMail,
    data.telefon,
    data.datum,
    data.mistoVykonu,
    data.nastup,
    data.department,
    data.pozice,
    data.formaUvazku,
    data.dieta,
    data.alergie,
    data.velikostTricka,
    data.ico,
    data.cisloUctu,
    data.iban,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Přehled EXPANDO',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [row],
    },
  });
}
