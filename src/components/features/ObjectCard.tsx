'use client';

import React from 'react';
import Link from 'next/link';
import { Telescope, CheckCircle2 } from 'lucide-react';
import { CelestialObject, CollectionStatus } from '@/types/AstroWeb.tofdan';
import { useCollectionStore } from '@/lib/store';
import { Badge, cn } from '../ui/Badge';

export function ObjectCard({ item, className }: { item: CelestialObject, className?: string }) {
  const collectionStatus = useCollectionStore((state) => state.getCollectionStatus(item.id));
  const isCollected = collectionStatus.status === CollectionStatus.COLLECTED;

  return (
    <Link href={`/object/${item.id}`} className={cn("group block", className)}>
      <div className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 transition-all hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 aspect-square sm:aspect-auto">
        
        {/* Thumbnail Area */}
        <div className="relative h-48 w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
          {isCollected && collectionStatus.userPhotoUrl ? (
            <img 
              src={collectionStatus.userPhotoUrl} 
              alt={item.name} 
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : item.imageUrl && isCollected ? (
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="text-slate-700 group-hover:text-indigo-500/30 transition-colors duration-500 scale-150 group-hover:scale-[2]">
              <Telescope strokeWidth={1} width={80} height={80} />
            </div>
          )}
          
          {/* Status Indicator overlay */}
          <div className="absolute top-3 right-3 flex items-center justify-center gap-2">
            {isCollected && (
              <div className="rounded-full bg-slate-950/80 p-1 text-emerald-500 backdrop-blur-md border border-emerald-500/20 shadow-lg">
                <CheckCircle2 size={24} className="animate-in fade-in zoom-in" />
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex items-center justify-between mb-2 gap-4">
            <h3 className="text-lg font-bold text-slate-100 truncate" title={item.name}>
              {item.name}
            </h3>
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20 whitespace-nowrap">
              {item.id}
            </span>
          </div>
          <div className="text-sm text-slate-400 mb-4 line-clamp-1">{item.type}</div>
          
          <div className="mt-auto">
            <Badge variant={isCollected ? 'success' : 'outline'} className="w-full justify-center py-1.5">
              {isCollected ? 'Collected' : 'Not Collected'}
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  );
}
