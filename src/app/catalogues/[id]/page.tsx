import React from 'react';
import Link from 'next/link';
import { Catalogue, CelestialObject } from '@/types/AstroWeb.tofdan';
import { CatalogueView } from '@/components/features/CatalogueView';
import { getSheetData } from '@/lib/google';

async function getCatalogueData(id: string): Promise<{ catalogue: Catalogue | null, objects: CelestialObject[] }> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    
    if (!spreadsheetId) {
       console.warn('CataloguePage: Spreadsheet ID missing. Using mock data.');
       const { MOCK_CATALOGUES, MOCK_OBJECTS } = await import('@/lib/data/catalogs');
       const cat = MOCK_CATALOGUES.find(c => c.id === id) || null;
       const objs = MOCK_OBJECTS.filter(o => o.catalogueId === id);
       return { catalogue: cat, objects: objs };
    }

    const [catRows, objRows] = await Promise.all([
      getSheetData(spreadsheetId, 'Catalogues!A2:E'),
      getSheetData(spreadsheetId, 'Objects!A2:H')
    ]);

    let catalogue: Catalogue | null = null;
    if (catRows) {
      const targetCat = catRows.find((row) => row[0] === id);
      if (targetCat) {
         catalogue = {
            id: targetCat[0],
            name: targetCat[1],
            description: targetCat[2],
            totalObjects: parseInt(targetCat[3]) || 0,
            iconType: targetCat[4] || 'star',
         };
      }
    }

    let objects: CelestialObject[] = [];
    if (objRows) {
      objects = objRows
        .filter((row) => row[2] === id)
        .map((row) => ({
          id: row[0],
          name: row[1],
          catalogueId: row[2],
          type: row[3],
          principalStars: row[4] ? row[4].split(',').map((s: string) => s.trim()) : [],
          description: row[5],
          imageUrl: row[6] || null,
          status: row[7] || 'AWAITING_DISCOVERY',
        }));
    }

    return { catalogue, objects };
  } catch (err) {
    console.error(`Failed to fetch catalogue data for ${id}:`, err);
    return { catalogue: null, objects: [] };
  }
}

export default async function CataloguePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const { catalogue, objects } = await getCatalogueData(id);

  if (!catalogue) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-100">Catalogue non trouvé</h1>
        <Link href="/" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300 underline">Retour à l&apos;accueil</Link>
      </div>
    );
  }

  return <CatalogueView catalogue={catalogue} objects={objects} />;
}
