export type BlockCategory =
  | 'todos'
  | 'construccion'
  | 'minerales'
  | 'redstone'
  | 'funcionales'
  | 'nether_end'
  | 'naturaleza'
  | 'decoracion'
  | 'personalizados';

export type MiningTool =
  | 'pico'
  | 'hacha'
  | 'pala'
  | 'azada'
  | 'cizallas'
  | 'espada'
  | 'cualquiera';

export interface MinecraftBlock {
  id: string; // e.g. "minecraft:diamond_block"
  nameEs: string; // "Bloque de diamante"
  nameEn: string; // "Diamond Block"
  slugEs: string; // "Bloque_de_diamante"
  slugEn: string; // "Block_of_Diamond"
  category: BlockCategory;
  descriptionEs: string;
  hardness: number; // e.g. 5.0
  blastResistance: number; // e.g. 6.0
  tool: MiningTool;
  toolTier?: 'madera' | 'piedra' | 'hierro' | 'diamante' | 'netherita' | 'ninguno';
  lightLevel: number; // 0 - 15
  flammable: boolean;
  renewable: boolean;
  stackSize: 64 | 16 | 1;
  version: string; // e.g. "1.21", "1.20", "1.16", "Alpha"
  colors: {
    top: string;
    side: string;
    front: string;
    accent: string;
    pattern?: 'ore' | 'planks' | 'bricks' | 'chiseled' | 'smooth' | 'glow' | 'books' | 'crystal' | 'organic';
  };
  custom?: boolean;
}

export type WikiLanguage = 'es' | 'en';
