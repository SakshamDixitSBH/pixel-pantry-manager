import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
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
import { sampleGames } from "@/data/sampleData";
import { Game } from "@/types/inventory";
import { getConditionColor } from "@/utils/conditionColors";
import { toast } from "sonner";

const Games = () => {
  const [games] = useState<Game[]>(sampleGames);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.consoleName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    toast.info("Add Game feature - Connect to your backend API");
  };

  const handleEdit = (id: string) => {
    toast.info(`Edit game ${id} - Connect to your backend API`);
  };

  const handleDelete = (id: string) => {
    toast.info(`Delete game ${id} - Connect to your backend API`);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Games</h1>
          <p className="text-muted-foreground">Manage your game collection</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Game
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Games</span>
            <div className="relative w-64">
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
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Title</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Console</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead className="text-right">Bought</TableHead>
                  <TableHead className="text-right">Market</TableHead>
                  <TableHead className="text-right">Target</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGames.map((game) => (
                  <TableRow key={game.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-semibold">{game.title}</TableCell>
                    <TableCell>{game.genre}</TableCell>
                    <TableCell>{game.consoleName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{game.platform}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getConditionColor(game.condition)}>
                        {game.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>{game.releaseYear}</TableCell>
                    <TableCell className="text-right">${game.boughtPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      ${game.averageMarketPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">${game.targetSellingPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
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
    </div>
  );
};

export default Games;
