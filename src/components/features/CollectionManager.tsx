'use client';

import React from 'react';
import { Camera, CheckCircle2, Lock } from 'lucide-react';
import { CollectionStatus, CelestialObject } from '@/types/AstroWeb.tofdan';
import { useCollectionStore } from '@/lib/store';
import { cn } from '../ui/Badge';

export function CollectionManager({ item }: { item: CelestialObject }) {
  const { collections } = useCollectionStore();
  const statusInfo = collections[item.id] || { status: CollectionStatus.AWAITING_DISCOVERY };
  const isCollected = statusInfo.status === CollectionStatus.COLLECTED;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Camera className="text-indigo-400" />
          Observation Status
        </h3>
        <span title="Read-only mode" className="flex items-center gap-1 text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded-full">
           <Lock size={12} />
           Read-only
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {/* Status Display */}
        <div
          className={cn(
            "flex w-full items-center justify-between rounded-xl border p-4 transition-all",
            isCollected 
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" 
              : "border-slate-700 bg-slate-800/50 text-slate-300"
          )}
        >
          <span className="font-medium text-lg">
            {isCollected ? "Observed" : "Awaiting Discovery"}
          </span>
          {isCollected && <CheckCircle2 className="h-6 w-6" />}
        </div>

        {/* Photo Area Display */}
        {isCollected && statusInfo.userPhotoUrl && (
           <div className="mt-2 animate-in slide-in-from-top-4 fade-in duration-300">
              <div className="relative overflow-hidden rounded-xl border border-slate-700">
                <img src={statusInfo.userPhotoUrl} alt={`Observation of ${item.name}`} className="w-full h-48 object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                   <p className="text-sm text-slate-300">Photographed by Tofdan</p>
                </div>
              </div>
             
             {statusInfo.capturedAt && (
                <p className="mt-4 text-xs text-slate-500 text-center">
                  Captured on: {new Date(statusInfo.capturedAt).toLocaleDateString()}
                </p>
             )}
           </div>
        )}
      </div>
    </div>
  );
}
