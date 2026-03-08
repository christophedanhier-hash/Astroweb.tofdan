import React from 'react';
import Link from 'next/link';
import { Catalogue, CelestialObject } from '@/types/AstroWeb.tofdan';
import { CatalogueView } from '@/components/features/CatalogueView';
import { headers } from 'next/headers';

async function getCatalogueData(id: string): Promise<{ catalogue: Catalogue | null, objects: CelestialObject[] }> {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
  try {
    const [catRes, objRes] = await Promise.all([
      fetch(`${protocol}://${host}/api/catalogues`, { cache: 'no-store' }),
      fetch(`${protocol}://${host}/api/objects/${id}`, { cache: 'no-store' })
    ]);
    
    let catalogue: Catalogue | null = null;
    if (catRes.ok) {
      const catJson = await catRes.json();
      catalogue = catJson.data?.find((c: Catalogue) => c.id === id) || null;
    }

    let objects: CelestialObject[] = [];
    if (objRes.ok) {
      const objJson = await objRes.json();
      objects = objJson.data || [];
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
