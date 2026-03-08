import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-indigo-600 text-white border-transparent hover:bg-indigo-700',
    secondary: 'bg-slate-800 text-slate-100 border-transparent hover:bg-slate-700',
    outline: 'text-slate-300 border-slate-700 hover:bg-slate-800',
    success: 'bg-emerald-600/20 text-emerald-400 border-emerald-600/50',
    warning: 'bg-amber-600/20 text-amber-400 border-amber-600/50',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
