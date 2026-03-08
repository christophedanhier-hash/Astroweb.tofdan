import React from 'react';
import { Sparkles } from 'lucide-react';
import { CatalogueCard } from '@/components/features/CatalogueCard';
import { ShareButton } from '@/components/features/ShareButton';
import { Catalogue } from '@/types/AstroWeb.tofdan';
import { headers } from 'next/headers';

async function getCatalogues(): Promise<Catalogue[]> {
  // Using absolute URL for server-side fetching
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
  try {
    const res = await fetch(`${protocol}://${host}/api/catalogues`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.error("Failed to fetch catalogues:", err);
    return [];
  }
}

export default async function DashboardPage() {
  const catalogues = await getCatalogues();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-indigo-500/5 px-6 py-16 sm:px-12 sm:py-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900/0 to-slate-900/0"></div>
        
        <div className="relative z-10 mx-auto max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
            <Sparkles size={16} />
            <span>Bienvenue sur AstroWeb.tofdan</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
            Mon Pokédex<br />Stellaire Personnel
          </h1>
          <p className="text-lg text-slate-400">
            Explorez ma collection personnelle d&apos;observations astronomiques, documentées à travers les catalogues les plus célèbres de l&apos;univers.
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
            <ShareButton />
          </div>
        </div>
      </section>

      {/* Catalogues Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-100">Catalogues Explorés</h2>
            <p className="text-slate-400">Découvrez les objets célestes que j&apos;ai capturés.</p>
          </div>
        </div>

        {catalogues.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {catalogues.map((catalogue) => (
               <CatalogueCard key={catalogue.id} catalogue={catalogue} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-slate-800 rounded-xl bg-slate-900/50">
            <p className="text-slate-400">En attente de connexion avec Google Sheets...</p>
          </div>
        )}
      </section>
    </div>
  );
}
