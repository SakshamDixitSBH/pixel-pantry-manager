export enum ConsoleName {
  PlayStation = "PlayStation",
  PlayStation2 = "PlayStation 2",
  PlayStation3 = "PlayStation 3",
  PlayStation4 = "PlayStation 4",
  PlayStation5 = "PlayStation 5",
  Xbox = "Xbox",
  Xbox360 = "Xbox 360",
  XboxOne = "Xbox One",
  XboxSeriesX = "Xbox Series X",
  NintendoSwitch = "Nintendo Switch",
  NintendoWii = "Nintendo Wii",
  NintendoWiiU = "Nintendo Wii U",
  Nintendo64 = "Nintendo 64",
  GameCube = "GameCube",
  SegaDreamcast = "Sega Dreamcast",
  SegaGenesis = "Sega Genesis",
  SegaSaturn = "Sega Saturn",
}

export enum Brands {
  Nintendo = "Nintendo",
  Sony = "Sony",
  Sega = "Sega",
  Atari = "Atari",
  Microsoft = "Microsoft",
  Amiga = "Amiga",
  Namco = "Namco",
  ElectronicArts = "Electronic Arts",
  Ubisoft = "Ubisoft",
  Rockstar = "Rockstar",
  Bandai = "Bandai",
  GameFreak = "Game Freak",
}

export enum ConsoleVersion {
  Slim = "Slim",
  Pro = "Pro",
  Standard = "Standard",
  Mini = "Mini",
}

export enum Condition {
  New = "New",
  LikeNew = "Like New",
  Good = "Good",
  Fair = "Fair",
  Poor = "Poor",
}

export enum Platform {
  Cartridge = "Cartridge",
  Disc = "Disc",
  Digital = "Digital",
}

export enum Color {
  BLACK = "Black",
  WHITE = "White",
  GOLD = "Gold",
  BLUE = "Blue",
  RED = "Red",
  GREEN = "Green",
  SILVER = "Silver",
  ORANGE = "Orange",
  AQUA = "Aqua",
  TEAL = "Teal",
  MAROON = "Maroon",
  NAVY = "Navy",
  LIME = "Lime",
  OLIVE = "Olive",
  FUCHSIA = "Fuchsia",
  TEAL_BLUE = "Teal Blue",
  DARK_GREEN = "Dark Green",
  DARK_BLUE = "Dark Blue",
  DARK_RED = "Dark Red",
  DARK_PURPLE = "Dark Purple",
  DARK_GRAY = "Dark Gray",
  DARK_ORANGE = "Dark Orange",
  DARK_TEAL = "Dark Teal",
  DARK_AQUA = "Dark Aqua",
  DARK_MAROON = "Dark Maroon",
  DARK_NAVY = "Dark Navy",
  DARK_LIME = "Dark Lime",
  DARK_OLIVE = "Dark Olive",
  DARK_FUCHSIA = "Dark Fuchsia",
  DARK_TEAL_BLUE = "Dark Teal Blue",
  DARK_YELLOW = "Dark Yellow",
  DARK_ORCHID = "Dark Orchid",
  DARK_PINK = "Dark Pink",
  DARK_SALMON = "Dark Salmon",
  DARK_CORAL = "Dark Coral",
  DARK_CHARTREUSE = "Dark Chartreuse",
  DARK_GOLDEN_ROD = "Dark Golden Rod",
  DARK_SKY_BLUE = "Dark Sky Blue",
  DARK_SEA_GREEN = "Dark Sea Green",
  DARK_PURPLE_RED = "Dark Purple Red",
  DARK_VIOLET = "Dark Violet",
  DARK_BROWN = "Dark Brown",
  LIGHT_GRAY = "Light Gray",
  LIGHT_GREEN = "Light Green",
  LIGHT_BLUE = "Light Blue",
  LIGHT_RED = "Light Red",
  LIGHT_PURPLE = "Light Purple",
  LIGHT_ORANGE = "Light Orange",
  LIGHT_TEAL = "Light Teal",
  LIGHT_AQUA = "Light Aqua",
  LIGHT_MAROON = "Light Maroon",
  LIGHT_NAVY = "Light Navy",
  LIGHT_LIME = "Light Lime",
  LIGHT_OLIVE = "Light Olive",
  LIGHT_FUCHSIA = "Light Fuchsia",
  LIGHT_TEAL_BLUE = "Light Teal Blue",
  LIGHT_YELLOW = "Light Yellow",
  LIGHT_ORCHID = "Light Orchid",
  LIGHT_PINK = "Light Pink",
  LIGHT_SALMON = "Light Salmon",
  LIGHT_CORAL = "Light Coral",
  LIGHT_CHARTREUSE = "Light Chartreuse",
  LIGHT_GOLDEN_ROD = "Light Golden Rod",
  LIGHT_SKY_BLUE = "Light Sky Blue",
  LIGHT_SEA_GREEN = "Light Sea Green",
  LIGHT_PURPLE_RED = "Light Purple Red",
  LIGHT_VIOLET = "Light Violet",
  LIGHT_BROWN = "Light Brown",
  LIGHT_TAN = "Light Tan",
  BROWN = "Brown",
  PINK = "Pink",
  GRAY = "Gray",
  PURPLE = "Purple",
  YELLOW = "Yellow",
  PURPLE_WHITE = "Purple White",
  PURPLE_BLACK = "Purple Black",
  PURPLE_RED = "Purple Red",
  PURPLE_GREEN = "Purple Green",
  PURPLE_BLUE = "Purple Blue",
  PURPLE_YELLOW = "Purple Yellow",
  PURPLE_GRAY = "Purple Gray",
  TRANSLUCENT = "Translucent",
  TRANSLUCENT_BLACK = "Translucent Black",
  TRANSLUCENT_WHITE = "Translucent White",
  TRANSLUCENT_GRAY = "Translucent Gray",
  TRANSLUCENT_RED = "Translucent Red",
  TRANSLUCENT_GREEN = "Translucent Green",
  TRANSLUCENT_BLUE = "Translucent Blue",
  TRANSLUCENT_PURPLE = "Translucent Purple",
  TRANSLUCENT_YELLOW = "Translucent Yellow",
  UNKNOWN = "Unknown",
}

export enum AccessoryType {
  Controller = "Controller",
  MemoryCard = "Memory Card",
  PowerSupply = "Power Supply",
  Cable = "Cable",
  Headset = "Headset",
  LightGun = "Light Gun",
  ExpansionPack = "Expansion Pack",
  Other = "Other",
}

export interface Console {
  id: string;
  sku: string;
  name: ConsoleName;
  brand: string;
  version: ConsoleVersion;
  color: string;
  condition: Condition;
  boughtPrice: number;
  averageMarketPrice: number;
  targetSellingPrice: number;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
  comments?: string;
}

export interface Game {
  id: string;
  sku: string;
  title: string;
  brand: string;
  condition: Condition;
  boughtPrice: number;
  averageMarketPrice: number;
  targetSellingPrice: number;
  consoleName: ConsoleName;
  platform: Platform;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
  comments?: string;
}

export interface Accessory {
  id: string;
  sku: string;
  name: string;
  type: AccessoryType;
  brand: string;
  color: string;
  condition: Condition;
  boughtPrice: number;
  averageMarketPrice: number;
  targetSellingPrice: number;
  consoleName: ConsoleName;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
  comments?: string;
}
