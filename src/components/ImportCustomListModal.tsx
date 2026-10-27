import React, { useState, useMemo } from 'react';
import { X, ExternalLink, Plus, Check, FileText, ArrowRight, Download, Sparkles } from 'lucide-react';
import { MinecraftBlock, WikiLanguage } from '../types/block';
import { parseBlockListText, getWikiUrl, exportBlocksToMarkdown, exportBlocksToCSV } from '../utils/wikiHelpers';
import { IsometricBlockIcon } from './IsometricBlockIcon';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddBlocks: (newBlocks: MinecraftBlock[]) => void;
  wikiLang: WikiLanguage;
}

const PRESET_EXAMPLES = [
  {
    title: 'Novedades 1.21',
    text: `Fabricador\nBombilla de cobre\nGenerador de pruebas\nCámara acorazada\nNúcleo pesado\nLadrillos de tufo`,
  },
  {
    title: 'Minerales Valiosos',
    text: `Bloque de diamante\nMena de diamante\nEscombros ancestrales\nBloque de netherita\nBloque de oro\nBloque de esmeralda`,
  },
  {
    title: 'Mesas y Utilidad',
    text: `Mesa de crafteo\nHorno\nAlto horno\nAhumador\nMesa de encantamientos\nYunque\nSoporte de pociones\nFaro mágico`,
  },
  {
    title: 'Mecanismos Redstone',
    text: `Pistón pegajoso\nObservador\nTolva\nDinamita\nDispensador\nSoltador\nLámpara de redstone`,
  },
];

export const ImportCustomListModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onAddBlocks,
  wikiLang,
}) => {
  const [inputText, setInputText] = useState(
    `Bloque de diamante\nObsidiana\nFabricador\nHorno\nMesa de crafteo\nPistón pegajoso`
  );
  const [copiedExport, setCopiedExport] = useState<string | null>(null);

  const parsedBlocks = useMemo(() => {
    return parseBlockListText(inputText);
  }, [inputText]);

  if (!isOpen) return null;

  const handleImport = () => {
    if (parsedBlocks.length > 0) {
      onAddBlocks(parsedBlocks);
      onClose();
    }
  };

  const handleCopyMarkdown = () => {
    const md = exportBlocksToMarkdown(parsedBlocks, wikiLang);
    navigator.clipboard.writeText(md);
    setCopiedExport('md');
    setTimeout(() => setCopiedExport(null), 2000);
  };

  const handleCopyCSV = () => {
    const csv = exportBlocksToCSV(parsedBlocks, wikiLang);
    navigator.clipboard.writeText(csv);
    setCopiedExport('csv');
    setTimeout(() => setCopiedExport(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Pegar tu lista de bloques y generar enlaces a la Wiki</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Pega tu lista (un bloque por línea o separados por comas) y la página creará los enlaces automáticos a la Wiki.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Presets */}
          <div>
            <div className="text-xs text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ejemplos rápidos para rellenar:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_EXAMPLES.map((preset) => (
                <button
                  key={preset.title}
                  onClick={() => setInputText(preset.text)}
                  className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  {preset.title}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Escribe o pega aquí la lista de bloques:
            </label>
            <textarea
              rows={5}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pega aquí tu lista...&#10;Bloque de diamante&#10;Obsidiana&#10;Mesa de crafteo&#10;Fabricador"
              className="w-full p-3.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm font-sans text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-inner"
            />
          </div>

          {/* Live Preview List with Wiki Links */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Enlaces a la Wiki generados automáticamente ({parsedBlocks.length} bloques):
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  {copiedExport === 'md' ? <Check className="w-3 h-3 text-emerald-400" /> : <Download className="w-3 h-3" />}
                  <span>Copiar tabla Markdown</span>
                </button>
                <button
                  onClick={handleCopyCSV}
                  className="text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 cursor-pointer flex items-center gap-1.5 transition-colors"
                >
                  {copiedExport === 'csv' ? <Check className="w-3 h-3 text-emerald-400" /> : <Download className="w-3 h-3" />}
                  <span>Copiar CSV</span>
                </button>
              </div>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pr-1 border border-slate-800 rounded-xl p-3 bg-slate-950/70 divide-y divide-slate-800/60 shadow-inner">
              {parsedBlocks.map((block, idx) => {
                const wikiUrl = getWikiUrl(block, wikiLang);
                return (
                  <div
                    key={`${block.id}-${idx}`}
                    className="flex items-center justify-between gap-3 pt-2.5 first:pt-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <IsometricBlockIcon block={block} size={32} />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          {block.nameEs}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 truncate max-w-sm">
                          {wikiUrl}
                        </div>
                      </div>
                    </div>

                    <a
                      href={wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 px-3 py-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center gap-1.5 transition-colors"
                      title="Probar este enlace en la Wiki oficial"
                    >
                      <span>Probar enlace</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/90">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
          >
            Cerrar
          </button>

          <button
            onClick={handleImport}
            disabled={parsedBlocks.length === 0}
            className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar {parsedBlocks.length} bloques al catálogo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
