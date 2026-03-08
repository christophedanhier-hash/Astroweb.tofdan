import { NextResponse } from 'next/server';
import { getSheetData } from '@/lib/google';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = 'Objects!A2:H'; 

    if (!spreadsheetId) {
      console.warn('Spreadsheet ID is missing in environment variables. Using mock data.');
      const { MOCK_OBJECTS } = await import('@/lib/data/catalogs');
      const object = MOCK_OBJECTS.find(o => o.id === id);
      return NextResponse.json({ data: object || null }, { status: object ? 200 : 404 });
    }

    const rows = await getSheetData(spreadsheetId, range);

    if (!rows || rows.length === 0) {
      return NextResponse.json({ data: null }, { status: 404 });
    }

    // Find the specific object by its ID (Column A)
    const targetRow = rows.find((row) => row[0] === id);

    if (!targetRow) {
      return NextResponse.json({ data: null }, { status: 404 });
    }

    const object = {
      id: targetRow[0],
      name: targetRow[1],
      catalogueId: targetRow[2],
      type: targetRow[3],
      principalStars: targetRow[4] ? targetRow[4].split(',').map((s: string) => s.trim()) : [],
      description: targetRow[5],
      imageUrl: targetRow[6] || null,
      status: targetRow[7] || 'AWAITING_DISCOVERY',
    };

    return NextResponse.json({ data: object });
  } catch (error) {
    console.error(`Error in /api/object/[id]:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
