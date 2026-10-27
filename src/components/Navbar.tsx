import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onOpenImport: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
}

export const Navbar: React.FC<Props> = ({ onOpenImport, onSelectCategory }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('todos');
          }}
          className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2.5"
        >
          <span className="w-3 h-3 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-sm inline-block shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
          <span className="tracking-tight">WikiBloques</span>
        </a>

        {/* Zone 2: 4-5 text links in natural Spanish */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectCategory('todos')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Todos los bloques
          </button>
          <button
            onClick={() => onSelectCategory('minerales')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Minerales
          </button>
          <button
            onClick={() => onSelectCategory('redstone')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Redstone
          </button>
          <button
            onClick={() => onSelectCategory('funcionales')}
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Mesas y crafteo
          </button>
          <a
            href="https://es.minecraft.wiki/w/Bloque"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Wiki Oficial
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenImport}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Pegar mi lista</span>
          </button>
        </div>
      </div>
    </header>
  );
};
