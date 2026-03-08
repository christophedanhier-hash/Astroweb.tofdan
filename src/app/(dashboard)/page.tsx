import React from 'react';
import { Share2, Sparkles } from 'lucide-react';
import { MOCK_CATALOGUES } from '@/lib/data/catalogs';
import { CatalogueCard } from '@/components/features/CatalogueCard';

export default function DashboardPage() {
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
            Votre Pokédex<br />Stellaire Personnel
          </h1>
          <p className="text-lg text-slate-400">
            Explorez l'univers, cataloguez vos observations et complétez vos collections parmi les catalogues d'astronomie les plus célèbres.
          </p>
          
          <div className="flex justify-center gap-4 pt-4">
            <button className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25">
              <span>Commencer l'exploration</span>
            </button>
            <button className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-6 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white">
              <Share2 size={18} />
              <span>Partager</span>
            </button>
          </div>
        </div>
      </section>

      {/* Catalogues Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-100">Catalogues Disponibles</h2>
            <p className="text-slate-400">Choisissez votre prochaine quête céleste.</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_CATALOGUES.map((catalogue) => (
             <CatalogueCard key={catalogue.id} catalogue={catalogue} />
          ))}
        </div>
      </section>
    </div>
  );
}
