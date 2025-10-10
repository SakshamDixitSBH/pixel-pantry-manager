import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Game } from "@/types/inventory";
import { getConditionColor } from "@/utils/conditionColors";
import { ItemDetailsModal } from "@/components/ItemDetailsModal";
import { AddEditItemModal } from "@/components/AddEditItemModal";
import { toast } from "sonner";
import { inventoryApi } from "@/services/inventoryApi";

const Games = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState<Game | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Game | null>(null);

  useEffect(() => {
    setGames(inventoryApi.getGames());
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.consoleName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setIsAddEditOpen(true);
  };

  const handleEdit = (id: string) => {
    const item = games.find((g) => g.id === id);
    if (item) {
      setEditingItem(item);
      setIsAddEditOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    inventoryApi.deleteGame(id);
    setGames(inventoryApi.getGames());
    toast.success("Game deleted successfully");
  };

  const handleSave = async (item: Omit<Game, "photos">, photoFiles: File[]) => {
    await inventoryApi.saveGame(item, photoFiles);
    setGames(inventoryApi.getGames());
    toast.success(editingItem ? "Game updated successfully" : "Game added successfully");
  };

  const handleRowClick = (game: Game) => {
    setSelectedItem(game);
    setIsDetailsOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">Games</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your game collection</p>
        </div>
        <Button onClick={handleAdd} className="gap-2 w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          Add Game
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-lg sm:text-xl">All Games</span>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="min-w-[80px]">Photo</TableHead>
                  <TableHead className="min-w-[100px]">SKU</TableHead>
                  <TableHead className="min-w-[180px]">Title</TableHead>
                  <TableHead className="min-w-[120px]">Brand</TableHead>
                  <TableHead className="min-w-[150px]">Console</TableHead>
                  <TableHead className="min-w-[100px]">Platform</TableHead>
                  <TableHead className="min-w-[100px]">Condition</TableHead>
                  <TableHead className="text-right min-w-[100px]">Bought</TableHead>
                  <TableHead className="text-right min-w-[100px]">Market</TableHead>
                  <TableHead className="text-right min-w-[100px]">Target</TableHead>
                  <TableHead className="text-right min-w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game) => (
                  <TableRow 
                    key={game.id} 
                    className="hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(game)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="w-12 h-12 rounded-md border bg-muted flex items-center justify-center overflow-hidden">
                        {game.photos && game.photos.length > 0 ? (
                          <img src={game.photos[0]} alt="Game" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{game.sku}</TableCell>
                    <TableCell className="font-semibold">{game.title}</TableCell>
                    <TableCell>{game.brand}</TableCell>
                    <TableCell>{game.consoleName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{game.platform}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getConditionColor(game.condition)}>
                        {game.condition}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${game.boughtPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      ${game.averageMarketPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">${game.targetSellingPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(game.id)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(game.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ItemDetailsModal
        item={selectedItem}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        type="game"
      />

      <AddEditItemModal
        item={editingItem}
        isOpen={isAddEditOpen}
        onClose={() => setIsAddEditOpen(false)}
        onSave={handleSave}
        type="game"
      />
    </div>
  );
};

export default Games;
