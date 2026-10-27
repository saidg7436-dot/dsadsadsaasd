/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { ExternalLink, Copy, Check, Trash2, BookOpen, Layers } from 'lucide-react';
import { MinecraftBlock, BlockCategory, MiningTool, WikiLanguage } from './types/block';
import { INITIAL_BLOCKS } from './data/minecraftBlocks';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterToolbar, ViewMode, SortOption } from './components/FilterToolbar';
import { BlockCard } from './components/BlockCard';
import { BlockTable } from './components/BlockTable';
import { BlockDirectoryView } from './components/BlockDirectoryView';
import { BlockDetailModal } from './components/BlockDetailModal';
import { ImportCustomListModal } from './components/ImportCustomListModal';
import { getWikiUrl } from './utils/wikiHelpers';

const STORAGE_KEY = 'wikibloques_custom_blocks_v1';

export default function App() {
  // Load custom blocks from localStorage if available
  const [customBlocks, setCustomBlocks] = useState<MinecraftBlock[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Combine initial blocks and user custom blocks
  const allBlocks = useMemo(() => {
    return [...customBlocks, ...INITIAL_BLOCKS];
  }, [customBlocks]);

  // Persist custom blocks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customBlocks));
    } catch {
      // Storage error ignored
    }
  }, [customBlocks]);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BlockCategory>('todos');
  const [activeTool, setActiveTool] = useState<MiningTool | 'todas'>('todas');
  const [sortBy, setSortBy] = useState<SortOption>('name_asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [onlyGlowing, setOnlyGlowing] = useState(false);
  const [onlyBlastResistant, setOnlyBlastResistant] = useState(false);
  const [onlyVersion121, setOnlyVersion121] = useState(false);

  // Wiki Language preference (default Spanish: es.minecraft.wiki)
  const [wikiLang, setWikiLang] = useState<WikiLanguage>('es');

  // Progressive loading for the large collection (1,166+ blocks)
  const [displayLimit, setDisplayLimit] = useState(64);

  useEffect(() => {
    setDisplayLimit(64);
  }, [activeCategory, activeTool, searchQuery, sortBy, onlyGlowing, onlyBlastResistant, onlyVersion121]);

  // Modals & inspect
  const [inspectBlock, setInspectBlock] = useState<MinecraftBlock | null>(null);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Batch selection
  const [selectedBlockIds, setSelectedBlockIds] = useState<Set<string>>(new Set());
  const [batchActionNotice, setBatchActionNotice] = useState<string | null>(null);

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: allBlocks.length };
    for (const b of allBlocks) {
      counts[b.category] = (counts[b.category] || 0) + 1;
    }
    return counts;
  }, [allBlocks]);

  // Filtered and sorted blocks list
  const filteredBlocks = useMemo(() => {
    return allBlocks
      .filter((block) => {
        // Category filter
        if (activeCategory !== 'todos' && block.category !== activeCategory) {
          return false;
        }

        // Tool filter
        if (activeTool !== 'todas' && block.tool !== activeTool) {
          return false;
        }

        // Quick flag filters
        if (onlyGlowing && block.lightLevel <= 0) {
          return false;
        }
        if (onlyBlastResistant && block.blastResistance < 1200) {
          return false;
        }
        if (onlyVersion121 && !block.version.includes('1.21')) {
          return false;
        }

        // Search Query (matches Spanish name, English name, or technical ID)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesNameEs = block.nameEs.toLowerCase().includes(q);
          const matchesNameEn = block.nameEn.toLowerCase().includes(q);
          const matchesId = block.id.toLowerCase().includes(q);
          if (!matchesNameEs && !matchesNameEn && !matchesId) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'name_asc':
            return a.nameEs.localeCompare(b.nameEs);
          case 'name_desc':
            return b.nameEs.localeCompare(a.nameEs);
          case 'hardness_desc':
            return b.hardness - a.hardness;
          case 'hardness_asc':
            return a.hardness - b.hardness;
          case 'light_desc':
            return b.lightLevel - a.lightLevel;
          case 'version_desc':
            return b.version.localeCompare(a.version);
          default:
            return 0;
        }
      });
  }, [
    allBlocks,
    activeCategory,
    activeTool,
    onlyGlowing,
    onlyBlastResistant,
    onlyVersion121,
    searchQuery,
    sortBy,
  ]);

  // Add custom blocks from import modal
  const handleAddCustomBlocks = (newBlocks: MinecraftBlock[]) => {
    setCustomBlocks((prev) => [...newBlocks, ...prev]);
    setActiveCategory('personalizados');
    setBatchActionNotice(`¡Se agregaron ${newBlocks.length} bloques a tu lista con sus enlaces a la Wiki!`);
    setTimeout(() => setBatchActionNotice(null), 4000);
  };

  // Toggle selection
  const handleToggleSelect = (blockId: string) => {
    setSelectedBlockIds((prev) => {
      const next = new Set(prev);
      if (next.has(blockId)) {
        next.delete(blockId);
      } else {
        next.add(blockId);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedBlockIds.size === filteredBlocks.length) {
      setSelectedBlockIds(new Set());
    } else {
      setSelectedBlockIds(new Set(filteredBlocks.map((b) => b.id)));
    }
  };

  // Batch actions
  const handleOpenSelectedInWiki = () => {
    const selected = allBlocks.filter((b) => selectedBlockIds.has(b.id));
    if (selected.length === 0) return;

    // Open first 5 in tabs to avoid browser popup blockers, or notify
    const toOpen = selected.slice(0, 5);
    for (const b of toOpen) {
      const url = getWikiUrl(b, wikiLang);
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    if (selected.length > 5) {
      setBatchActionNotice(
        `Se abrieron las primeras 5 pestañas de la Wiki (límite del navegador).`
      );
    } else {
      setBatchActionNotice(`Se abrieron ${toOpen.length} páginas de la Wiki.`);
    }
    setTimeout(() => setBatchActionNotice(null), 4000);
  };

  const handleCopySelectedLinks = () => {
    const selected = allBlocks.filter((b) => selectedBlockIds.has(b.id));
    if (selected.length === 0) return;

    const text = selected
      .map((b) => `${b.nameEs}: ${getWikiUrl(b, wikiLang)}`)
      .join('\n');
    navigator.clipboard.writeText(text);

    setBatchActionNotice(`Se copiaron los enlaces de ${selected.length} bloques.`);
    setTimeout(() => setBatchActionNotice(null), 3000);
  };

  const handleClearSelected = () => {
    setSelectedBlockIds(new Set());
  };

  const handleRandomBlock = () => {
    if (allBlocks.length > 0) {
      const randomIndex = Math.floor(Math.random() * allBlocks.length);
      setInspectBlock(allBlocks[randomIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenImport={() => setIsImportOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat as BlockCategory);
          window.scrollTo({ top: 380, behavior: 'smooth' });
        }}
        activeCategory={activeCategory}
      />

      {/* Hero Header with Media Banner, Search and Quick Stats */}
      <HeroSection
        totalBlocks={allBlocks.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        wikiLang={wikiLang}
        onToggleLang={setWikiLang}
        onOpenImport={() => setIsImportOpen(true)}
        onRandomBlock={handleRandomBlock}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Floating Batch Actions Bar when items are selected */}
        {selectedBlockIds.size > 0 && (
          <div className="sticky top-20 z-30 mb-6 bg-slate-900 border border-emerald-500/50 rounded-xl p-3.5 shadow-2xl flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>
                <strong className="font-mono tabular-nums text-white">
                  {selectedBlockIds.size}
                </strong>{' '}
                bloque(s) seleccionado(s)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleOpenSelectedInWiki}
                className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Abrir en la Wiki ({wikiLang.toUpperCase()})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleCopySelectedLinks}
                className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Enlaces</span>
              </button>

              <button
                onClick={handleClearSelected}
                className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white rounded-md cursor-pointer"
              >
                Desmarcar
              </button>
            </div>
          </div>
        )}

        {/* Global Toast Notification */}
        {batchActionNotice && (
          <div className="mb-6 p-3.5 bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2.5 animate-fadeIn shadow-lg">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{batchActionNotice}</span>
          </div>
        )}

        {/* Filter and View Controls */}
        <FilterToolbar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          activeTool={activeTool}
          onSelectTool={setActiveTool}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onlyGlowing={onlyGlowing}
          onToggleOnlyGlowing={() => setOnlyGlowing(!onlyGlowing)}
          onlyBlastResistant={onlyBlastResistant}
          onToggleOnlyBlastResistant={() => setOnlyBlastResistant(!onlyBlastResistant)}
          onlyVersion121={onlyVersion121}
          onToggleOnlyVersion121={() => setOnlyVersion121(!onlyVersion121)}
          categoryCounts={categoryCounts}
        />

        {/* Custom blocks notice and clear button if active in custom category */}
        {activeCategory === 'personalizados' && customBlocks.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 shadow-md">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Bloques importados por ti ({customBlocks.length})</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Estos bloques fueron añadidos desde tu lista de texto y cuentan con enlace automático a la Wiki oficial.
              </p>
            </div>

            <button
              onClick={() => {
                if (window.confirm('¿Deseas vaciar tu lista de bloques personalizados?')) {
                  setCustomBlocks([]);
                  setActiveCategory('todos');
                }
              }}
              className="px-3.5 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-950/50 border border-rose-900/50 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Vaciar mi lista</span>
            </button>
          </div>
        )}

        {/* Result Counter & Active Filter Indicators */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span>
              Mostrando <strong className="text-white font-mono tabular-nums">{filteredBlocks.length}</strong> de{' '}
              <span className="font-mono tabular-nums">{allBlocks.length}</span> bloques
            </span>
            {searchQuery && (
              <>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>Búsqueda: &ldquo;{searchQuery}&rdquo;</span>
              </>
            )}
          </div>

          {filteredBlocks.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {selectedBlockIds.size === filteredBlocks.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
            </button>
          )}
        </div>

        {/* Block View Rendering */}
        {filteredBlocks.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/50 rounded-3xl border border-slate-800/80 p-8 space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              No se encontraron bloques con los filtros actuales
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Prueba buscando con otro nombre (ejemplo: Diamante, Horno, Pasto, Redstone) o limpia los filtros.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('todos');
                  setActiveTool('todas');
                  setOnlyGlowing(false);
                  setOnlyBlastResistant(false);
                  setOnlyVersion121(false);
                }}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Limpiar filtros de búsqueda
              </button>
              <button
                onClick={() => setIsImportOpen(true)}
                className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Pegar bloque personalizado
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredBlocks.slice(0, displayLimit).map((block) => (
                <BlockCard
                  key={block.id}
                  block={block}
                  wikiLang={wikiLang}
                  onOpenDetails={setInspectBlock}
                  isSelected={selectedBlockIds.has(block.id)}
                  onToggleSelect={handleToggleSelect}
                />
              ))}
            </div>

            {filteredBlocks.length > displayLimit && (
              <div className="flex flex-col items-center justify-center pt-6 pb-4 space-y-2.5">
                <div className="text-xs text-slate-400">
                  Mostrando <strong className="text-white tabular-nums font-bold">{Math.min(displayLimit, filteredBlocks.length)}</strong> de{' '}
                  <strong className="text-white tabular-nums font-bold">{filteredBlocks.length}</strong> bloques
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setDisplayLimit((prev) => prev + 64)}
                    className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
                  >
                    Cargar 64 bloques más ({filteredBlocks.length - displayLimit} restantes)
                  </button>
                  <button
                    onClick={() => setDisplayLimit(filteredBlocks.length)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors cursor-pointer"
                  >
                    Mostrar todos los {filteredBlocks.length} bloques
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : viewMode === 'table' ? (
          <div className="space-y-6">
            <BlockTable
              blocks={filteredBlocks.slice(0, displayLimit)}
              wikiLang={wikiLang}
              onOpenDetails={setInspectBlock}
              selectedBlockIds={selectedBlockIds}
              onToggleSelect={handleToggleSelect}
              onSelectAll={handleSelectAll}
            />

            {filteredBlocks.length > displayLimit && (
              <div className="flex flex-col items-center justify-center pt-4 space-y-2">
                <div className="text-xs text-slate-400">
                  Mostrando <strong className="text-white tabular-nums font-bold">{Math.min(displayLimit, filteredBlocks.length)}</strong> de{' '}
                  <strong className="text-white tabular-nums font-bold">{filteredBlocks.length}</strong> bloques en tabla
                </div>
                <button
                  onClick={() => setDisplayLimit((prev) => prev + 100)}
                  className="px-6 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all cursor-pointer shadow-sm"
                >
                  Cargar 100 filas más
                </button>
              </div>
            )}
          </div>
        ) : (
          <BlockDirectoryView
            blocks={filteredBlocks}
            wikiLang={wikiLang}
            onOpenDetails={setInspectBlock}
          />
        )}
      </main>

      {/* Detail Inspection Modal */}
      <BlockDetailModal
        block={inspectBlock}
        onClose={() => setInspectBlock(null)}
        defaultWikiLang={wikiLang}
      />

      {/* Import / Paste Custom List Modal */}
      <ImportCustomListModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onAddBlocks={handleAddCustomBlocks}
        wikiLang={wikiLang}
      />

      {/* Quiet Footer (Section 1.B Anti-Slop: No ornamental telemetry engine) */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">WikiBloques</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Directorio de enlaces a la Minecraft Wiki oficial</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://es.minecraft.wiki/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>es.minecraft.wiki</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://minecraft.wiki/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>minecraft.wiki (EN)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setIsImportOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pegar Bloques
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
