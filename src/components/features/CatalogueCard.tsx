import React from 'react';
import Link from 'next/link';
import { Telescope, Star, Orbit } from 'lucide-react'; // Example icons
import { Catalogue } from '@/types/AstroWeb.tofdan';
import { cn } from '../ui/Badge';

export function CatalogueCard({ catalogue, className }: { catalogue: Catalogue, className?: string }) {
  
  // Choose icon dynamically or map it
  const IconMap: Record<string, React.ElementType> = {
    Telescope,
    Star,
    Galaxy: Orbit,
  };
  
  const IconComponent = catalogue.icon && IconMap[catalogue.icon] 
    ? IconMap[catalogue.icon] 
    : Telescope;

  return (
    <Link href={`/catalogues/${catalogue.id}`} className={cn("group block", className)}>
      <div className="relative flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:bg-slate-800 hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-500/10">
        <div className="mb-4 flex items-center justify-between">
          <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
            <IconComponent size={32} />
          </div>
          <span className="text-sm font-medium text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
            {catalogue.totalObjects} objects
          </span>
        </div>
        
        <div>
          <h3 className="mb-2 text-xl font-bold text-slate-100 group-hover:text-indigo-200 transition-colors">
            {catalogue.name}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-2">
            {catalogue.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
