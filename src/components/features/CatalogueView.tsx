'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ObjectCard } from '@/components/features/ObjectCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { Catalogue, CelestialObject } from '@/types/AstroWeb.tofdan';

export function CatalogueView({ catalogue, objects }: { catalogue: Catalogue, objects: CelestialObject[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredObjects = useMemo(() => {
    if (!searchQuery.trim()) return objects;
    const lowerQuery = searchQuery.toLowerCase();
    return objects.filter(obj => 
      obj.name.toLowerCase().includes(lowerQuery) || 
      obj.id.toLowerCase().includes(lowerQuery) ||
      obj.type.toLowerCase().includes(lowerQuery)
    );
  }, [objects, searchQuery]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
          <ArrowLeft size={16} />
          <span>Retour aux catalogues</span>
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">{catalogue.name}</h1>
            <p className="text-slate-400 max-w-2xl">{catalogue.description}</p>
          </div>
          <div className="w-full md:w-72 shrink-0">
            <SearchBar onSearch={setSearchQuery} placeholder={`Chercher parmi ${objects.length} objets...`} />
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredObjects.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredObjects.map(obj => (
            <ObjectCard key={obj.id} item={obj} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 border-dashed py-24 text-center">
          <p className="text-slate-500 mb-2">Aucun objet ne correspond à &quot;{searchQuery}&quot;</p>
          <button onClick={() => setSearchQuery('')} className="text-indigo-400 font-medium hover:underline">
            Effacer la recherche
          </button>
        </div>
      )}
    </div>
  );
}
