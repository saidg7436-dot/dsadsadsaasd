import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, Terminal, Sparkles, Shield, Wrench, Flame, Layers, BookOpen } from 'lucide-react';
import { MinecraftBlock, WikiLanguage } from '../types/block';
import { IsometricBlockIcon } from './IsometricBlockIcon';
import { getWikiUrl, getWikiSearchUrl } from '../utils/wikiHelpers';

interface Props {
  block: MinecraftBlock | null;
  onClose: () => void;
  defaultWikiLang: WikiLanguage;
}

export const BlockDetailModal: React.FC<Props> = ({
  block,
  onClose,
  defaultWikiLang,
}) => {
  const [copiedType, setCopiedType] = useState<'command' | 'linkEs' | 'linkEn' | null>(null);

  if (!block) return null;

  const wikiUrlEs = getWikiUrl(block, 'es');
  const wikiUrlEn = getWikiUrl(block, 'en');

  const copyToClipboard = (text: string, type: 'command' | 'linkEs' | 'linkEn') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-xs font-mono text-slate-300 font-semibold">{block.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Showcase Hero */}
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner overflow-hidden">
            <div
              className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: block.colors.accent }}
            />

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl shrink-0 flex items-center justify-center">
              <IsometricBlockIcon block={block} size={110} />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1.5 z-10">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                {block.nameEs}
              </h2>
              <p className="text-xs font-medium text-emerald-400">
                Nombre en inglés: <span className="text-slate-300">{block.nameEn}</span>
              </p>
              <p className="text-xs text-slate-300 pt-2 leading-relaxed">
                {block.descriptionEs}
              </p>
            </div>
          </div>

          {/* Technical Specifications Grid in natural Spanish */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Ficha Técnica del Bloque
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                  <Wrench className="w-3.5 h-3.5 text-slate-400" />
                  <span>Herramienta requerida</span>
                </div>
                <div className="text-sm font-bold text-white capitalize">
                  {block.tool === 'cualquiera' ? 'Mano o cualquiera' : block.tool}
                  {block.toolTier ? ` (${block.toolTier})` : ''}
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Dureza al picar</span>
                </div>
                <div className="text-sm font-bold font-mono text-white tabular-nums">
                  {block.hardness} seg
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                  <Shield className="w-3.5 h-3.5 text-slate-400" />
                  <span>Resistencia a TNT</span>
                </div>
                <div className="text-sm font-bold font-mono text-white tabular-nums">
                  {block.blastResistance >= 1200 ? 'Inmune (1200)' : block.blastResistance}
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                  <span>Nivel de luz</span>
                </div>
                <div className="text-sm font-bold font-mono text-white tabular-nums">
                  {block.lightLevel > 0 ? (
                    <span className="text-amber-400 font-semibold">{block.lightLevel} de 15</span>
                  ) : (
                    <span className="text-slate-400">No emite (0)</span>
                  )}
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                  <Flame className="w-3.5 h-3.5 text-slate-400" />
                  <span>¿Se quema con fuego?</span>
                </div>
                <div className="text-sm font-bold text-white">
                  {block.flammable ? (
                    <span className="text-rose-400">Sí, es inflamable</span>
                  ) : (
                    <span className="text-emerald-400">No se quema</span>
                  )}
                </div>
              </div>

              <div className="p-3.5 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                  <Layers className="w-3.5 h-3.5 text-slate-400" />
                  <span>Límite por montón (Stack)</span>
                </div>
                <div className="text-sm font-bold font-mono text-white tabular-nums">
                  Hasta {block.stackSize} unidades
                </div>
              </div>
            </div>
          </div>

          {/* Minecraft /give Command Snippet */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2.5 overflow-hidden text-xs">
              <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-slate-400 font-medium">Comando para obtener en el juego:</div>
                <code className="text-emerald-300 font-mono text-xs truncate select-all block mt-0.5">
                  /give @p {block.id} 64
                </code>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(`/give @p ${block.id} 64`, 'command')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              {copiedType === 'command' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar comando</span>
                </>
              )}
            </button>
          </div>

          {/* Official Wiki Links Action Cards */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Páginas oficiales de este bloque en la Wiki</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Spanish Wiki Link Card */}
              <div className="p-4 bg-slate-950 border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl transition-all shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Wiki en Español</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(wikiUrlEs, 'linkEs')}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedType === 'linkEs' ? (
                      <span className="text-emerald-400">Enlace copiado</span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar link</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 font-mono truncate mb-3">
                  {wikiUrlEs}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={wikiUrlEs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                  >
                    <span>Abrir artículo en Español</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={getWikiSearchUrl(block.nameEs, 'es')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition-colors shrink-0"
                    title="Buscar este bloque en la Wiki si no entra directo"
                  >
                    Buscar
                  </a>
                </div>
              </div>

              {/* English Wiki Link Card */}
              <div className="p-4 bg-slate-950 border border-slate-800 hover:border-sky-500/50 rounded-xl transition-all shadow-sm">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    <span>Wiki en Inglés (Original)</span>
                  </span>
                  <button
                    onClick={() => copyToClipboard(wikiUrlEn, 'linkEn')}
                    className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedType === 'linkEn' ? (
                      <span className="text-emerald-400">Link copiado</span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar link</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 font-mono truncate mb-3">
                  {wikiUrlEn}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={wikiUrlEn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Open in English Wiki</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                  <a
                    href={getWikiSearchUrl(block.nameEn, 'en')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs transition-colors shrink-0"
                    title="Search on English Wiki"
                  >
                    Search
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
