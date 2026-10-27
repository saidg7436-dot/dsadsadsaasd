import React from 'react';
import { ExternalLink } from 'lucide-react';
import { MinecraftBlock, WikiLanguage } from '../types/block';
import { IsometricBlockIcon } from './IsometricBlockIcon';
import { getWikiUrl } from '../utils/wikiHelpers';

interface Props {
  blocks: MinecraftBlock[];
  wikiLang: WikiLanguage;
  onOpenDetails: (block: MinecraftBlock) => void;
}

export const BlockDirectoryView: React.FC<Props> = ({
  blocks,
  wikiLang,
  onOpenDetails,
}) => {
  // Group blocks by first letter of Spanish name
  const grouped = React.useMemo(() => {
    const map: Record<string, MinecraftBlock[]> = {};
    const sorted = [...blocks].sort((a, b) => a.nameEs.localeCompare(b.nameEs));

    for (const b of sorted) {
      const letter = b.nameEs.charAt(0).toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(b);
    }
    return map;
  }, [blocks]);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="space-y-8">
      {/* Alphabet Quick Anchor Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-3 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-md">
        <span className="text-xs text-slate-400 font-semibold px-2">Saltar por letra:</span>
        {letters.map((ltr) => (
          <a
            key={ltr}
            href={`#letter-${ltr}`}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 hover:border hover:border-slate-700 transition-colors"
          >
            {ltr}
          </a>
        ))}
      </div>

      {/* Letter Sections */}
      {letters.map((ltr) => (
        <div key={ltr} id={`letter-${ltr}`} className="space-y-3.5 scroll-mt-24">
          <div className="flex items-center gap-3 border-b border-slate-800/80 pb-2.5">
            <h2 className="text-xl font-extrabold text-emerald-400 font-mono">{ltr}</h2>
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-xs text-slate-400 tabular-nums font-medium">
              {grouped[ltr].length} bloques
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {grouped[ltr].map((block) => {
              const wikiUrl = getWikiUrl(block, wikiLang);
              return (
                <div
                  key={block.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all shadow-sm hover:shadow group"
                >
                  <div
                    className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                    onClick={() => onOpenDetails(block)}
                  >
                    <IsometricBlockIcon block={block} size={36} />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                        {block.nameEs}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">
                        {block.id.replace('minecraft:', '')}
                      </div>
                    </div>
                  </div>

                  {/* Direct Wiki Jump */}
                  <a
                    href={wikiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 px-2.5 py-1.5 text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg border border-emerald-500/20 transition-all flex items-center gap-1.5 text-xs font-bold"
                    title={`Abrir página de ${block.nameEs} en la Wiki`}
                  >
                    <span>Wiki</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
