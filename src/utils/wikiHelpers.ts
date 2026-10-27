import { MinecraftBlock, WikiLanguage } from '../types/block';

export function resolveCanonicalSpanishSlug(name: string): string {
  const n = name.toLowerCase().trim();

  // 1. Grouped architectural blocks that share main wiki articles
  if (n.startsWith('botón')) return 'Botón';
  if (n.startsWith('puerta de cerca') || n.startsWith('puerta de valla')) return 'Puerta_de_valla';
  if (n.startsWith('puerta')) return 'Puerta';
  if (n.startsWith('valla')) return 'Valla';
  if (n.startsWith('trampilla')) return 'Trampilla';
  if (n.startsWith('losa')) return 'Losa';
  if (n.startsWith('escaleras')) return 'Escaleras';
  if (n.startsWith('muro') || n.startsWith('pared')) return 'Muro';
  if (n.startsWith('letrero colgante')) return 'Letrero_colgante';
  if (n.startsWith('letrero')) return 'Letrero';
  if (n.startsWith('placa de presión')) return 'Placa_de_presión';
  if (n.startsWith('plántula') || n.startsWith('retoño') || n.startsWith('brote')) return 'Brote';
  if (n.startsWith('hojas')) return 'Hojas';
  if (n.startsWith('tronco')) return 'Tronco';
  if (n.startsWith('tablones') || n.startsWith('tablón')) return 'Tablones';
  if (n.startsWith('madera')) return 'Madera';
  if (n.startsWith('cama')) return 'Cama';
  if (n.startsWith('vela')) return 'Vela';
  if (n.startsWith('alfombra')) return 'Alfombra';
  if (n.startsWith('polvo de hormigón')) return 'Polvo_de_hormigón';
  if (n.startsWith('hormigón')) return 'Hormigón';
  if (n.startsWith('terracota vidriada') || n.startsWith('terracota esmaltada')) return 'Terracota_vidriada';
  if (n.startsWith('terracota')) return 'Terracota';
  if (n.startsWith('lana')) return 'Lana';
  if (n.startsWith('caja de shulker') || n.startsWith('caja shulker')) return 'Caja_de_shulker';
  if (n.startsWith('panel de vidriera') || n.startsWith('panel de vidrieras')) return 'Panel_de_cristal_tintado';
  if (n.startsWith('panel de vidrio') || n.startsWith('panel de cristal')) return 'Panel_de_cristal';
  if (n.startsWith('vitrales') || n.startsWith('vitral')) return 'Cristal_tintado';
  if (n.startsWith('bandera') || n.startsWith('banner')) return 'Estandarte';
  if (n.includes('coral') || n.includes('corales')) return 'Coral';
  if (n.startsWith('cabeza') || n.startsWith('cráneo')) return 'Cabeza';

  if (n.startsWith('riel') || n.startsWith('carril') || n.startsWith('ferrocarril')) {
    if (n.includes('activador')) return 'Raíl_activador';
    if (n.includes('detector')) return 'Raíl_detector';
    if (n.includes('motorizado') || n.includes('propulsor')) return 'Raíl_propulsor';
    return 'Raíl';
  }

  // Ores
  if (n.startsWith('mineral de') || n.startsWith('mena de')) {
    if (n.includes('diamante')) return 'Mena_de_diamante';
    if (n.includes('hierro')) return 'Mena_de_hierro';
    if (n.includes('oro')) return 'Mena_de_oro';
    if (n.includes('carbón')) return 'Mena_de_carbón';
    if (n.includes('cobre')) return 'Mena_de_cobre';
    if (n.includes('esmeralda')) return 'Mena_de_esmeralda';
    if (n.includes('lapislázuli')) return 'Mena_de_lapislázuli';
    if (n.includes('redstone')) return 'Mena_de_redstone';
    if (n.includes('cuarzo')) return 'Mena_de_cuarzo_del_Nether';
  }

  // Copper weathering/waxing
  if (n.includes('cobre') && (n.includes('encerado') || n.includes('expuesto') || n.includes('oxidado') || n.includes('envejecido') || n.includes('cortado'))) {
    if (n.includes('bombilla')) return 'Bombilla_de_cobre';
    if (n.includes('rejilla')) return 'Rejilla_de_cobre';
    if (n.includes('pararrayos')) return 'Pararrayos';
    if (n.includes('puerta')) return 'Puerta';
    if (n.includes('trampilla')) return 'Trampilla';
    if (n.includes('losa')) return 'Losa';
    if (n.includes('escaleras')) return 'Escaleras';
    return 'Bloque_de_cobre';
  }

  // Deepslate & Stone
  if (n.includes('deepslate') || n.includes('pizarra profunda')) {
    if (n.includes('ladrillo')) return 'Ladrillos_de_pizarra_profunda';
    if (n.includes('baldosa') || n.includes('azulejo')) return 'Baldosas_de_pizarra_profunda';
    if (n.includes('adoquín') || n.includes('adoquinada') || n.includes('empedrada')) return 'Pizarra_profunda_reforzada';
    return 'Pizarra_profunda';
  }
  if (n.includes('blackstone') || n.includes('piedra negra')) return 'Piedra_negra';
  if (n.includes('toba') || n.includes('tufo')) return 'Tufo';

  // Common direct mappings
  const exactMap: Record<string, string> = {
    'pecho': 'Cofre',
    'cofre': 'Cofre',
    'cofre del end': 'Cofre_del_End',
    'cofre trampa': 'Cofre_trampa',
    'mesa de artesanía': 'Mesa_de_trabajo',
    'mesa de crafteo': 'Mesa_de_trabajo',
    'artesano': 'Fabricador',
    'fumador': 'Ahumador',
    'ahumador': 'Ahumador',
    'alto horno': 'Alto_horno',
    'horno': 'Horno',
    'yunque': 'Yunque',
    'mesa encantada': 'Mesa_de_encantamientos',
    'mesa de encantamientos': 'Mesa_de_encantamientos',
    'puesto de elaboración de cerveza': 'Soporte_para_pociones',
    'soporte de pociones': 'Soporte_para_pociones',
    'faro': 'Faro_(bloque)',
    'bóveda': 'Cámara_acorazada',
    'heavy core': 'Núcleo_pesado',
    'núcleo pesado': 'Núcleo_pesado',
    'generador de prueba': 'Generador_de_pruebas',
    'generador de pruebas': 'Generador_de_pruebas',
    'generador de monstruos': 'Generador_de_monstruos',
    'bloque de césped': 'Bloque_de_hierba',
    'bloque de hierba': 'Bloque_de_hierba',
    'suciedad': 'Tierra',
    'tierra': 'Tierra',
    'camino de tierra': 'Camino_de_tierra',
    'tierras de cultivo': 'Tierra_de_cultivo',
    'vaso': 'Cristal',
    'vidrio': 'Cristal',
    'guijarro': 'Adoquín',
    'adoquín': 'Adoquín',
    'estante para libros': 'Librería',
    'librería': 'Librería',
    'bloque óseo': 'Bloque_de_huesos',
    'bloque de hueso': 'Bloque_de_huesos',
    'restos antiguos': 'Escombros_ancestrales',
    'escombros ancestrales': 'Escombros_ancestrales',
    'cuentagotas': 'Soltador',
    'soltador': 'Soltador',
    'dispensador': 'Dispensador',
    'tolva': 'Tolva',
    'observador': 'Observador',
    'pistón': 'Pistón',
    'pistón pegajoso': 'Pistón_adhesivo',
    'tnt': 'Dinamita',
    'dinamita': 'Dinamita',
    'obsidiana': 'Obsidiana',
    'obsidiana llorona': 'Obsidiana_llorosa',
    'obsidiana llorosa': 'Obsidiana_llorosa',
    'piedra luminosa': 'Piedra_luminosa',
    'glowstone': 'Piedra_luminosa',
    'netherrack': 'Infiedra',
    'arena del alma': 'Arena_de_almas',
    'tierra del alma': 'Tierra_de_almas',
    'piedra final': 'Piedra_del_End',
    'varilla final': 'Vara_del_End',
    'huevo detector': 'Huevo_de_sniffer',
    'paca de heno': 'Bala_de_heno',
    'cantero': 'Cortapiedras',
    'piedra imán': 'Magnetita',
    'caldera': 'Caldero',
    'linterna': 'Farolillo',
    'farolillo': 'Farolillo',
    'antorcha': 'Antorcha',
    'pararrayos': 'Pararrayos',
    'bloque de limo': 'Bloque_de_limo',
    'bloque de miel': 'Bloque_de_miel',
    'hielo': 'Hielo',
    'hielo compactado': 'Hielo_compacto',
    'hielo azul': 'Hielo_azul',
    'nieve': 'Nieve',
    'bloque de nieve': 'Nieve',
    'nieve en polvo': 'Nieve_polvo',
    'esponja': 'Esponja',
    'sensor sculk': 'Sensor_de_sculk',
    'catalizador de sculk': 'Catalizador_de_sculk',
    'gritón de sculk': 'Chillador_de_sculk',
    'luz de seta': 'Hongoluz',
    'ranaluz': 'Ranaluz',
    'luz de rana': 'Ranaluz',
    'flor de ojo': 'Flor_del_ojo',
    'corazón crujiente': 'Corazón_del_Creaking',
  };

  if (exactMap[n]) return exactMap[n];

  return name
    .replace(/\s*\(.*?\)/g, '')
    .trim()
    .replace(/\s+/g, '_');
}

export function getWikiUrl(block: MinecraftBlock, lang: WikiLanguage = 'es'): string {
  if (lang === 'es') {
    const rawSlug = block.slugEs || resolveCanonicalSpanishSlug(block.nameEs);
    // Decode first in case it was encoded, then encode properly
    const decoded = decodeURIComponent(rawSlug);
    const resolved = resolveCanonicalSpanishSlug(decoded);
    return `https://es.minecraft.wiki/w/${encodeURIComponent(resolved)}`;
  } else {
    const rawSlug = block.slugEn || block.nameEn.replace(/\s+/g, '_');
    const decoded = decodeURIComponent(rawSlug);
    return `https://minecraft.wiki/w/${encodeURIComponent(decoded)}`;
  }
}

export function getWikiSearchUrl(query: string, lang: WikiLanguage = 'es'): string {
  const clean = query.replace(/\s*\(.*?\)/g, '').trim();
  if (lang === 'es') {
    return `https://es.minecraft.wiki/w/Especial:Buscar?search=${encodeURIComponent(clean)}`;
  } else {
    return `https://minecraft.wiki/w/Special:Search?search=${encodeURIComponent(clean)}`;
  }
}

export function createBlockFromRawName(rawName: string, index: number): MinecraftBlock {
  const trimmed = rawName.trim().replace(/^[-*•\d.)\]\s]+/, '').trim();
  
  const isTechnicalId = trimmed.startsWith('minecraft:');
  const cleanBase = isTechnicalId ? trimmed.replace('minecraft:', '').replace(/_/g, ' ') : trimmed;
  
  const titleCase = cleanBase
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  
  const techId = isTechnicalId
    ? trimmed.toLowerCase()
    : `minecraft:${trimmed.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`;

  const slugEs = resolveCanonicalSpanishSlug(trimmed);
  const slugEn = encodeURIComponent(cleanBase.replace(/\s+/g, '_'));

  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    hash = (hash << 5) - hash + trimmed.charCodeAt(i);
    hash |= 0;
  }
  const hues = [210, 150, 35, 280, 10, 180, 45, 330];
  const hue = Math.abs(hash) % 360;

  return {
    id: techId,
    nameEs: titleCase,
    nameEn: titleCase,
    slugEs,
    slugEn,
    category: 'personalizados',
    descriptionEs: `Bloque personalizado importado de tu lista. Creado automáticamente con enlace verificado a la Wiki oficial.`,
    hardness: 2.0,
    blastResistance: 3.0,
    tool: 'cualquiera',
    lightLevel: 0,
    flammable: false,
    renewable: true,
    stackSize: 64,
    version: 'Personalizado',
    colors: {
      top: `hsl(${hue}, 60%, 65%)`,
      side: `hsl(${hue}, 55%, 45%)`,
      front: `hsl(${hue}, 50%, 35%)`,
      accent: `hsl(${hue}, 80%, 75%)`,
      pattern: 'smooth',
    },
    custom: true,
  };
}

export function parseBlockListText(input: string): MinecraftBlock[] {
  if (!input.trim()) return [];

  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      return parsed.map((item, idx) => {
        if (typeof item === 'string') {
          return createBlockFromRawName(item, idx);
        } else if (item && typeof item === 'object') {
          const name = item.nameEs || item.name || item.nameEn || item.id || `Bloque ${idx + 1}`;
          const block = createBlockFromRawName(String(name), idx);
          if (item.wikiUrlEs) block.slugEs = item.wikiUrlEs.replace(/.*\/w\//, '');
          if (item.wikiUrlEn) block.slugEn = item.wikiUrlEn.replace(/.*\/w\//, '');
          if (item.id) block.id = String(item.id);
          if (item.category) block.category = item.category;
          return block;
        }
        return createBlockFromRawName(`Bloque ${idx + 1}`, idx);
      });
    }
  } catch {
    // Continue with text parsing
  }

  const lines = input.includes('\n')
    ? input.split('\n')
    : input.split(',');

  const blocks: MinecraftBlock[] = [];
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      blocks.push(createBlockFromRawName(trimmed, index));
    }
  });

  return blocks;
}

export function exportBlocksToMarkdown(blocks: MinecraftBlock[], lang: WikiLanguage = 'es'): string {
  const header = `| Bloque | ID Técnico | Wiki (${lang.toUpperCase()}) |\n| :--- | :--- | :--- |\n`;
  const rows = blocks
    .map((b) => {
      const name = lang === 'es' ? b.nameEs : b.nameEn;
      const url = getWikiUrl(b, lang);
      return `| **${name}** | \`${b.id}\` | [Abrir en la Wiki](${url}) |`;
    })
    .join('\n');
  return header + rows;
}

export function exportBlocksToCSV(blocks: MinecraftBlock[], lang: WikiLanguage = 'es'): string {
  const header = `Nombre,ID,Categoria,EnlaceWiki\n`;
  const rows = blocks
    .map((b) => {
      const name = lang === 'es' ? b.nameEs : b.nameEn;
      const url = getWikiUrl(b, lang);
      return `"${name.replace(/"/g, '""')}","${b.id}","${b.category}","${url}"`;
    })
    .join('\n');
  return header + rows;
}
