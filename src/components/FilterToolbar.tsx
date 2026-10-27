import React from 'react';
import { LayoutGrid, Table, ListOrdered, ArrowDownUp, Wrench, Sparkles, Shield, Flame } from 'lucide-react';
import { BlockCategory, MiningTool } from '../types/block';
import { CATEGORY_LABELS } from '../data/minecraftBlocks';

export type ViewMode = 'grid' | 'table' | 'directory';
export type SortOption = 'name_asc' | 'name_desc' | 'hardness_asc' | 'hardness_desc' | 'light_desc' | 'version_desc';

interface Props {
  activeCategory: BlockCategory;
  onSelectCategory: (category: BlockCategory) => void;
  activeTool: MiningTool | 'todas';
  onSelectTool: (tool: MiningTool | 'todas') => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onlyGlowing: boolean;
  onToggleOnlyGlowing: () => void;
  onlyBlastResistant: boolean;
  onToggleOnlyBlastResistant: () => void;
  onlyVersion121: boolean;
  onToggleOnlyVersion121: () => void;
  categoryCounts: Record<string, number>;
}

export const FilterToolbar: React.FC<Props> = ({
  activeCategory,
  onSelectCategory,
  activeTool,
  onSelectTool,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onlyGlowing,
  onToggleOnlyGlowing,
  onlyBlastResistant,
  onToggleOnlyBlastResistant,
  onlyVersion121,
  onToggleOnlyVersion121,
  categoryCounts,
}) => {
  const categories: BlockCategory[] = [
    'todos',
    'minerales',
    'redstone',
    'funcionales',
    'construccion',
    'nether_end',
    'naturaleza',
    'decoracion',
    'personalizados',
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Category Segmented Control Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
        {categories.map((cat) => {
          const count = categoryCounts[cat] || 0;
          if (cat === 'personalizados' && count === 0) return null;
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 border ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
              }`}
            >
              <span>{CATEGORY_LABELS[cat]?.label || cat}</span>
              <span
                className={`text-[11px] font-mono tabular-nums px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-slate-950/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar: Tool, Sort, Quick Flags & View Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800/80 shadow-md">
        {/* Left: Quick filters & tool dropdown */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tool Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 shadow-inner">
            <Wrench className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={activeTool}
              onChange={(e) => onSelectTool(e.target.value as MiningTool | 'todas')}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="todas" className="bg-slate-900">Todas las herramientas</option>
              <option value="pico" className="bg-slate-900">Pico</option>
              <option value="hacha" className="bg-slate-900">Hacha</option>
              <option value="pala" className="bg-slate-900">Pala</option>
              <option value="azada" className="bg-slate-900">Azada</option>
              <option value="cualquiera" className="bg-slate-900">Mano o cualquiera</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 shadow-inner">
            <ArrowDownUp className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="name_asc" className="bg-slate-900">Nombre (A → Z)</option>
              <option value="name_desc" className="bg-slate-900">Nombre (Z → A)</option>
              <option value="hardness_desc" className="bg-slate-900">Mayor dureza</option>
              <option value="hardness_asc" className="bg-slate-900">Menor dureza</option>
              <option value="light_desc" className="bg-slate-900">Nivel de iluminación</option>
              <option value="version_desc" className="bg-slate-900">Versión añadida</option>
            </select>
          </div>

          {/* Quick toggle chips */}
          <button
            onClick={onToggleOnlyGlowing}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              onlyGlowing
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Emite luz</span>
          </button>

          <button
            onClick={onToggleOnlyBlastResistant}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              onlyBlastResistant
                ? 'bg-violet-500/20 text-violet-300 border-violet-500/50 shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-violet-400" />
            <span>Anti-explosiones</span>
          </button>

          <button
            onClick={onToggleOnlyVersion121}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              onlyVersion121
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            <span>Novedades 1.21</span>
          </button>
        </div>

        {/* Right: View Mode Toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            onClick={() => onViewModeChange('grid')}
            title="Vista Cuadrícula (Fichas 3D)"
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            title="Vista Tabla Técnica"
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <Table className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange('directory')}
            title="Vista Directorio A-Z"
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              viewMode === 'directory'
                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
