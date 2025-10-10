import { Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useInventoryManager } from "@/hooks/useInventoryManager";
import { PageHeader } from "@/components/inventory/PageHeader";
import { SearchBar } from "@/components/inventory/SearchBar";

const Games = () => {
  const {
    items: games,
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
  } = useInventoryManager<Game>("game");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.consoleName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 lg:space-y-6">
      <PageHeader
        title="Games"
        description="Manage your game collection"
        buttonText="Add Game"
        onAddClick={handleAdd}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-lg sm:text-xl">All Games</span>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search games..."
            />
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
        onClose={closeDetailsModal}
        type="game"
      />

      <AddEditItemModal
        item={editingItem}
        isOpen={isAddEditOpen}
        onClose={closeAddEditModal}
        onSave={handleSave}
        type="game"
      />
    </div>
  );
};

export default Games;
