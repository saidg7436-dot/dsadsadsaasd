import React from 'react';
import { ExternalLink, Search, Sparkles, BookOpen, Layers } from 'lucide-react';
import { WikiLanguage } from '../types/block';

interface Props {
  totalBlocks: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  wikiLang: WikiLanguage;
  onToggleLang: (lang: WikiLanguage) => void;
  onOpenImport: () => void;
  onRandomBlock: () => void;
}

export const HeroSection: React.FC<Props> = ({
  totalBlocks,
  searchQuery,
  onSearchChange,
  wikiLang,
  onToggleLang,
  onOpenImport,
  onRandomBlock,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 py-12 lg:py-16">
      {/* Subtle ambient illumination */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Clean metadata lead-in */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                <span>Minecraft Wiki en Español</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Edición Oficial</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-slate-300 tabular-nums">Versión 1.21</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] [text-wrap:balance]">
              Lista de bloques con enlace directo a la Wiki oficial
            </h1>

            <p className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-2xl font-normal">
              Haz clic en cualquier bloque para ir directo a su artículo en la Wiki comunitaria.
              Consulta sus datos de minería, comandos de obtención o pega tu propia lista de bloques personalizada.
            </p>

            {/* Search Input Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Escribe el nombre de un bloque (ej. Diamante, Horno, Pasto, TNT)..."
                className="w-full pl-12 pr-28 py-3.5 bg-slate-900/90 border border-slate-700/80 hover:border-slate-600 focus:border-emerald-500 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-lg transition-all"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-300">
                <span className="font-mono font-bold text-white tabular-nums">{totalBlocks}</span>
                <span className="text-slate-400">bloques</span>
              </div>
            </div>

            {/* Quick Action Buttons & Lang Selector */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenImport}
                className="px-4 py-2.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer flex items-center gap-2"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Pegar Mi Lista de Bloques</span>
              </button>

              <button
                onClick={onRandomBlock}
                className="px-4 py-2.5 text-xs font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer flex items-center gap-2 hover:border-slate-600"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Bloque al azar</span>
              </button>

              <a
                href={
                  wikiLang === 'es'
                    ? 'https://es.minecraft.wiki/w/Bloque'
                    : 'https://minecraft.wiki/w/Block'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Ir a la Wiki Principal</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg sm:ml-auto">
                <button
                  onClick={() => onToggleLang('es')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    wikiLang === 'es'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Wiki en Español
                </button>
                <button
                  onClick={() => onToggleLang('en')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    wikiLang === 'en'
                      ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  English Wiki
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase Media Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-slate-900 group">
              <img
                src="/src/assets/images/blocks_hero_showcase_1793084289450.jpg"
                alt="Exhibición 3D de Bloques de Minecraft"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-white">Galería de Bloques</span>
                <span className="font-mono text-emerald-400 text-[11px] font-medium bg-slate-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  es.minecraft.wiki
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Tabular Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-6 border-t border-slate-800/80">
          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
            <div className="text-xs text-slate-400 font-medium">Bloques en catálogo</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums mt-0.5">{totalBlocks}</div>
          </div>
          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
            <div className="text-xs text-slate-400 font-medium">Destino de la Wiki</div>
            <div className="text-2xl font-bold text-emerald-400 mt-0.5">Wiki Oficial Comunitaria</div>
          </div>
          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
            <div className="text-xs text-slate-400 font-medium">Versión del juego</div>
            <div className="text-2xl font-bold text-white mt-0.5">1.21 Tricky Trials</div>
          </div>
          <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/60">
            <div className="text-xs text-slate-400 font-medium">Importador de listas</div>
            <div className="text-2xl font-bold text-sky-400 mt-0.5">TXT, CSV y JSON</div>
          </div>
        </div>
      </div>
    </section>
  );
};
