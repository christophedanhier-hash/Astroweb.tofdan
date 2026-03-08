import { NextResponse } from 'next/server';
import { getSheetData } from '@/lib/google';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Updated for Next.js 15+ async params
) {
  try {
    const { id } = await params;
    
    // Spreadsheet ID and Range should come from environment variables
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = 'Objects!A2:H'; // Assumes columns: ID, Name, CatalogueID, Type, PrincipalStars, Description, ImageUrl, Status

    if (!spreadsheetId) {
      console.warn('Spreadsheet ID is missing in environment variables. Using mock data.');
      const { MOCK_OBJECTS } = await import('@/lib/data/catalogs');
      const objects = MOCK_OBJECTS.filter(o => o.catalogueId === id);
      return NextResponse.json({ data: objects });
    }

    const rows = await getSheetData(spreadsheetId, range);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ data: [] });
    }

    // Filter objects by catalogue ID
    const objects = rows
      .filter((row) => row[2] === id) // Assuming CatalogueID is in column C
      .map((row) => ({
        id: row[0],
        name: row[1],
        catalogueId: row[2],
        type: row[3],
        principalStars: row[4] ? row[4].split(',').map((s: string) => s.trim()) : [],
        description: row[5],
        imageUrl: row[6] || null, // URL from Google Drive
        status: row[7] || 'AWAITING_DISCOVERY', // 'COLLECTED' or 'AWAITING_DISCOVERY'
      }));

    return NextResponse.json({ data: objects });
  } catch (error) {
    console.error(`Error in /api/objects/[id]:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
