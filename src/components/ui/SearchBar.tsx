'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from './Badge';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onSearch, placeholder = 'Search...', className }: SearchBarProps) {
  const [query, setQuery] = useState('');

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <Search className="absolute left-3 h-5 w-5 text-slate-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex h-12 w-full rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2 pl-10 text-sm ring-offset-slate-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 text-slate-100"
      />
    </div>
  );
}
