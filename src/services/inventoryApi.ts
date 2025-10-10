import { Console, Game, Accessory } from "@/types/inventory";

const STORAGE_KEYS = {
  consoles: "inventory_consoles",
  games: "inventory_games",
  accessories: "inventory_accessories",
};

// Simulate multipart file upload with base64 images
const createFormData = (item: Console | Game | Accessory, photoBase64: string[]): FormData => {
  const formData = new FormData();
  
  // Add item data as JSON
  formData.append("data", JSON.stringify(item));
  
  // Add photos as base64 strings
  photoBase64.forEach((photo, index) => {
    formData.append(`photo_${index}`, photo);
  });
  
  return formData;
};

// Generate SKU (simulating backend generation)
const generateSKU = (type: string, id: string): string => {
  const prefix = type.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Generic save function
const saveItem = async <T extends Console | Game | Accessory>(
  storageKey: string,
  item: Omit<T, "photos">,
  photoBase64: string[],
  itemType: string
): Promise<T> => {
  // Photos are already in base64 format
  const photos = photoBase64;
  
  // Get existing items
  const stored = localStorage.getItem(storageKey);
  const items: T[] = stored ? JSON.parse(stored) : [];
  
  // Find if updating existing item
  const index = items.findIndex(i => i.id === item.id);
  
  let itemWithPhotos: T;
  
  if (index >= 0) {
    // Update existing item (keep existing SKU and createdAt)
    itemWithPhotos = { 
      ...item, 
      photos, 
      sku: items[index].sku,
      createdAt: items[index].createdAt,
      updatedAt: new Date()
    } as T;
    items[index] = itemWithPhotos;
  } else {
    // Generate SKU for new item (simulating backend)
    const sku = generateSKU(itemType, item.id);
    const now = new Date();
    itemWithPhotos = { 
      ...item, 
      photos, 
      sku,
      createdAt: now,
      updatedAt: now
    } as T;
    items.push(itemWithPhotos);
  }
  
  localStorage.setItem(storageKey, JSON.stringify(items));
  return itemWithPhotos;
};

// Generic get function
const getItems = <T>(storageKey: string): T[] => {
  const stored = localStorage.getItem(storageKey);
  return stored ? JSON.parse(stored) : [];
};

// Generic delete function
const deleteItem = (storageKey: string, id: string): void => {
  const stored = localStorage.getItem(storageKey);
  const items = stored ? JSON.parse(stored) : [];
  const filtered = items.filter((item: any) => item.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(filtered));
};

// API methods
export const inventoryApi = {
  // Consoles
  saveConsole: (console: Omit<Console, "photos" | "sku">, photoBase64: string[]) => 
    saveItem<Console>(STORAGE_KEYS.consoles, console as Omit<Console, "photos">, photoBase64, "console"),
  
  getConsoles: () => getItems<Console>(STORAGE_KEYS.consoles),
  
  deleteConsole: (id: string) => deleteItem(STORAGE_KEYS.consoles, id),
  
  // Games
  saveGame: (game: Omit<Game, "photos" | "sku">, photoBase64: string[]) => 
    saveItem<Game>(STORAGE_KEYS.games, game as Omit<Game, "photos">, photoBase64, "game"),
  
  getGames: () => getItems<Game>(STORAGE_KEYS.games),
  
  deleteGame: (id: string) => deleteItem(STORAGE_KEYS.games, id),
  
  // Accessories
  saveAccessory: (accessory: Omit<Accessory, "photos" | "sku">, photoBase64: string[]) => 
    saveItem<Accessory>(STORAGE_KEYS.accessories, accessory as Omit<Accessory, "photos">, photoBase64, "accessory"),
  
  getAccessories: () => getItems<Accessory>(STORAGE_KEYS.accessories),
  
  deleteAccessory: (id: string) => deleteItem(STORAGE_KEYS.accessories, id),
};
