import { NextResponse } from 'next/server';
import { getSheetData } from '@/lib/google';

export async function GET() {
  try {
    // Spreadsheet ID and Range should come from environment variables
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = 'Catalogues!A2:E'; // Assuming headers in Row 1

    if (!spreadsheetId) {
      console.warn('Spreadsheet ID is missing in environment variables. Using mock data.');
      const { MOCK_CATALOGUES } = await import('@/lib/data/catalogs');
      return NextResponse.json({ data: MOCK_CATALOGUES });
    }

    const rows = await getSheetData(spreadsheetId, range);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ data: [] });
    }

    // Map rows to Catalogue object structure
    const catalogues = rows.map((row) => ({
      id: row[0],
      name: row[1],
      description: row[2],
      totalObjects: parseInt(row[3]) || 0,
      iconType: row[4] || 'star', // 'telescope', 'star', etc.
    }));

    return NextResponse.json({ data: catalogues });
  } catch (error) {
    console.error('Error in /api/catalogues:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
