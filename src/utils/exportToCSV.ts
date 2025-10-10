import { Console, Game, Accessory } from "@/types/inventory";

export const exportConsolesToCSV = (consoles: Console[]) => {
  const headers = [
    "SKU",
    "Console Name",
    "Brand",
    "Version",
    "Color",
    "Release Year",
    "Bought Price",
    "Average Market Price",
    "Target Selling Price",
    "Date Added"
  ];

  const rows = consoles.map(console => [
    console.sku,
    console.name,
    console.brand,
    console.version,
    console.color,
    console.releaseYear,
    console.boughtPrice,
    console.averageMarketPrice,
    console.targetSellingPrice,
    new Date(console.createdAt).toLocaleDateString()
  ]);

  downloadCSV("consoles", headers, rows);
};

export const exportGamesToCSV = (games: Game[]) => {
  const headers = [
    "SKU",
    "Title",
    "Genre",
    "Release Year",
    "Condition",
    "Bought Price",
    "Average Market Price",
    "Target Selling Price",
    "Console Name",
    "Platform",
    "Date Added"
  ];

  const rows = games.map(game => [
    game.sku,
    game.title,
    game.genre,
    game.releaseYear,
    game.condition,
    game.boughtPrice,
    game.averageMarketPrice,
    game.targetSellingPrice,
    game.consoleName,
    game.platform,
    new Date(game.createdAt).toLocaleDateString()
  ]);

  downloadCSV("games", headers, rows);
};

export const exportAccessoriesToCSV = (accessories: Accessory[]) => {
  const headers = [
    "SKU",
    "Name",
    "Type",
    "Color",
    "Model",
    "Condition",
    "Bought Price",
    "Average Market Price",
    "Target Selling Price",
    "Console Name",
    "Date Added"
  ];

  const rows = accessories.map(accessory => [
    accessory.sku,
    accessory.name,
    accessory.type,
    accessory.color,
    accessory.model,
    accessory.condition,
    accessory.boughtPrice,
    accessory.averageMarketPrice,
    accessory.targetSellingPrice,
    accessory.consoleName,
    new Date(accessory.createdAt).toLocaleDateString()
  ]);

  downloadCSV("accessories", headers, rows);
};

const downloadCSV = (filename: string, headers: string[], rows: any[][]) => {
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
