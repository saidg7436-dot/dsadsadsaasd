import React from 'react';
import { MinecraftBlock } from '../types/block';

interface Props {
  block: MinecraftBlock;
  size?: number;
  className?: string;
}

export const IsometricBlockIcon: React.FC<Props> = ({ block, size = 64, className = '' }) => {
  const { top, side, front, accent, pattern } = block.colors;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 group/block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_8px_14px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover/block:-translate-y-1 group-hover/block:scale-105"
        aria-label={block.nameEs}
      >
        <defs>
          {/* Ambient ground contact shadow */}
          <radialGradient id={`shadow-${block.id.replace(/:/g, '-')}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.45)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          
          {/* Subtle top specular sheen */}
          <linearGradient id={`sheen-${block.id.replace(/:/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Floor drop shadow */}
        <ellipse cx="50" cy="88" rx="34" ry="9" fill={`url(#shadow-${block.id.replace(/:/g, '-')})`} />

        <g>
          {/* Top Face (isometric rhombus) */}
          <polygon
            points="50,14 86,33 50,52 14,33"
            fill={top}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1"
          />
          <polygon
            points="50,14 86,33 50,52 14,33"
            fill={`url(#sheen-${block.id.replace(/:/g, '-')})`}
          />

          {/* Left / Front Face */}
          <polygon
            points="14,33 50,52 50,88 14,69"
            fill={front}
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="1"
          />

          {/* Right / Side Face */}
          <polygon
            points="50,52 86,33 86,69 50,88"
            fill={side}
            stroke="rgba(0,0,0,0.35)"
            strokeWidth="1"
          />

          {/* Pattern Details tailored to Minecraft voxels */}
          {pattern === 'ore' && (
            <>
              {/* Ore crystal deposits with glowing core */}
              <circle cx="44" cy="30" r="3.5" fill={accent} className="drop-shadow-[0_0_2px_currentColor]" />
              <circle cx="44" cy="30" r="1.5" fill="#ffffff" />
              <circle cx="58" cy="36" r="3" fill={accent} />
              <circle cx="52" cy="22" r="2.5" fill={accent} />

              <rect x="23" y="48" width="5" height="5" fill={accent} transform="skewY(25)" />
              <rect x="35" y="58" width="4" height="4" fill={accent} transform="skewY(25)" />
              <rect x="28" y="65" width="3" height="3" fill={accent} transform="skewY(25)" />

              <rect x="62" y="44" width="5" height="5" fill={accent} transform="skewY(-25)" />
              <rect x="73" y="52" width="4" height="4" fill={accent} transform="skewY(-25)" />
              <rect x="66" y="62" width="3.5" height="3.5" fill={accent} transform="skewY(-25)" />
            </>
          )}

          {pattern === 'bricks' && (
            <>
              {/* Brick mortars */}
              <line x1="14" y1="51" x2="50" y2="70" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" />
              <line x1="32" y1="42" x2="32" y2="61" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
              <line x1="23" y1="64" x2="23" y2="79" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
              <line x1="41" y1="67" x2="41" y2="84" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />

              <line x1="50" y1="70" x2="86" y2="51" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2" />
              <line x1="68" y1="61" x2="68" y2="42" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
              <line x1="77" y1="79" x2="77" y2="64" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
              <line x1="59" y1="84" x2="59" y2="67" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
            </>
          )}

          {pattern === 'planks' && (
            <>
              {/* Wood Plank Grooves */}
              <line x1="14" y1="45" x2="50" y2="64" stroke="rgba(0,0,0,0.22)" strokeWidth="1.2" />
              <line x1="14" y1="57" x2="50" y2="76" stroke="rgba(0,0,0,0.22)" strokeWidth="1.2" />
              <line x1="50" y1="64" x2="86" y2="45" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
              <line x1="50" y1="76" x2="86" y2="57" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
              {/* Nail / Wood grain dots */}
              <circle cx="20" cy="50" r="0.8" fill="rgba(0,0,0,0.3)" />
              <circle cx="44" cy="62" r="0.8" fill="rgba(0,0,0,0.3)" />
              <circle cx="78" cy="50" r="0.8" fill="rgba(0,0,0,0.3)" />
            </>
          )}

          {pattern === 'books' && (
            <>
              {/* Real colorful bookshelf books */}
              <rect x="20" y="44" width="6" height="17" fill="#ef4444" transform="skewY(25)" />
              <rect x="28" y="48" width="5.5" height="17" fill="#3b82f6" transform="skewY(25)" />
              <rect x="35" y="52" width="6.5" height="17" fill="#10b981" transform="skewY(25)" />
              <rect x="43" y="56" width="5.5" height="17" fill="#8b5cf6" transform="skewY(25)" />

              <rect x="53" y="58" width="6" height="17" fill="#f59e0b" transform="skewY(-25)" />
              <rect x="61" y="54" width="5.5" height="17" fill="#ec4899" transform="skewY(-25)" />
              <rect x="68" y="50" width="6.5" height="17" fill="#06b6d4" transform="skewY(-25)" />
              <rect x="76" y="46" width="5" height="17" fill="#e11d48" transform="skewY(-25)" />
            </>
          )}

          {pattern === 'glow' && (
            <>
              {/* Radial inner glow */}
              <circle cx="50" cy="50" r="16" fill={accent} opacity="0.35" filter="blur(5px)" />
              <polygon points="50,23 72,35 50,47 28,35" fill={accent} opacity="0.4" />
            </>
          )}

          {pattern === 'crystal' && (
            <>
              {/* Shimmer facets */}
              <line x1="32" y1="23" x2="68" y2="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1" strokeDasharray="3 3" />
              <polygon points="50,18 64,25 50,33 36,25" fill="rgba(255,255,255,0.15)" />
            </>
          )}

          {pattern === 'organic' && (
            <>
              {/* Natural grass overhang drip */}
              <path
                d="M14,33 L50,52 L50,60 L42,56 L38,63 L30,56 L24,60 L14,48 Z"
                fill={top}
              />
              <path
                d="M50,52 L86,33 L86,48 L76,60 L70,56 L62,63 L58,56 L50,60 Z"
                fill={top}
              />
            </>
          )}

          {/* Crisp highlight edge on top */}
          <line x1="50" y1="14" x2="14" y2="33" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          <line x1="50" y1="14" x2="86" y2="33" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          <line x1="50" y1="52" x2="50" y2="88" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};
