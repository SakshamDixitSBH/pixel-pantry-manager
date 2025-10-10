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
import { sampleAccessories } from "@/data/sampleData";
import { Accessory } from "@/types/inventory";
import { getConditionColor } from "@/utils/conditionColors";
import { toast } from "sonner";

const Accessories = () => {
  const [accessories] = useState<Accessory[]>(sampleAccessories);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAccessories = accessories.filter((accessory) =>
    accessory.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accessory.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    accessory.consoleName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    toast.info("Add Accessory feature - Connect to your backend API");
  };

  const handleEdit = (id: string) => {
    toast.info(`Edit accessory ${id} - Connect to your backend API`);
  };

  const handleDelete = (id: string) => {
    toast.info(`Delete accessory ${id} - Connect to your backend API`);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Accessories</h1>
          <p className="text-muted-foreground">Manage your gaming accessories</p>
        </div>
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Accessory
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>All Accessories</span>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search accessories..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Console</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead className="text-right">Bought</TableHead>
                  <TableHead className="text-right">Market</TableHead>
                  <TableHead className="text-right">Target</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccessories.map((accessory) => (
                  <TableRow key={accessory.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-semibold">{accessory.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{accessory.type}</Badge>
                    </TableCell>
                    <TableCell>{accessory.consoleName}</TableCell>
                    <TableCell>{accessory.model}</TableCell>
                    <TableCell>{accessory.color}</TableCell>
                    <TableCell>
                      <Badge className={getConditionColor(accessory.condition)}>
                        {accessory.condition}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${accessory.boughtPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold text-primary">
                      ${accessory.averageMarketPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">${accessory.targetSellingPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(accessory.id)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(accessory.id)}
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

export default Accessories;
