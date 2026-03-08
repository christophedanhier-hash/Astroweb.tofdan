import { google } from 'googleapis';

/**
 * Helper function to fetch data from a specific Google Sheet range
 * @param spreadsheetId The ID of the Google Sheet
 * @param range The range to fetch (e.g., 'Sheet1!A1:D10')
 */
export async function getSheetData(spreadsheetId: string, range: string) {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!clientEmail || !privateKey) {
      throw new Error('Google Cloud credentials missing from environment variables');
    }

    // Initialize the Google Auth client
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets.readonly', // Read-only for public access
        'https://www.googleapis.com/auth/drive.readonly'         // Read-only for photo display
      ],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
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

