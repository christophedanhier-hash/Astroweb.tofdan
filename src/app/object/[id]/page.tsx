import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Map, Star as StarIcon, Info } from 'lucide-react';
import { MOCK_OBJECTS, MOCK_CATALOGUES } from '@/lib/data/catalogs';
import { Badge } from '@/components/ui/Badge';
import { CollectionManager } from '@/components/features/CollectionManager';

export default async function ObjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const object = MOCK_OBJECTS.find(o => o.id === id);
  
  if (!object) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-100">Objet non trouvé</h1>
        <Link href="/" className="mt-4 inline-block text-indigo-400 hover:text-indigo-300 underline">Retour à l'accueil</Link>
      </div>
    );
  }

  const catalogue = MOCK_CATALOGUES.find(c => c.id === object.catalogueId);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Navigation */}
      <Link href={`/catalogues/${object.catalogueId}`} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
        <ArrowLeft size={16} />
        <span>Retour au catalogue {catalogue?.name}</span>
      </Link>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Image & Main Info) */}
        <div className="space-y-6 lg:col-span-8">
          
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary">{object.id}</Badge>
              <Badge variant="outline">{object.type}</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              {object.name}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {object.description}
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 group">
             {object.imageUrl ? (
                <img 
                  src={object.imageUrl} 
                  alt={object.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
             ) : (
                <div className="flex h-full items-center justify-center text-slate-700">
                  <StarIcon size={80} strokeWidth={1} />
                </div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
             <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Info size={16} className="text-indigo-400"/>
                  Image de référence d'archive
                </p>
             </div>
          </div>
          
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-6 lg:col-span-4 lg:sticky lg:top-24">
          
          {/* Collection Status Component */}
          <CollectionManager item={object} />

          {/* Details Panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm">
             <h3 className="mb-4 text-xl font-bold text-slate-100 flex items-center gap-2">
               <Map className="text-indigo-400" />
               Métadonnées
             </h3>
             
             <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-slate-500 mb-1">Catalogue Officiel</dt>
                  <dd className="font-medium text-slate-200">{catalogue?.name}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 mb-1">Type d'objet</dt>
                  <dd className="font-medium text-slate-200">{object.type}</dd>
                </div>
                
                {object.principalStars && object.principalStars.length > 0 && (
                  <div>
                    <dt className="text-slate-500 mb-2">Étoiles Principales</dt>
                    <dd className="flex flex-wrap gap-2">
                      {object.principalStars.map(star => (
                        <span key={star} className="inline-flex items-center rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-slate-700/50">
                          {star}
                        </span>
                      ))}
                    </dd>
                  </div>
                )}
             </dl>
          </div>

        </div>

      </div>
    </div>
  );
}
