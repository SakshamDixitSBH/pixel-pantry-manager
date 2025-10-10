import { Console, Game, Accessory } from "@/types/inventory";

const STORAGE_KEYS = {
  consoles: "inventory_consoles",
  games: "inventory_games",
  accessories: "inventory_accessories",
};

// Simulate multipart file upload
const createFormData = (item: Console | Game | Accessory, photos: File[]): FormData => {
  const formData = new FormData();
  
  // Add item data as JSON
  formData.append("data", JSON.stringify(item));
  
  // Add photos as files
  photos.forEach((photo, index) => {
    formData.append(`photo_${index}`, photo);
  });
  
  return formData;
};

// Convert files to base64 for localStorage
const filesToBase64 = async (files: File[]): Promise<string[]> => {
  const promises = files.map(file => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  });
  return Promise.all(promises);
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
  photoFiles: File[],
  itemType: string
): Promise<T> => {
  // Simulate multipart upload processing
  const photos = await filesToBase64(photoFiles);
  
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
  saveConsole: (console: Omit<Console, "photos" | "sku">, photos: File[]) => 
    saveItem<Console>(STORAGE_KEYS.consoles, console as Omit<Console, "photos">, photos, "console"),
  
  getConsoles: () => getItems<Console>(STORAGE_KEYS.consoles),
  
  deleteConsole: (id: string) => deleteItem(STORAGE_KEYS.consoles, id),
  
  // Games
  saveGame: (game: Omit<Game, "photos" | "sku">, photos: File[]) => 
    saveItem<Game>(STORAGE_KEYS.games, game as Omit<Game, "photos">, photos, "game"),
  
  getGames: () => getItems<Game>(STORAGE_KEYS.games),
  
  deleteGame: (id: string) => deleteItem(STORAGE_KEYS.games, id),
  
  // Accessories
  saveAccessory: (accessory: Omit<Accessory, "photos" | "sku">, photos: File[]) => 
    saveItem<Accessory>(STORAGE_KEYS.accessories, accessory as Omit<Accessory, "photos">, photos, "accessory"),
  
  getAccessories: () => getItems<Accessory>(STORAGE_KEYS.accessories),
  
  deleteAccessory: (id: string) => deleteItem(STORAGE_KEYS.accessories, id),
};
