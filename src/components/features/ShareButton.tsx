'use client';

import React from 'react';
import { Share2 } from 'lucide-react';

export function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AstroWeb.tofdan - Mon Pokédex Stellaire',
          text: 'Découvrez mes observations astronomiques personnelles !',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Erreur lors du partage:', err);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/50 px-6 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-slate-700 hover:text-white"
    >
      <Share2 size={18} />
      <span>Partager</span>
    </button>
  );
}
