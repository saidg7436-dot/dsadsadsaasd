import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Eye, Sparkles } from 'lucide-react';
import { MinecraftBlock, WikiLanguage } from '../types/block';
import { IsometricBlockIcon } from './IsometricBlockIcon';
import { getWikiUrl } from '../utils/wikiHelpers';

interface Props {
  block: MinecraftBlock;
  wikiLang: WikiLanguage;
  onOpenDetails: (block: MinecraftBlock) => void;
  isSelected?: boolean;
  onToggleSelect?: (blockId: string) => void;
}

export const BlockCard: React.FC<Props> = ({
  block,
  wikiLang,
  onOpenDetails,
  isSelected = false,
  onToggleSelect,
}) => {
  const [copied, setCopied] = useState(false);
  const wikiUrl = getWikiUrl(block, wikiLang);

  const handleCopyCommand = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`/give @p ${block.id} 64`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      onClick={() => onOpenDetails(block)}
      className={`group relative rounded-2xl p-4 transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
        isSelected
          ? 'bg-slate-900 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500'
          : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800/90 hover:border-slate-700 shadow-sm hover:shadow-xl'
      }`}
      style={{
        boxShadow: isSelected
          ? '0 0 20px rgba(16,185,129,0.12)'
          : undefined,
      }}
    >
      <div>
        {/* Top Header: Technical ID & Select Checkbox */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-300 transition-colors truncate">
            {block.id.replace('minecraft:', '')}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {block.lightLevel > 0 && (
              <span
                title={`Nivel de luz: ${block.lightLevel}`}
                className="flex items-center gap-1 text-[11px] font-mono text-amber-400 font-semibold"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="tabular-nums">Luz {block.lightLevel}</span>
              </span>
            )}
            {onToggleSelect && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleSelect(block.id);
                }}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer transition-transform hover:scale-110"
                title="Seleccionar para acciones en lote"
              />
            )}
          </div>
        </div>

        {/* Center: 3D Block Presentation pedestal */}
        <div className="relative flex items-center justify-center py-5 px-3 bg-gradient-to-b from-slate-950/70 to-slate-950/30 rounded-xl border border-slate-800/60 group-hover:border-slate-700/80 transition-all overflow-hidden">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${block.colors.accent}14 0%, transparent 70%)`,
            }}
          />
          <IsometricBlockIcon block={block} size={84} />
        </div>

        {/* Names in natural Spanish */}
        <div className="mt-3.5 space-y-0.5">
          <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 leading-snug">
            {block.nameEs}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium truncate">
            {block.nameEn}
          </p>
        </div>

        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2.5">
          <span className="capitalize">{block.tool}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Dureza <strong className="font-mono text-slate-300 tabular-nums">{block.hardness}</strong></span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-400">{block.version}</span>
        </div>
      </div>

      {/* Card Footer: Direct Wiki Link & Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        {/* Direct Link to the Wiki */}
        <a
          href={wikiUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 py-1.5 px-3 bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 border border-emerald-500/25 hover:border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
          title={`Abrir página de "${block.nameEs}" en la Wiki oficial (${wikiLang.toUpperCase()})`}
        >
          <span>Abrir en Wiki</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>

        {/* Copy command /give button */}
        <button
          type="button"
          onClick={handleCopyCommand}
          title="Copiar comando /give para el juego"
          className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        {/* View Details modal button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(block);
          }}
          title="Ver detalles completos del bloque"
          className="p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
