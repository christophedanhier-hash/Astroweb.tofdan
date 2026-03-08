import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Telescope, UserCircle } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AstroWeb.tofdan',
  description: 'Tracker et Gamification pour l\'astronomie amateur.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.className} bg-[#121212] text-slate-100 min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#121212]/80 backdrop-blur-xl">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400">
                <Telescope size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white hidden sm:block">AstroWeb</span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Catalogues
              </Link>
              <Link href="/badges" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Shared
              </Link>
              <button className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 py-1.5 pl-2 pr-4 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                <UserCircle size={20} className="text-indigo-400" />
                <span>My Profile</span>
              </button>
            </nav>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-slate-800 py-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} AstroWeb.tofdan - Numérisez votre exploration spatiale</p>
        </footer>
      </body>
    </html>
  );
}
