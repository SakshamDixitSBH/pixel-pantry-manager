import { useState, useEffect, useCallback } from "react";
import { Console, Game, Accessory } from "@/types/inventory";
import { inventoryApi } from "@/services/inventoryApi";
import { toast } from "sonner";

type InventoryItem = Console | Game | Accessory;
type ItemType = "console" | "game" | "accessory";

export const useInventoryManager = <T extends InventoryItem>(type: ItemType) => {
  const [items, setItems] = useState<T[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const apiMethods = {
    console: {
      get: inventoryApi.getConsoles,
      save: inventoryApi.saveConsole,
      delete: inventoryApi.deleteConsole,
    },
    game: {
      get: inventoryApi.getGames,
      save: inventoryApi.saveGame,
      delete: inventoryApi.deleteGame,
    },
    accessory: {
      get: inventoryApi.getAccessories,
      save: inventoryApi.saveAccessory,
      delete: inventoryApi.deleteAccessory,
    },
  };

  const api = apiMethods[type];

  const loadItems = useCallback(() => {
    setItems(api.get() as T[]);
  }, [api]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleAdd = useCallback(() => {
    setEditingItem(null);
    setIsAddEditOpen(true);
  }, []);

  const handleEdit = useCallback((id: string) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setEditingItem(item);
      setIsAddEditOpen(true);
    }
  }, [items]);

  const handleDelete = useCallback((id: string) => {
    api.delete(id);
    loadItems();
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
  }, [api, loadItems, type]);

  const handleSave = useCallback(async (item: Omit<T, "photos">, photoBase64: string[]) => {
    await api.save(item as any, photoBase64);
    loadItems();
    toast.success(editingItem 
      ? `${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully` 
      : `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`
    );
  }, [api, editingItem, loadItems, type]);

  const handleRowClick = useCallback((item: T) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsDetailsOpen(false);
  }, []);

  const closeAddEditModal = useCallback(() => {
    setIsAddEditOpen(false);
  }, []);

  return {
    items,
    searchQuery,
    setSearchQuery,
    selectedItem,
    isDetailsOpen,
    isAddEditOpen,
    editingItem,
    handleAdd,
    handleEdit,
    handleDelete,
    handleSave,
    handleRowClick,
    closeDetailsModal,
    closeAddEditModal,
  };
};
