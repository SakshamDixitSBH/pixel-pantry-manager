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
  boughtPrice: number;
  averageMarketPrice: number;
  targetSellingPrice: number;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Game {
  id: string;
  sku: string;
  title: string;
  genre: string;
  condition: Condition;
  boughtPrice: number;
  averageMarketPrice: number;
  targetSellingPrice: number;
  consoleName: ConsoleName;
  platform: Platform;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Accessory {
  id: string;
  sku: string;
  name: string;
  type: AccessoryType;
  color: string;
  model: string;
  condition: Condition;
  boughtPrice: number;
  averageMarketPrice: number;
  targetSellingPrice: number;
  consoleName: ConsoleName;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
}
