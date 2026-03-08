import { google } from 'googleapis';

// Use a placeholder if not set, but in production these must be present.
const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || '';
// Replace literal \n with actual newline characters
const privateKey = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

// Initialize the Google Auth client
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: clientEmail,
    private_key: privateKey,
  },
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets.readonly', // Read-only for public access
    'https://www.googleapis.com/auth/drive.readonly'         // Read-only for photo display
  ],
});

// Create instances of the APIs
export const sheets = google.sheets({ version: 'v4', auth });
export const drive = google.drive({ version: 'v3', auth });

/**
 * Helper function to fetch data from a specific Google Sheet range
 * @param spreadsheetId The ID of the Google Sheet
 * @param range The range to fetch (e.g., 'Sheet1!A1:D10')
 */
export async function getSheetData(spreadsheetId: string, range: string) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw new Error('Failed to fetch data from Google Sheets');
  }
}
