'use client';

import React, { useState } from 'react';
import { Camera, Upload, Trash2, CheckCircle2 } from 'lucide-react';
import { CollectionStatus, CelestialObject } from '@/types/AstroWeb.tofdan';
import { useCollectionStore } from '@/lib/store';
import { cn } from '../ui/Badge';

export function CollectionManager({ item }: { item: CelestialObject }) {
  const { collections, toggleCollectionStatus } = useCollectionStore();
  const statusInfo = collections[item.id] || { status: CollectionStatus.AWAITING_DISCOVERY };
  const isCollected = statusInfo.status === CollectionStatus.COLLECTED;

  const [isUploading, setIsUploading] = useState(false);

  const handleToggle = () => {
    // In a real app, if you toggle to collected you might want to open a modal right away
    toggleCollectionStatus(item.id);
  };

  const handleSimulateUpload = () => {
    setIsUploading(true);
    // Simulate server action
    setTimeout(() => {
      // Toggle string state setting the dummy photo URL
      if (!isCollected) {
        toggleCollectionStatus(item.id, item.imageUrl || "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1000&auto=format&fit=crop", "Uploaded photo simulating server action.");
      } else {
        // If already collected, just set the photo URL
        toggleCollectionStatus(item.id, item.imageUrl || "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=1000&auto=format&fit=crop");
        // We override state directly using a separate action in a real app
      }
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur-sm">
      <h3 className="mb-4 text-xl font-bold text-slate-100 flex items-center gap-2">
        <Camera className="text-indigo-400" />
        My Collection
      </h3>

      <div className="flex flex-col gap-4">
        {/* Toggle Status */}
        <button
          onClick={handleToggle}
          className={cn(
            "flex w-full items-center justify-between rounded-xl border p-4 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900",
            isCollected 
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" 
              : "border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-700 hover:text-slate-200"
          )}
        >
          <span className="font-medium text-lg">
            {isCollected ? "Collected" : "Mark as Collected"}
          </span>
          {isCollected && <CheckCircle2 className="h-6 w-6" />}
        </button>

        {/* Upload Photo Area */}
        {isCollected && (
           <div className="mt-2 animate-in slide-in-from-top-4 fade-in duration-300">
             {statusInfo.userPhotoUrl ? (
                <div className="relative overflow-hidden rounded-xl border border-slate-700">
                  <img src={statusInfo.userPhotoUrl} alt="User Capture" className="w-full h-48 object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                     <p className="text-sm text-slate-300">Photo Uploaded</p>
                  </div>
                  <button 
                    onClick={() => toggleCollectionStatus(item.id)}
                    className="absolute top-2 right-2 bg-slate-900/60 p-2 rounded-full text-rose-400 hover:bg-rose-500 hover:text-white transition-colors backdrop-blur-md"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
             ) : (
                <button
                  onClick={handleSimulateUpload}
                  disabled={isUploading}
                  className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-indigo-500/50 bg-indigo-500/5 px-6 py-10 transition-colors hover:bg-indigo-500/10 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload className={cn("h-8 w-8 text-indigo-400", isUploading && "animate-bounce")} />
                  <div className="text-center">
                    <p className="font-medium text-indigo-300">
                      {isUploading ? "Uploading to Google Drive..." : "Add Photo"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">Click to upload your observation</p>
                  </div>
                </button>
             )}
             
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
