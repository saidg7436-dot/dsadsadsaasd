import React from 'react';
import { ExternalLink, Copy, Check, Sparkles } from 'lucide-react';
import { MinecraftBlock, WikiLanguage } from '../types/block';
import { IsometricBlockIcon } from './IsometricBlockIcon';
import { getWikiUrl } from '../utils/wikiHelpers';

interface Props {
  blocks: MinecraftBlock[];
  wikiLang: WikiLanguage;
  onOpenDetails: (block: MinecraftBlock) => void;
  selectedBlockIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
}

export const BlockTable: React.FC<Props> = ({
  blocks,
  wikiLang,
  onOpenDetails,
  selectedBlockIds,
  onToggleSelect,
  onSelectAll,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const allSelected = blocks.length > 0 && selectedBlockIds.size === blocks.length;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            <th className="py-3.5 px-3 w-10 text-center">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                title="Seleccionar todos"
              />
            </th>
            <th className="py-3.5 px-3">Bloque</th>
            <th className="py-3.5 px-3">ID de comando</th>
            <th className="py-3.5 px-3">Herramienta</th>
            <th className="py-3.5 px-3 text-right">Dureza</th>
            <th className="py-3.5 px-3 text-right">Resistencia TNT</th>
            <th className="py-3.5 px-3 text-center">Luz</th>
            <th className="py-3.5 px-3">Versión</th>
            <th className="py-3.5 px-4 text-right">Página en la Wiki</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-xs">
          {blocks.map((block) => {
            const isSelected = selectedBlockIds.has(block.id);
            const wikiUrl = getWikiUrl(block, wikiLang);
            const isCopied = copiedId === block.id;

            return (
              <tr
                key={block.id}
                onClick={() => onOpenDetails(block)}
                className={`hover:bg-slate-800/60 transition-colors cursor-pointer ${
                  isSelected ? 'bg-emerald-950/20' : ''
                }`}
              >
                {/* Select Checkbox */}
                <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(block.id)}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </td>

                {/* Block Icon & Name in natural Spanish */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <IsometricBlockIcon block={block} size={40} />
                    <div className="min-w-0">
                      <div className="font-bold text-white hover:text-emerald-400 transition-colors truncate">
                        {block.nameEs}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate font-medium">
                        {block.nameEn}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Technical ID with copy shortcut */}
                <td className="py-3 px-3">
                  <button
                    onClick={(e) => handleCopyId(block.id, e)}
                    className="font-mono text-slate-300 hover:text-white flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors"
                    title="Copiar ID"
                  >
                    <span className="truncate max-w-[170px]">{block.id}</span>
                    {isCopied ? (
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-500 shrink-0" />
                    )}
                  </button>
                </td>

                {/* Tool */}
                <td className="py-3 px-3 text-slate-300 capitalize font-medium">
                  {block.tool === 'cualquiera' ? 'Mano / Cualquiera' : block.tool}
                </td>

                {/* Hardness */}
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-300 font-semibold">
                  {block.hardness}
                </td>

                {/* Blast Resistance */}
                <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-400 font-medium">
                  {block.blastResistance >= 1200 ? 'Inmune' : block.blastResistance}
                </td>

                {/* Light */}
                <td className="py-3 px-3 text-center font-mono tabular-nums">
                  {block.lightLevel > 0 ? (
                    <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
                      <Sparkles className="w-3 h-3" />
                      <span>{block.lightLevel}</span>
                    </span>
                  ) : (
                    <span className="text-slate-600">0</span>
                  )}
                </td>

                {/* Version */}
                <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                  {block.version}
                </td>

                {/* Direct Wiki Action Link */}
                <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 border border-emerald-500/25 rounded-lg text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Ir a la Wiki</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
