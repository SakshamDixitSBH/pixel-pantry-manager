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

// Generic save function
const saveItem = async <T extends Console | Game | Accessory>(
  storageKey: string,
  item: Omit<T, "photos">,
  photoFiles: File[]
): Promise<T> => {
  // Simulate multipart upload processing
  const photos = await filesToBase64(photoFiles);
  
  const itemWithPhotos = { ...item, photos } as T;
  
  // Get existing items
  const stored = localStorage.getItem(storageKey);
  const items: T[] = stored ? JSON.parse(stored) : [];
  
  // Find if updating existing item
  const index = items.findIndex(i => i.id === itemWithPhotos.id);
  
  if (index >= 0) {
    items[index] = itemWithPhotos;
  } else {
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
  saveConsole: (console: Omit<Console, "photos">, photos: File[]) => 
    saveItem<Console>(STORAGE_KEYS.consoles, console, photos),
  
  getConsoles: () => getItems<Console>(STORAGE_KEYS.consoles),
  
  deleteConsole: (id: string) => deleteItem(STORAGE_KEYS.consoles, id),
  
  // Games
  saveGame: (game: Omit<Game, "photos">, photos: File[]) => 
    saveItem<Game>(STORAGE_KEYS.games, game, photos),
  
  getGames: () => getItems<Game>(STORAGE_KEYS.games),
  
  deleteGame: (id: string) => deleteItem(STORAGE_KEYS.games, id),
  
  // Accessories
  saveAccessory: (accessory: Omit<Accessory, "photos">, photos: File[]) => 
    saveItem<Accessory>(STORAGE_KEYS.accessories, accessory, photos),
  
  getAccessories: () => getItems<Accessory>(STORAGE_KEYS.accessories),
  
  deleteAccessory: (id: string) => deleteItem(STORAGE_KEYS.accessories, id),
};
